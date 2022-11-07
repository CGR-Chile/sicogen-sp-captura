//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantaci�n de la referencia de enlace (JAXB) XML v2.2.11 
// Visite <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Todas las modificaciones realizadas en este archivo se perderan si se vuelve a compilar el esquema de origen.
// Generado el: 2020.11.12 a las 03:19:54 PM GMT-04:00 
//


package cl.contraloria.sicogen.ws.valida.envio.ejecucion;

import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para informe complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType name="informe"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="idInforme" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="codigoInforme" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="nombreInforme" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="estadoInforme" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="periodo" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "informe", propOrder = {
    "idInforme",
    "codigoInforme",
    "nombreInforme",
    "estadoInforme",
    "periodo"
})
public class Informe {

    @XmlElement(required = true)
    protected String idInforme;
    @XmlElement(required = true)
    protected String codigoInforme;
    @XmlElement(required = true)
    protected String nombreInforme;
    @XmlElement(required = true)
    protected String estadoInforme;
    @XmlElement(required = true)
    protected BigDecimal periodo;

    /**
     * Obtiene el valor de la propiedad idInforme.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdInforme() {
        return idInforme;
    }

    /**
     * Define el valor de la propiedad idInforme.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdInforme(String value) {
        this.idInforme = value;
    }

    /**
     * Obtiene el valor de la propiedad codigoInforme.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCodigoInforme() {
        return codigoInforme;
    }

    /**
     * Define el valor de la propiedad codigoInforme.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCodigoInforme(String value) {
        this.codigoInforme = value;
    }

    /**
     * Obtiene el valor de la propiedad nombreInforme.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNombreInforme() {
        return nombreInforme;
    }

    /**
     * Define el valor de la propiedad nombreInforme.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNombreInforme(String value) {
        this.nombreInforme = value;
    }

    /**
     * Obtiene el valor de la propiedad estadoInforme.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEstadoInforme() {
        return estadoInforme;
    }

    /**
     * Define el valor de la propiedad estadoInforme.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEstadoInforme(String value) {
        this.estadoInforme = value;
    }

    /**
     * Obtiene el valor de la propiedad periodo.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getPeriodo() {
        return periodo;
    }

    /**
     * Define el valor de la propiedad periodo.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setPeriodo(BigDecimal value) {
        this.periodo = value;
    }

}
