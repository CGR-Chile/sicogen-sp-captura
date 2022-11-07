package cl.contraloria.sicogen.service;

import cl.contraloria.sicogen.ws.valida.informe.ValidaInformeRequestType;
import cl.contraloria.sicogen.ws.valida.informe.ValidacionInformeClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ValidacionService {

    @Value("${url.validacion.ws}")
    private String urlValidacionWS;

    private ValidacionInformeClient validacionInformeClient;

    public ValidacionService(ValidacionInformeClient validacionInformeClient) {
        this.validacionInformeClient = validacionInformeClient;
    }

    public void enviaValidacionIC(Integer idArchivo) {
        ValidaInformeRequestType request = new ValidaInformeRequestType();
        request.setIdArchivo(idArchivo);
        request.setIsCargaManual(Boolean.TRUE);
        validacionInformeClient.validaInformeIC(request);
    }
}
