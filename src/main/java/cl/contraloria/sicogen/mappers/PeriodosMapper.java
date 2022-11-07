package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.Periodos;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PeriodosMapper implements RowMapper<Periodos> {

    @Override
    public Periodos mapRow(ResultSet resultSet, int i) throws SQLException {
        Periodos periodo = new Periodos(
                resultSet.getInt(1),
                resultSet.getString(2),
                resultSet.getString(3),
                resultSet.getString(4)
        );
        return periodo;
    }
}
