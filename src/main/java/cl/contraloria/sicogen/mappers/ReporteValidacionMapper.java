package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.ReporteValidacionDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReporteValidacionMapper extends BaseMapper implements RowMapper<ReporteValidacionDTO>{

    @Override
    public ReporteValidacionDTO mapRow(ResultSet resultSet, int i) throws SQLException {
        ReporteValidacionDTO reporteValidacionDTO = new ReporteValidacionDTO();
        reporteValidacionDTO.setCCAgrupacion(getString(resultSet,"CC_AGRUPACION"));
        reporteValidacionDTO.setCCCtaN1(getString(resultSet,"CC_CTAN1"));
        reporteValidacionDTO.setCCCtaN2(getString(resultSet,"CC_CTAN2"));
        reporteValidacionDTO.setCCCtaN3(getString(resultSet,"CC_CTAN3"));
        reporteValidacionDTO.setCodigoAreaTransaccional(getString(resultSet,"CODIGO_AREA_TRANSACCIONAL"));
        reporteValidacionDTO.setCodigoBIP(getString(resultSet,"CODIGO_BIP"));
        reporteValidacionDTO.setCodigoPrograma(getString(resultSet,"CODIGO_PROGRAMA"));
        reporteValidacionDTO.setCPAsignacion(getString(resultSet,"CP_ASIGNACION"));
        reporteValidacionDTO.setCPItem(getString(resultSet,"CP_ITEM"));
        reporteValidacionDTO.setCPSubasignacion(getString(resultSet,"CP_SUBASIGNACION"));
        reporteValidacionDTO.setCPSubtitulo(getString(resultSet,"CP_SUBTITULO"));
        reporteValidacionDTO.setDebeCLP(resultSet.getString("DEBE_CLP"));
        reporteValidacionDTO.setDebeUSD(resultSet.getString("DEBE_USD"));
        reporteValidacionDTO.setDenominacionCuenta(getString(resultSet,"DENOMINACION_CUENTA"));
        reporteValidacionDTO.setDenominacionProyecto(getString(resultSet,"DENOMINACION_PROYECTO"));
        reporteValidacionDTO.setDigitoV(getString(resultSet,"DIGITO_V"));
        reporteValidacionDTO.setEstadoRegla2(resultSet.getInt("ERROR_REGLA_2"));
        reporteValidacionDTO.setFolioContable(resultSet.getInt("FOLIO_CONTABLE"));
        reporteValidacionDTO.setHaberCLP(resultSet.getString("HABER_CLP"));
        reporteValidacionDTO.setHaberUSD(resultSet.getString("HABER_USD"));
        reporteValidacionDTO.setTipoMoneda(getString(resultSet,"TIPO_MONEDA"));
        reporteValidacionDTO.setTipoMovimiento(getString(resultSet,"TIPO_MOVIMIENTO"));
        reporteValidacionDTO.setTipoTransaccion(getString(resultSet,"TIPO_TRANSACCION"));
        reporteValidacionDTO.setEstadoRegla3(resultSet.getInt("ERROR_REGLA_3"));
        reporteValidacionDTO.setMensajeRegla2(getString(resultSet,"MENSAJE_REGLA_2"));
        reporteValidacionDTO.setMensajeRegla3(getString(resultSet,"MENSAJE_REGLA_3"));
        reporteValidacionDTO.setTipoErrorRegla2(getString(resultSet,"TIPO_ERROR_REGLA_2"));
        reporteValidacionDTO.setTipoErrorRegla3(getString(resultSet,"TIPO_ERROR_REGLA_3"));
        return reporteValidacionDTO;
    }
}
