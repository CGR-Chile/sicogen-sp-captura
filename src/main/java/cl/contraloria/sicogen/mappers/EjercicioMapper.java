package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.EjerciciosDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EjercicioMapper implements RowMapper<EjerciciosDTO> {

    @Override
    public EjerciciosDTO mapRow(ResultSet resultSet, int i) throws SQLException {
        EjerciciosDTO ejercicios = new EjerciciosDTO();
        ejercicios.setEjercicioId(resultSet.getInt(1));
        ejercicios.setEjercicioCodigo(resultSet.getString(2));
        ejercicios.setEjercicioNombre(resultSet.getString(3));
        return ejercicios;
    }
}
