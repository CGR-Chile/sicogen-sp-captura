package cl.contraloria.sicogen.controller;

import cl.contraloria.sicogen.model.EjerciciosDTO;
import cl.contraloria.sicogen.model.Periodos;
import cl.contraloria.sicogen.model.TipoInformeDTO;
import cl.contraloria.sicogen.model.UsuarioDTO;
import cl.contraloria.sicogen.service.InformesService;
import cl.contraloria.sicogen.service.UsuarioService;
import cl.contraloria.sicogen.utils.InformesEstadosAnualBO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class UsuarioController {

    private UsuarioService usuarioService;
    private InformesService informesService;

    public UsuarioController(UsuarioService usuarioService, InformesService informesService) {
        this.usuarioService = usuarioService;
        this.informesService = informesService;
    }

    @PostMapping("/main")
    public String login(ModelMap model, HttpServletRequest req) throws SQLException {

        List<EjerciciosDTO> ejercicios;
        List<TipoInformeDTO> tipoInforme;
        List<Periodos> periodos;
        HttpSession session = req.getSession(false);
        UsuarioDTO usr;
        InformesEstadosAnualBO informesEstadosAnualBO;
        String nomUsuario;
        String password;

        if (session == null) {
            nomUsuario = req.getParameter("userLogin");
            password = req.getParameter("passLogin");
        } else {
            usr = (UsuarioDTO) session.getAttribute("usr");

            if (usr != null) {
                nomUsuario = usr.getUserLogin();
                password = usr.getPassLogin();
            } else {
                nomUsuario = req.getParameter("userLogin");
                password = req.getParameter("passLogin");
            }
        }

        usr = usuarioService.getUsuario(nomUsuario, password);
        ejercicios = informesService.getEjercicios();
        tipoInforme = informesService.gettipoInformes();
        Integer ejercicioId = ejercicios.get(0).getEjercicioId();
        periodos = informesService.getPeriodosByEjercicio(ejercicios.get(0).getEjercicioId());
        informesEstadosAnualBO = informesService.getEstadoInformeAnual(Integer.valueOf(usr.getEntidadID()), ejercicioId, tipoInforme.get(0).getId());
        usr.setUserLogin(nomUsuario);
        usr.setPassLogin(password);

        session.setAttribute("usr", usr);
        model.addAttribute("usuario", usr);
        model.addAttribute("ejercicios", ejercicios);
        model.addAttribute("tipoInforme", tipoInforme);
        model.addAttribute("periodos", periodos);
        model.addAttribute("informesEstados", informesEstadosAnualBO);
        return "listadogeneral";
    }


    @RequestMapping(value = "/validarLoginCGR", method = RequestMethod.POST)
    public String loginCGRPOST(ModelMap model, HttpServletRequest req) {
        return loginCGR(model, req);
    }

    @RequestMapping(value = "/validarLoginCGR", method = RequestMethod.GET)
    public String loginCGRGET(ModelMap model, HttpServletRequest req) {
        return loginCGR(model, req);
    }

    public String loginCGR(ModelMap model, HttpServletRequest req) {
        try {
            String usuarioCGR = "";
            UsuarioDTO usr = null;
            String error = null;
            List<EjerciciosDTO> ejercicios = new ArrayList<EjerciciosDTO>();
            List<TipoInformeDTO> tipoInforme = new ArrayList<TipoInformeDTO>();
            List<Periodos> periodos = new ArrayList<Periodos>();
            InformesEstadosAnualBO informesEstadosAnualBO = new InformesEstadosAnualBO();

            try {
                usuarioCGR = req.getRemoteUser();
                usr = this.usuarioService.getUsuario(usuarioCGR, "");
                usr.setUserLogin(usuarioCGR);
                ejercicios = this.informesService.getEjercicios();
                tipoInforme = this.informesService.gettipoInformes();
                Integer ejercicioId = Integer.valueOf(((EjerciciosDTO)ejercicios.get(0)).getEjercicioId());
                periodos = this.informesService.getPeriodosByEjercicio(ejercicioId);
                informesEstadosAnualBO = this.informesService.getEstadoInformeAnual(Integer.valueOf(usr.getEntidadID()), ejercicioId, Integer.valueOf(((TipoInformeDTO)tipoInforme.get(0)).getId()));
            } catch (Exception e) {
                error = e.getLocalizedMessage();
            }

            HttpSession session = req.getSession();
            session.setAttribute("usr", usr);
            model.addAttribute("usuario", usr);
            model.addAttribute("usuarioLogin", usuarioCGR);
            model.addAttribute("error", error);
            model.addAttribute("ejercicios", ejercicios);
            model.addAttribute("tipoInforme", tipoInforme);
            model.addAttribute("periodos", periodos);
            model.addAttribute("informesEstados", informesEstadosAnualBO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "listadogeneral";
    }
}
