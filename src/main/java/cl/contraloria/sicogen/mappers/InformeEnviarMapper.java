package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.Informes;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InformeEnviarMapper extends BaseMapper implements RowMapper<Informes> {
    @Override
    public Informes mapRow(ResultSet rs, int i) throws SQLException {
        Informes inf = new Informes();
        inf.setInformeId(getInteger(rs, "INFORME_ID"));
        inf.setInformeCodigo(getString(rs, "CODIGO"));
        inf.setTipoInformeNombre(getString(rs, "TIPO_INFORME"));
        inf.setInformeNombre(getString(rs, "INFORME"));
        inf.setInformeEstado(getString(rs, "ESTADO_INF"));
        inf.setInformePeriodoCod(getString(rs, "PERIODO_EJERCICIO"));
        inf.setInformeEjercicio(getString(rs, "EJERCICIO_NOMBRE"));
        inf.setInformePeriodo(getString(rs, "PERIODO_NOMBRE"));
        return inf;
    }
}
