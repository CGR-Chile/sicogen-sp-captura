package cl.contraloria.sicogen.dao;

import cl.contraloria.sicogen.mappers.TiposDeInformesMapper;
import cl.contraloria.sicogen.model.TiposDeInformes;
import oracle.jdbc.OracleTypes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class FiltrosDAO {

    private JdbcTemplate jdbcTemplate;

    private static final String PKG_INFORMES = "PKG_INFORMES";
    private static final String C_TIPO_INF = "cTIPOINF";

    public FiltrosDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<TiposDeInformes> getTiposDeInformes() {
        SimpleJdbcCall llamada = getTiposDeInformesCall();
        Map<String, Object> result = llamada.execute(new HashMap<String, Object>());
        return (List<TiposDeInformes>) result.get(C_TIPO_INF);
    }

    private SimpleJdbcCall getTiposDeInformesCall() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_INFORMES)
                .withProcedureName("GET_TIPO_INFORMES")
                .declareParameters(
                        new SqlOutParameter(C_TIPO_INF, OracleTypes.CURSOR, new TiposDeInformesMapper())
                );
    }
}
