package cl.contraloria.sicogen.mappers;

import cl.contraloria.sicogen.model.InformacionGeneralRV;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InformacionGeneralRVMapper implements RowMapper<InformacionGeneralRV> {

    @Override
    public InformacionGeneralRV mapRow(ResultSet resultSet, int i) throws SQLException {
        InformacionGeneralRV info = new InformacionGeneralRV();
        info.setEjercicio(resultSet.getString("EJERCICIO"));
        info.setEntidad(resultSet.getString("ENTIDAD"));
        info.setEstado(resultSet.getString("ESTADO"));
        info.setInforme(resultSet.getString("INFORME"));
        info.setPeriodo(resultSet.getString("PERIODO"));
        info.setTipoInforme(resultSet.getString("TIPO_INFORME"));
        info.setUsuario(resultSet.getString("USUARIO"));
        return info;
    }
}
