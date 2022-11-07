package cl.contraloria.sicogen.service;

import cl.contraloria.sicogen.constants.ReporteValidacionConstants;
import cl.contraloria.sicogen.dao.EjecucionEnvioDAO;
import cl.contraloria.sicogen.dao.EstadoInformesDAO;
import cl.contraloria.sicogen.dao.FiltrosDAO;
import cl.contraloria.sicogen.dao.InformesDAO;
import cl.contraloria.sicogen.model.*;
import cl.contraloria.sicogen.utils.EstadoInformeAnualDTO;
import cl.contraloria.sicogen.utils.InformesEstadosAnualBO;
import cl.contraloria.sicogen.ws.valida.envio.*;
import cl.contraloria.sicogen.ws.valida.envio.ejecucion.EjecutarEnvio;
import cl.contraloria.sicogen.ws.valida.envio.ejecucion.EjecutarEnvioClient;
import cl.contraloria.sicogen.ws.valida.envio.ejecucion.EjecutarEnvioResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

import static cl.contraloria.sicogen.constants.AppConstants.*;
import static cl.contraloria.sicogen.utils.Utils.validaXMLSchema;

@Service
public class InformesService {

    private InformesDAO informesDAO;
    private EstadoInformesDAO estadoInformesDAO;
    private EjecucionEnvioDAO ejecucionEnvioDAO;
    private ValidarEnvioClient validarEnvioClient;
    private EjecutarEnvioClient ejecutarEnvioClient;
    private FiltrosDAO filtrosDAO;

    public InformesService(InformesDAO informesDAO,
                           EstadoInformesDAO estadoInformesDAO,
                           EjecucionEnvioDAO ejecucionEnvioDAO,
                           ValidarEnvioClient validarEnvioClient,
                           EjecutarEnvioClient ejecutarEnvioClient,
                           FiltrosDAO filtrosDAO) {
        this.informesDAO = informesDAO;
        this.estadoInformesDAO = estadoInformesDAO;
        this.ejecucionEnvioDAO = ejecucionEnvioDAO;
        this.validarEnvioClient = validarEnvioClient;
        this.ejecutarEnvioClient = ejecutarEnvioClient;
        this.filtrosDAO = filtrosDAO;
    }

    public List<EjerciciosDTO> getEjercicios() throws SQLException {

        List<EjerciciosDTO> resultado = new ArrayList();
        resultado = informesDAO.getEjercicios();

        return resultado;
    }

    public List<TipoInformeDTO> gettipoInformes() throws SQLException {

        List<TipoInformeDTO> resultado = new ArrayList();
        resultado = informesDAO.gettipoInformes();

        return resultado;
    }

    public InformesEstadosAnualBO getEstadoInformeAnual(Integer idEntidad, Integer idEjercicio, Integer idTipoInforme) throws SQLException {

        InformesEstadosAnualBO resultado= new InformesEstadosAnualBO();
        resultado = estadoInformesDAO.getEstadoInformeAnual(idEntidad,idEjercicio,idTipoInforme);
        //List resultado = usuarioDAO.getUsuario(usuario, loggin);
        return resultado;
    }

    public List<Informes> getInformesForSend(Integer idEntidad, Integer idEjercicio, Integer idTipoInforme){

        List<Informes> resultado = new ArrayList();
        resultado = informesDAO.getInformesForSend(idEntidad,idEjercicio,idTipoInforme);

        return resultado;
    }

    public Vector<EstadoInformeAnualDTO> getEstadoInformesAnual2(Integer entidad, Integer ejercicio, Integer tipoInforme ){

        Vector<EstadoInformeAnualDTO> _listaEstadoInformesAnual = null;
        _listaEstadoInformesAnual = informesDAO.getEstadoInformeAnual2(entidad,ejercicio,tipoInforme);

        return _listaEstadoInformesAnual;
    }

    public List<Informes> getCorreccionesSeguimiento(int idEntidad, int idEjercicio, int idTipoInforme)throws Exception{

        List<Informes> correcciones = new ArrayList<Informes>();
        correcciones = informesDAO.getCorreccionesSeguimiento(idEntidad, idEjercicio, idTipoInforme);

        return correcciones;
    }

    public List<Periodos> getPeriodosByEjercicio(Integer idEjercicio) {

        List<Periodos> resultado;
        resultado = informesDAO.getPeriodosByEjercicio(idEjercicio);

        return resultado;
    }

