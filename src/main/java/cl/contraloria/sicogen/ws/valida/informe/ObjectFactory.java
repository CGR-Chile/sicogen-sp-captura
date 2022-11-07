
package cl.contraloria.sicogen.ws.valida.informe;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the cl.contraloria.sicogen.ws package. 
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

    private final static QName _ValidaInformeRequest_QNAME = new QName("http://www.contraloria.cl/xml/esquemas", "validaInformeRequest");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: cl.contraloria.sicogen.ws
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ValidaInformeRequestType }
     * 
     */
    public ValidaInformeRequestType createValidaInformeRequestType() {
        return new ValidaInformeRequestType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ValidaInformeRequestType }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.contraloria.cl/xml/esquemas", name = "validaInformeRequest")
    public JAXBElement<ValidaInformeRequestType> createValidaInformeRequest(ValidaInformeRequestType value) {
        return new JAXBElement<ValidaInformeRequestType>(_ValidaInformeRequest_QNAME, ValidaInformeRequestType.class, null, value);
    }

}
