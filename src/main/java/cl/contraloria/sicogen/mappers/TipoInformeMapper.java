package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.TipoInformeDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TipoInformeMapper implements RowMapper<TipoInformeDTO> {

    @Override
    public TipoInformeDTO mapRow(ResultSet resultSet, int i) throws SQLException {
        TipoInformeDTO tipoInforme = new TipoInformeDTO();
        tipoInforme.setId(resultSet.getInt(1));
        tipoInforme.setCodigo(resultSet.getString(2));
        tipoInforme.setNombre(resultSet.getString(3));
        return tipoInforme;
    }
}
