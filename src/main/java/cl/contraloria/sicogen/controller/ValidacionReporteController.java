package cl.contraloria.sicogen.controller;


import cl.contraloria.sicogen.model.Informes;
import cl.contraloria.sicogen.model.ReporteValidacionPaginacion;
import cl.contraloria.sicogen.model.UsuarioDTO;
import cl.contraloria.sicogen.service.ExcelService;
import cl.contraloria.sicogen.service.InformesPersistencia;
import cl.contraloria.sicogen.service.InformesService;
import cl.contraloria.sicogen.utils.Convertidor;
import cl.contraloria.sicogen.model.InformacionGeneralRV;
import cl.contraloria.sicogen.utils.InformesPendientes;
import cl.contraloria.sicogen.utils.Utils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.Map;

@Controller
@RequestMapping("/validacion")
public class ValidacionReporteController {

    private InformesService informesService;
    private String htmlRV;
    private InformacionGeneralRV infoGeneral = null;
    private String usuario;
    private int entidad;
    private int estado;
    private String mensaje;
    private Convertidor convertidor;
    private ServletContext servletContext;
    private ExcelService excelService;

    public ValidacionReporteController(InformesService informesService,
                                       InformesPersistencia informe,
                                       Convertidor convertidor,
                                       ServletContext servletContext,
                                       ExcelService excelService) {
        this.informesService = informesService;
        //this.informe = informe;
        this.convertidor = convertidor;
        this.servletContext = servletContext;
        this.excelService = excelService;
    }

    @RequestMapping(value = "/datosPaginacion", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReporteValidacionPaginacion> obtieneDatosPaginacion(HttpServletRequest  request) {
        return new ResponseEntity<ReporteValidacionPaginacion>(informesService.obtieneReporteValidacionPaginacion(
                Integer.valueOf(request.getParameter("idArchivo")),
                Integer.valueOf(request.getParameter("start")),
                Integer.valueOf(request.getParameter("length")),
                Integer.valueOf(request.getParameter("draw")),
                "0"
        ), HttpStatus.OK);
    }

    @GetMapping(path = "/obtenerValidacionIC")
    public String obtenerValidacionIC(ModelMap model, @RequestParam Integer idFileUp) {
        InformacionGeneralRV infoGeneralRV = informesService.obtieneInfoGeneralRV(idFileUp);
        infoGeneralRV.setIdFileIp(idFileUp.toString());
        model.addAttribute("infoGeneralRV", infoGeneralRV);
        model.addAttribute("idArchivo", idFileUp);
        model.addAttribute("datosInforme", informesService.obtieneDatosInformeContable(idFileUp));
        return "ReporteValidacionIC";
    }

    @GetMapping(path = "/downExcelIC")
    public ResponseEntity descargaRvExcelIC(@RequestParam Integer idFileUp) {
        try {
            Map<String, InputStreamResource> result = excelService.generaExcelReporteValidacion(
                    servletContext.getResource("/resources/img/sicogenii_logo.png"),
                    idFileUp,
                    servletContext.getResource("/resources/img/Bloqueante1.png"),
                    servletContext.getResource("/resources/img/Bloqueante2.png"),
                    servletContext.getResource("/resources/img/Bloqueante3.png"));
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

    @RequestMapping (value = "/EnvioInforme", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public ResponseEntity getValidandose(HttpServletRequest request, @RequestParam Integer periodo){

       HttpSession session = null;
       InformesPendientes informesValidandose =new InformesPendientes();
       Utils util = new Utils();

        this.estado = 0;
        //int periodo = 0;
        session = request.getSession(false);
        UsuarioDTO u = (UsuarioDTO) session.getAttribute("usr");
        try{
            setEntidad(Integer.valueOf(u.getEntidadID()));
            setUsuario(u.getUserLogin());
        }
        catch(Exception ex){
            //logger.error(ex.getMessage());
            setEstado(-1);
            this.setMensaje("Error al recuperar el usuario cargado en sesion");
            //return SUCCESS;
        }

        //InformesDAO informesdao = new InformesDAO();
        //this.informesValidandose = informesdao.getInformesValidandose(this.entidad,periodo,ejercicio,tipoArchivo);
        if(informesValidandose.getInformesPendientes().size()>0){
            for(int i=0;i<informesValidandose.getInformesEstados().size();i++){
                Informes inf2=new Informes();
                inf2=util.getImagenEstado(Integer.parseInt(informesValidandose.getInformesEstados().get(i).getInformeEstadoId()),
                        informesValidandose.getInformesEstados().get(i).getInformeId()	);

                informesValidandose.getInformesEstados().get(i).setInformeMensaje(" ");
                informesValidandose.getInformesEstados().get(i).setImgCarga(inf2.getImgCarga());
                informesValidandose.getInformesEstados().get(i).setImgValid(inf2.getImgValid());
                informesValidandose.getInformesEstados().get(i).setImgRV(inf2.getImgRV());
                informesValidandose.getInformesEstados().get(i).setInformeAccion(inf2.getInformeAccion());
                informesValidandose.getInformesEstados().get(i).setInformeMensaje(inf2.getInformeMensaje());

                if(("2").equals(informesValidandose.getInformesEstados().get(i).getInfEstadoFlujo())){
                    this.setEstado(99);
                    setMensaje("Se estan validando informes actualmente");
                }
            }
            for(int i=0;i<informesValidandose.getInformesPendientes().size();i++){
                Informes inf2=new Informes();
                inf2=util.getImagenEstado(Integer.parseInt(informesValidandose.getInformesPendientes().get(i).getInformeEstadoId()),
                        informesValidandose.getInformesPendientes().get(i).getInformeId());

                informesValidandose.getInformesPendientes().get(i).setInformeMensaje(" ");
                informesValidandose.getInformesPendientes().get(i).setImgCarga(inf2.getImgCarga());
                informesValidandose.getInformesPendientes().get(i).setImgValid(inf2.getImgValid());
                informesValidandose.getInformesPendientes().get(i).setImgRV(inf2.getImgRV());
                informesValidandose.getInformesPendientes().get(i).setInformeAccion(inf2.getInformeAccion());
                informesValidandose.getInformesPendientes().get(i).setInformeMensaje(inf2.getInformeMensaje());

                if(("2").equals(informesValidandose.getInformesPendientes().get(i).getInfEstadoFlujo())){
                    this.setEstado(99);
                    setMensaje("Se estan validando informes actualmente");
                }
            }
        }
        if(this.getEstado() !=99){
            this.setMensaje("No hay Informes pendiente");
        }

        return new ResponseEntity(informesValidandose, HttpStatus.OK);
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public int getEntidad() {
        return entidad;
    }

    public void setEntidad(int entidad) {
        this.entidad = entidad;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
