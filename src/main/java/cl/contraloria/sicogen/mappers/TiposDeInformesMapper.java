package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.TiposDeInformes;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TiposDeInformesMapper extends BaseMapper implements RowMapper<TiposDeInformes> {
    @Override
    public TiposDeInformes mapRow(ResultSet rs, int i) throws SQLException {
        TiposDeInformes tiposDeInformes = new TiposDeInformes();
        tiposDeInformes.setId(getInteger(rs, "ID"));
        tiposDeInformes.setCodigo(getString(rs, "CODIGO"));
        tiposDeInformes.setNombre(getString(rs, "NOMBRE"));
        return tiposDeInformes;
    }
}
