package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.UsuarioDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioMapper implements RowMapper<UsuarioDTO> {

    @Override
    public UsuarioDTO mapRow(ResultSet resultSet, int i) throws SQLException {
        UsuarioDTO usuario = new UsuarioDTO();
        usuario.setUserId(resultSet.getInt(1));
        usuario.setUserLogin(resultSet.getString(2));
        usuario.setUserIPerfil(resultSet.getInt(3));
        usuario.setUserSPerfil(resultSet.getString(4));
        usuario.setUserFono(resultSet.getString(5));
        usuario.setUserMail(resultSet.getString(6));
        usuario.setUserCargo(resultSet.getString(7));
        usuario.setCapituloCodigo(resultSet.getString(8));
        usuario.setCapituloNombre(resultSet.getString(9));
        usuario.setCapituloID(resultSet.getString(10));
        usuario.setPartidaCodigo(resultSet.getString(11));
        usuario.setPartidaNombre(resultSet.getString(12));
        usuario.setPartidaID(resultSet.getString(13));
        usuario.setEntidadCodigo(resultSet.getString(14));
        usuario.setEntidadNombre(resultSet.getString(15));
        usuario.setEntidadID(resultSet.getString(16));
        return usuario;
    }
}
