package cl.contraloria.sicogen.config;

import cl.contraloria.sicogen.ws.valida.envio.ValidarEnvioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class ValidacionEnvioWSConfig {

    @Bean
    public Jaxb2Marshaller marshallerValidarEnvio() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("cl.contraloria.sicogen.ws.valida.envio");
        return marshaller;
    }

    @Bean
    public ValidarEnvioClient validarEnvioClient(Jaxb2Marshaller marshallerValidarEnvio) {
        ValidarEnvioClient client = new ValidarEnvioClient();
        client.setDefaultUri("https://www.contraloria.cl/systemws/Informes/SectorPublico/General/v1/PS/Servicio/validarEnvio");
        client.setMarshaller(marshallerValidarEnvio);
        client.setUnmarshaller(marshallerValidarEnvio);
        return client;
    }
}
