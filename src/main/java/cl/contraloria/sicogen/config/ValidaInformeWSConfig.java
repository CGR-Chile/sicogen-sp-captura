package cl.contraloria.sicogen.config;

import cl.contraloria.sicogen.ws.valida.informe.ValidacionInformeClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class ValidaInformeWSConfig {

    @Bean
    public Jaxb2Marshaller marshallerValidacionInforme() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("cl.contraloria.sicogen.ws.valida.informe");
        return marshaller;
    }
    @Bean
    public ValidacionInformeClient validarInformeClient(Jaxb2Marshaller marshallerValidacionInforme) {
        ValidacionInformeClient client = new ValidacionInformeClient();
        client.setDefaultUri("https://www.contraloria.cl/systemws/informes/sp/ic/v2/sigfe/validacion");
        client.setMarshaller(marshallerValidacionInforme);
        client.setUnmarshaller(marshallerValidacionInforme);
        return client;
    }
}
