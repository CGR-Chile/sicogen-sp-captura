package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.ReportesBitacoraDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BitacoraMapper implements RowMapper<ReportesBitacoraDTO> {

    @Override
    public ReportesBitacoraDTO mapRow(ResultSet resultSet, int i) throws SQLException {
        ReportesBitacoraDTO bitacora = new ReportesBitacoraDTO();

        bitacora.setEstado(resultSet.getString("ESTADO_NOMBRE"));
        bitacora.setUsuario(resultSet.getString("BITAC_USER_UPLOAD"));
        bitacora.setFechaEnvio(resultSet.getString("BITAC_DATE_SEND"));
        bitacora.setCertificado(resultSet.getString("CERT_ID"));
        bitacora.setFechaTramitacion(resultSet.getString("FECHA_TRAMITACION"));

        return bitacora;
    }
}
