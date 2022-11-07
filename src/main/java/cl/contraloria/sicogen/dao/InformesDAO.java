package cl.contraloria.sicogen.dao;

import cl.contraloria.sicogen.constants.ReporteValidacionConstants;
import cl.contraloria.sicogen.exceptions.SicogenException;
import cl.contraloria.sicogen.mappers.*;
import cl.contraloria.sicogen.model.*;
import cl.contraloria.sicogen.model.InformacionGeneralRV;
import cl.contraloria.sicogen.utils.*;
import oracle.jdbc.OracleTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Component;

import javax.naming.NamingException;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

@Component
public class InformesDAO {

    /* Packages */
    private static final String PKG_REPORTES = "PKG_REPORTES";
    private static final String PKG_PRUEBAS = "PKG_PRUEBAS";
    private static final String PKG_NOTIFICACION_IC = "PKG_NOTIFICACION_IC";
    private static final String PKG_FILES = "PKG_FILES";

    /* Parámetros IN */
    private static final String IN_ENTIDAD_ID = "pENTIDAD_ID";
    private static final String IN_PEJERCICIO = "pPEJERCICIO";
    private static final String IN_TPINFORME = "pTPINFORME";
    private static final String IN_FILEU_ID = "FILEU_ID_IN";
    private static final String IN_NUMERO_PAGINA = "NUMERO_PAGINA_IN";
    private static final String IN_NUMERO_REGISTROS = "NUMERO_REGISTROS_IN";
    private static final String IN_PARTIDA_ID = "pPARTIDA_ID";
    private static final String IN_CAPITULO_ID = "pCAPITULO_ID";
    private static final String IN_UUID_INFORME = "UUID_INFORME_IN";
    private static final String IN_CAPITULO = "CAPITULO_IN";
    private static final String IN_EJERCICIO = "EJERCICIO_IN";
    private static final String IN_PERIODO = "PERIODO_IN";
    private static final String IN_NOM_USUARIO = "NOM_USUARIO_IN";
    private static final String IN_PARTIDA = "PARTIDA_IN";
    private static final String IN_NUM_REGISTROS = "NUM_REGISTROS_IN";
    private static final String IN_ESTADO = "ESTADO_ID";
    private static final String IN_ID_FILE_UPLOAD = "ID_FILE_UPLOAD";
    private static final String IN_XML_ERRORES = "XML_ERRORES";
    private static final String IN_USUARIO = "pUsuario";
    private static final String FLAG_ALL = "FLAG_ALL";

    /* Parámetros OUT */
    private static final String OUT_CODIGO = "pCODIGO";
    private static final String OUT_MENSAJE = "pMENSAJE";
    private static final String OUT_INFORMES = "pINFORMES";
    private static final String OUT_CORR_PEND = "cursor_CORR_PEND";
    private static final String OUT_NUMERO_REGISTROS_TOTAL = "NUMERO_REGISTROS_TOTAL";
    private static final String OUT_LISTA_DETALLES_CURSOR = "LISTA_DETALLES_CURSOR";
    private static final String OUT_COD_EJEC = "COD_EJEC";
    private static final String OUT_MSG_EJEC = "MSG_EJEC";
    private static final String OUT_UUID_IC = "OUT_UUID_IC";
    private static final String OUT_PARTIDA_IC = "OUT_PARTIDA_IC";
    private static final String OUT_CAPITULO_IC = "OUT_CAPITULO_IC";
    private static final String OUT_LISTA_ERRORES_GENERICOS = "LISTA_ERRORES_GENERICOS";
    private static final String ERROR_ESQUEMA = "ERROR_ESQUEMA";
    private static final String OUT_ID_ARCHIVO = "ID_ARCHIVO";
    private static final String OUT_ROW_ID = "v_Rowid";
    private static final String OUT_COD = "pCOD";
    private static final String OUT_MSG = "pMSG";
    private static final String P_FILEU_ID = "p_fileu_id";
    private static final String OUT_RUT_IC = "RUT_IC";

