package cl.contraloria.sicogen.ws.valida.envio;

import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class ValidarEnvioClient extends WebServiceGatewaySupport {

    public ValidarEnvioResponse validarEnvioInformes(ValidarEnvio request) {
        return (ValidarEnvioResponse) getWebServiceTemplate().marshalSendAndReceive(request);
    }
}
