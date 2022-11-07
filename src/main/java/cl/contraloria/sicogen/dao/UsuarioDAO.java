package cl.contraloria.sicogen.dao;

import cl.contraloria.sicogen.mappers.PaginaAutorizadaMapper;
import cl.contraloria.sicogen.mappers.UsuarioCodigoMapper;
import cl.contraloria.sicogen.mappers.UsuarioMapper;
import cl.contraloria.sicogen.model.UsuarioDTO;
import oracle.jdbc.OracleTypes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;
import java.util.*;

@Component
public class UsuarioDAO {

    /* Packages */
    private static final String PKG_USUARIOS = "PKG_USUARIOS";
    private static final String IN_USUARIO = "pUSUARIO";
    private static final String IN_PASS = "pPASS";
    private static final String OUT_CURSOR_USUARIO = "pCURSOR_USUARIO";
    private static final String OUT_CURSOR_PAGINAS = "pCURSOR_PAGINAS";

    /* JdbcTemplate */
    private JdbcTemplate jdbcTemplate;

    public UsuarioDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public UsuarioDTO getUsuario(String usuario,
                                 String loggin) {
        SimpleJdbcCall llamada = getLlamadaUsuario();
        Map<String, Object> parametros = getParametrosUsuario(usuario, loggin);
        Map<String, Object> respuesta = llamada.execute(parametros);
        List<String> paginasAutotizadasList = (List<String>) respuesta.get(OUT_CURSOR_PAGINAS);
        Set<String> paginasAutotizadas = new HashSet<String>();

        for (String paginaAutorizada : paginasAutotizadasList) {
            paginasAutotizadas.add(paginaAutorizada);
        }

        List<UsuarioDTO> usuarios = (List<UsuarioDTO>) respuesta.get(OUT_CURSOR_USUARIO);
        UsuarioDTO usuarioDTO = usuarios.get(0);
        usuarioDTO.setPaginasAutorizadas(paginasAutotizadas);
        return usuarioDTO;
    }

    private SimpleJdbcCall getLlamadaUsuario() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_USUARIOS)
                .withProcedureName("GET_USUARIO_ME_ByLog")
                .declareParameters(
                        new SqlParameter(IN_USUARIO, OracleTypes.VARCHAR),
                        new SqlParameter(IN_PASS, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_CURSOR_USUARIO, OracleTypes.CURSOR, new UsuarioMapper()),
                        new SqlOutParameter(OUT_CURSOR_PAGINAS, OracleTypes.CURSOR, new PaginaAutorizadaMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    private Map<String, Object> getParametrosUsuario(String usuario, String loggin) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_USUARIO, usuario);
        parametros.put(IN_PASS, loggin);
        return parametros;
    }

    public UsuarioDTO obtenerUsuarioPorCodigo(String usuario) {
        SimpleJdbcCall llamada = getLlamadaUsuarioPorCodigo();
        Map<String, Object> parametros = getParametrosUsuarioPorCodigo(usuario);
        Map<String, Object> respuesta = llamada.execute(parametros);
        List<String> paginasAutotizadasList = (List<String>) respuesta.get(OUT_CURSOR_PAGINAS);
        Set<String> paginasAutotizadas = new HashSet<String>();

        for (String paginaAutorizada : paginasAutotizadasList) {
            paginasAutotizadas.add(paginaAutorizada);
        }

        List<UsuarioDTO> usuarios = (List<UsuarioDTO>) respuesta.get(OUT_CURSOR_USUARIO);
        UsuarioDTO usuarioDTO = usuarios.get(0);
        usuarioDTO.setPaginasAutorizadas(paginasAutotizadas);
        return usuarioDTO;
    }

    private SimpleJdbcCall getLlamadaUsuarioPorCodigo() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_USUARIOS)
                .withProcedureName("GET_USUARIO_ByCodigo")//Cambiar a GET_USUARIO_MF_ByLog
                .declareParameters(
                        new SqlParameter(IN_USUARIO, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_CURSOR_USUARIO, OracleTypes.CURSOR, new UsuarioCodigoMapper()),
                        new SqlOutParameter(OUT_CURSOR_PAGINAS, OracleTypes.CURSOR, new PaginaAutorizadaMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    private Map<String, Object> getParametrosUsuarioPorCodigo(String usuario) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_USUARIO, usuario);
        return parametros;
    }


}
