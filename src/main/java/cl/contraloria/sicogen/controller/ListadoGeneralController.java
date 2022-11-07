package cl.contraloria.sicogen.controller;


import cl.contraloria.sicogen.model.*;
import cl.contraloria.sicogen.service.ExcelService;
import cl.contraloria.sicogen.service.InformesPersistencia;
import cl.contraloria.sicogen.service.InformesService;
import cl.contraloria.sicogen.utils.AddImageExcel;
import cl.contraloria.sicogen.utils.Convertidor;
import cl.contraloria.sicogen.utils.InformesEstadosAnualBO;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.net.URL;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/listadogeneral")
public class ListadoGeneralController extends HttpServlet {

    private InformesService informesService;
    private InformesPersistencia informe;
    private InformesEstadosAnualBO informesEstadosAnualBO;
    private int hayComplemento;
    HttpSession session = null;
    int entidad = 0;
    UsuarioDTO u = null;
    private ExcelService excelService;
    private ServletContext servletContext;
    private long totalRecuDispoCtaDebe;
    private long totalRecuDispoCtaHaber;
    private long totalCtaCobrarDebe;
    private long totalCtaCobrarHaber;
    private long totalCtaPagarDebe;
    private long totalCtaPagarHaber;
    private long totalCtaCptoDebe;
    private long totalCtaCptoHaber;
    private long totalVarDisponibilidades;
    private long totalVarDispoComprobacion;
    private String nombreEntidad;
    private String periodoNombre;
    private String ejercicioNombre;
    private String resultado;

    private List<Resumen> listaRecursosDispo = new ArrayList<Resumen>();
    private List<Resumen> listaCuentasCobrar = new ArrayList<Resumen>();
    private List<Resumen> listaCuentasPagar = new ArrayList<Resumen>();
    private List<Resumen> listaCuentasCmpto = new ArrayList<Resumen>();

    private String nombreArchivo;