    public List<CorreccionPendienteBO> getCorreccionesPendientes(String idPart, String idCap) throws Exception {

        List<CorreccionPendienteBO> resultado = new ArrayList();
        resultado = informesDAO.getCorreccionesPendientes(idPart,idCap);

        return resultado;
    }

    public List<Informes> getInformesForUpload(Integer tipoInforme, Integer entidad, Integer periodo)throws Exception{

        List<Informes> resultado = null;
        resultado = informesDAO.getInformesForUpload(tipoInforme, entidad, periodo);

        return resultado;
    }

    public String obtieneXMLInformeIC(Integer idFileUp) throws SQLException {

        String xml = "";

        xml = informesDAO.obtieneXMLInformeIC(idFileUp);

        return xml;
    }

    public String obtieneXMLErroresIC(int idFileUp) throws SQLException {

        String xml = "";

        xml = informesDAO.obtieneXMLErroresIC(idFileUp);

        return xml;
    }

    public cl.contraloria.sicogen.model.InformacionGeneralRV obtieneInfoGeneralRV(Integer idFileUp) {

        List<InformacionGeneralRV> listaInfo = informesDAO.obtieneInfoGeneralRV(idFileUp);

        return listaInfo.get(0);
    }

    public String obtieneXMLInformePI(Integer idFileUp) throws SQLException {

        String xml = "";
        xml = informesDAO.obtieneXMLInformePI(idFileUp);

        return xml;
    }

    public String obtieneXMLErroresPI(Integer idFileUp) throws SQLException {

        String xml = "";
        xml = informesDAO.obtieneXMLErroresPI(idFileUp);

        return xml;
    }

    public ReporteValidacionPaginacion obtieneReporteValidacionPaginacion(Integer idArchivo,
                                                                          Integer numPagina,
                                                                          Integer numRegistros,
                                                                          Integer draw,
                                                                          String flagAll) {

        Map<String, Object> resultado = informesDAO.obtieneReporteValidacionPaginacion(idArchivo, numPagina, numRegistros, flagAll);
        List<ReporteValidacionData> reporteValidacionDataList = new ArrayList<ReporteValidacionData>();
        List<ReporteValidacionDTO> reporteValidacionDTOList = (List<ReporteValidacionDTO>) resultado.get(ReporteValidacionConstants.LISTA_DETALLES_KEY);
        ReporteValidacionPaginacion reporteValidacionPaginacion = new ReporteValidacionPaginacion();
        reporteValidacionPaginacion.setDraw(draw);
        reporteValidacionPaginacion.setRecordsTotal((Integer) resultado.get(ReporteValidacionConstants.NUM_TOTAL_REGISTROS_KEY));
        reporteValidacionPaginacion.setRecordsFiltered((Integer) resultado.get(ReporteValidacionConstants.NUM_TOTAL_REGISTROS_KEY));

        for (ReporteValidacionDTO reporteValidacionDTO : reporteValidacionDTOList) {
            ReporteValidacionData data = new ReporteValidacionData();
            data.setAreaTransaccional(reporteValidacionDTO.getCodigoAreaTransaccional());
            data.setCodigoBIP(reporteValidacionDTO.getCodigoBIP().concat("-").concat(reporteValidacionDTO.getDigitoV()));
            data.setCuentaContable(reporteValidacionDTO
                    .getCCAgrupacion()
                    .concat(".")
                    .concat(reporteValidacionDTO.getCCCtaN1())
                    .concat(".")
                    .concat(reporteValidacionDTO.getCCCtaN2())
                    .concat(".")
                    .concat(reporteValidacionDTO.getCCCtaN3()));
            data.setCuentaPresupuestaria(reporteValidacionDTO
                    .getCPSubtitulo()
                    .concat(".")
                    .concat(reporteValidacionDTO.getCPItem())
                    .concat(".")
                    .concat(reporteValidacionDTO.getCPAsignacion())
                    .concat(".")
                    .concat(reporteValidacionDTO.getCPSubasignacion()));
            data.setDebeCLP(String.format(Locale.GERMAN,"%,d", Long.valueOf(reporteValidacionDTO.getDebeCLP())));
            data.setDebeUSD(reporteValidacionDTO.getDebeUSD());
            data.setDenominacionCuenta(reporteValidacionDTO.getDenominacionCuenta());
            data.setDenominacionProyecto(reporteValidacionDTO.getDenominacionProyecto());
            data.setFolioContable(String.valueOf(reporteValidacionDTO.getFolioContable()));
            data.setHaberCLP(String.format(Locale.GERMAN,"%,d", Long.valueOf(reporteValidacionDTO.getHaberCLP())));
            data.setHaberUSD(reporteValidacionDTO.getHaberUSD());
            data.setMoneda(reporteValidacionDTO.getTipoMoneda());
            data.setMovimiento(reporteValidacionDTO.getTipoMovimiento());
            data.setPrograma(reporteValidacionDTO.getCodigoPrograma());
            data.setTipoTransaccion(reporteValidacionDTO.getTipoTransaccion());
            reporteValidacionDataList.add(data);
            data.setEstadpRegla2(!reporteValidacionDTO.getTipoErrorRegla2().equals("3") ? reporteValidacionDTO.getEstadoRegla2() : 0);
            data.setEstadpRegla3(!reporteValidacionDTO.getTipoErrorRegla3().equals("3") ? reporteValidacionDTO.getEstadoRegla3() : 0);
            data.setMensajeRegla2(reporteValidacionDTO.getMensajeRegla2());
            data.setMensajeRegla3(reporteValidacionDTO.getMensajeRegla3());
            data.setTipoErrorRegla2(reporteValidacionDTO.getTipoErrorRegla2());
            data.setTipoErrorRegla3(reporteValidacionDTO.getTipoErrorRegla3());
        }

        reporteValidacionPaginacion.setData(reporteValidacionDataList);
        return reporteValidacionPaginacion;
    }

