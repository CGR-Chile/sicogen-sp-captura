package cl.contraloria.sicogen.controller;

import cl.contraloria.sicogen.exceptions.SicogenException;
import cl.contraloria.sicogen.model.*;
import cl.contraloria.sicogen.service.InformesService;
import cl.contraloria.sicogen.ws.valida.informe.ValidaInformeRequestType;
import cl.contraloria.sicogen.ws.valida.informe.ValidacionInformeClient;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import static cl.contraloria.sicogen.constants.AppConstants.ID_INFORME_CONTABLE;

@Controller
@RequestMapping("/informes")
public class InformeCorreccionesController extends HttpServlet {

    private InformesService informesService;
    private List<CorreccionPendienteBO> correccionesPendientes = new ArrayList<CorreccionPendienteBO>();
    private int hayComplemento;
    int idEjercicioSelected;
    private String mensaje;
    private int estado;
    private ValidacionInformeClient validacionInformeClient;
    private static final String SALIDA_ENVIO_CGR = "salidaEnvioCgr";

    public InformeCorreccionesController(InformesService informesService,
                                         ValidacionInformeClient validacionInformeClient) {
        this.informesService = informesService;
        this.validacionInformeClient = validacionInformeClient;
    }


    @RequestMapping(value = "/formularioCarga", method = RequestMethod.GET)
    public String cargaEstadosInformesCorreccion(ModelMap model, HttpServletRequest req, @RequestParam Integer ejercicioId){

        List<EjerciciosDTO> ejercicios = new ArrayList();
        List<TipoInformeDTO> tipoInforme = new ArrayList();
        Periodos form = null;
        HttpSession session = req.getSession(false);
        UsuarioDTO usuario = (UsuarioDTO) session.getAttribute("usr");
        List<Periodos> listaPeriodos = new ArrayList<Periodos>();

        try {
            ejercicios = informesService.getEjercicios();
            tipoInforme = informesService.gettipoInformes();
            listaPeriodos = informesService.getPeriodosByEjercicio(ejercicioId);
            correccionesPendientes = informesService.getCorreccionesPendientes(usuario.getPartidaID(), usuario.getCapituloID());

            session.setAttribute("tipoInforme", tipoInforme);
            session.setAttribute("ejercicios", ejercicios);

            if(this.correccionesPendientes!=null && this.correccionesPendientes.size() > 0){
                this.hayComplemento = this.correccionesPendientes.size();
                this.idEjercicioSelected = Integer.valueOf( this.correccionesPendientes.get(0).getEjercicioID());
                session.setAttribute("hayComplemento", correccionesPendientes.size());
            } else {
                session.setAttribute("hayComplemento", 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        session.setAttribute("usuario", usuario);
        model.addAttribute("ejercicios", ejercicios);
        model.addAttribute("tipoInforme", tipoInforme);
        model.addAttribute("listaPeriodos", listaPeriodos);
        model.addAttribute("hayComplemento", hayComplemento);
        return "cargaFormulario";
    }

    @PostMapping("/InformeUpload")
    public ResponseEntity<Object> getInformeUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("inf") Integer idInforme,
                                   @RequestParam("codPeriodo") String codPeriodo,
                                   @RequestParam("codEjercicio") String codEjercicio,
                                                   HttpServletRequest req) {

        try {
            if (!file.getOriginalFilename().isEmpty()) {
                if (idInforme.equals(ID_INFORME_CONTABLE)) {
                    if (FilenameUtils.getExtension(file.getOriginalFilename()).toLowerCase().equals("xml")) {
                        HttpSession session = req.getSession(false);
                        UsuarioDTO usuario = (UsuarioDTO) session.getAttribute("usr");
                        Informes informeCargado = informesService.cargaInformeContable(file, idInforme, codPeriodo,
                                codEjercicio, usuario.getPartidaCodigo(), usuario.getCapituloCodigo(), usuario.getUserLogin());
                        return new ResponseEntity<Object>(informeCargado, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<Object>("El archivo debe tener extensión .xml", HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<Object>("Informe cargado exitosamente", HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<Object>("Favor seleccione un archivo", HttpStatus.BAD_REQUEST);
            }
        } catch (SicogenException e) {
            return new ResponseEntity<Object>("Error inesperado al cargar archivo: " + e.getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<Object>("Error inesperado al cargar archivo: " + e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value ="/listadoInformes", method = RequestMethod.GET)
    public ResponseEntity<Object> listadoInformes(@RequestParam Integer periodo,
                                                  @RequestParam Integer tipo,
                                                  HttpServletRequest request) {
        try {

            HttpSession session = request.getSession(false);
            UsuarioDTO usuario = (UsuarioDTO) session.getAttribute("usr");
            List<Informes> listaInformes = informesService.getInformesForUpload(tipo, Integer.valueOf(usuario.getEntidadID()), periodo);
            return new ResponseEntity<Object>(listaInformes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping (value = "/getPeriodos", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity getPeriodos(@RequestParam Integer ejercicioId, HttpServletRequest request){

        List<Periodos> listaPeriodos = informesService.getPeriodosByEjercicio(ejercicioId);
        return new ResponseEntity(listaPeriodos, HttpStatus.OK);
    }

    @RequestMapping(value = "enviaValidacion", method = RequestMethod.POST)
    public ResponseEntity<String> enviaValidacionInforme(@RequestParam Integer idArchivo) {
        try {
            ValidaInformeRequestType request = new ValidaInformeRequestType();
            request.setIdArchivo(idArchivo);
            request.setIsCargaManual(Boolean.TRUE);
            validacionInformeClient.validaInformeIC(request);
            return new ResponseEntity<String>("OK", HttpStatus.OK);
        } catch (SicogenException e) {
            return new ResponseEntity<String>(e.getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "estadoId", method = RequestMethod.GET)
    public ResponseEntity<Object> obtieneIdEstadoInforme(@RequestParam Integer idArchivo) {
        try {
            return new ResponseEntity<Object>(informesService.obtieneIdEstadoInforme(idArchivo), HttpStatus.OK);
        } catch (SicogenException e) {
            return new ResponseEntity<Object>(e.getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/showInforSend")
    public String showInforSend(Model model) {
        model.addAttribute("listaTipoInformes", informesService.getTiposDeInformes());
        return "EnvioInformes";
    }

    @PostMapping(value = "/showInforContSend")
    public String showInforContSend(Model model,
                                HttpServletRequest request,
                                @RequestParam Integer idEjercicio,
                                @RequestParam Integer tpInforme) {

        HttpSession session = request.getSession(false);
        UsuarioDTO usr = (UsuarioDTO) session.getAttribute("usr");
        int idEntidad = Integer.parseInt(usr.getEntidadID());
        model.addAttribute(SALIDA_ENVIO_CGR, informesService.getInformesSiEnviar(tpInforme, idEntidad, idEjercicio));
        model.addAttribute("salidaEnvioCgrError", informesService.getInformesNoEnviar(tpInforme, idEntidad, idEjercicio));
        return "EnvioInformesContables";
    }

    @PostMapping(value = "/showInforSendDos")
    public String getInformesPreEnvio(Model model,
                                   HttpServletRequest request,
                                   @RequestParam String infSends) {
        HttpSession session = request.getSession(false);
        UsuarioDTO usr = (UsuarioDTO) session.getAttribute("usr");
        List<Informes> salidaEnvioCgr = informesService.getInformesPreEnvio(infSends);

        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        Calendar calendar = new GregorianCalendar();

        model.addAttribute(SALIDA_ENVIO_CGR, salidaEnvioCgr);
        model.addAttribute("nomUsuario", usr.getUserLogin());
        model.addAttribute("fecha", sdf.format(calendar.getTime()));
        model.addAttribute("entidadNombre", usr.getEntidadNombre());
        return "PreCertificado";
    }

    @PostMapping(value = "/showInforSendInfTres")
    public String getCertificadoFinal(Model model,
                                      HttpServletRequest request,
                                      @RequestParam Integer tpInforme,
                                      @RequestParam String infSends) {
        HttpSession session = request.getSession(false);
        UsuarioDTO usr = (UsuarioDTO) session.getAttribute("usr");
        String nomUsuario = usr.getUserLogin();
        DatosEjecucionEnvio datos = informesService.getCertificadoFinal(infSends, tpInforme, Integer.parseInt(usr.getEntidadID()), nomUsuario, usr.getEntidadNombre());

        SimpleDateFormat sdfHour = new SimpleDateFormat("HH:mm");
        Calendar calendar = new GregorianCalendar();

        model.addAttribute("fecha", datos.getFechaEnvio());
        model.addAttribute("rq", datos.getRq());
        model.addAttribute(SALIDA_ENVIO_CGR, datos.getInformesEnviados());
        model.addAttribute("nroCertificado", datos.getNroCertificado());
        model.addAttribute("usuario", nomUsuario);
        model.addAttribute("hora", sdfHour.format(calendar.getTime()));
        return "reporteEnvio2";
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
}
