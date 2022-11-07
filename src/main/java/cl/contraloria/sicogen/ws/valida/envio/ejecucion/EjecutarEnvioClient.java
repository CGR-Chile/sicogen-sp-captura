package cl.contraloria.sicogen.ws.valida.envio.ejecucion;

import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class EjecutarEnvioClient extends WebServiceGatewaySupport {

    public EjecutarEnvioResponse ejecutarEnvioInformesIC(EjecutarEnvio request) {
        return (EjecutarEnvioResponse) getWebServiceTemplate().marshalSendAndReceive(request);
    }
}
