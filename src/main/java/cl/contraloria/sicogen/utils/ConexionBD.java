package cl.contraloria.sicogen.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class ConexionBD extends  CapturaExcepcion {
	
	private static final long serialVersionUID = -9101661324440780629L;
	private String error;

	public Connection abrirConexionAtencion() throws NamingException, SQLException, Exception {

		Connection conn = null;
		try{
			Context initContext = new InitialContext();
			DataSource ds = (DataSource) initContext.lookup("jdbc/jdbcContraloriaPUB");
			conn = ds.getConnection();
			return conn;
		}
		catch (NamingException ex){
			System.err.println(ex);
			return conn;
		}
		catch (SQLException ex){
			System.err.println(ex);
			return conn;
		}
	}

	public String getError() {
		return error;
	}
}