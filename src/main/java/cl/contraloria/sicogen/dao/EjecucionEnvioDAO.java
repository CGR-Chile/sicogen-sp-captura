package cl.contraloria.sicogen.dao;

import cl.contraloria.sicogen.mappers.InformeEnviarMapper;
import cl.contraloria.sicogen.mappers.InformeNoEnviarMapper;
import cl.contraloria.sicogen.model.Informes;
import oracle.jdbc.OracleTypes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class EjecucionEnvioDAO {

    private static final String PKG_INFORMES = "PKG_INFORMES";
    private static final String P_TIPO_INFORME = "pTIPOINFORME";
    private static final String P_ENTIDAD = "pENTIDAD";
    private static final String P_EJERCICIO = "pEJERCICIO";
    private static final String P_FLUJO = "pFLUJO";
    private JdbcTemplate jdbcTemplate;

    public EjecucionEnvioDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Informes> getInformesSiEnviar(int informeTipo, int entidadId, int informePeriodo) {
        SimpleJdbcCall call = getInformesSiEnviarCall();
        Map<String, Object> params = getInformesEnviarParams(informeTipo, entidadId, informePeriodo);
        Map<String, Object> result = call.execute(params);
        return (List<Informes>) result.get(P_FLUJO);
    }

    private Map<String, Object> getInformesEnviarParams(int informeTipo, int entidadId, int informePeriodo) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(P_TIPO_INFORME, informeTipo);
        params.put(P_ENTIDAD, entidadId);
        params.put(P_EJERCICIO, informePeriodo);
        return params;
    }

    private SimpleJdbcCall getInformesSiEnviarCall() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_INFORMES)
                .withProcedureName("GET_INFORMES_SI_ENVIARSE")
                .declareParameters(
                        new SqlParameter(P_TIPO_INFORME, OracleTypes.NUMERIC),
                        new SqlParameter(P_ENTIDAD, OracleTypes.NUMERIC),
                        new SqlParameter(P_EJERCICIO, OracleTypes.NUMERIC),
                        new SqlOutParameter(P_FLUJO, OracleTypes.CURSOR, new InformeEnviarMapper())
                );
    }

    public List<Informes> getInformesNoEnviar(int informeTipo, int entidadId, int informePeriodo) {
        SimpleJdbcCall call = getInformesNoEnviarCall();
        Map<String, Object> params = getInformesEnviarParams(informeTipo, entidadId, informePeriodo);
        Map<String, Object> result = call.execute(params);
        return (List<Informes>) result.get(P_FLUJO);
    }

    private SimpleJdbcCall getInformesNoEnviarCall() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_INFORMES)
                .withProcedureName("GET_INFORMES_NO_ENVIARSE")
                .declareParameters(
                        new SqlParameter(P_TIPO_INFORME, OracleTypes.NUMERIC),
                        new SqlParameter(P_ENTIDAD, OracleTypes.NUMERIC),
                        new SqlParameter(P_EJERCICIO, OracleTypes.NUMERIC),
                        new SqlOutParameter(P_FLUJO, OracleTypes.CURSOR, new InformeNoEnviarMapper())
                );
    }
}