    public InformeContableDTO obtieneDatosInformeContable(Integer idArchivo) {
        InformeContableDTO informeContableDTO = informesDAO.obtieneDatosInformeContable(idArchivo);
        List<ErrorGenerico> errores = new ArrayList<ErrorGenerico>();

        for (ErrorGenerico error : informeContableDTO.getErroresGenericos()) {
            if (!error.getTipoError().equals(3)) {
                errores.add(error);
            }
        }

        informeContableDTO.setErroresGenericos(errores);

        return informeContableDTO;
    }

    public Informes cargaInformeContable(MultipartFile file,
                                       Integer idInforme,
                                       String codPeriodo,
                                       String codEjercicio,
                                       String codPartida,
                                       String codCapitulo,
                                       String usuario) throws Exception {

        Informes informeCargado = new Informes();
        String nombreArchivoIC = generaNombreIC(codPartida, codCapitulo, codPeriodo, codEjercicio);
        Integer idArchivo = informesDAO.guardaInformeContable(codPeriodo, codEjercicio, codPartida, codCapitulo,
                nombreArchivoIC, usuario, 0);
        byte[] fileInBytes = file.getBytes();
        informesDAO.updateDocumentoXMLIC(idArchivo, new String(fileInBytes, "UTF-8"));
        InputStream isFile = new ByteArrayInputStream(fileInBytes);
        ClassLoader classLoader = getClass().getClassLoader();
        String mensajeValidacionSchema = validaXMLSchema(
                classLoader.getResource("xsd/InformeContable_v1.xsd"), isFile);
        List<String> erroresInicales = new ArrayList<String>();

        if (mensajeValidacionSchema == null) {
            isFile.reset();
            DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = builderFactory.newDocumentBuilder();
            Document xmlDocument = builder.parse(isFile);
            XPath xPath = XPathFactory.newInstance().newXPath();

            /* Numero registros */
            Number cantidadregistros = (Number) xPath.compile("count(/InformeContable/listaDetalle/detalle)")
                    .evaluate(xmlDocument, XPathConstants.NUMBER);

            informesDAO.actualizaNumeroRegistrosInforme(idArchivo, cantidadregistros.intValue());

            /* Partida */
            Node node = (Node) xPath.compile("/InformeContable/cabecera/partida").evaluate(xmlDocument, XPathConstants.NODE);
            String codPartidaXML = node.getTextContent();

            /* Capitulo */
            node = (Node) xPath.compile("/InformeContable/cabecera/capitulo").evaluate(xmlDocument, XPathConstants.NODE);
            String codCapituloXML = node.getTextContent();

            /* Ejercicio */
            node = (Node) xPath.compile("/InformeContable/cabecera/ejercicio").evaluate(xmlDocument, XPathConstants.NODE);
            String codEjercicioXML = node.getTextContent();

            /* Periodo */
            node = (Node) xPath.compile("/InformeContable/cabecera/periodo").evaluate(xmlDocument, XPathConstants.NODE);
            String codPeriodoXML = node.getTextContent();

            if (!codPartidaXML.equals(codPartida)) {
                erroresInicales.add("La partida [" + codPartida  + "] del usuario " + usuario + " no es igual al del archivo cargado: [" + codPartidaXML +"]");
            }
            if (!codCapituloXML.equals(codCapitulo)) {
                erroresInicales.add("El capítulo [" + codCapitulo  + "] del usuario " + usuario + " no es igual al del archivo cargado: [" + codCapituloXML +"]");
            }
            if (!codEjercicioXML.equals(codEjercicio)) {
                erroresInicales.add("El ejercicio seleccionado [" + codEjercicio  + "] no es igual al del archivo cargado: [" + codEjercicioXML +"]");
            }
            if (!codPeriodoXML.equals(codPeriodo)) {
                erroresInicales.add("El periodo seleccionado [" + codPeriodo  + "] no es igual al del archivo cargado: [" + codPeriodoXML +"]");
            }

            if (!erroresInicales.isEmpty()) {
                informesDAO.actualizaEstadoValidacionIC(idArchivo, NOMBRE_ESTADO_INFORME_CON_ERRORES);
                informesDAO.insertaListaErrores(idArchivo, generaListaErroresIncial(erroresInicales), usuario);
                informeCargado.setInformeEstadoId(ID_ESTADO_INFORME_CON_ERROR);
            }

        } else {
            erroresInicales.add("El archivo XML no cumple con la estructura esperada: ".concat(mensajeValidacionSchema));
            informesDAO.actualizaEstadoValidacionIC(idArchivo, NOMBRE_ESTADO_INFORME_CON_ERRORES);
            informesDAO.insertaListaErrores(idArchivo, generaListaErroresIncial(erroresInicales), usuario);
            informeCargado.setInformeEstadoId(ID_ESTADO_INFORME_CON_ERROR);
        }

        informeCargado.setIdFileUpload(String.valueOf(idArchivo));

        if (informeCargado.getInformeEstadoId() == null) {
            informeCargado.setInformeEstadoId(ID_ESTADO_INFORME_CARGADO);
        }

        return informeCargado;
    }

