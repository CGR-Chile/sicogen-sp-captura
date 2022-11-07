package cl.contraloria.sicogen.dao;

import cl.contraloria.sicogen.model.Informes;
import cl.contraloria.sicogen.utils.ConexionBD;
import cl.contraloria.sicogen.utils.InformeArchivoDTO;
import cl.contraloria.sicogen.utils.InformesEstadosAnualBO;
import oracle.jdbc.OracleTypes;
import org.springframework.stereotype.Component;

import javax.naming.NamingException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class EstadoInformesDAO {

    public InformesEstadosAnualBO getEstadoInformeAnual(Integer idEntidad, Integer idEjercicio, Integer idTipoInforme) throws SQLException {

        Connection cnn = null;
        CallableStatement cs = null;
        ResultSet rs1 = null;
        ResultSet rs2 = null;

        ConexionBD con = new ConexionBD();
        InformesEstadosAnualBO inAnualBO= new InformesEstadosAnualBO();
        try {
            cnn = con.abrirConexionAtencion();
            cs   = cnn.prepareCall("{call PKG_CONSULTA_INFORMES.GET_ESTADO_INF_ANUAL(?,?,?,?,?) }");
            cs.setInt(1, idEntidad);
            cs.setInt(2, idEjercicio);
            cs.setInt(3, idTipoInforme); //indica tipo de Informe seleccionado
            //algun dia para la correcciones agregar si es correccion o no
            cs.registerOutParameter(4, OracleTypes.CURSOR);
            cs.registerOutParameter(5, OracleTypes.CURSOR);
            //cs.registerOutParameter(6, OracleTypes.CURSOR); //para los Informes Pendientes

            cs.executeQuery();
            rs1 = (ResultSet) cs.getObject(4);
            int fila = 0;
            while(rs1.next()){
                Informes informe = new Informes();

                informe.setInformeId(rs1.getInt("INFORME_ID"));
                informe.setInformeCodigo(rs1.getString("INFORME_CODIGO"));
                informe.setInformeNombre(rs1.getString("INFORME_NOMBRE"));
                informe.setRowClass("row"+fila);

                if(fila == 0){
                    fila=1;
                }
                else{
                    fila=0;
                }

                inAnualBO.getInformes().add(informe);
            }
            rs2 = (ResultSet) cs.getObject(5);
            while(rs2.next()){
                InformeArchivoDTO archivo = new InformeArchivoDTO();

                archivo.setArchivoId(rs2.getInt("ARCHIVO_ID"));
                archivo.setPeriodoInformeId(rs2.getInt("PERIODO_INFORME_ID"));
                archivo.setEjercicioId(rs2.getInt("EJERCICIO_ID"));
                archivo.setCertificadoId(rs2.getInt("CERTIFICADO"));
                archivo.setInformeId(rs2.getInt("INFORME_ID"));
                archivo.setPeriodoEjercicioId(rs2.getInt("PERIODO_EJERCICIO_ID"));
                archivo.setPeriodoCodigo(rs2.getString("PERIODO_CODIGO"));
                archivo.setArchivoEstadoId(rs2.getInt("ARCHIVO_ESTADO_ID"));
                archivo.setArchivoEstadoNombre(rs2.getString("ARCHIVO_ESTADO_NOMBRE"));
                archivo.setArchivoUsuario(rs2.getString("USUARIO"));
                archivo.setArchivoFecha(rs2.getString("FECHA"));

                inAnualBO.getEstados().add(archivo);
            }


        } catch (NamingException e) {
            e.fillInStackTrace();

        } catch (SQLException e) {
            e.fillInStackTrace();

        }catch(Exception e){
            e.fillInStackTrace();
        }finally {
            cs.close();
            rs1.close();
            rs2.close();
            cnn.close();
        }
        return inAnualBO;

    }
}
       /*EntityManager em = entityManagerFactory.createEntityManager();
        StoredProcedureQuery query = em.createNamedStoredProcedureQuery("getInformeAnualEstado");
        query.setParameter("pENTIDAD", idEntidad);
        query.setParameter("pEJERCICIO", idEjercicio);
        query.setParameter("pTIPOINFOME", idTipoInforme);

        List<Object[]> result = query.getResultList();
        InformesEstadosAnualDTO  informesEstadoAnual = null;
        //Falta recorrer el objeto y asignar valores de arreglo
        return informesEstadoAnual;*/



    /*public List<InformesDTO> getInformesForSend(Integer idEntidad, Integer idEjercicio, Integer idTipoInforme, Integer codigo, String mensaje){

        EntityManager em = entityManagerFactory.createEntityManager();
        StoredProcedureQuery query = em.createNamedStoredProcedureQuery("getInformesForSend");
        query.setParameter("pENTIDAD_ID", idEntidad);
        query.setParameter("pPEJERCICIO", idEjercicio);
        query.setParameter("pTPINFORME", idTipoInforme);
        query.setParameter("pCODIGO", codigo);
        query.setParameter("pMENSAJE", mensaje);

        List<InformesDTO> result = query.getResultList();
        //Falta recorrer el objeto y asignar valores de arreglo

        return result;
    }
        /*public String obtienePasswordByNomUsuario(String nomUsuario) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.getNamedQuery("Usuario_obtienePasswordByNomUsuario");
        query.setParameter("nomUsuario", nomUsuario);
        return String.valueOf(query.uniqueResult());
    }*/







    /*public List<CorreccionPendienteDTO> getCorreccionesPendientes(String idPart, String idCap) throws SQLException {

        EntityManager em = entityManagerFactory.createEntityManager();
        StoredProcedureQuery query = em.createNamedStoredProcedureQuery("getCorreccionesPendientes");
        query.registerStoredProcedureParameter(1, String.class, ParameterMode.IN);
        query.setParameter(1, idPart);
        query.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);
        query.setParameter(2, idCap);
        query.registerStoredProcedureParameter(3, void.class, ParameterMode.REF_CURSOR);

        List<CorreccionPendienteDTO> result = query.getResultList();

        return result;
    }*/
        /*List result = new ArrayList();

        Session session = sessionFactory.getCurrentSession();
        ResultSet rs = null;

        Connection connObj = ((SessionImpl)session).connection();
        CallableStatement connStmt = connObj.prepareCall("{ call PKG_CONTRALORIA.RECUPERA_EJERCICIOS_FNC() }");
        connStmt.registerOutParameter(1, OracleTypes.CURSOR);
        boolean resulta = connStmt.execute();

        System.out.println(resulta);





        return result;


        /*Session session = sessionFactory.getCurrentSession();
        Query query = session.getNamedQuery("Usuario_obtienePasswordByNomUsuario");
        query.setParameter("nomUsuario", nomUsuario);
        return String.valueOf(query.uniqueResult());*/



