//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantacion de la referencia de enlace (JAXB) XML v2.2.11
// Visite <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Todas las modificaciones realizadas en este archivo se perder�n si se vuelve a compilar el esquema de origen. 
// Generado el: 2020.11.10 a las 04:35:25 PM GMT-04:00 
//


package cl.contraloria.sicogen.ws.valida.envio;

import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the cl.contraloria.sicogen.ws.valida.envio package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: cl.contraloria.sicogen.ws.valida.envio
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ValidarEnvio }
     * 
     */
    public ValidarEnvio createValidarEnvio() {
        return new ValidarEnvio();
    }

    /**
     * Create an instance of {@link ListaInformes }
     * 
     */
    public ListaInformes createListaInformes() {
        return new ListaInformes();
    }

    /**
     * Create an instance of {@link ValidarEnvioResponse }
     * 
     */
    public ValidarEnvioResponse createValidarEnvioResponse() {
        return new ValidarEnvioResponse();
    }

    /**
     * Create an instance of {@link ListaErrores }
     * 
     */
    public ListaErrores createListaErrores() {
        return new ListaErrores();
    }

    /**
     * Create an instance of {@link Error }
     * 
     */
    public Error createError() {
        return new Error();
    }

    /**
     * Create an instance of {@link Informe }
     * 
     */
    public Informe createInforme() {
        return new Informe();
    }

}