    private String generaNombreIC(String codPartida, String codCapitulo, String codPeriodo, String codEjercicio) {
        String codigoInforme = informesDAO.obtieneCodigoInforme(ID_INFORME_CONTABLE);
        return codigoInforme.concat(codPartida).concat(codCapitulo).concat(codPeriodo).concat(codEjercicio).concat(".xml");
    }

    public String generaListaErroresIncial(List<String> mensajes) throws ParserConfigurationException, TransformerException {
        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
        Document doc = docBuilder.newDocument();

        Element rootElement = doc.createElement("listaErrores");

        for (String mensaje : mensajes) {
            Element error = doc.createElement("error");
            Element identificaSalida = doc.createElement("IdentificaSalida");
            Element idRegla = doc.createElement("idRegla");
            Element tipoError = doc.createElement("tipoError");
            Element mensajeError = doc.createElement("mensajeError");
            Element seccion = doc.createElement("seccion");
            identificaSalida.appendChild(doc.createTextNode("-1"));
            idRegla.appendChild(doc.createTextNode("0"));
            tipoError.appendChild(doc.createTextNode("1"));
            seccion.appendChild(doc.createTextNode("3"));
            mensajeError.appendChild(doc.createTextNode(mensaje));
            error.appendChild(identificaSalida);
            error.appendChild(idRegla);
            error.appendChild(tipoError);
            error.appendChild(mensajeError);
            error.appendChild(seccion);
            rootElement.appendChild(error);
        }

        doc.appendChild(rootElement);

        StringWriter sw = new StringWriter();
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = tf.newTransformer();
        transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
        transformer.setOutputProperty(OutputKeys.METHOD, "xml");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");

        transformer.transform(new DOMSource(doc), new StreamResult(sw));
        return sw.toString();
    }

    public Integer obtieneIdEstadoInforme(Integer idArchivo) {
        return informesDAO.obtieneIdEstadoInforme(idArchivo);
    }

    public List<TiposDeInformesDTO> listaInformes() {
        return informesDAO.listaInformes();
    }

    public List<ReportesDTO> listaReportes(Integer informe) {
        return informesDAO.listaReportes(informe);
    }

    public List<Periodos> getPeriodosByInforme(Integer ejercicio, Integer informe) {
        return informesDAO.getPeriodosByInforme(ejercicio, informe);
    }

    public Disponibilidades getReporteCuadraturaDisponibilidades(long idFileUpload) throws SQLException {
        return informesDAO.getReporteCuaDisponibilidades(idFileUpload);
    }

