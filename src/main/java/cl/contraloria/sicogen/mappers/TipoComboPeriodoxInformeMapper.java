package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.Periodos;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TipoComboPeriodoxInformeMapper implements RowMapper<Periodos> {

    @Override
    public Periodos mapRow(ResultSet resultSet, int i) throws SQLException {
        Periodos periodos = new Periodos();
        periodos.setPeriodoId(resultSet.getInt(1));
        periodos.setPeriodoCodigo(resultSet.getString(2));
        periodos.setPeriodoNombre(resultSet.getString(3));
        return periodos;

    }
}