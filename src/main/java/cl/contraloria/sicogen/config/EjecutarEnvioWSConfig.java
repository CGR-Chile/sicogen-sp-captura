package cl.contraloria.sicogen.config;

import cl.contraloria.sicogen.ws.valida.envio.ejecucion.EjecutarEnvioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class EjecutarEnvioWSConfig {

    @Bean
    public Jaxb2Marshaller marshallerEjecutarEnvio() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("cl.contraloria.sicogen.ws.valida.envio.ejecucion");
        return marshaller;
    }

    @Bean
    public EjecutarEnvioClient ejecutarEnvioClient(Jaxb2Marshaller marshallerEjecutarEnvio) {
        EjecutarEnvioClient client = new EjecutarEnvioClient();
        client.setDefaultUri("https://www.contraloria.cl/systemws/Informes/SectorPublico/General/v1/PS/Servicio/EjecutarEnvio");
        client.setMarshaller(marshallerEjecutarEnvio);
        client.setUnmarshaller(marshallerEjecutarEnvio);
        return client;
    }
}