    /* JdbcTemplate */
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public InformesDAO(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<EjerciciosDTO> getEjercicios() {

        String sql = "SELECT UNIQUE (EJE.EJR_ID) ejercicioId, " +
                "EJE.EJR_CODIGO ejercicioCodigo, " +
                "EJE.EJR_NOMBRE ejercicioNombre " +
                "FROM TBL_EJERCICIO EJE " +
                "WHERE EJE.EJR_ISVALID IS NULL " +
                "ORDER BY EJE.EJR_NOMBRE DESC";
        return jdbcTemplate.query(sql, new EjercicioMapper());
    }

    public List<TipoInformeDTO> gettipoInformes() {

        String sql = "SELECT TINF.TIPOINF_ID ID, TINF.TIPOINF_CODIGO CODIGO,TINF.TIPOINF_NOMBRE NOMBRE " +
                "FROM TBL_TIPO_INFORME TINF " +
                "WHERE TINF.TIPOINF_ISVALID IS NULL";
        return jdbcTemplate.query(sql, new TipoInformeMapper());
    }

    public List<Informes> getInformesForSend(Integer idEntidad,
                                             Integer idEjercicio,
                                             Integer idTipoInforme){
        SimpleJdbcCall llamada = getLlamadaInformesForSend();
        Map<String, Object> parametros = getParametrosInformesForSend(idEntidad, idEjercicio, idTipoInforme);
        Map<String, Object> respuesta = llamada.execute(parametros);
        return (List<Informes>) respuesta.get(OUT_INFORMES);
    }

    public Vector<EstadoInformeAnualDTO> getEstadoInformeAnual2(Integer entidad, Integer idEjercicio, Integer idTipoInforme){

        Connection cnn = null;
        CallableStatement cs = null;
        ResultSet rs = null;
        Vector<EstadoInformeAnualDTO> _listaEstadoInformesAnual ;

        ConexionBD con = new ConexionBD();
        _listaEstadoInformesAnual = new Vector<EstadoInformeAnualDTO>();
        try {
            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_REPORTES.RECUPERA_ESTADO_INF_ANUAL(?, ?, ?, ?) }");
            cs.setInt(1, entidad);
            cs.setInt(2, idEjercicio);
            cs.setInt(3, 1);
            cs.registerOutParameter(4, OracleTypes.CURSOR);

            cs.executeQuery();
            rs = (ResultSet) cs.getObject(4);
            while(rs.next()){
                EstadoInformeAnualDTO rEstadoInfAnual = new EstadoInformeAnualDTO();

                rEstadoInfAnual.setIdInforme(rs.getString("INF_ID"));
                rEstadoInfAnual.setInforme(rs.getString("INFORME"));

                rEstadoInfAnual.setsEstApe(rs.getString("ESTADO_APE"));
                rEstadoInfAnual.setsEstEne(rs.getString("ESTADO_ENE"));
                rEstadoInfAnual.setsEstFeb(rs.getString("ESTADO_FEB"));
                rEstadoInfAnual.setsEstMar(rs.getString("ESTADO_MAR"));
                rEstadoInfAnual.setsEstAbr(rs.getString("ESTADO_ABR"));
                rEstadoInfAnual.setsEstMay(rs.getString("ESTADO_MAY"));
                rEstadoInfAnual.setsEstJun(rs.getString("ESTADO_JUN"));
                rEstadoInfAnual.setsEstJul(rs.getString("ESTADO_JUL"));
                rEstadoInfAnual.setsEstAgo(rs.getString("ESTADO_AGO"));
                rEstadoInfAnual.setsEstSep(rs.getString("ESTADO_SEP"));
                rEstadoInfAnual.setsEstOct(rs.getString("ESTADO_OCT"));
                rEstadoInfAnual.setsEstNov(rs.getString("ESTADO_NOV"));
                rEstadoInfAnual.setsEstDic(rs.getString("ESTADO_DIC"));
                rEstadoInfAnual.setsEstCie(rs.getString("ESTADO_CIE"));

                rEstadoInfAnual.setiEstApe(rs.getString("ESTD_APE"));
                rEstadoInfAnual.setiEstEne(rs.getString("ESTD_ENE"));
                rEstadoInfAnual.setiEstFeb(rs.getString("ESTD_FEB"));
                rEstadoInfAnual.setiEstMar(rs.getString("ESTD_MAR"));
                rEstadoInfAnual.setiEstAbr(rs.getString("ESTD_ABR"));
                rEstadoInfAnual.setiEstMay(rs.getString("ESTD_MAY"));
                rEstadoInfAnual.setiEstJun(rs.getString("ESTD_JUN"));
                rEstadoInfAnual.setiEstJul(rs.getString("ESTD_JUL"));
                rEstadoInfAnual.setiEstAgo(rs.getString("ESTD_AGO"));
                rEstadoInfAnual.setiEstSep(rs.getString("ESTD_SEP"));
                rEstadoInfAnual.setiEstOct(rs.getString("ESTD_OCT"));
                rEstadoInfAnual.setiEstNov(rs.getString("ESTD_NOV"));
                rEstadoInfAnual.setiEstDic(rs.getString("ESTD_DIC"));
                rEstadoInfAnual.setiEstCie(rs.getString("ESTD_CIE"));

                rEstadoInfAnual.setIdApe(String.valueOf(rs.getString("APE")));
                rEstadoInfAnual.setIdEne(String.valueOf(rs.getString("ENE")));
                rEstadoInfAnual.setIdFeb(String.valueOf(rs.getString("FEB")));
                rEstadoInfAnual.setIdMar(String.valueOf(rs.getString("MAR")));
                rEstadoInfAnual.setIdAbr(String.valueOf(rs.getString("ABR")));
                rEstadoInfAnual.setIdMay(String.valueOf(rs.getString("MAY")));
                rEstadoInfAnual.setIdJun(String.valueOf(rs.getString("JUN")));
                rEstadoInfAnual.setIdJul(String.valueOf(rs.getString("JUL")));
                rEstadoInfAnual.setIdAgo(String.valueOf(rs.getString("AGO")));
                rEstadoInfAnual.setIdSep(String.valueOf(rs.getString("SEP")));
                rEstadoInfAnual.setIdOct(String.valueOf(rs.getString("OCT")));
                rEstadoInfAnual.setIdNov(String.valueOf(rs.getString("NOV")));
                rEstadoInfAnual.setIdDic(String.valueOf(rs.getString("DIC")));
                rEstadoInfAnual.setIdCie(String.valueOf(rs.getString("CIE")));

                rEstadoInfAnual.setUserApe(String.valueOf(rs.getString("USUARIO_APE")));
                rEstadoInfAnual.setUserEne(String.valueOf(rs.getString("USUARIO_ENE")));
                rEstadoInfAnual.setUserFeb(String.valueOf(rs.getString("USUARIO_FEB")));
                rEstadoInfAnual.setUserMar(String.valueOf(rs.getString("USUARIO_MAR")));
                rEstadoInfAnual.setUserAbr(String.valueOf(rs.getString("USUARIO_ABR")));
                rEstadoInfAnual.setUserMay(String.valueOf(rs.getString("USUARIO_MAY")));
                rEstadoInfAnual.setUserJun(String.valueOf(rs.getString("USUARIO_JUN")));
                rEstadoInfAnual.setUserJul(String.valueOf(rs.getString("USUARIO_JUL")));
                rEstadoInfAnual.setUserAgo(String.valueOf(rs.getString("USUARIO_AGO")));
                rEstadoInfAnual.setUserSep(String.valueOf(rs.getString("USUARIO_SEP")));
                rEstadoInfAnual.setUserOct(String.valueOf(rs.getString("USUARIO_OCT")));
                rEstadoInfAnual.setUserNov(String.valueOf(rs.getString("USUARIO_NOV")));
                rEstadoInfAnual.setUserDic(String.valueOf(rs.getString("USUARIO_DIC")));
                rEstadoInfAnual.setUserCie(String.valueOf(rs.getString("USUARIO_CIE")));

                rEstadoInfAnual.setDateApe(String.valueOf(rs.getString("FECHA_APE")));
                rEstadoInfAnual.setDateEne(String.valueOf(rs.getString("FECHA_ENE")));
                rEstadoInfAnual.setDateFeb(String.valueOf(rs.getString("FECHA_FEB")));
                rEstadoInfAnual.setDateMar(String.valueOf(rs.getString("FECHA_MAR")));
                rEstadoInfAnual.setDateAbr(String.valueOf(rs.getString("FECHA_ABR")));
                rEstadoInfAnual.setDateMay(String.valueOf(rs.getString("FECHA_MAY")));
                rEstadoInfAnual.setDateJun(String.valueOf(rs.getString("FECHA_JUN")));
                rEstadoInfAnual.setDateJul(String.valueOf(rs.getString("FECHA_JUL")));
                rEstadoInfAnual.setDateAgo(String.valueOf(rs.getString("FECHA_AGO")));
                rEstadoInfAnual.setDateSep(String.valueOf(rs.getString("FECHA_SEP")));
                rEstadoInfAnual.setDateOct(String.valueOf(rs.getString("FECHA_OCT")));
                rEstadoInfAnual.setDateNov(String.valueOf(rs.getString("FECHA_NOV")));
                rEstadoInfAnual.setDateDic(String.valueOf(rs.getString("FECHA_DIC")));
                rEstadoInfAnual.setDateCie(String.valueOf(rs.getString("FECHA_CIE")));

                rEstadoInfAnual.setPejrApe(String.valueOf(rs.getString("PEJR_APE")));
                rEstadoInfAnual.setPejrEne(String.valueOf(rs.getString("PEJR_ENE")));
                rEstadoInfAnual.setPejrFeb(String.valueOf(rs.getString("PEJR_FEB")));
                rEstadoInfAnual.setPejrMar(String.valueOf(rs.getString("PEJR_MAR")));
                rEstadoInfAnual.setPejrAbr(String.valueOf(rs.getString("PEJR_ABR")));
                rEstadoInfAnual.setPejrMay(String.valueOf(rs.getString("PEJR_MAY")));
                rEstadoInfAnual.setPejrJun(String.valueOf(rs.getString("PEJR_JUN")));
                rEstadoInfAnual.setPejrJul(String.valueOf(rs.getString("PEJR_JUL")));
                rEstadoInfAnual.setPejrAgo(String.valueOf(rs.getString("PEJR_AGO")));
                rEstadoInfAnual.setPejrSep(String.valueOf(rs.getString("PEJR_SEP")));
                rEstadoInfAnual.setPejrOct(String.valueOf(rs.getString("PEJR_OCT")));
                rEstadoInfAnual.setPejrNov(String.valueOf(rs.getString("PEJR_NOV")));
                rEstadoInfAnual.setPejrDic(String.valueOf(rs.getString("PEJR_DIC")));
                rEstadoInfAnual.setPejrCie(String.valueOf(rs.getString("PEJR_CIE")));
                _listaEstadoInformesAnual.add(rEstadoInfAnual);
            }
        } catch (NamingException e) {
            e.printStackTrace();
            // logger.error("Error NamingException en el metodo getEstadoInformeAnual " + e.getMessage());
        } catch (SQLException e) {
            e.printStackTrace();
            //logger.error("Error SQLException en el metodo getEstadoInformeAnual " + e.getMessage());
        }catch(Exception ex){
            ex.printStackTrace();
            //logger.error("Error en el metodo getEstadoInformeAnual  " + ex.getMessage());
        }finally {
            try {
                cs.close();
                rs.close();
                cnn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return _listaEstadoInformesAnual;

    }

    public PeriodoDTO getPeriodoEjercicio(int periodo ) throws Exception{

        PeriodoDTO resultado = new PeriodoDTO();

        return resultado;
    }

    public List<CorreccionPendienteBO> getCorreccionesPendientes(String idPart, String idCap) {

        SimpleJdbcCall llamada = getLlamadaCorreccionesPendientes();
        Map<String, Object> parametros = getParametrosCorreccionesPendientes(idPart, idCap);
        Map<String, Object> respuesta = llamada.execute(parametros);
        return (List<CorreccionPendienteBO>) respuesta.get(OUT_CORR_PEND);
    }

    public List<Informes> getCorreccionesSeguimiento(int idEntidad, int idEjercicio, int idTipoInforme)throws Exception{

        Connection cnn = null;
        CallableStatement cs = null;
        ResultSet rs2 = null;

        ConexionBD con = new ConexionBD();
        List<Informes> correcciones = new ArrayList<Informes>();

        try {
            cnn = con.abrirConexionAtencion();

            cs   = cnn.prepareCall("{call PKG_PRUEBAS.GET_FILEU_CORRECCION(?,?,?) }");
            cs.setInt(1, idEntidad);
            cs.setInt(2, idEjercicio);

            cs.registerOutParameter(3, OracleTypes.CURSOR);
            cs.executeQuery();
            rs2 = (ResultSet) cs.getObject(3);

            while(rs2.next()){
                Informes archivo = new Informes();
                archivo.setInformeId(rs2.getInt("INFORME_ID"));
                correcciones.add(archivo);
            }

        } catch (NamingException e) {
            e.fillInStackTrace();
//			throw e;
        } catch (SQLException e) {
            e.fillInStackTrace();
//			throw e;
        }catch(Exception e){
            e.fillInStackTrace();
//			throw e;
        }finally {
            cs.close();
            rs2.close();
            cnn.close();
        }
        return correcciones;
    }

    public List<Periodos> getPeriodosByEjercicio(Integer idEjercicio) {

        String sql = "SELECT EP.PEJR_ID AS periodoId, " +
                "PER.PERD_CODIGO AS periodoCodigo, " +
                "PER.PERD_NOMBRE AS periodoNombre, " +
                "PER.PERD_ABREV AS  periodoAbrev " +
                "FROM TBL_PERIODOS PER " +
                "INNER JOIN TBL_PERIODOS_EJERCICIO EP ON PER.PERD_ID = EP.PERD_ID " +
                "WHERE EP.PEJR_ISVALID IS NULL  and perd_codigo<>'00'" +
                "AND EP.EJR_ID = " + idEjercicio +
                "order by PER.PERD_CODIGO";
        return jdbcTemplate.query(sql, new PeriodosMapper());
    }

    public List<Informes> getInformesForUpload(int tipoInforme, int entidad, int periodo)throws Exception{
        Connection cnn = null;
        CallableStatement cs = null;
        ResultSet rs = null;
        ConexionBD con = new ConexionBD();
        List<Informes>lstInf=new ArrayList<Informes>();
        try {
            cnn = con.abrirConexionAtencion();

            cs   = cnn.prepareCall("{call PKG_INFORMES.GET_INFORMES_UPLOAD_ENTIDAD(?,?,?,?) }");
            cs.setInt(1, tipoInforme);
            cs.setInt(2, entidad);
            cs.setInt(3, periodo);
            cs.registerOutParameter(4, OracleTypes.CURSOR);
            cs.executeQuery();
            rs = (ResultSet) cs.getObject(4);

            int fila = 0;
            while(rs.next()){
                Informes inf=new Informes();
                inf.setInformeId(rs.getInt("INF_ID"));
                inf.setInformeCodigo(rs.getString("CODIGO"));
                inf.setInformeNombre(rs.getString("NOMBRE"));
                inf.setInformeEstado(rs.getString("INF2"));
                inf.setActivacion(rs.getInt("INF2"));
                inf.setInformeArchivo(rs.getString("ARCHIVO"));
                inf.setInformeEstadoId(rs.getString("ESTADO"));
                inf.setInformeTipo(rs.getString("TIPO"));
                inf.setVentana(rs.getInt("VENTANA"));
                inf.setCorrInformeId(rs.getInt("CORRINF_ID"));
                inf.setIdFileUpload(rs.getString("FILEU_ID"));
                inf.setRowClass("row"+fila);

                if(fila == 0){
                    fila=1;
                }
                else{
                    fila=0;
                }
                //logger.info("[SP-CARGA-WEB] [INFORME POR PERIODO] result : "+inf.toString());

                lstInf.add(inf);
            }
        }catch (NamingException e) {
            //this.error=Excepciones.getError(e);
            throw e;
        }catch (SQLException e) {
            //this.error=Excepciones.getError(e);
            throw e;
        }catch(Exception e){
            //this.error=Excepciones.getError(e);
            throw e;
        }finally {
            cs.close();
            rs.close();
            cnn.close();

        }
        return lstInf;
    }

    public String obtieneXMLInformeIC(int idFileUp) throws SQLException {

        Connection cnn = null;
        CallableStatement cs = null;
        ConexionBD con = new ConexionBD();
        Utils util = new Utils();
        Clob xmlInforme = null;
        String xml = "";

        //logger.info("Obtener XML Informe IC para ID: "+idFileUp);

        try {
            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_FILES.OBTIENE_FILE_XML(?,?,?,?)}");
            cs.setInt(1, idFileUp);
            cs.registerOutParameter(2, OracleTypes.CLOB);
            cs.registerOutParameter(3, OracleTypes.NUMBER);
            cs.registerOutParameter(4, OracleTypes.VARCHAR);
            cs.executeQuery();

            Integer codRespuesta = (Integer) cs.getInt(3);
            String msnRespuesta = (String) cs.getString(4);

            //logger.info("codRespuesta: "+codRespuesta);
            //logger.info("msnRespuesta: "+msnRespuesta);

            if(codRespuesta == 0){
                xmlInforme = cs.getClob(2);
                xml = util.readClob(xmlInforme);
            }else{
                xml = "";
            }

        }catch(NamingException e){
            e.printStackTrace();
            //logger.info("Error NamingException en el metodo obtieneXMLInformeIC " + e.getMessage());	e.printStackTrace();
        }catch(SQLException e){
            e.printStackTrace();
            //logger.info("Error SQLException en el metodo obtieneXMLInformeIC " + e.getMessage());	e.printStackTrace();
        }catch(Exception ex){
            ex.printStackTrace();
            //logger.info("Error en el metodo obtieneXMLInformeIC " + ex.getMessage());
        } finally {
            //super.cerrarCallable(cs); super.cerrarConexion(cnn);
            cnn.close();
            cs.close();
        }

        return xml;

    }

    public String obtieneXMLErroresIC(int idFileUp) throws SQLException {

        Connection cnn = null;
        CallableStatement cs = null;
        ConexionBD con = new ConexionBD();
        Utils util = new Utils();
        Clob xmlErrores = null;
        String xml = "";

        //logger.info("Obtener XML Errores IC para ID: "+idFileUp);

        try {
            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_FILES.OBTIENE_LISTA_ERRORES(?,?,?,?)}");
            cs.setInt(1, idFileUp);
            cs.registerOutParameter(2, OracleTypes.CLOB);
            cs.registerOutParameter(3, OracleTypes.NUMBER);
            cs.registerOutParameter(4, OracleTypes.VARCHAR);
            cs.executeQuery();

            Integer codRespuesta = (Integer) cs.getInt(3);
            String msnRespuesta = (String) cs.getString(4);

            //logger.info("codRespuesta: "+codRespuesta);
            //logger.info("msnRespuesta: "+msnRespuesta);

            if(codRespuesta == 0){
                xmlErrores =  cs.getClob(2);
                xml = util.readClob(xmlErrores);
            }else{
                xml = "";
            }

            //logger.info("XML Errores PI: "+xml);

        }catch(NamingException e){
            e.printStackTrace();
            //logger.info("Error NamingException en el metodo obtieneXMLErroresIC " + e.getMessage());
        }catch(SQLException e){
            e.printStackTrace();
            //logger.info("Error SQLException en el metodo obtieneXMLErroresIC " + e.getMessage());	e.printStackTrace();
        }catch(Exception ex){
            ex.printStackTrace();
            //logger.info("Error en el metodo obtieneXMLErroresIC " + ex.getMessage());
        }finally{
            //super.cerrarCallable(cs); super.cerrarConexion(cnn);
            cnn.close();
            cs.close();
        }

        return xml;
    }

