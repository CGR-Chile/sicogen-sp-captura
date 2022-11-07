package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.Informes;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InformeNoEnviarMapper extends BaseMapper implements RowMapper<Informes> {
    @Override
    public Informes mapRow(ResultSet rs, int i) throws SQLException {
        Informes informe = new Informes();
        informe.setInformeId(getInteger(rs, "INFORME_ID"));
        informe.setInformeCodigo(getString(rs, "CODIGO"));
        informe.setTipoInformeNombre(getString(rs, "TIPO_INFORME"));
        informe.setInformeNombre(getString(rs, "INFORME"));
        informe.setInformeEstado(getString(rs, "ESTADO_INF"));
        informe.setInformePeriodoCod(getString(rs, "PERIODO_EJERCICIO"));
        informe.setInformeEjercicio(getString(rs, "EJERCICIO_NOMBRE"));
        informe.setInformePeriodo(getString(rs, "PERIODO_NOMBRE"));
        return informe;
    }
}
