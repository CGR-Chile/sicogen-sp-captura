package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.CorreccionPendienteBO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CorreccionPendienteMapper implements RowMapper<CorreccionPendienteBO> {

    @Override
    public CorreccionPendienteBO mapRow(ResultSet resultSet, int i) throws SQLException {
        CorreccionPendienteBO correccionPendiente = new CorreccionPendienteBO();
        correccionPendiente.setCorreccionID(resultSet.getString(1));
        correccionPendiente.setPartidaID(resultSet.getString(2));
        correccionPendiente.setCapituloID(resultSet.getString(3));
        correccionPendiente.setComentario(resultSet.getString(4));
        correccionPendiente.setCorreccionInformeID(resultSet.getString(5));
        correccionPendiente.setIdPeriodoEjercicio(resultSet.getString(6));
        correccionPendiente.setIdFileUpload(resultSet.getString(7));
        correccionPendiente.setInformeID(resultSet.getString(8));
        correccionPendiente.setPeriodosEjerciciosID(resultSet.getString(9));
        correccionPendiente.setEjercicioID(resultSet.getString(10));
        correccionPendiente.setPeriodoID(resultSet.getString(11));
        correccionPendiente.setPeriodoNombre(resultSet.getString(12));
        correccionPendiente.setAnioNombre(resultSet.getString(13));
        correccionPendiente.setPeriodoCodigo(resultSet.getString(14));
        return correccionPendiente;
    }
}