    public ListadoGeneralController(InformesService informesService,
                                    InformesPersistencia informe,
                                    ExcelService excelService,
                                    ServletContext servletContext) {
        this.informesService = informesService;
        this.informe = informe;
        this.excelService = excelService;
        this.servletContext = servletContext;
    }

    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.favorPathExtension(false).
                favorParameter(true).
                parameterName("mediaType").
                ignoreAcceptHeader(true).
                useJaf(false).
                defaultContentType(MediaType.APPLICATION_JSON).
                mediaType("xml", MediaType.APPLICATION_XML).
                mediaType("json", MediaType.APPLICATION_JSON);
    }

    @RequestMapping (value = "/list", method = RequestMethod.GET)
    public ResponseEntity<InformesEstadosAnualBO> getAll(@RequestParam Integer ejercicioId,
                                                         @RequestParam Integer tipoInforme,
                                                         @RequestParam Integer entidadId) throws Exception {

        InformesEstadosAnualBO informesEstadosAnualBO;
        informesEstadosAnualBO = informesService.getEstadoInformeAnual(entidadId, ejercicioId, tipoInforme);
        informesEstadosAnualBO.setPeriodosEjercicio(informesService.getPeriodosByEjercicio(ejercicioId));
        return new ResponseEntity<InformesEstadosAnualBO>(informesEstadosAnualBO, HttpStatus.OK);
    }

    @RequestMapping (value = "/listaPeriodos", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Periodos> listaPeriodos(@RequestParam Integer ejercicioId,
                                                  HttpServletRequest request,
                                                  ModelMap model){

        List<Periodos> listaPeriodos = null;
        List<CorreccionPendienteBO> correccionesPendientes = null;
        Periodos form = null;
        int idEjercicioSelected;

        try {
            session = request.getSession(false);
            u = (UsuarioDTO) session.getAttribute("usr");
            try{
                entidad=Integer.valueOf(u.getEntidadID());
            }catch(Exception ex){

                ex.fillInStackTrace();

            }
            listaPeriodos = informesService.getPeriodosByEjercicio(ejercicioId);
            //revisar si esta va?????????
            correccionesPendientes = informesService.getCorreccionesPendientes(u.getPartidaID(), u.getCapituloID());

            if(correccionesPendientes!=null && correccionesPendientes.size() > 0){
                this.hayComplemento = correccionesPendientes.size();
                idEjercicioSelected = Integer.valueOf( correccionesPendientes.get(0).getEjercicioID());
                session.setAttribute("hayComplemento", correccionesPendientes.size());

            } else {
                session.setAttribute("hayComplemento", 0);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("hayComplemento", hayComplemento);

        return new ResponseEntity(listaPeriodos, HttpStatus.OK);
    }

    @GetMapping(path = "/verInformeIC")
    public String obtenerValidacionIC(ModelMap model, @RequestParam Integer idFileUp) throws SQLException {
        InformacionGeneralRV infoGeneralRV = informesService.obtieneInfoGeneralRV(idFileUp);
        infoGeneralRV.setIdFileIp(idFileUp.toString());
        model.addAttribute("infoGeneralRV", infoGeneralRV);
        model.addAttribute("idArchivo", idFileUp);
        model.addAttribute("datosInforme", informesService.obtieneDatosInformeContable(idFileUp));
        return "VerInformeIC";
    }

    @GetMapping(path = "/downExcelVerIC")
    public ResponseEntity descargaRvExcelIC(@RequestParam Integer idFileUp) {
        try {
            Map<String, InputStreamResource> result = excelService.generaExcelVerIC(
                    servletContext.getResource("/resources/img/sicogenii_logo.png"), idFileUp);
            String filename = null;

            for (Map.Entry<String, InputStreamResource> entry : result.entrySet()) {
                filename = entry.getKey();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + filename)
                    .header(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                    .header(HttpHeaders.SET_COOKIE, "fileDownload=true; path=/")
                    .body(result.get(filename));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getLocalizedMessage());
        }
    }

    @PostMapping(value = "/reporteCuadratura")
    public String getreporteCuadratura(@RequestParam Integer informeID,
                                       @RequestParam Integer ejercicioID,
                                       @RequestParam String periodoID,
                                       @RequestParam Integer reporteID,
                                       @RequestParam Integer fileUploadID,
                                       ModelMap model) {

        List<TiposDeInformesDTO> listaInformes = new ArrayList<TiposDeInformesDTO>();
        List<ReportesDTO> listaReportes = new ArrayList<ReportesDTO>();
        List<Periodos> listaPeriodos = new ArrayList<Periodos>();
        List<EjerciciosDTO> ejercicios = new ArrayList();


        try {

            listaInformes = informesService.listaInformes();
            listaReportes = informesService.listaReportes(informeID);
            listaPeriodos = informesService.getPeriodosByInforme(ejercicioID, informeID);
            ejercicios = informesService.getEjercicios();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        model.addAttribute("listaInformes", listaInformes);
        model.addAttribute("listaReportes", listaReportes);
        model.addAttribute("listaPeriodos", listaPeriodos);
        model.addAttribute("ejercicios", ejercicios);
        model.addAttribute("fileUpload", fileUploadID);
        model.addAttribute("informeID", informeID);
        model.addAttribute("ejercicioID", ejercicioID);
        model.addAttribute("periodoID", periodoID);

        return "ReporteCuadraturaSeguimiento";

    }

    @GetMapping(value = "/getreporteCuadratura")
    public String reporteCuadraturaDisp(@RequestParam String idFileUpload,
                                        HttpServletRequest request, ModelMap model) {


        String strRetorno;
        long lngVarDispoComprobacion;
        Convertidor conv = new Convertidor();
        //ListaCuadraturaPersistencia perReporteCuadratura;
        Disponibilidades objDisponibilidad = null;

        try {

            lngVarDispoComprobacion = 0;
            //perReporteCuadratura = new ListaCuadraturaPersistencia();
            if (idFileUpload != null) {


                // this.idFileUpload=	Long.parseLong(ServletActionContext.getRequest().getParameter("idFileUpload"));

                objDisponibilidad = informesService.getReporteCuadraturaDisponibilidades(Long.parseLong(idFileUpload));


                // perReporteCuadratura.getReporteCuadraturaDisponibilidades(this.idFileUpload);
                if (objDisponibilidad != null) {

                    this.setTotalRecuDispoCtaDebe(objDisponibilidad.getRecDispDebe());
                    this.setTotalRecuDispoCtaHaber(objDisponibilidad.getRecDispHaber());

                    this.setTotalCtaCobrarDebe(objDisponibilidad.getCtaCobDebe());
                    this.setTotalCtaCobrarHaber(objDisponibilidad.getCtaCobHaber());

                    this.setTotalCtaPagarDebe(objDisponibilidad.getCtaPagDebe());
                    this.setTotalCtaPagarHaber(objDisponibilidad.getCtaPagHaber());

                    this.setTotalCtaCptoDebe(objDisponibilidad.getCtaComDebe());
                    this.setTotalCtaCptoHaber(objDisponibilidad.getCtaComHaber());

                    this.setTotalVarDisponibilidades(this.getTotalRecuDispoCtaDebe() - this.getTotalRecuDispoCtaHaber());


                    lngVarDispoComprobacion = (this.getTotalCtaCobrarHaber() - this.getTotalCtaPagarDebe()) +
                            (this.getTotalCtaCptoHaber() - this.getTotalCtaCptoDebe());

                    this.setTotalVarDispoComprobacion(lngVarDispoComprobacion);

                    this.setNombreEntidad(objDisponibilidad.getNombreEntidad());
                    this.setPeriodoNombre(objDisponibilidad.getPeriodoNombre());
                    this.setEjercicioNombre(objDisponibilidad.getEjercicioNombre());
                    this.setResultado(objDisponibilidad.getResultado());

                    this.setListaRecursosDispo(objDisponibilidad.getRecDisp());
                    this.setListaCuentasCobrar(objDisponibilidad.getCtaxCob());
                    this.setListaCuentasPagar(objDisponibilidad.getCtaxPag());
                    this.setListaCuentasCmpto(objDisponibilidad.getCtaComp());

                }

                model.addAttribute("listaRecursosDispo", getListaRecursosDispo());
                model.addAttribute("listaCuentasCobrar", getListaCuentasCobrar());
                model.addAttribute("listaCuentasPagar", getListaCuentasPagar());
                model.addAttribute("listaCuentasCmpto", getListaCuentasCmpto());
                model.addAttribute("nombreEntidad", getNombreEntidad());
                model.addAttribute("ejercicioNombre", getEjercicioNombre());
                model.addAttribute("periodoNombre", getPeriodoNombre());
                model.addAttribute("resultado", getResultado());


                model.addAttribute("totalRecuDispoCtaDebe", Convertidor.formatearNumero(this.getTotalRecuDispoCtaDebe()));
                model.addAttribute("totalRecuDispoCtaHaber", Convertidor.formatearNumero(this.getTotalRecuDispoCtaHaber()));
                model.addAttribute("totalVarDisponibilidades", Convertidor.formatearNumero(this.getTotalVarDisponibilidades()));
                model.addAttribute("totalCtaCobrarHaber", Convertidor.formatearNumero(this.getTotalCtaCobrarHaber()));
                model.addAttribute("totalCtaPagarDebe", Convertidor.formatearNumero(this.getTotalCtaPagarDebe()));
                model.addAttribute("totalCtaCptoHaber", Convertidor.formatearNumero(this.getTotalCtaCptoHaber()));
                model.addAttribute("totalCtaCptoDebe", Convertidor.formatearNumero(this.getTotalCtaCptoDebe()));
                model.addAttribute("totalVarDispoComprobacion", Convertidor.formatearNumero(this.getTotalVarDispoComprobacion()));

            }
        } catch (SQLException e) {

            e.printStackTrace();
        }
        HttpSession session = request.getSession(false);
        session.setAttribute("objRepDisponibilidades", objDisponibilidad);

        return "DetalleReporteCuadDisponibilidad";
    }

    @RequestMapping(value = "/descargaPDF", method = RequestMethod.GET)
    public ResponseEntity geFile(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        int tpEntidad = 0;
        int entidad = 0;
        int periodo = 0;
        String informe = "";
        int tpArchivo = 0;
        String strRetorno;


        Disponibilidades objDisponibilidades = new Disponibilidades();
        session = request.getSession(false);
        objDisponibilidades = (Disponibilidades) session.getAttribute("objRepDisponibilidades");

        informe = Convertidor.formatearFechaActual("ddMMyyyy_HHmmss");

        Document document = new Document(PageSize.A4, 20, 10, 10, 10);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        // setNombreArchivo("Reporte de Disponibilidades "+informe+".pdf");

        try {
            PdfWriter.getInstance(document, baos);

            document.open();
            //parSistema.getDbUrl();

            Font titleRep = new Font(Font.getFamily("Arial"), 14, Font.BOLD);
            Font titleEnc = new Font(Font.getFamily("Arial"), 10, Font.BOLD);
            Font sbtleEnc = new Font(Font.getFamily("Arial"), 10, Font.NORMAL);

            Font titledat = new Font(Font.getFamily("Arial"), 8, Font.BOLD);
            Font Infodato = new Font(Font.getFamily("Arial"), 8, Font.NORMAL);

            Font titleInf = new Font(Font.getFamily("Arial"), 8, Font.NORMAL);
            Font titleCol = new Font(Font.getFamily("Arial"), 6, Font.NORMAL);
            Font detText = new Font(Font.getFamily("Arial"), 8, Font.NORMAL);
            Font detTextTit = new Font(Font.getFamily("Arial"), 8, Font.BOLD);


            BaseColor colWhite = new BaseColor(255, 255, 255);
            BaseColor colBlack = new BaseColor(0, 0, 0);
            BaseColor coltext1 = new BaseColor(69, 70, 72);
            BaseColor coltext2 = new BaseColor(102, 102, 102);

            BaseColor colcbRep = new BaseColor(250, 250, 250);
            BaseColor colbase1 = new BaseColor(215, 215, 217);
            BaseColor colSbTit = new BaseColor(37, 129, 184);

            titleRep.setColor(coltext1);
            titleEnc.setColor(colWhite);
            sbtleEnc.setColor(coltext2);
            titledat.setColor(colSbTit);
            Infodato.setColor(colSbTit);

            titleInf.setColor(colWhite);
            titleCol.setColor(colWhite);
            detText.setColor(colBlack);
            detTextTit.setColor(colBlack);

            Image image = Image.getInstance(servletContext.getResource("/resources/img/cuadros.png"));
            image.setAlignment(Image.LEFT | 0);
            image.setBorder(Image.NO_BORDER);
            image.scaleToFit(50, 10);

            PdfPTable table = new PdfPTable(6);
            PdfPCell cellTit;

            cellTit = new PdfPCell(image);
            cellTit.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellTit.setBorder(0);
            cellTit.setPadding(5);
            cellTit.setBackgroundColor(colbase1);
            cellTit.setColspan(1);
            table.addCell(cellTit);

            cellTit = new PdfPCell(new Phrase("Reporte de Cuadratura ", titleRep));
            cellTit.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellTit.setBorder(0);
            cellTit.setPadding(2);
            cellTit.setBackgroundColor(colbase1);
            cellTit.setColspan(5);
            table.addCell(cellTit);

            cellTit = new PdfPCell(new Phrase("Cuadratura Disponibilidades ", sbtleEnc));
            cellTit.setHorizontalAlignment(Element.ALIGN_LEFT);
            cellTit.setBorder(0);
            cellTit.setPadding(2);
            cellTit.setPaddingLeft(10);
            cellTit.setBackgroundColor(colWhite);
            cellTit.setColspan(6);
            table.addCell(cellTit);

            table.setSpacingBefore(10);
            table.setSpacingAfter(5);

            table.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.setLockedWidth(true);
            table.setTotalWidth(545);
            document.add(table);


            PdfPTable tblDatos;
            PdfPCell cllDatos;
            /********************************************************************************************************************/
            /****************************       Información General                **********************************************/

            tblDatos = new PdfPTable(6);

            cllDatos = new PdfPCell(new Phrase(" ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colWhite);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Información General ", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(1);    //top
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colBlack);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase(" ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colWhite);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Entidad ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getNombreEntidad(), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase(" ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colWhite);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Ejercicio ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getEjercicioNombre(), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase(" ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colWhite);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Periodo ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getPeriodoNombre(), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase(" ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colWhite);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Resultado ", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(2);    //button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colWhite);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getResultado(), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.enableBorderSide(2);    //button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            tblDatos.setSpacingBefore(5);
            tblDatos.setSpacingAfter(5);
            tblDatos.setHorizontalAlignment(Element.ALIGN_LEFT);

            tblDatos.setLockedWidth(true);
            tblDatos.setTotalWidth(400);
            int[] colWidthGeneral = new int[]{28, 10, 80, 20, 100, 100};
            tblDatos.setWidths(colWidthGeneral);

            document.add(tblDatos);
            /*******************************************************************************************************************/

            /*******************************************************************************************************************/
            /*****************************		Cuadro Resumen						********************************************/
            tblDatos = new PdfPTable(6);

            cllDatos = new PdfPCell(new Phrase("Cuadro Resumen ", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(1);    //top
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colbase1);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            /*****************************		Detalle Cuadro Resumen						**********************************/

            cllDatos = new PdfPCell(new Phrase(" ", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Descripcion", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("Monto", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);
            /*****************************		FIN Cuadro Resumen						****************************************/
            /*******************************************************************************************************************/

            //-----------------------------------------------------------------------------------------
            //---------------------------------DATOS DE RESUMEN ---------------------------------------

            Font tempFont = Infodato;
            cllDatos = new PdfPCell(new Phrase("DEBITOS RECURSOS DISPONIBLES (111 debitos)", detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDispDebe()), detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase("CREDITOS RECURSOS DISPONIBLES (111 creditos)", detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDispHaber()), detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase("VARIACION DE DISPONIBILIDADES", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDispDebe() - objDisponibilidades.getRecDispHaber()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase(" ", Infodato));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("PERCIBIDO (115 creditos)", detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaCobHaber()), detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase("PAGADO (215 debitos)", detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaPagDebe()), detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase("ACREEDORES (credito complementarias)", detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaCobHaber()), detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase("DEUDORES (debito complementarias)", detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaCobDebe()), detText));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase("VARIACION DE DISPONIBILIDADES (COMPROBACION)", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero((objDisponibilidades.getCtaCobHaber() - objDisponibilidades.getCtaPagDebe()) +
                    (objDisponibilidades.getCtaComHaber() - objDisponibilidades.getCtaCobDebe())), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", tempFont));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);

            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            cllDatos = new PdfPCell(new Phrase(" ", Infodato));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //left
            cllDatos.enableBorderSide(2);    //buttom
            cllDatos.setPadding(3);
            cllDatos.setPaddingLeft(30);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            //------------------------------------------------------------------------------------


            /*******************************************************************************************************************/

            tblDatos.setSpacingBefore(5);
            tblDatos.setSpacingAfter(5);
            tblDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            tblDatos.setLockedWidth(true);
            tblDatos.setTotalWidth(500);
            int[] colWidth = new int[]{10, 120, 10, 10, 20, 20};
            tblDatos.setWidths(colWidth);

            document.add(tblDatos);


            /*******************************************************************************************************************/
            /*****************************		RECURSOS DISPONIBLES				********************************************/
            tblDatos = new PdfPTable(6);
            cllDatos = new PdfPCell(new Phrase("RECURSOS DISPONIBLES", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(1);    //top
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colbase1);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("LINEA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CUENTA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DENOMINACIÓN", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DÉBITO", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CRÉDITO", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            for (int i = 0; i < objDisponibilidades.getRecDisp().size(); i++) {

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getRecDisp().get(i).getLinea(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(4);    //left
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getRecDisp().get(i).getCodCta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getRecDisp().get(i).getCuenta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDisp().get(i).getDebe()), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDisp().get(i).getHaber()), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase("", tempFont));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(8);    //right
                cllDatos.setBorderColor(colBlack);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);
            }

            cllDatos = new PdfPCell(new Phrase("TOTALES DEBITOS Y CREDITOS", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDispDebe()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getRecDispHaber()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            tblDatos.setSpacingBefore(5);
            tblDatos.setSpacingAfter(5);
            tblDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            tblDatos.setLockedWidth(true);
            tblDatos.setTotalWidth(500);
            colWidth = new int[]{18, 22, 120, 30, 30, 2};
            tblDatos.setWidths(colWidth);

            document.add(tblDatos);
            /*****************************		FIN RECURSOS DISPONIBLES			********************************************/
            /*******************************************************************************************************************/
            /*****************************		CUENTAS POR COBRAR					********************************************/
            tblDatos = new PdfPTable(6);
            cllDatos = new PdfPCell(new Phrase("CUENTAS POR COBRAR", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(1);    //top
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colbase1);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("LINEA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CUENTA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DENOMINACIÓN", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CRÉDITO", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            for (int i = 0; i < objDisponibilidades.getCtaxCob().size(); i++) {

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaxCob().get(i).getLinea(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(4);    //left
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaxCob().get(i).getCodCta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaxCob().get(i).getCuenta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaxCob().get(i).getHaber()), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase("", tempFont));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(8);    //right
                cllDatos.setBorderColor(colBlack);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(2);
                tblDatos.addCell(cllDatos);
            }

            cllDatos = new PdfPCell(new Phrase("TOTALES PERCIBIDO", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaCobHaber()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);


            tblDatos.setSpacingBefore(5);
            tblDatos.setSpacingAfter(5);
            tblDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            tblDatos.setLockedWidth(true);
            tblDatos.setTotalWidth(500);
            colWidth = new int[]{18, 22, 120, 30, 30, 2};
            tblDatos.setWidths(colWidth);

            document.add(tblDatos);

            /*****************************		FIN CUENTAS POR COBRAR				********************************************/
            /*******************************************************************************************************************/
            /*****************************		CUENTAS POR PAGAR					********************************************/
            tblDatos = new PdfPTable(6);
            cllDatos = new PdfPCell(new Phrase("CUENTAS POR PAGAR", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(1);    //top
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colbase1);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("LINEA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CUENTA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DENOMINACIÓN", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DÉBITO", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);

            for (int i = 0; i < objDisponibilidades.getCtaxPag().size(); i++) {

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaxPag().get(i).getLinea(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(4);    //left
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaxPag().get(i).getCodCta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaxPag().get(i).getCuenta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaxPag().get(i).getDebe()), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase("", tempFont));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(8);    //right
                cllDatos.setBorderColor(colBlack);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(2);
                tblDatos.addCell(cllDatos);
            }

            cllDatos = new PdfPCell(new Phrase("TOTALES PAGADO", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaPagDebe()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(2);
            tblDatos.addCell(cllDatos);


            tblDatos.setSpacingBefore(5);
            tblDatos.setSpacingAfter(5);
            tblDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            tblDatos.setLockedWidth(true);
            tblDatos.setTotalWidth(500);
            colWidth = new int[]{18, 22, 120, 30, 30, 2};
            tblDatos.setWidths(colWidth);

            document.add(tblDatos);
            /*****************************		FIN CUENTAS POR PAGAR				********************************************/
            /*******************************************************************************************************************/
            /*****************************		CUENTAS COMPLEMENTARIAS				********************************************/
            tblDatos = new PdfPTable(6);
            cllDatos = new PdfPCell(new Phrase("CUENTAS COMPLEMENTARIAS", titleEnc));
            cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(1);    //top
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colbase1);
            cllDatos.setColspan(6);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("LINEA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CUENTA", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DENOMINACIÓN", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("DÉBITO", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("CRÉDITO", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPadding(6);
            cllDatos.setPaddingLeft(10);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            for (int i = 0; i < objDisponibilidades.getCtaComp().size(); i++) {

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaComp().get(i).getLinea(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(4);    //left
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaComp().get(i).getCodCta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(objDisponibilidades.getCtaComp().get(i).getCuenta(), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaComp().get(i).getDebe()), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaComp().get(i).getHaber()), detText));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.setPadding(3);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);

                cllDatos = new PdfPCell(new Phrase("", tempFont));
                cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cllDatos.setBorder(PdfPCell.NO_BORDER);
                cllDatos.enableBorderSide(8);    //right
                cllDatos.setBorderColor(colBlack);
                cllDatos.setBackgroundColor(colcbRep);
                cllDatos.setColspan(1);
                tblDatos.addCell(cllDatos);
            }

            cllDatos = new PdfPCell(new Phrase("TOTALES DEUDORES Y ACREEDORES", detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_LEFT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(4);    //left
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(3);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaComDebe()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase(Convertidor.formatearNumero(objDisponibilidades.getCtaComHaber()), detTextTit));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setBorderColor(colBlack);
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingLeft(20);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);

            cllDatos = new PdfPCell(new Phrase("", titledat));
            cllDatos.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cllDatos.setBorder(PdfPCell.NO_BORDER);
            cllDatos.enableBorderSide(8);    //right
            cllDatos.enableBorderSide(2);    //Button
            cllDatos.setPaddingTop(5);
            cllDatos.setPaddingBottom(8);
            cllDatos.setBorderColor(colBlack);
            cllDatos.setBackgroundColor(colcbRep);
            cllDatos.setColspan(1);
            tblDatos.addCell(cllDatos);


            tblDatos.setSpacingBefore(5);
            tblDatos.setSpacingAfter(5);
            tblDatos.setHorizontalAlignment(Element.ALIGN_CENTER);
            tblDatos.setLockedWidth(true);
            tblDatos.setTotalWidth(500);
            colWidth = new int[]{18, 22, 120, 30, 30, 2};
            tblDatos.setWidths(colWidth);

            document.add(tblDatos);
            /*****************************		FIN CUENTAS COMPLEMENTARIAS			********************************************/
            /*******************************************************************************************************************/


        } catch (Exception e) {

            e.printStackTrace();

        }
        document.close();
        InputStream inputStream = new ByteArrayInputStream(baos.toByteArray());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=Reporte de Disponibilidades " + informe + ".pdf")
                .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                .header(HttpHeaders.SET_COOKIE, "fileDownload=true; path=/")
                .body(new InputStreamResource(inputStream));
    }

    @RequestMapping(value = "/exportarExcel", method = RequestMethod.GET)
    public ResponseEntity geFileExcel(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        Disponibilidades objDisponibilidades = new Disponibilidades();
        InputStream inputStream = null;
        session = request.getSession(false);
        objDisponibilidades = (Disponibilidades) session.getAttribute("objRepDisponibilidades");

        response.setHeader("Content-Disposition", "attachment;filename=\"" + objDisponibilidades.getNombreEntidad() + "_Reporte de Cuadratura Disponibilidades" + objDisponibilidades.getPeriodoNombre() + objDisponibilidades.getEjercicioNombre() + ".xlsx");

        XSSFWorkbook wb2 = new XSSFWorkbook();
        XSSFSheet x = wb2.createSheet();

        x.setColumnWidth(1, 2000);
        x.setColumnWidth(2, 5000);
        x.setColumnWidth(3, 5000);
        x.setColumnWidth(4, 5000);
        x.setColumnWidth(5, 6000);
        x.setColumnWidth(6, 5000);
        x.setColumnWidth(7, 5000);
        x.setColumnWidth(8, 5000);
        x.setColumnWidth(9, 5000);
        x.setColumnWidth(10, 5000);
        x.setColumnWidth(11, 5000);
        x.setColumnWidth(12, 5000);
        x.setColumnWidth(13, 5000);


        XSSFColor bckTitulo =  new XSSFColor(new java.awt.Color(215,215,217));
        XSSFColor bckSubtit =  new XSSFColor(new java.awt.Color( 69, 70, 72));
        XSSFColor bckEncIzq =  new XSSFColor(new java.awt.Color(248,248,248));
        XSSFColor bckEncDer =  new XSSFColor(new java.awt.Color(215,215,217));
        XSSFColor bckTitDet =  new XSSFColor(new java.awt.Color(  0,102,184));
        XSSFColor bckSTitDt =  new XSSFColor(new java.awt.Color( 60,130,200));
        XSSFColor bckDetImp =  new XSSFColor(new java.awt.Color(188,207,237));
        XSSFColor bckDetPar =  new XSSFColor(new java.awt.Color(255,255,255));
        XSSFColor bckErrImp =  new XSSFColor(new java.awt.Color(147,150,249));
        XSSFColor bckErrPar =  new XSSFColor(new java.awt.Color(147,150,249));

        XSSFColor bckEncDerDisp =  new XSSFColor(new java.awt.Color(215,215,217));

        XSSFCellStyle csTitulo = wb2.createCellStyle();
        XSSFCellStyle csSubTit = wb2.createCellStyle();
        XSSFCellStyle csEncIzq = wb2.createCellStyle();
        XSSFCellStyle csEncDer = wb2.createCellStyle();
        XSSFCellStyle csTitDet = wb2.createCellStyle();
        XSSFCellStyle csSTitDt = wb2.createCellStyle();
        XSSFCellStyle csDetImp = wb2.createCellStyle();
        XSSFCellStyle csDetPar = wb2.createCellStyle();
        XSSFCellStyle csErrImp = wb2.createCellStyle();
        XSSFCellStyle csErrPar = wb2.createCellStyle();
        XSSFCellStyle csEncDerDisp = wb2.createCellStyle();
        XSSFCellStyle csEncDerDispCB = wb2.createCellStyle();
        XSSFCellStyle csEncDerDispCBBB = wb2.createCellStyle();
        XSSFCellStyle csEncTitulo	= wb2.createCellStyle();

        org.apache.poi.ss.usermodel.Font headerFontBOLDWEIGHT = wb2.createFont();
        headerFontBOLDWEIGHT.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);
        headerFontBOLDWEIGHT.setColor(IndexedColors.BLACK.getIndex());
        csEncDerDispCBBB.setFont(headerFontBOLDWEIGHT);
        org.apache.poi.ss.usermodel.Font headerFont = wb2.createFont();
        headerFont.setColor(IndexedColors.BLACK.getIndex());
        csEncDerDispCB.setFont(headerFont);

        org.apache.poi.ss.usermodel.Font headerFontTitulo=wb2.createFont();
        headerFontTitulo.setColor(IndexedColors.BLACK.getIndex());
        headerFontTitulo.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);
        csEncTitulo.setFont(headerFontTitulo);
        csEncTitulo.setFillBackgroundColor(bckTitulo);
        csEncTitulo.setFillForegroundColor(bckTitulo);
        csEncTitulo.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csEncTitulo.setAlignment(HorizontalAlignment.CENTER);

        csSubTit.setFillForegroundColor(bckSubtit);
        csSubTit.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csEncIzq.setFillForegroundColor(bckEncIzq);
        csEncIzq.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csEncDer.setFillForegroundColor(bckEncDer);
        csEncDer.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csTitDet.setFillForegroundColor(bckTitDet);
        csTitDet.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csSTitDt.setFillForegroundColor(bckSTitDt);
        csSTitDt.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csDetPar.setFillForegroundColor(bckDetImp);
        csDetPar.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csDetImp.setFillForegroundColor(bckDetPar);
        csDetImp.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csErrPar.setFillForegroundColor(bckErrPar);
        csErrPar.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csErrImp.setFillForegroundColor(bckErrImp);
        csErrImp.setFillPattern(CellStyle.SOLID_FOREGROUND);

        csEncDerDisp.setFillForegroundColor(bckEncDerDisp);


        csEncDer.setFillPattern(CellStyle.SOLID_FOREGROUND);



        XSSFFont fntTitulo = wb2.createFont();

        fntTitulo.setFontHeightInPoints((short) 12);
        fntTitulo.setColor(new XSSFColor(new java.awt.Color(69,70,72)));
        fntTitulo.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        csTitulo.setFont(fntTitulo);
        csTitulo.setFillForegroundColor(bckTitulo);
        csTitulo.setFillBackgroundColor(bckTitulo);
        csTitulo.setFillPattern(CellStyle.SOLID_FOREGROUND);
        csTitulo.setAlignment(XSSFCellStyle.ALIGN_CENTER);


        XSSFFont fntSubTit = wb2.createFont();
        fntSubTit.setFontHeightInPoints((short) 9);
        fntSubTit.setColor(new XSSFColor(new java.awt.Color(  0,  0,  0)));
        fntSubTit.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        csTitDet.setFont(fntSubTit);
        csSTitDt.setFont(fntSubTit);

        XSSFFont fntEncInf = wb2.createFont();
        fntEncInf.setFontHeightInPoints((short) 9);
        fntEncInf.setColor(new XSSFColor(new java.awt.Color(255,255,255)));
        fntEncInf.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        csEncIzq.setFont(fntSubTit);
        csEncDer.setFont(fntSubTit);
        csSubTit.setFont(fntEncInf);

        XSSFFont fntDetalle = wb2.createFont();
        fntDetalle.setFontHeightInPoints((short) 8);
        fntDetalle.setBoldweight(XSSFFont.BOLDWEIGHT_NORMAL);
        csDetImp.setFont(fntDetalle);
        csDetPar.setFont(fntDetalle);

        csTitulo.setWrapText(true);

        XSSFCellStyle csSubTitulo = wb2.createCellStyle();
        XSSFFont fntSubTitulo = wb2.createFont();

        fntSubTitulo.setFontHeightInPoints((short) 8);
        fntSubTitulo.setColor(new XSSFColor(new java.awt.Color(255,255,255)));
        fntSubTitulo.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        csSubTitulo.setFont(fntSubTitulo);
        csSubTitulo.setFillBackgroundColor(bckSubtit);

        XSSFCellStyle csTexto = wb2.createCellStyle();
        XSSFFont fntTexto = wb2.createFont();

        fntTexto.setFontHeightInPoints((short) 8);
        fntTexto.setColor(new XSSFColor(new java.awt.Color(21,21,21)));
        fntTexto.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);
        csTexto.setFont(fntTexto);
        csTexto.setFillBackgroundColor(bckSubtit);

        wb2.setSheetName(0, "Reporte de Cuadratura");

        XSSFRow rowLogo = x.createRow(1);
        URL cuadros = servletContext.getResource("/resources/img/cuadros.png");

        try{
            x.addMergedRegion(new CellRangeAddress(1, 1, 1, 1));
            new AddImageExcel().addImageToSheet("B2", x, x.createDrawingPatriarch(),
                    cuadros, 20, 5,
                    AddImageExcel.OVERLAY_ROW_AND_COLUMN);

            XSSFCell celDet = rowLogo.createCell(2); //HSSFCell celEnc2 = rowDet.createCell(1);
            x.addMergedRegion(new CellRangeAddress(1, 1, 2,8));
            celDet.getCellStyle().setWrapText(true);
            celDet.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
            celDet.setCellStyle(csTitulo);

            celDet.setCellValue(new XSSFRichTextString("  Reporte de Cuadratura"));


        }catch(Exception ex){
            ex.printStackTrace();
        }

        int row = 2;
        x.addMergedRegion(new CellRangeAddress(row, row, 1, 8)); //firstRow, LastRow, firstCol, lastCol
        XSSFRow rowTit = x.createRow(row);
        XSSFCell celTit = rowTit.createCell(1);
        celTit.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celTit.setCellValue(new XSSFRichTextString("\t	Cuadratura Disponibilidades"));
        //setNombreArchivo( "RV" +getsInforme()+" "+cabRep.getPeriodoName()+getsEjercicio() + ".xls");

        row += 2;
        String[][] mCab = {
                {"Información General", null, null},
                {"Entidad", objDisponibilidades.getNombreEntidad(), null},
                {"Ejercicio", objDisponibilidades.getEjercicioNombre(), null},
                {"Periodo", objDisponibilidades.getPeriodoNombre(), null},
                {"Resultado", objDisponibilidades.getResultado(), null},
        };
        //DATOS ENCANBEZADO
        for (int i = 0; i< 5; i++) {
            XSSFRow rowEnc = x.createRow(row);
            if(i==0){
                XSSFCell celEnc1 = rowEnc.createCell(1);
                celEnc1.setCellStyle(csSubTit);
                celEnc1.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
                x.addMergedRegion(new CellRangeAddress(row, row, 1, 5));
                celEnc1.setCellValue(new XSSFRichTextString(mCab[i][0]));

            }else{
                for(int b=0;b<3;b++){
                    int[] pos={1,3,4,5,6,7,8,9,10,11};

                    if(mCab[i][b]!=null){
                        XSSFCell celDetEnc = rowEnc.createCell(pos[b]);
                        switch (b) {
                            case 0:
                            case 3:
                                celDetEnc.setCellStyle(csEncIzq);
                                x.addMergedRegion(new CellRangeAddress(row, row, 1, 2));
                                break;
                            case 1:
                            case 4:
                                celDetEnc.setCellStyle(csEncDer);
                                x.addMergedRegion(new CellRangeAddress(row, row, 3, 5));
                                break;
                            default:
                                celDetEnc.setCellStyle(csEncDer);
                                break;
                        }

                        if(pos[b]==6) {
                            x.addMergedRegion(new CellRangeAddress(row, row, 6, 7));
                        }
                        celDetEnc.setCellValue(new XSSFRichTextString(mCab[i][b]));
                    }
                }
            }
            row++;
        }
        row++;

        XSSFRow rowEncCuentax = x.createRow(row);
        XSSFCell celEncCuentax = rowEncCuentax.createCell(1);

        x.addMergedRegion(new CellRangeAddress(row, row, 1, 8));
        celEncCuentax.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);
        celEncCuentax.setCellStyle(csEncTitulo);
        celEncCuentax.setCellValue(new XSSFRichTextString("Cuadro Resumen"));

        row++;


        XSSFRow rowEncDetDisp = x.createRow(row);
        XSSFCell celempty = rowEncDetDisp.createCell(2);
        celempty.setCellStyle(csEncDerDispCB);


        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellStyle(csEncDerDispCBBB);
        celempty.setCellValue(new XSSFRichTextString("Descripción"));


        XSSFCell celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);
        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        XSSFCell celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.setCellStyle(csEncDerDispCBBB);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellValue(new XSSFRichTextString("Monto (en pesos)"));
        row++;


        XSSFCellStyle CSStempFont = csEncDerDispCB;

        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(CSStempFont);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("DEBITOS RECURSOS DISPONIBLES (111 debitos)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(CSStempFont);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getRecDispDebe())));
        row++;

        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(CSStempFont);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("CREDITOS RECURSOS DISPONIBLES (111 creditos)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(CSStempFont);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getRecDispHaber())));
        row++;


        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(csEncDerDispCBBB);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("VARIACION DE DISPONIBILIDADES"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(csEncDerDispCBBB);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getRecDispDebe() - objDisponibilidades.getRecDispHaber())));
        row++;


        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(CSStempFont);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("PERCIBIDO (115 creditos)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);


        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(CSStempFont);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getCtaCobHaber())));
        row++;

        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(CSStempFont);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("PAGADO (215 debitos)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(CSStempFont);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getCtaPagDebe())));
        row++;

        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(CSStempFont);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("ACREEDORES (credito complementarias)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(CSStempFont);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getCtaComHaber())));
        row++;

        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(CSStempFont);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("DEUDORES (debito complementarias)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(CSStempFont);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero(objDisponibilidades.getCtaComDebe())));
        row++;

        rowEncDetDisp = x.createRow(row);
        celempty = rowEncDetDisp.createCell(2);
        celempty.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celempty.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        celempty.setCellStyle(csEncDerDispCBBB);
        x.addMergedRegion(new CellRangeAddress(row, row, 2, 4));
        celempty.setCellValue(new XSSFRichTextString("VARIACION DE DISPONIBILIDADES (COMPROBACION)"));

        celEnc1Disp = rowEncDetDisp.createCell(5);
        celEnc1Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        celEnc1Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);

        x.addMergedRegion(new CellRangeAddress(row, row, 5, 6));
        celEnc1Disp.setCellValue(new XSSFRichTextString(""));

        celEnc2Disp = rowEncDetDisp.createCell(7);
        celEnc2Disp.getCellStyle().setFillPattern(CellStyle.SOLID_FOREGROUND);
        x.addMergedRegion(new CellRangeAddress(row, row, 7, 8));
        celEnc2Disp.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_LEFT);
        celEnc2Disp.setCellStyle(csEncDerDispCBBB);
        celEnc2Disp.setCellValue(new XSSFRichTextString(Convertidor.formatearNumero((objDisponibilidades.getCtaCobHaber() - objDisponibilidades.getCtaPagDebe()) +
                (objDisponibilidades.getCtaComHaber() - objDisponibilidades.getCtaComDebe()))));
        row++;


        /*****************************		FIN Cuadro Resumen						****************************************/
        /*******************************************************************************************************************/


        /*******************************************************************************************************************/
        /*****************************		RECURSOS DISPONIBLES				********************************************/

        row++;

        XSSFRow rowEncCuentaR = x.createRow(row);
        XSSFCell celEncCuentaR = rowEncCuentaR.createCell(1);

        x.addMergedRegion(new CellRangeAddress(row, row, 1, 8));
        celEncCuentaR.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);
        celEncCuentaR.setCellStyle(csEncTitulo);
        celEncCuentaR.setCellValue(new XSSFRichTextString("RECURSOS DISPONIBLES"));
        row++;
        for (int r = 0; r < objDisponibilidades.getRecDisp().size(); r++) {
            if (r == 0) {


                XSSFRow rowEncDetLinea = x.createRow(row);
                XSSFCell celEnc1Linea = rowEncDetLinea.createCell(1);

                rowEncDetLinea = x.createRow(row);
                String[] titulos = {"Línea", "Cuenta", "DENOMINACIÓN", "DÉBITO", "CRÉDITO"};

                int[] posDet = {1, 2, 3, 7, 8};
                for (int c = 0; c < titulos.length; c++) {
                    celEnc1Linea = rowEncDetLinea.createCell(posDet[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                    celEnc1Linea.setCellStyle(csEncDerDispCBBB);
                    celEnc1Linea.getCellStyle().setWrapText(true);
                    celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                    if (c == 3) {
                        x.addMergedRegion(new CellRangeAddress(row, row, 3, 6));
                    }
                    celEnc1Linea.setCellValue(new XSSFRichTextString(titulos[c]));
                }
                row++;
            }

        }

        for (int b = 0; b < objDisponibilidades.getRecDisp().size(); b++) {

            String[] detalle = {objDisponibilidades.getRecDisp().get(b).getLinea(),
                    objDisponibilidades.getRecDisp().get(b).getCodCta(),
                    objDisponibilidades.getRecDisp().get(b).getCuenta(),
                    String.valueOf(objDisponibilidades.getRecDisp().get(b).getDebe()),
                    String.valueOf(objDisponibilidades.getRecDisp().get(b).getHaber())};

            XSSFRow rowDet = x.createRow(row);
            int[] posDet = {1, 2, 3, 7, 8};
            for (int c = 0; c < detalle.length; c++) {
                XSSFCell celDet = rowDet.createCell(posDet[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                celDet.getCellStyle().setWrapText(true);
                celDet.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                if (c == 3) {
                    x.addMergedRegion(new CellRangeAddress(row, row, 3, 6));
                }
                celDet.setCellStyle(csEncDerDispCB);
                celDet.setCellValue(new XSSFRichTextString(detalle[c]));
            }
            row++;
        }

        XSSFRow rowEncDetLinea = x.createRow(row);
        XSSFCell celEnc1Linea = rowEncDetLinea.createCell(1);

        rowEncDetLinea = x.createRow(row);
        String[] titulos = {"", "", "TOTALES DEBITOS Y CREDITOS", String.valueOf(objDisponibilidades.getRecDispDebe()), String.valueOf(objDisponibilidades.getRecDispHaber())};

        int[] posDet = {1, 2, 3, 7, 8};
        for (int c = 0; c < titulos.length; c++) {
            celEnc1Linea = rowEncDetLinea.createCell(posDet[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
            celEnc1Linea.setCellStyle(csEncDerDispCBBB);
            celEnc1Linea.getCellStyle().setWrapText(true);
            celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
            if (c == 3) {
                x.addMergedRegion(new CellRangeAddress(row, row, 3, 6));

            }
            celEnc1Linea.setCellValue(new XSSFRichTextString(titulos[c]));

        }
        row++;

        /*****************************		FIN RECURSOS DISPONIBLES			********************************************/
        /*******************************************************************************************************************/
        /*****************************		CUENTAS POR COBRAR					********************************************/
        row++;

        rowEncCuentaR = x.createRow(row);
        celEncCuentaR = rowEncCuentaR.createCell(1);

        x.addMergedRegion(new CellRangeAddress(row, row, 1, 8));
        celEncCuentaR.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);
        celEncCuentaR.setCellStyle(csEncTitulo);
        celEncCuentaR.setCellValue(new XSSFRichTextString("CUENTAS POR COBRAR"));
        row++;
        for (int r = 0; r < objDisponibilidades.getCtaxCob().size(); r++) {
            if (r == 0) {


                rowEncDetLinea = x.createRow(row);
                celEnc1Linea = rowEncDetLinea.createCell(1);

                rowEncDetLinea = x.createRow(row);
                String[] titulosCB = {"Línea", "Cuenta", "DENOMINACIÓN", "CRÉDITO"};

                int[] posDetCB = {1, 2, 3, 8};
                for (int c = 0; c < titulosCB.length; c++) {
                    celEnc1Linea = rowEncDetLinea.createCell(posDetCB[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                    celEnc1Linea.setCellStyle(csEncDerDispCBBB);
                    celEnc1Linea.getCellStyle().setWrapText(true);
                    celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                    if (c == 3) {
                        x.addMergedRegion(new CellRangeAddress(row, row, 3, 7));
                    }
                    celEnc1Linea.setCellValue(new XSSFRichTextString(titulosCB[c]));
                }
                row++;
            }
            String[] detalle = {objDisponibilidades.getCtaxCob().get(r).getLinea(),
                    objDisponibilidades.getCtaxCob().get(r).getCodCta(),
                    objDisponibilidades.getCtaxCob().get(r).getCuenta(),
                    String.valueOf(objDisponibilidades.getCtaxCob().get(r).getHaber())};

            XSSFRow rowDet = x.createRow(row);
            int[] posDetCB = {1, 2, 3, 8};
            for (int c = 0; c < detalle.length; c++) {
                XSSFCell celDet = rowDet.createCell(posDetCB[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                celDet.getCellStyle().setWrapText(true);
                celDet.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                if (c == 3) {
                    x.addMergedRegion(new CellRangeAddress(row, row, 3, 7));
                }
                celDet.setCellStyle(csEncDerDispCB);
                celDet.setCellValue(new XSSFRichTextString(detalle[c]));
            }
            row++;

        }


        rowEncDetLinea = x.createRow(row);
        celEnc1Linea = rowEncDetLinea.createCell(1);

        rowEncDetLinea = x.createRow(row);
        String[] titulosCBT = {"", "", "TOTALES PERCIBIDO", String.valueOf(objDisponibilidades.getCtaCobHaber())};

        int[] posDetCBT = {1, 2, 3, 8};
        for (int c = 0; c < titulosCBT.length; c++) {
            celEnc1Linea = rowEncDetLinea.createCell(posDetCBT[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
            celEnc1Linea.setCellStyle(csEncDerDispCBBB);
            celEnc1Linea.getCellStyle().setWrapText(true);
            celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
            if (c == 3) {
                x.addMergedRegion(new CellRangeAddress(row, row, 3, 7));

            }
            celEnc1Linea.setCellValue(new XSSFRichTextString(titulosCBT[c]));

        }
        row++;
        /*****************************		FIN CUENTAS POR COBRAR				********************************************/
        /*******************************************************************************************************************/
        /*****************************		CUENTAS POR PAGAR					********************************************/
        row++;

        rowEncCuentaR = x.createRow(row);
        celEncCuentaR = rowEncCuentaR.createCell(1);

        x.addMergedRegion(new CellRangeAddress(row, row, 1, 8));
        celEncCuentaR.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);
        celEncCuentaR.setCellStyle(csEncTitulo);
        celEncCuentaR.setCellValue(new XSSFRichTextString("CUENTAS POR PAGAR"));
        row++;
        for (int r = 0; r < objDisponibilidades.getCtaxPag().size(); r++) {
            if (r == 0) {


                rowEncDetLinea = x.createRow(row);
                celEnc1Linea = rowEncDetLinea.createCell(1);

                rowEncDetLinea = x.createRow(row);
                String[] titulosCB = {"Línea", "Cuenta", "DENOMINACIÓN", "DÉBITO"};

                int[] posDetCB = {1, 2, 3, 8};
                for (int c = 0; c < titulosCB.length; c++) {
                    celEnc1Linea = rowEncDetLinea.createCell(posDetCB[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                    celEnc1Linea.setCellStyle(csEncDerDispCBBB);
                    celEnc1Linea.getCellStyle().setWrapText(true);
                    celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                    if (c == 3) {
                        x.addMergedRegion(new CellRangeAddress(row, row, 3, 7));
                    }
                    celEnc1Linea.setCellValue(new XSSFRichTextString(titulosCB[c]));
                }
                row++;
            }
            String[] detalle = {objDisponibilidades.getCtaxPag().get(r).getLinea(),
                    objDisponibilidades.getCtaxPag().get(r).getCodCta(),
                    objDisponibilidades.getCtaxPag().get(r).getCuenta(),
                    String.valueOf(objDisponibilidades.getCtaxPag().get(r).getDebe())};

            XSSFRow rowDet = x.createRow(row);
            int[] posDetCB = {1, 2, 3, 8};
            for (int c = 0; c < detalle.length; c++) {
                XSSFCell celDet = rowDet.createCell(posDetCB[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                celDet.getCellStyle().setWrapText(true);
                celDet.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                if (c == 3) {
                    x.addMergedRegion(new CellRangeAddress(row, row, 3, 7));
                }
                celDet.setCellStyle(csEncDerDispCB);
                celDet.setCellValue(new XSSFRichTextString(detalle[c]));
            }
            row++;

        }


        rowEncDetLinea = x.createRow(row);
        celEnc1Linea = rowEncDetLinea.createCell(1);

        rowEncDetLinea = x.createRow(row);
        String[] titulosCPT = {"", "", "TOTALES PAGADO", String.valueOf(objDisponibilidades.getCtaPagDebe())};

        int[] posDetCPT = {1, 2, 3, 8};
        for (int c = 0; c < titulosCPT.length; c++) {
            celEnc1Linea = rowEncDetLinea.createCell(posDetCPT[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
            celEnc1Linea.setCellStyle(csEncDerDispCBBB);
            celEnc1Linea.getCellStyle().setWrapText(true);
            celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
            if (c == 3) {
                x.addMergedRegion(new CellRangeAddress(row, row, 3, 7));

            }
            celEnc1Linea.setCellValue(new XSSFRichTextString(titulosCPT[c]));

        }
        row++;
        /*****************************		FIN CUENTAS POR PAGAR				********************************************/
        /*******************************************************************************************************************/
        /*****************************		CUENTAS COMPLEMENTARIAS				********************************************/
        row++;

        rowEncCuentaR = x.createRow(row);
        celEncCuentaR = rowEncCuentaR.createCell(1);

        x.addMergedRegion(new CellRangeAddress(row, row, 1, 8));
        celEncCuentaR.getCellStyle().setAlignment(XSSFCellStyle.ALIGN_CENTER);
        celEncCuentaR.setCellStyle(csEncTitulo);
        celEncCuentaR.setCellValue(new XSSFRichTextString("CUENTAS COMPLEMENTARIAS"));
        row++;
        for (int r = 0; r < objDisponibilidades.getRecDisp().size(); r++) {
            if (r == 0) {


                rowEncDetLinea = x.createRow(row);
                celEnc1Linea = rowEncDetLinea.createCell(1);

                rowEncDetLinea = x.createRow(row);
                String[] titulosComp = {"Línea", "Cuenta", "DENOMINACIÓN", "DÉBITO", "CRÉDITO"};

                int[] posDetComp = {1, 2, 3, 7, 8};
                for (int c = 0; c < titulosComp.length; c++) {
                    celEnc1Linea = rowEncDetLinea.createCell(posDetComp[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                    celEnc1Linea.setCellStyle(csEncDerDispCBBB);
                    celEnc1Linea.getCellStyle().setWrapText(true);
                    celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                    if (c == 3) {
                        x.addMergedRegion(new CellRangeAddress(row, row, 3, 6));
                    }
                    celEnc1Linea.setCellValue(new XSSFRichTextString(titulosComp[c]));
                }
                row++;
            }

        }

        for (int b = 0; b < objDisponibilidades.getCtaComp().size(); b++) {

            String[] detalle = {objDisponibilidades.getCtaComp().get(b).getLinea(),
                    objDisponibilidades.getCtaComp().get(b).getCodCta(),
                    objDisponibilidades.getCtaComp().get(b).getCuenta(),
                    String.valueOf(objDisponibilidades.getCtaComp().get(b).getDebe()),
                    String.valueOf(objDisponibilidades.getCtaComp().get(b).getHaber())};

            XSSFRow rowDet = x.createRow(row);
            int[] posDetComp = {1, 2, 3, 7, 8};
            for (int c = 0; c < detalle.length; c++) {
                XSSFCell celDet = rowDet.createCell(posDetComp[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
                celDet.getCellStyle().setWrapText(true);
                celDet.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
                if (c == 3) {
                    x.addMergedRegion(new CellRangeAddress(row, row, 3, 6));
                }
                celDet.setCellStyle(csEncDerDispCB);
                celDet.setCellValue(new XSSFRichTextString(detalle[c]));
            }
            row++;
        }

        rowEncDetLinea = x.createRow(row);
        celEnc1Linea = rowEncDetLinea.createCell(1);

        rowEncDetLinea = x.createRow(row);
        String[] titulosComp = {"", "", "TOTALES DEUDORES Y ACREEDORES", String.valueOf(objDisponibilidades.getCtaComDebe()), String.valueOf(objDisponibilidades.getCtaComHaber())};

        int[] posDetComp = {1, 2, 3, 7, 8};
        for (int c = 0; c < titulosComp.length; c++) {
            celEnc1Linea = rowEncDetLinea.createCell(posDetComp[c]); //HSSFCell celEnc2 = rowDet.createCell(1);
            celEnc1Linea.setCellStyle(csEncDerDispCBBB);
            celEnc1Linea.getCellStyle().setWrapText(true);
            celEnc1Linea.getCellStyle().setVerticalAlignment(CellStyle.VERTICAL_TOP);
            if (c == 3) {
                x.addMergedRegion(new CellRangeAddress(row, row, 3, 6));

            }
            celEnc1Linea.setCellValue(new XSSFRichTextString(titulosComp[c]));

        }
        row++;

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        wb2.write(baos);
        baos.close();
        byte[] bArray = baos.toByteArray();
        InputStream is = new ByteArrayInputStream(bArray);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + objDisponibilidades.getNombreEntidad() + "_Reporte de Cuadratura Disponibilidades" + objDisponibilidades.getPeriodoNombre() + objDisponibilidades.getEjercicioNombre() + ".xlsx")
                .header(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .header(HttpHeaders.SET_COOKIE, "fileDownload=true; path=/")
                .body(new InputStreamResource(is));
    }

    @RequestMapping(value = "/descargaDoc", method = RequestMethod.GET)
    public ResponseEntity geFile(@RequestParam Integer idArchivo,
                                 HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        session = request.getSession(false);
        u = (UsuarioDTO) session.getAttribute("usr");


        InformeArchivoDet informeArchivo;
        InputStream inputStream = null;
        String datos = "";
        String nombreArchivo = "";
        informeArchivo = informesService.getArchivo(idArchivo);

        nombreArchivo=informeArchivo.getListaDetalle().get(0).getNombre();
        String cad = "";
        int i = 0;

        try {
            for(i=0; i<informeArchivo.getListaDetalle().size(); i++) {
                if (i == informeArchivo.getListaDetalle().size()-1) {
                    cad = cad + informeArchivo.getListaDetalle().get(i).getLinea();
                } else if(i != informeArchivo.getListaDetalle().size()-1) {
                    cad = cad + informeArchivo.getListaDetalle().get(i).getLinea() + "\r\n";
                }
            }
        }catch (Exception ex){
            ex.fillInStackTrace();
        }
        inputStream=new ByteArrayInputStream(cad.getBytes("UTF-8"));


        response.setContentType("text/plain");
        response.setHeader("Content-Disposition", "attachment;filename=\"" + nombreArchivo);


        OutputStream out = response.getOutputStream();

        byte[] buffer = new byte[4096];

        int numBytesRead;
        while ((numBytesRead = inputStream.read(buffer)) > 0) {
            out.write(buffer, 0, numBytesRead);
        }

        out.flush();


        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/certificadoEnvio", method = RequestMethod.GET)
    public String getCertificado(ModelMap model, @RequestParam Integer certificado) {

        String nroCertificado ="";
        String nombreEntidad ="";
        String usuario ="";
        String fecha ="";
        String hora ="";
        String ejercicioCod ="";
        List<Informes>  salidaEnvioCgr = null;
        String qr ="";
        CertificadoEnvioDTO cert = new CertificadoEnvioDTO();

        try {
            cert = informesService.getCertificadoEnvioByCert(certificado);
            nroCertificado=cert.getCertificado();
            nombreEntidad=cert.getEntidad();
            usuario=cert.getUsuario();
            fecha=cert.getFecha().split(" ")[0];
            hora=cert.getFecha().split(" ")[1];
            ejercicioCod=cert.getEjercicio();
            salidaEnvioCgr=cert.getDetInf();
            qr=cert.getUsuario() + " " + cert.getEntidad() + " " + fecha + " " + hora + " " + certificado;
        } catch (Exception e) {
            e.printStackTrace();
        }


        model.addAttribute("salidaEnvioCgr", salidaEnvioCgr);
        model.addAttribute("qr", qr);
        model.addAttribute("usuario", usuario);
        model.addAttribute("nombreEntidad", nombreEntidad);
        model.addAttribute("ejercicioCod", ejercicioCod);
        model.addAttribute("nroCertificado", nroCertificado);
        model.addAttribute("fecha", fecha);
        model.addAttribute("hora", hora);
        return "reporteEnvio2";

    }

    @PostMapping(value = "/getBitacoras", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReportesBitacoraDTO> bitacoras(@RequestParam Integer idFileUpload,
                                                         HttpServletRequest request,
                                                         ModelMap model) {

        List<ReportesBitacoraDTO> listaReporteBitacora;
        listaReporteBitacora = informesService.listaReporteBitacora(idFileUpload);

        return new ResponseEntity(listaReporteBitacora, HttpStatus.OK);
    }

    @RequestMapping(value = "/getResumenErrores", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ReporteErroresDTO> errores(@RequestParam Integer idFileUpload,
                                                     HttpServletRequest request,
                                                     ModelMap model) throws Exception {

        List<ReporteErroresDTO> listaReporteErrores = new ArrayList<ReporteErroresDTO>();

        String xmlErr = "";

        xmlErr = informesService.obtieneXMLErroresIC(idFileUpload);

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = null;
        org.w3c.dom.Document doc = null;

        db = dbf.newDocumentBuilder();
        InputSource is = new InputSource();
        is.setCharacterStream(new StringReader(xmlErr));

        try {
            doc = db.parse(is);
            doc.getDocumentElement().normalize();
            NodeList nList = doc.getElementsByTagName("error");

            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                    org.w3c.dom.Element eElement = (org.w3c.dom.Element) nNode;

                    ReporteErroresDTO rep = new ReporteErroresDTO();
                    rep.setTipoError(eElement.getElementsByTagName("tipoError").item(0).getTextContent());
                    rep.setMensajeError(eElement.getElementsByTagName("mensajeError").item(0).getTextContent());
                    listaReporteErrores.add(rep);
                }
            }

        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(listaReporteErrores, HttpStatus.OK);
    }

    public long getTotalRecuDispoCtaDebe() {
        return totalRecuDispoCtaDebe;
    }

    public void setTotalRecuDispoCtaDebe(long totalRecuDispoCtaDebe) {
        this.totalRecuDispoCtaDebe = totalRecuDispoCtaDebe;
    }

    public long getTotalRecuDispoCtaHaber() {
        return totalRecuDispoCtaHaber;
    }

    public void setTotalRecuDispoCtaHaber(long totalRecuDispoCtaHaber) {
        this.totalRecuDispoCtaHaber = totalRecuDispoCtaHaber;
    }

    public long getTotalCtaCobrarDebe() {
        return totalCtaCobrarDebe;
    }

    public void setTotalCtaCobrarDebe(long totalCtaCobrarDebe) {
        this.totalCtaCobrarDebe = totalCtaCobrarDebe;
    }

    public long getTotalCtaCobrarHaber() {
        return totalCtaCobrarHaber;
    }

    public void setTotalCtaCobrarHaber(long totalCtaCobrarHaber) {
        this.totalCtaCobrarHaber = totalCtaCobrarHaber;
    }

    public long getTotalCtaPagarDebe() {
        return totalCtaPagarDebe;
    }

    public void setTotalCtaPagarDebe(long totalCtaPagarDebe) {
        this.totalCtaPagarDebe = totalCtaPagarDebe;
    }

    public long getTotalCtaPagarHaber() {
        return totalCtaPagarHaber;
    }

    public void setTotalCtaPagarHaber(long totalCtaPagarHaber) {
        this.totalCtaPagarHaber = totalCtaPagarHaber;
    }

    public long getTotalCtaCptoDebe() {
        return totalCtaCptoDebe;
    }

    public void setTotalCtaCptoDebe(long totalCtaCptoDebe) {
        this.totalCtaCptoDebe = totalCtaCptoDebe;
    }

    public long getTotalCtaCptoHaber() {
        return totalCtaCptoHaber;
    }

    public void setTotalCtaCptoHaber(long totalCtaCptoHaber) {
        this.totalCtaCptoHaber = totalCtaCptoHaber;
    }

    public long getTotalVarDisponibilidades() {
        return totalVarDisponibilidades;
    }

    public void setTotalVarDisponibilidades(long totalVarDisponibilidades) {
        this.totalVarDisponibilidades = totalVarDisponibilidades;
    }

    public long getTotalVarDispoComprobacion() {
        return totalVarDispoComprobacion;
    }

    public void setTotalVarDispoComprobacion(long totalVarDispoComprobacion) {
        this.totalVarDispoComprobacion = totalVarDispoComprobacion;
    }

    public String getNombreEntidad() {
        return nombreEntidad;
    }

    public void setNombreEntidad(String nombreEntidad) {
        this.nombreEntidad = nombreEntidad;
    }

    public String getPeriodoNombre() {
        return periodoNombre;
    }

    public void setPeriodoNombre(String periodoNombre) {
        this.periodoNombre = periodoNombre;
    }

    public String getEjercicioNombre() {
        return ejercicioNombre;
    }

    public void setEjercicioNombre(String ejercicioNombre) {
        this.ejercicioNombre = ejercicioNombre;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public List<Resumen> getListaRecursosDispo() {
        return listaRecursosDispo;
    }

    public void setListaRecursosDispo(List<Resumen> listaRecursosDispo) {
        this.listaRecursosDispo = listaRecursosDispo;
    }

    public List<Resumen> getListaCuentasCobrar() {
        return listaCuentasCobrar;
    }

    public void setListaCuentasCobrar(List<Resumen> listaCuentasCobrar) {
        this.listaCuentasCobrar = listaCuentasCobrar;
    }

    public List<Resumen> getListaCuentasPagar() {
        return listaCuentasPagar;
    }

    public void setListaCuentasPagar(List<Resumen> listaCuentasPagar) {
        this.listaCuentasPagar = listaCuentasPagar;
    }

    public List<Resumen> getListaCuentasCmpto() {
        return listaCuentasCmpto;
    }

    public void setListaCuentasCmpto(List<Resumen> listaCuentasCmpto) {
        this.listaCuentasCmpto = listaCuentasCmpto;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
}