    public List<InformacionGeneralRV> obtieneInfoGeneralRV(Integer idFileUp){
        SimpleJdbcCall llamada = getLlamadaObtieneInfoGeneralRV();
        Map<String, Object> parametros = getParametrosObtieneInfoGeneralRV(idFileUp);
        Map<String, Object> respuesta = llamada.execute(parametros);
        return (List<InformacionGeneralRV>) respuesta.get("INF_GEN_PI");
    }

    private Map<String, Object> getParametrosObtieneInfoGeneralRV(Integer idFileUp) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put("ID_FILE_UPLOAD", idFileUp);
        return parametros;
    }

    private SimpleJdbcCall getLlamadaObtieneInfoGeneralRV() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("PKG_REPORTES")
                .withProcedureName("OBTIENE_INFO_GENERAL")
                .declareParameters(
                        new SqlParameter("ID_FILE_UPLOAD", OracleTypes.NUMBER),
                        new SqlOutParameter("INF_GEN_PI", OracleTypes.CURSOR, new InformacionGeneralRVMapper()),
                        new SqlOutParameter("pCOD", OracleTypes.NUMBER),
                        new SqlOutParameter("pMSG", OracleTypes.VARCHAR)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public String obtieneXMLInformePI(Integer idFileUp) throws SQLException {

        Connection cnn = null;
        CallableStatement cs = null;
        ConexionBD con = new ConexionBD();
        Utils util = new Utils();
        Clob xmlInforme = null;
        String xml = "";

        //logger.info("Obtener XML Informe PI para ID: "+idFileUp);

        try {

            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_FILES.OBTIENE_FILE_XML(?,?,?,?)}");
            cs.setInt(1, idFileUp);
            cs.registerOutParameter(2, OracleTypes.CLOB);
            cs.registerOutParameter(3, OracleTypes.NUMBER);
            cs.registerOutParameter(4, OracleTypes.VARCHAR);
            cs.executeQuery();

            Integer codRespuesta = (Integer) cs.getInt(3);
            String msnRespuesta = (String) cs.getString(4);

            //logger.info("codRespuesta: "+codRespuesta);
            //logger.info("msnRespuesta: "+msnRespuesta);

            if(codRespuesta == 0){
                xmlInforme = cs.getClob(2);
                xml = util.readClob(xmlInforme);
            }else{
                xml = "";
            }
            //logger.info("XML Informe PI: "+xml);

        }catch(NamingException e){
            e.fillInStackTrace();
            //logger.info("Error NamingException en el metodo obtieneXMLInformePI " + e.getMessage());	e.printStackTrace();
        }catch(SQLException e){
            e.fillInStackTrace();
            //logger.info("Error SQLException en el metodo obtieneXMLInformePI " + e.getMessage());	e.printStackTrace();
        }catch(Exception ex){
            ex.fillInStackTrace();
            //logger.info("Error en el metodo obtieneXMLInformePI " + ex.getMessage());
        }finally{
            cs.close();
            cnn.close();

        }
        return xml;
    }

    public String obtieneXMLErroresPI(int idFileUp) throws SQLException {

        Connection cnn = null;
        CallableStatement cs = null;
        ConexionBD con = new ConexionBD();

        Clob xmlErrores = null;
        String xml = "";
        Utils util = new Utils();
        //logger.info("Obtener XML Errores PI para ID: "+idFileUp);

        try {
            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_FILES.OBTIENE_LISTA_ERRORES(?,?,?,?)}");
            cs.setInt(1, idFileUp);
            cs.registerOutParameter(2, OracleTypes.CLOB);
            cs.registerOutParameter(3, OracleTypes.NUMBER);
            cs.registerOutParameter(4, OracleTypes.VARCHAR);
            cs.executeQuery();

            Integer codRespuesta = (Integer) cs.getInt(3);
            String msnRespuesta = (String) cs.getString(4);

            //logger.info("codRespuesta: "+codRespuesta);
            //logger.info("msnRespuesta: "+msnRespuesta);

            if(codRespuesta == 0){
                xmlErrores =  cs.getClob(2);
                xml = util.readClob(xmlErrores);
            }else{
                xml = "";
            }
            //logger.info("XML Errores PI: "+xml);

        }catch(NamingException e){
            e.fillInStackTrace();
            //logger.info("Error NamingException en el metodo obtieneXMLErroresPI " + e.getMessage());	e.printStackTrace();
        }catch(SQLException e){
            e.fillInStackTrace();
            //logger.info("Error SQLException en el metodo obtieneXMLErroresPI " + e.getMessage());	e.printStackTrace();
        }catch(Exception ex){
            ex.fillInStackTrace();
            //logger.info("Error en el metodo obtieneXMLErroresPI " + ex.getMessage());
        }finally{
            cs.close();
            cnn.close();
            //super.cerrarCallable(cs); super.cerrarConexion(cnn);
        }

        return xml;
    }

    public InformacionGeneralRV obtieneInfoGeneralRV(int idFileUp) throws SQLException {

        Connection cnn = null;
        CallableStatement cs = null;
        ConexionBD con = new ConexionBD();
        ResultSet rs  = null;

        InformacionGeneralRV info = new InformacionGeneralRV();
        //logger.info("Obtener Informacio General RV para ID: "+idFileUp);
        try {

            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_REPORTES.OBTIENE_INFO_GENERAL(?,?,?,?)}");
            cs.setInt(1, idFileUp);
            cs.registerOutParameter(2, OracleTypes.CURSOR);
            cs.registerOutParameter(3, OracleTypes.NUMBER);
            cs.registerOutParameter(4, OracleTypes.VARCHAR);
            cs.executeQuery();

            Integer codRespuesta = (Integer) cs.getInt(3);
            String msnRespuesta = (String) cs.getString(4);

            //logger.info("codRespuesta: "+codRespuesta);
            //logger.info("msnRespuesta: "+msnRespuesta);

            if(codRespuesta == 0){

                rs = (ResultSet) cs.getObject(2);
                while(rs.next()){

                    info.setEjercicio(rs.getString("EJERCICIO"));
                    info.setEntidad(rs.getString("ENTIDAD"));
                    info.setEstado(rs.getString("ESTADO"));
                    info.setInforme(rs.getString("INFORME"));
                    info.setPeriodo(rs.getString("PERIODO"));
                    info.setTipoInforme(rs.getString("TIPO_INFORME"));
                    info.setUsuario(rs.getString("USUARIO"));
                }

            }else{

                return null;
            }

        }catch(NamingException e){
            e.fillInStackTrace();
            //logger.info("Error NamingException en el metodo obtieneInfoGeneralRV " + e.getMessage());	e.printStackTrace();
        }catch(SQLException e){
            e.fillInStackTrace();
            //logger.info("Error SQLException en el metodo obtieneInfoGeneralRV " + e.getMessage());	e.printStackTrace();
        }catch(Exception ex){
            ex.fillInStackTrace();
            //logger.info("Error en el metodo obtieneInfoGeneralRV " + ex.getMessage());
        }finally{
            cs.close();
            cnn.close();
            //super.cerrarCallable(cs); super.cerrarConexion(cnn);
        }
        return info;
    }

    private SimpleJdbcCall getLlamadaInformesForSend(){
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_REPORTES)
                .withProcedureName("GET_INFORMES_VALIDADOS")
                .declareParameters(
                        new SqlParameter(IN_ENTIDAD_ID, OracleTypes.NUMBER),
                        new SqlParameter(IN_PEJERCICIO, OracleTypes.NUMBER),
                        new SqlParameter(IN_TPINFORME, OracleTypes.NUMBER),
                        new SqlOutParameter(OUT_CODIGO, OracleTypes.NUMBER),
                        new SqlOutParameter(OUT_MENSAJE, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_INFORMES, OracleTypes.CURSOR)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    private Map<String, Object> getParametrosInformesForSend(Integer idEntidad,
                                                             Integer idEjercicio,
                                                             Integer idTipoInforme) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_ENTIDAD_ID, idEntidad);
        parametros.put(IN_PEJERCICIO, idEjercicio);
        parametros.put(IN_TPINFORME, idTipoInforme);
        return parametros;
    }

    private SimpleJdbcCall getLlamadaCorreccionesPendientes() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_PRUEBAS)
                .withProcedureName("GET_CORRECCIONES_PENDIENTES")
                .declareParameters(
                        new SqlParameter(IN_PARTIDA_ID, OracleTypes.VARCHAR),
                        new SqlParameter(IN_CAPITULO_ID, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_CORR_PEND, OracleTypes.CURSOR, new CorreccionPendienteMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    private Map<String, Object> getParametrosCorreccionesPendientes(String idPart,
                                                                    String idCap) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_PARTIDA_ID, idPart);
        parametros.put(IN_CAPITULO_ID, idCap);
        return parametros;
    }

    public Map<String,Object> obtieneReporteValidacionPaginacion(Integer idArchivo,
                                                                 Integer numPagina,
                                                                 Integer numRegistros,
                                                                 String flagAll) {
        try {
            SimpleJdbcCall llamada = obtieneLlamadaReporteValidacionPaginacion();
            Map<String, Object> parametros = obtieneParametrosReporteValidacionPaginacion(idArchivo, numPagina, numRegistros, flagAll);
            Map<String, Object> respuesta = llamada.execute(parametros);

            BigDecimal codEjecBD = (BigDecimal) respuesta.get(OUT_COD_EJEC);
            Integer codEjec = codEjecBD.intValue();

            if (codEjec == 0) {
                Map<String, Object> resultado = new HashMap<String, Object>();
                BigDecimal numTotalRegistros = (BigDecimal) respuesta.get(OUT_NUMERO_REGISTROS_TOTAL);
                resultado.put(ReporteValidacionConstants.LISTA_DETALLES_KEY, respuesta.get(OUT_LISTA_DETALLES_CURSOR));
                resultado.put(ReporteValidacionConstants.NUM_TOTAL_REGISTROS_KEY, numTotalRegistros.intValue());
                return resultado;
            } else {
                throw new SicogenException(codEjec.toString(), (String) respuesta.get(OUT_MSG_EJEC));
            }
        } catch (SicogenException e) {
            throw e;
        } catch (Exception e) {
            throw new SicogenException("500", e.getLocalizedMessage());
        }
    }

    private Map<String, Object> obtieneParametrosReporteValidacionPaginacion(Integer idArchivo,
                                                                             Integer numPagina,
                                                                             Integer numRegistros,
                                                                             String flagAll) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_FILEU_ID, idArchivo);
        parametros.put(IN_NUMERO_PAGINA, numPagina);
        parametros.put(IN_NUMERO_REGISTROS, numRegistros);
        parametros.put(FLAG_ALL, flagAll);
        return parametros;
    }

    private SimpleJdbcCall obtieneLlamadaReporteValidacionPaginacion() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_NOTIFICACION_IC)
                .withProcedureName("OBTIENE_DETALLES_INFORME_PAG")
                .declareParameters(
                        new SqlParameter(IN_FILEU_ID, OracleTypes.NUMBER),
                        new SqlParameter(IN_NUMERO_PAGINA, OracleTypes.NUMBER),
                        new SqlParameter(IN_NUMERO_REGISTROS, OracleTypes.NUMBER),
                        new SqlParameter(FLAG_ALL, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_NUMERO_REGISTROS_TOTAL, OracleTypes.NUMBER),
                        new SqlOutParameter(OUT_LISTA_DETALLES_CURSOR, OracleTypes.CURSOR, new ReporteValidacionMapper()),
                        new SqlOutParameter(OUT_COD_EJEC, OracleTypes.NUMBER),
                        new SqlOutParameter(OUT_MSG_EJEC, OracleTypes.VARCHAR)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public InformeContableDTO obtieneDatosInformeContable(Integer idArchivo) {

        try {
            SimpleJdbcCall llamada = llamadaObtieneDatosInformeContable();
            Map<String, Object> parametros = parametrosObtieneDatosInformeContable(idArchivo);
            Map<String, Object> respuesta = llamada.execute(parametros);
            Integer codEjec = (Integer) respuesta.get(OUT_COD_EJEC);

            if (codEjec == 0) {
                InformeContableDTO informeContableDTO = new InformeContableDTO();
                informeContableDTO.setUuid((String) respuesta.get(OUT_UUID_IC));
                informeContableDTO.setPartida((String) respuesta.get(OUT_PARTIDA_IC));
                informeContableDTO.setCapitulo((String) respuesta.get(OUT_CAPITULO_IC));
                informeContableDTO.setRut((String) respuesta.get(OUT_RUT_IC));
                informeContableDTO.setErroresGenericos((List<ErrorGenerico>) respuesta.get(OUT_LISTA_ERRORES_GENERICOS));
                informeContableDTO.setErrorEsquema((Integer) respuesta.get(ERROR_ESQUEMA));
                return informeContableDTO;
            } else {
                throw new SicogenException(codEjec.toString(), (String) respuesta.get(OUT_MSG_EJEC));
            }
        } catch (SicogenException e) {
            throw e;
        } catch (Exception e) {
            throw new SicogenException("500", e.getLocalizedMessage());
        }

    }

    private Map<String, Object> parametrosObtieneDatosInformeContable(Integer idArchivo) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_FILEU_ID, idArchivo);
        return parametros;
    }

    private SimpleJdbcCall llamadaObtieneDatosInformeContable() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_NOTIFICACION_IC)
                .withProcedureName("OBTIENE_INFO_IC_v2")
                .declareParameters(
                        new SqlParameter(IN_FILEU_ID, OracleTypes.NUMBER),
                        new SqlOutParameter(OUT_UUID_IC, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_PARTIDA_IC, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_CAPITULO_IC, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_RUT_IC, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_LISTA_ERRORES_GENERICOS, OracleTypes.CURSOR, new ErroresGenericosMapper()),
                        new SqlOutParameter(ERROR_ESQUEMA, OracleTypes.INTEGER),
                        new SqlOutParameter(OUT_COD_EJEC, OracleTypes.INTEGER),
                        new SqlOutParameter(OUT_MSG_EJEC, OracleTypes.VARCHAR)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public Integer guardaInformeContable(String codPeriodo,
                                         String codEjercicio,
                                         String codPartida,
                                         String codCapitulo,
                                         String nonbreArchivo,
                                         String nombreUsuario,
                                         Integer numeroRegistros) throws Exception {
        try {
            SimpleJdbcCall llamada = getLlamadaGuardaInformeContable();
            Map<String, Object> parametros = getParametrosguardaInformeContable(nonbreArchivo,
                    codCapitulo, codEjercicio, codPeriodo, nombreUsuario, codPartida, numeroRegistros);
            Map<String, Object> respuesta = llamada.execute(parametros);

            Integer codEjec = (Integer) respuesta.get(OUT_COD_EJEC);

            if (codEjec.equals(0)) {
                return (Integer) respuesta.get(OUT_ID_ARCHIVO);
            } else {
                throw new SicogenException(String.valueOf(codEjec), (String) respuesta.get(OUT_MSG_EJEC));
            }
        } catch (Exception e) {
            if (e instanceof SicogenException) {
                throw e;
            } else {
                throw new SicogenException("500", e.getLocalizedMessage());
            }
        }
    }

    private Map<String, Object> getParametrosguardaInformeContable(String nonbreArchivo,
                                                                   String codCapitulo,
                                                                   String codEjercicio,
                                                                   String codPeriodo,
                                                                   String nombreUsuario,
                                                                   String codPartida,
                                                                   Integer numeroRegistros) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_UUID_INFORME, nonbreArchivo);
        parametros.put(IN_CAPITULO, codCapitulo);
        parametros.put(IN_EJERCICIO, codEjercicio);
        parametros.put(IN_PERIODO, codPeriodo);
        parametros.put(IN_PARTIDA, codPartida);
        parametros.put(IN_NUM_REGISTROS, numeroRegistros);
        parametros.put(IN_NOM_USUARIO, nombreUsuario);
        return parametros;
    }

    private SimpleJdbcCall getLlamadaGuardaInformeContable() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_NOTIFICACION_IC)
                .withProcedureName("SET_NOTIFICACION_IC")
                .declareParameters(
                        new SqlParameter(IN_UUID_INFORME, OracleTypes.VARCHAR),
                        new SqlParameter(IN_CAPITULO, OracleTypes.VARCHAR),
                        new SqlParameter(IN_EJERCICIO, OracleTypes.VARCHAR),
                        new SqlParameter(IN_PERIODO, OracleTypes.VARCHAR),
                        new SqlParameter(IN_PARTIDA, OracleTypes.VARCHAR),
                        new SqlParameter(IN_NUM_REGISTROS, OracleTypes.NUMBER),
                        new SqlParameter(IN_NOM_USUARIO, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_COD_EJEC, OracleTypes.INTEGER),
                        new SqlOutParameter(OUT_MSG_EJEC, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_ID_ARCHIVO, OracleTypes.INTEGER)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public String obtieneCodigoInforme(Integer idInformeContable) {
        try {
            String sql = "SELECT INF_CODIGO FROM TBL_INFORMES WHERE INF_ID = " + idInformeContable;
            return jdbcTemplate.queryForObject(sql, String.class);
        } catch (Exception e) {
            throw new SicogenException("500", e.getLocalizedMessage());
        }
    }

    public void actualizaEstadoValidacionIC(Integer idArchivo, String estado) throws Exception {
        try {
            SimpleJdbcCall llamada = getLlamadaActualizaEstadoValidacionIC();
            Map<String, Object> parametros = getParametrosActualizaEstadoValidacionIC(idArchivo, estado);
            Map<String, Object> respuesta = llamada.execute(parametros);

            Integer codEjec = (Integer) respuesta.get(OUT_COD_EJEC);

            if (!codEjec.equals(0)) {
                throw new SicogenException(String.valueOf(codEjec), (String) respuesta.get(OUT_MSG_EJEC));
            }
        } catch (Exception e) {
            if (e instanceof SicogenException) {
                throw e;
            } else {
                throw new SicogenException("500", e.getLocalizedMessage());
            }
        }
    }

    private Map<String, Object> getParametrosActualizaEstadoValidacionIC(Integer idArchivo, String estado) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_FILEU_ID, idArchivo);
        parametros.put(IN_ESTADO, estado);
        return parametros;
    }

    private SimpleJdbcCall getLlamadaActualizaEstadoValidacionIC() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_NOTIFICACION_IC)
                .withProcedureName("UPDATE_ESTADO_VALIDACION")
                .declareParameters(
                        new SqlParameter(IN_FILEU_ID, OracleTypes.NUMBER),
                        new SqlParameter(IN_ESTADO, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_COD_EJEC, OracleTypes.INTEGER),
                        new SqlOutParameter(OUT_MSG_EJEC, OracleTypes.VARCHAR)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public void insertaListaErrores(Integer idArchivo, String listaErrores, String usuario) throws Exception {
        try {
            SimpleJdbcCall llamada = getLlamadaInsertaListaErrores();
            Map<String, Object> parametros = getParametrosInsertaListaErrores(idArchivo, listaErrores, usuario);
            Map<String, Object> respuesta = llamada.execute(parametros);

            Integer codEjec = (Integer) respuesta.get(OUT_COD);

            if (!codEjec.equals(0)) {
                throw new SicogenException(String.valueOf(codEjec), (String) respuesta.get(OUT_MSG));
            }
        } catch (Exception e) {
            if (e instanceof SicogenException) {
                throw e;
            } else {
                throw new SicogenException("500", e.getLocalizedMessage());
            }
        }
    }

    private Map<String, Object> getParametrosInsertaListaErrores(Integer idArchivo, String listaErrores, String usuario) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put(IN_ID_FILE_UPLOAD, idArchivo);
        parametros.put(IN_XML_ERRORES, listaErrores);
        parametros.put(IN_USUARIO, usuario);
        return parametros;
    }

    private SimpleJdbcCall getLlamadaInsertaListaErrores() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_FILES)
                .withProcedureName("INSERTA_LISTA_ERRORES")
                .declareParameters(
                        new SqlParameter(IN_ID_FILE_UPLOAD, OracleTypes.NUMBER),
                        new SqlParameter(IN_XML_ERRORES, OracleTypes.CLOB),
                        new SqlParameter(IN_USUARIO, OracleTypes.VARCHAR),
                        new SqlOutParameter(OUT_ROW_ID, OracleTypes.INTEGER),
                        new SqlOutParameter(OUT_COD, OracleTypes.INTEGER),
                        new SqlOutParameter(OUT_MSG, OracleTypes.VARCHAR)
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public void updateDocumentoXMLIC(final Integer idArchivo, final String documentoXML) {
        try {
            SimpleJdbcCall call = updateDocumentoXMLICCall();
            Map<String, Object> params = updateDocumentoXMLICParams(idArchivo, documentoXML);
            call.execute(params);
        } catch (Exception e) {
            throw new SicogenException("500", e.getLocalizedMessage());
        }
    }

    private Map<String, Object> updateDocumentoXMLICParams(Integer idArchivo, String documentoXML) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(P_FILEU_ID, idArchivo);
        params.put("p_documento_xml", documentoXML);
        return params;
    }

    private SimpleJdbcCall updateDocumentoXMLICCall() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_NOTIFICACION_IC)
                .withProcedureName("upd_docuento_xml_by_fileu_id")
                .declareParameters(
                        new SqlParameter(P_FILEU_ID, OracleTypes.NUMERIC),
                        new SqlParameter("p_documento_xml", OracleTypes.CLOB)
                );
    }

    public void actualizaNumeroRegistrosInforme(final Integer idArchivo, final Integer numeroRegistros) {
        try {
            SimpleJdbcCall call = actualizaNumeroRegistrosInformeCall();
            Map<String, Object> params = actualizaNumeroRegistrosInformeParams(idArchivo, numeroRegistros);
            call.execute(params);
        } catch (Exception e) {
            throw new SicogenException("500", e.getLocalizedMessage());
        }
    }

    private Map<String, Object> actualizaNumeroRegistrosInformeParams(Integer idArchivo, Integer numeroRegistros) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(P_FILEU_ID, idArchivo);
        params.put("p_num_registros", numeroRegistros);
        return params;
    }

    private SimpleJdbcCall actualizaNumeroRegistrosInformeCall() {
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName(PKG_NOTIFICACION_IC)
                .withProcedureName("upd_num_registros_by_fileu_id")
                .declareParameters(
                        new SqlParameter(P_FILEU_ID, OracleTypes.NUMERIC),
                        new SqlParameter("p_num_registros", OracleTypes.NUMERIC)
                );
    }

    public Integer obtieneIdEstadoInforme(Integer idArchivo) {
        try {
            String sql = "SELECT ESTADO_ID FROM TBL_FILE_UPLOAD WHERE FILEU_ID = ?";
            return jdbcTemplate.queryForObject(sql, new Object[]{idArchivo}, Integer.class);
        } catch (Exception e) {
            throw new SicogenException("500", e.getLocalizedMessage());
        }
    }

    public List<TiposDeInformesDTO> listaInformes(){
        SimpleJdbcCall llamada = getAllInformes();
        //Map<String, Object> parametros = getParametrosAllInformes();
        return (List<TiposDeInformesDTO>) llamada.execute().get("pINFORMES");
    }

    private SimpleJdbcCall getAllInformes(){
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("PKG_INFORMES")
                .withProcedureName("GET_INFORMES")
                .declareParameters(
                        new SqlOutParameter("pINFORMES", OracleTypes.CURSOR, new AllInformesMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public List<ReportesDTO> listaReportes(Integer informe){
        SimpleJdbcCall llamada = getReportes();
        Map<String, Object> parametros = getParametrosReportes(informe);
        return (List<ReportesDTO>) llamada.execute(parametros).get("cREPORTES");
    }

    private Map<String, Object> getParametrosReportes(Integer informe) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put("pINF_ID", informe);
        return parametros;
    }

    private SimpleJdbcCall getReportes(){
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("PKG_REPORTES")
                .withProcedureName("GET_REPORTES_ByInf")
                .declareParameters(
                        new SqlParameter("pINF_ID", OracleTypes.INTEGER),
                        new SqlOutParameter("cREPORTES", OracleTypes.CURSOR, new ReporteMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public List<Periodos> getPeriodosByInforme(Integer ejercicio, Integer informe){
        SimpleJdbcCall llamada = getComboPeriodoxInforme();
        Map<String, Object> parametros = getParametrosComboPeriodoxInforme(ejercicio, informe);
        return (List<Periodos>) llamada.execute(parametros).get("CURSOR_PERIODO");
    }

    private Map<String, Object> getParametrosComboPeriodoxInforme(Integer ejercicio, Integer informe) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put("pEJERCICIO", ejercicio);
        parametros.put("pINFORME", informe);
        return parametros;
    }

    private SimpleJdbcCall getComboPeriodoxInforme(){
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("PKG_INFORMES")
                .withProcedureName("GET_PERIODO_ByInforme")
                .declareParameters(
                        new SqlParameter("pEJERCICIO", OracleTypes.INTEGER),
                        new SqlParameter("pINFORME", OracleTypes.INTEGER),
                        new SqlOutParameter("CURSOR_PERIODO", OracleTypes.CURSOR, new TipoComboPeriodoxInformeMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }

    public Disponibilidades getReporteCuaDisponibilidades(long idFileUpload) throws SQLException {
        Connection 			cntConexion=null;
        CallableStatement 	clsProcedimiento=null;
        Disponibilidades 	objReporte=new Disponibilidades();
        ConexionBD 			cnxBaseDatos=new ConexionBD();
        Resumen 	objResumen;
        String strCodigoCtaCble;

        ResultSet rstCabecera			=null,rstRecursosDispo	=null,
                rstCuentasCobrar		=null,rstCuentasPagar	=null,
                rstCuentasComplemento	=null;
        List<Resumen> lstCabecera		,lstRecursosDispo	,
                lstCuentasCobrar	,lstCuentasPagar	,
                lstCuentasComplemento;
        long lngRecDispoDebe,lngRecDispoHaber,
                lngCtaCobrarDebe,lngCtaCobrarHaber,
                lngCtaPagarDebe,lngCtaPagarHaber,
                lngCtaCmptoDebe,lngCtaCmptoHaber;

        long lngLineaCuenta;

        try{
            cntConexion		=cnxBaseDatos.abrirConexionAtencion();
            clsProcedimiento=cntConexion.prepareCall("{call PKG_REPORTES.GET_REPORTE_CUADISPONIBILIDAD(?,?,?,?,?,?)}");

            clsProcedimiento.setInt(1,Integer.parseInt(String.valueOf(idFileUpload)));
            clsProcedimiento.registerOutParameter(2, OracleTypes.CURSOR);
            clsProcedimiento.registerOutParameter(3, OracleTypes.CURSOR);
            clsProcedimiento.registerOutParameter(4, OracleTypes.CURSOR);
            clsProcedimiento.registerOutParameter(5, OracleTypes.CURSOR);
            clsProcedimiento.registerOutParameter(6, OracleTypes.CURSOR);
            clsProcedimiento.executeQuery();
            rstCabecera				=(ResultSet)clsProcedimiento.getObject(2);
            rstRecursosDispo		=(ResultSet)clsProcedimiento.getObject(3);
            rstCuentasCobrar		=(ResultSet)clsProcedimiento.getObject(4);
            rstCuentasPagar			=(ResultSet)clsProcedimiento.getObject(5);
            rstCuentasComplemento	=(ResultSet)clsProcedimiento.getObject(6);

            while(rstCabecera.next()){

                objReporte.setEjercicioNombre(rstCabecera.getString("CABECERA_EJERCICIO"));
                objReporte.setNombreEntidad(rstCabecera.getString("CABECERA_NOMENTIDAD"));
                objReporte.setPeriodoNombre(rstCabecera.getString("CABECERA_NOMPERIODO"));
                objReporte.setResultado(rstCabecera.getString("CABECERA_NOMESTADO"));
            }
            lstRecursosDispo=new ArrayList<Resumen>();

            lngRecDispoDebe	=0;
            lngRecDispoHaber=0;
            lngLineaCuenta	=2;

            while(rstRecursosDispo.next()){
                objResumen=new Resumen();
                strCodigoCtaCble=String.format("%s%s", rstRecursosDispo.getString("RECURSODISPO_CTACTBLEAGRUPA"),
                        rstRecursosDispo.getString("RECURSODISPO_CTACTBLECTAN1"));
                objResumen.setLinea(String.valueOf(lngLineaCuenta));
                objResumen.setCodCta(strCodigoCtaCble);
                objResumen.setCuenta(rstRecursosDispo.getString("RECURSODISPO_CTACTBLEDENOM"));
                objResumen.setDebe(rstRecursosDispo.getLong("RECURSODISPO_MONTODEBECLP"));
                objResumen.setHaber(rstRecursosDispo.getLong("RECURSODISPO_MONTOHABERCLP"));
                lstRecursosDispo.add(objResumen);
                lngRecDispoDebe	+=objResumen.getDebe();
                lngRecDispoHaber+=objResumen.getHaber();
                lngLineaCuenta++;
            }

            objReporte.setRecDisp(lstRecursosDispo);
            objReporte.setRecDispDebe(lngRecDispoDebe);
            objReporte.setRecDispHaber(lngRecDispoHaber);

            lstCuentasCobrar=new ArrayList<Resumen>();
            lngCtaCobrarDebe	=0;
            lngCtaCobrarHaber	=0;
            while(rstCuentasCobrar.next()){
                objResumen=new Resumen();
                strCodigoCtaCble=String.format("%s%s", rstCuentasCobrar.getString("CUENTASXCOBRAR_CTACTBLEAGRUPA"),
                        rstCuentasCobrar.getString("CUENTASXCOBRAR_CTACTBLECTAN1"));
                objResumen.setLinea(String.valueOf(lngLineaCuenta));
                objResumen.setCodCta(strCodigoCtaCble);
                objResumen.setCuenta(rstCuentasCobrar.getString("CUENTASXCOBRAR_CTACTBLEDENOM"));
                objResumen.setDebe(rstCuentasCobrar.getLong("CUENTASXCOBRAR_MONTODEBECLP"));
                objResumen.setHaber(rstCuentasCobrar.getLong("CUENTASXCOBRAR_MONTOHABERCLP"));
                lstCuentasCobrar.add(objResumen);
                lngCtaCobrarDebe	+=objResumen.getDebe();
                lngCtaCobrarHaber	+=objResumen.getHaber();
                lngLineaCuenta++;
            }

            objReporte.setCtaxCob(lstCuentasCobrar);
            objReporte.setCtaCobDebe(lngCtaCobrarDebe);
            objReporte.setCtaCobHaber(lngCtaCobrarHaber);

            lstCuentasPagar=new ArrayList<Resumen>();
            lngCtaPagarDebe	=0;
            lngCtaPagarHaber=0;
            while(rstCuentasPagar.next()){
                objResumen=new Resumen();
                strCodigoCtaCble=String.format("%s%s", rstCuentasPagar.getString("CUENTASXPAGAR_CTACTBLEAGRUPA"),
                        rstCuentasPagar.getString("CUENTASXPAGAR_CTACTBLECTAN1"));
                objResumen.setCodCta(strCodigoCtaCble);
                objResumen.setLinea(String.valueOf(lngLineaCuenta));
                objResumen.setCuenta(rstCuentasPagar.getString("CUENTASXPAGAR_CTACTBLEDENOM"));
                objResumen.setDebe(rstCuentasPagar.getLong("CUENTASXPAGAR_MONTODEBECLP"));
                objResumen.setHaber(rstCuentasPagar.getLong("CUENTASXPAGAR_MONTOHABERCLP"));
                lstCuentasPagar.add(objResumen);
                lngCtaPagarDebe	+=objResumen.getDebe();
                lngCtaPagarHaber+=objResumen.getHaber();
                lngLineaCuenta++;
            }

            objReporte.setCtaxPag(lstCuentasPagar);
            objReporte.setCtaPagDebe(lngCtaPagarDebe);
            objReporte.setCtaPagHaber(lngCtaPagarHaber);

            lstCuentasComplemento=new ArrayList<Resumen>();
            lngCtaCmptoDebe	=0;
            lngCtaCmptoHaber=0;

            while(rstCuentasComplemento.next()){
                objResumen=new Resumen();
                strCodigoCtaCble=String.format("%s%s", rstCuentasComplemento.getString("CUENTASCPTOS_CTACTBLEAGRUPA"),
                        rstCuentasComplemento.getString("CUENTASCPTOS_CTACTBLECTAN1"));
                objResumen.setCodCta(strCodigoCtaCble);
                objResumen.setLinea(String.valueOf(lngLineaCuenta));
                objResumen.setCuenta(rstCuentasComplemento.getString("CUENTASCPTOS_CTACTBLEDENOM"));
                objResumen.setDebe(rstCuentasComplemento.getLong("CUENTASCPTOS_MONTODEBECLP"));
                objResumen.setHaber(rstCuentasComplemento.getLong("CUENTASCPTOS_MONTOHABERCLP"));
                lstCuentasComplemento.add(objResumen);
                lngCtaCmptoDebe	+=objResumen.getDebe();
                lngCtaCmptoHaber+=objResumen.getHaber();
                lngLineaCuenta++;
            }

            objReporte.setCtaComp(lstCuentasComplemento);
            objReporte.setCtaComDebe(lngCtaCmptoDebe);
            objReporte.setCtaComHaber(lngCtaCmptoHaber);

            lstCabecera=new ArrayList<Resumen>();
            objResumen	=new Resumen();
            objResumen.setCuenta("DEBITOS RECURSOS DISPONIBLES (111 debitos)");
            objResumen.setDebe(lngRecDispoDebe);
            lstCabecera.add(objResumen);

            objResumen=new Resumen();
            objResumen.setCuenta("CREDITOS RECURSOS DISPONIBLES (111 creditos)");
            objResumen.setHaber(lngRecDispoHaber);
            lstCabecera.add(objResumen);

            objResumen=new Resumen();
            objResumen.setCuenta("VARIACION DE DISPONIBILIDADES");
            objResumen.setHaber(lngRecDispoDebe - lngRecDispoHaber);
            lstCabecera.add(objResumen);

            objResumen=new Resumen();
            objResumen.setCuenta("PERCIBIDO (115 creditos)");
            objResumen.setHaber(lngCtaCobrarHaber);
            lstCabecera.add(objResumen);

            objResumen=new Resumen();
            objResumen.setCuenta("PAGADO (215 debitos)");
            objResumen.setDebe(lngCtaPagarDebe);
            lstCabecera.add(objResumen);


            objResumen=new Resumen();
            objResumen.setCuenta("ACREEDORES (credito complementarias)");
            objResumen.setHaber(lngCtaCmptoHaber);
            lstCabecera.add(objResumen);

            objResumen=new Resumen();
            objResumen.setCuenta("DEUDORES (debito complementarias))");
            objResumen.setDebe(lngCtaCmptoDebe);
            lstCabecera.add(objResumen);

            objReporte.setCabeceraVar(lstCabecera);

        } catch (NamingException e) {
            e.getMessage();
        } catch (SQLException e) {
            e.getMessage();
        }catch(Exception ex){
            ex.getMessage();
        }finally{
            clsProcedimiento.close();
            rstCabecera.close();
            rstRecursosDispo.close();
            rstCuentasCobrar.close();
            rstCuentasPagar.close();
            rstCuentasComplemento.close();
            cntConexion.close();
        }
        return objReporte;
    }

    public InformeArchivoDet getArchivo(int idFileUp) throws Exception {

        Connection cnn = null;
        CallableStatement cs = null;
        ConexionBD con = new ConexionBD();
        ResultSet rs = null;
        Clob xmlCont;
        String xml = "";
        String nombre = "";
        try {
            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_FILES.OBTIENE_FILE_XML_NOMBRE(?,?,?,?,?)}");
            cs.setInt(1, idFileUp);
            cs.registerOutParameter(2, OracleTypes.CLOB);
            cs.registerOutParameter(3, OracleTypes.VARCHAR);
            cs.registerOutParameter(4, OracleTypes.NUMBER);
            cs.registerOutParameter(5, OracleTypes.VARCHAR);
            cs.executeQuery();

            xmlCont = cs.getClob(2); //xmlInforme = cs.getClob(2);
            xml = Utils.readClob(xmlCont);
            nombre = cs.getString(3);
            // logger.info(nombre);

        } catch (NamingException e)  {
            //error=Excepciones.getError(e);  logger.info("NamingException:" + error); throw e;
        } catch (SQLException e) {
            //error=Excepciones.getError(e); logger.info("SQLException:" + error); throw e;
        } catch(Exception e){
            //error=Excepciones.getError(e); logger.info("Exception:" + error); throw e;
        } finally {
            if (cs != null)
                cs.close();
            if(rs!=null)
                rs.close();
            if(cnn!=null)
                cnn.close();
        }

        InformeDetDescarga informeDetDescarga = new  InformeDetDescarga();
        informeDetDescarga.setLinea(xml);
        informeDetDescarga.setNombre(nombre);
        List<InformeDetDescarga> listaDetalle = new ArrayList<InformeDetDescarga>();
        listaDetalle.add(informeDetDescarga);
        InformeArchivoDet informeArchivo = new InformeArchivoDet();
        informeArchivo.setListaDetalle(listaDetalle);
        return informeArchivo;

    }

    public CertificadoEnvioDTO getCertificadoEnvioByCert(Integer certificado)throws Exception
    {
        Connection cnn = null;
        ConexionBD con = new ConexionBD();
        CallableStatement cs = null;

        ResultSet rs1 = null;
        ResultSet rs2 = null;

        CertificadoEnvioDTO cert = new CertificadoEnvioDTO();
        try {
            cnn = con.abrirConexionAtencion();
            cs  = cnn.prepareCall("{call PKG_REPORTES.GET_CERTIFICADO_ByCert(?, ?, ?, ?) }");
            cs.setInt(1, certificado);
            cs.registerOutParameter(2, OracleTypes.CURSOR);
            cs.registerOutParameter(3, OracleTypes.CURSOR);
            cs.registerOutParameter(4, OracleTypes.VARCHAR);
            cs.executeQuery();

            rs1 = (ResultSet) cs.getObject(2);

            while(rs1.next()){
                cert.setCertificado(rs1.getString("NUM_CERT"));
                cert.setUsuario(rs1.getString("USUARIO"));
                cert.setFecha(rs1.getString("FECHA_CERTIFICADO"));
                cert.setEntidad(rs1.getString("ENTIDAD"));
            }
            rs2 = (ResultSet) cs.getObject(3);
            int fila = 1;
            while(rs2.next())
            {
                cert.addDetInf(
                        rs2.getString("TIPO_INFORME"),
                        rs2.getString("SUB_TIPO_INFORME"),
                        rs2.getString("INFORME"),
                        rs2.getString("PERIODO"),
                        rs2.getString("EJERCICIO"),
                        rs2.getString("NOTA"));
                cert.setRowClass("row"+fila);

                if(fila == 1){
                    fila=0;
                }
                else{
                    fila=1;
                }
            }

        }catch(NamingException e){
            e.fillInStackTrace();
        }catch(SQLException e){
            e.fillInStackTrace();
        }catch(Exception e){
            e.fillInStackTrace();
        }finally {
            cs.close();
            rs1.close();
            rs2.close();
            cnn.close();
        }
        return cert;
    }

    public List<ReportesBitacoraDTO> listaReporteBitacora(Integer idFile){
        SimpleJdbcCall llamada = getBitacoras();
        Map<String, Object> parametros = getParametrosBitacora(idFile);
        return (List<ReportesBitacoraDTO>) llamada.execute(parametros).get("pREPORTE_BITACORA");
    }

    private Map<String, Object> getParametrosBitacora(Integer idFile) {
        Map<String, Object> parametros = new HashMap<String, Object>();
        parametros.put("pFILEUPLOAD_ID", idFile);
        return parametros;
    }

    private SimpleJdbcCall getBitacoras(){
        return new SimpleJdbcCall(jdbcTemplate)
                .withCatalogName("PKG_REPORTES")
                .withProcedureName("GET_REPORTE_BITACORA")
                .declareParameters(
                        new SqlParameter("pFILEUPLOAD_ID", OracleTypes.INTEGER),
                        new SqlOutParameter("pREPORTE_BITACORA", OracleTypes.CURSOR, new BitacoraMapper())
                )
                .withoutProcedureColumnMetaDataAccess();
    }
}
