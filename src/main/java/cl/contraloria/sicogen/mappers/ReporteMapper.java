package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.ReportesDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReporteMapper implements RowMapper<ReportesDTO> {

    @Override
    public ReportesDTO mapRow(ResultSet resultSet, int i) throws SQLException {

        ReportesDTO reportes = new ReportesDTO();

        reportes.setIdReporte(Integer.valueOf(resultSet.getString("REP_ID")));
        reportes.setNombreReporte(String.valueOf(resultSet.getString("REP_NOMBRE")));
        reportes.setAccionNombre(String.valueOf(resultSet.getString("REP_ACCION")));
        reportes.setAccionPdf(resultSet.getString("REP_ACCION_PDF"));
        reportes.setAccionExcel(resultSet.getString("REP_ACCION_EXCEL"));

        return reportes;
    }
}