    public InformeArchivoDet getArchivo(int idFileUp) throws Exception {
        return informesDAO.getArchivo(idFileUp);
    }

    public CertificadoEnvioDTO getCertificadoEnvioByCert(Integer certificado) throws Exception {
        return informesDAO.getCertificadoEnvioByCert(certificado);
    }

    public List<ReportesBitacoraDTO> listaReporteBitacora(Integer idFile) {
        return informesDAO.listaReporteBitacora(idFile);
    }

    public List<Informes> getInformesSiEnviar(int informeTipo, int entidadId, int informePeriodo) {
        return ejecucionEnvioDAO.getInformesSiEnviar(informeTipo, entidadId, informePeriodo);
    }

    public List<Informes> getInformesNoEnviar(int informeTipo, int entidadId, int informePeriodo) {
        return ejecucionEnvioDAO.getInformesNoEnviar(informeTipo, entidadId, informePeriodo);
    }

    public List<Informes> getInformesPreEnvio(String parameter) {
        String[] informs = parameter.split("\\],\\[");
        List<Informe> listInfs = new ArrayList<Informe>();
        List<Informes> lstinf = new ArrayList<Informes>();

        for (int i = 0; i < informs.length; i++) {

            String[] campos=informs[i].replace("[[","").replace("]]","").split("\",\"");

            Informe inf=new Informe();
            Informes infs=new Informes();

            infs.setIdInforme(campos[0].replace("\"", ""));            //0
            infs.setInformeCodigo(campos[3].replace("\"", ""));        //3
            infs.setInformeNombre(campos[1].replace("\"", ""));        //1
            infs.setInformeEstado(campos[2].replace("\"", ""));        //2
            infs.setInformePeriodoCod(campos[4].replace("\"", ""));    //4
            infs.setInformeEjercicio(campos[6].replace("\"", ""));
            infs.setTipoInformeNombre(campos[7].replace("\"", ""));    //7
            infs.setInformeEjercicioCod(campos[8].replace("\"", ""));

            lstinf.add(infs);

            inf.setIdInforme(campos[0].replace("\"", ""));
            inf.setCodigoInforme(campos[3].replace("\"", ""));
            inf.setNombreInforme(campos[1].replace("\"", ""));
            inf.setEstadoInforme(campos[2].replace("\"", ""));
            inf.setPeriodo(campos[8].replace("\"", ""));
            listInfs.add(inf);
        }

        ValidarEnvio reqValEnv =  new ValidarEnvio();
        ListaInformes listaInformes = new ListaInformes();
        listaInformes.setInforme(listInfs);
        reqValEnv.setListaInformes(listaInformes);

        ValidarEnvioResponse resValEnv = validarEnvioClient.validarEnvioInformes(reqValEnv);

        if (resValEnv.getEstado().equals("0")) {
            return lstinf;
        } else {
            return new ArrayList<Informes>();
        }
    }

