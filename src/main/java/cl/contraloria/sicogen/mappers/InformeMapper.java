package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.Informes;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InformeMapper implements RowMapper<Informes> {

    @Override
    public Informes mapRow(ResultSet resultSet, int i) throws SQLException {
        Informes informe = new Informes();
        informe.setInformeId(resultSet.getInt(1));
        informe.setInformeCodigo(resultSet.getString(2));
        informe.setInformeMensaje(resultSet.getString(3));
        informe.setInformeEstado(resultSet.getString(4));
        informe.setInformeEstadoId(resultSet.getString(5));
        informe.setPeriodoInforme(resultSet.getInt(6));
        informe.setTipoInformeNombre(resultSet.getString(7));
        return informe;
    }
}
