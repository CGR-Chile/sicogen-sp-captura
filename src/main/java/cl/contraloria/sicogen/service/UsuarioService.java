package cl.contraloria.sicogen.service;

import cl.contraloria.sicogen.dao.UsuarioDAO;
import cl.contraloria.sicogen.model.UsuarioDTO;
import org.springframework.stereotype.Service;
import java.sql.SQLException;

@Service
public class UsuarioService {

    private UsuarioDAO usuarioDAO;

    public UsuarioService(UsuarioDAO usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    /*public boolean logueaUsuario(String nomUsuario, String password) {
        String passwordBD = usuarioDAO.obtienePasswordByNomUsuario(nomUsuario);
        return passwordBD.equals(password);
    }*/
    public UsuarioDTO getUsuario(String usuario, String loggin) throws SQLException {

        UsuarioDTO usr = new UsuarioDTO();
        usr = usuarioDAO.getUsuario(usuario, loggin);

        return usr;
    }

    public UsuarioDTO obtenerUsuarioPorCodigo(String usuario) throws SQLException {
        return usuarioDAO.obtenerUsuarioPorCodigo(usuario);
    }


}
