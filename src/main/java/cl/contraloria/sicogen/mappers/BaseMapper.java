package cl.contraloria.sicogen.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class BaseMapper {

	protected String getString(ResultSet rs, String nombre) throws SQLException {
		try {
			String str = rs.getString(nombre);
			return str == null ? "" : str;
		} catch (Exception e) {
			throw new SQLException(e);
		}
	}

	protected Integer getInteger(ResultSet rs, String nombre) throws SQLException {
		try {
			String str = rs.getString(nombre);
			return str == null ? null : Integer.valueOf(str);
		} catch (Exception e) {
			throw new SQLException(e);
		}
	}

	protected Date getDate(ResultSet rs, String nombre) throws SQLException {
		try {
			java.sql.Date date = rs.getDate(nombre);
			if (date == null) {
				return null;
			}
			return date;
		} catch (Exception e) {
			throw new SQLException(e);
		}
	}
}
