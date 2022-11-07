
package cl.contraloria.sicogen.ws.valida.informe;

import javax.xml.bind.annotation.*;


/**
 * <p>Java class for validaInformeRequestType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="validaInformeRequestType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="idArchivo" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="uuid" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="periodo" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="capitulo" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="partida" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="ejercicio" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="isCargaManual" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlRootElement(name = "validaInformeRequest")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "validaInformeRequestType", propOrder = {
    "idArchivo",
    "uuid",
    "periodo",
    "capitulo",
    "partida",
    "ejercicio",
    "isCargaManual"
})
public class ValidaInformeRequestType {

    protected int idArchivo;
    @XmlElement(required = true)
    protected String uuid;
    @XmlElement(required = true)
    protected String periodo;
    @XmlElement(required = true)
    protected String capitulo;
    @XmlElement(required = true)
    protected String partida;
    @XmlElement(required = true)
    protected String ejercicio;
    @XmlElement(defaultValue = "false")
    protected boolean isCargaManual;

    /**
     * Gets the value of the idArchivo property.
     * 
     */
    public int getIdArchivo() {
        return idArchivo;
    }

    /**
     * Sets the value of the idArchivo property.
     * 
     */
    public void setIdArchivo(int value) {
        this.idArchivo = value;
    }

    /**
     * Gets the value of the uuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * Sets the value of the uuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUuid(String value) {
        this.uuid = value;
    }

    /**
     * Gets the value of the periodo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPeriodo() {
        return periodo;
    }

    /**
     * Sets the value of the periodo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPeriodo(String value) {
        this.periodo = value;
    }

    /**
     * Gets the value of the capitulo property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCapitulo() {
        return capitulo;
    }

    /**
     * Sets the value of the capitulo property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCapitulo(String value) {
        this.capitulo = value;
    }

    /**
     * Gets the value of the partida property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPartida() {
        return partida;
    }

    /**
     * Sets the value of the partida property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPartida(String value) {
        this.partida = value;
    }

    /**
     * Gets the value of the ejercicio property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEjercicio() {
        return ejercicio;
    }

    /**
     * Sets the value of the ejercicio property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEjercicio(String value) {
        this.ejercicio = value;
    }

    /**
     * Gets the value of the isCargaManual property.
     * 
     */
    public boolean isIsCargaManual() {
        return isCargaManual;
    }

    /**
     * Sets the value of the isCargaManual property.
     * 
     */
    public void setIsCargaManual(boolean value) {
        this.isCargaManual = value;
    }

}
