package cl.contraloria.sicogen.ws.valida.informe;

import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class ValidacionInformeClient extends WebServiceGatewaySupport {

    public void validaInformeIC(ValidaInformeRequestType request) {
        getWebServiceTemplate().marshalSendAndReceive(request);
    }
}
