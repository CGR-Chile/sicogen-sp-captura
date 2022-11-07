package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.TiposDeInformesDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AllInformesMapper implements RowMapper<TiposDeInformesDTO> {

    @Override
    public TiposDeInformesDTO mapRow(ResultSet resultSet, int i) throws SQLException {

        TiposDeInformesDTO tiposDeInformes = new TiposDeInformesDTO(Integer.valueOf(resultSet.getString("INFORME_ID")),String.valueOf(resultSet.getString("NOMBRE")),String.valueOf(resultSet.getString("NOMBRE")));
        tiposDeInformes.setId(Integer.valueOf(resultSet.getString("INFORME_ID")));
        tiposDeInformes.setNombre(String.valueOf(resultSet.getString("NOMBRE")));

        return tiposDeInformes;
    }
}
