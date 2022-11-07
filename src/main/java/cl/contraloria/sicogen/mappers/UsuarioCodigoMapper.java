package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.UsuarioDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioCodigoMapper implements RowMapper<UsuarioDTO> {
    @Override
    public UsuarioDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setUserLogin(rs.getString("USUARIO"));
        usuario.setUserIPerfil(rs.getInt("PERFIL"));
        usuario.setUserFono(rs.getString("USUARIO_TELEFONO"));
        usuario.setUserMail(rs.getString("USUARIO_EMAIL"));
        usuario.setUserCargo(rs.getString("USUARIO_CARGO"));
        usuario.setUserId(rs.getInt("USUARIO_ID"));
        usuario.setEntidadID(rs.getString("ENTIDAD_ID"));
        usuario.setEntidadCodigo(rs.getString("ENTIDAD_CODIGO"));
        usuario.setEntidadNombre(rs.getString("ENTIDAD_NOMBRE"));
        return usuario;
    }
}
