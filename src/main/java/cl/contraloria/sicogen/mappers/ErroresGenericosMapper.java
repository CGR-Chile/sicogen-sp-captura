package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.ErrorGenerico;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ErroresGenericosMapper implements RowMapper<ErrorGenerico> {

    @Override
    public ErrorGenerico mapRow(ResultSet rs, int rowNum) throws SQLException {
        ErrorGenerico errorGenerico = new ErrorGenerico();
        errorGenerico.setMensaje(rs.getString("MENSAJE_ERROR"));
        errorGenerico.setTipoError(rs.getInt("TIPO_ERROR"));
        return errorGenerico;
    }
}