    public DatosEjecucionEnvio getCertificadoFinal(String parameter,
                                                   int tpInforme,
                                                   int entidadId,
                                                   String usuario,
                                                   String nombreEntidad) {
        String[] informs = parameter.split("\\],\\[");
        List<cl.contraloria.sicogen.ws.valida.envio.ejecucion.Informe> listInfos = new ArrayList<cl.contraloria.sicogen.ws.valida.envio.ejecucion.Informe>();
        List<Informes> lstinfo = new ArrayList<Informes>();

        for (int i=0; i<informs.length; i++) {

            String[] campos=informs[i].replace("[[","").replace("]]","").split("\",\"");

            cl.contraloria.sicogen.ws.valida.envio.ejecucion.Informe info = new cl.contraloria.sicogen.ws.valida.envio.ejecucion.Informe();
            Informes infos=new Informes();

            infos.setIdInforme(campos[0].replace("\"", ""));            //0
            infos.setInformeCodigo(campos[3].replace("\"", ""));        //3
            infos.setInformeNombre(campos[1].replace("\"", ""));        //1
            infos.setInformeEstado(campos[2].replace("\"", ""));        //2
            infos.setInformePeriodo(campos[4].replace("\"", ""));       //4
            infos.setInformeEjercicio(campos[6].replace("\"", ""));
            infos.setTipoInformeNombre(campos[7].replace("\"", ""));    //7
            lstinfo.add(infos);

            info.setIdInforme(campos[0].replace("\"", ""));
            info.setCodigoInforme(getCodigoID(campos[3].replace("\"", "")));
            info.setNombreInforme(campos[1].replace("\"", ""));
            info.setEstadoInforme(getEstadoInformeID(campos[2].replace("\"", "")));
            info.setPeriodo(new BigDecimal(campos[8].replace("\"", "")));
            listInfos.add(info);
        }

        BigDecimal tpInformeBG = new BigDecimal(tpInforme);
        BigDecimal entidadBG = new BigDecimal(entidadId);
        cl.contraloria.sicogen.ws.valida.envio.ejecucion.ListaInformes listaInformes = new cl.contraloria.sicogen.ws.valida.envio.ejecucion.ListaInformes();
        listaInformes.setInforme(listInfos);

        EjecutarEnvio reqEjecEnv = new EjecutarEnvio();
        reqEjecEnv.setIdEntidad(entidadBG);
        reqEjecEnv.setListaInformes(listaInformes);
        reqEjecEnv.setTipoArchivo(tpInformeBG);
        reqEjecEnv.setUsuario(usuario);

        EjecutarEnvioResponse resEjecEnv = ejecutarEnvioClient.ejecutarEnvioInformesIC(reqEjecEnv);

        DatosEjecucionEnvio datosEjecucionEnvio = new DatosEjecucionEnvio();

        if (resEjecEnv.getEstado().intValue() == 0) {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy  HH:mm");
            Calendar calendar = new GregorianCalendar();
            String fecha = sdf.format(calendar.getTime());
            String nroCertificado = resEjecEnv.getIdCertificado().toString();

            datosEjecucionEnvio.setFechaEnvio(fecha);
            datosEjecucionEnvio.setInformesEnviados(lstinfo);
            datosEjecucionEnvio.setNroCertificado(nroCertificado);
            datosEjecucionEnvio.setRq(usuario + " " + nombreEntidad + " " + fecha + " " + nroCertificado);
        }

        return datosEjecucionEnvio;
    }

    private String getCodigoID(String codigo){
        String codigoID = "";
        if(codigo.equalsIgnoreCase("LEYPI")){
            codigoID = "1";
        }else if(codigo.equalsIgnoreCase("TDRII")){
            codigoID = "2";
        }else if(codigo.equalsIgnoreCase("FINIC")){
            codigoID = "3";
        }else if(codigo.equalsIgnoreCase("EFSBG")){
            codigoID = "5";
        }else if(codigo.equalsIgnoreCase("EFSER")){
            codigoID = "6";
        }else if(codigo.equalsIgnoreCase("EFSSP")){
            codigoID = "7";
        }else if(codigo.equalsIgnoreCase("EFSFE")){
            codigoID = "8";
        }else if(codigo.equalsIgnoreCase("EFSPN")){
            codigoID = "9";
        }else if(codigo.equalsIgnoreCase("EFSNE")){
            codigoID = "10";
        }else if(codigo.equalsIgnoreCase("TDRMP")){
            codigoID = "11";
        }else if(codigo.equalsIgnoreCase("TDRPI")){
            codigoID = "12";
        }
        return codigoID;
    }

    private String getEstadoInformeID(String estadoInf){
        String numeroEstadoId = "" ;

        if(estadoInf.equalsIgnoreCase("CARGADO")){
            numeroEstadoId = "1";
        }else if(estadoInf.equalsIgnoreCase("CARGADO CON OBSERVACION")){
            numeroEstadoId = "2";
        }else if(estadoInf.equalsIgnoreCase("CON ERRORES")){
            numeroEstadoId = "3";
        }else if(estadoInf.equalsIgnoreCase("VALIDADO")){
            numeroEstadoId = "4";
        }else if(estadoInf.equalsIgnoreCase("VALIDADO CON OBSERVACION")){
            numeroEstadoId = "5";
        }else if(estadoInf.equalsIgnoreCase("PROCESADO")){
            numeroEstadoId = "6";
        }else if(estadoInf.equalsIgnoreCase("PROCESADO CON OBSERVACION")){
            numeroEstadoId = "7";
        }else if(estadoInf.equalsIgnoreCase("SIN MOVIMIENTO")){
            numeroEstadoId = "8";
        }else if(estadoInf.equalsIgnoreCase("ANULADO")){
            numeroEstadoId = "9";
        }else if(estadoInf.equalsIgnoreCase("PROCESADO SIN MOV")){
            numeroEstadoId = "10";
        }
        return numeroEstadoId;
    }

    public List<TiposDeInformes> getTiposDeInformes() {
        return filtrosDAO.getTiposDeInformes();
    }
}
