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
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Clase Java para anonymous complex type.
 * 
 * <p>El siguiente fragmento de esquema especifica el contenido que se espera que haya en esta clase.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="idEntidad" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="usuario" type="{http://www.w3.org/2001/XMLSchema}string"/&gt;
 *         &lt;element name="tipoArchivo" type="{http://www.w3.org/2001/XMLSchema}decimal"/&gt;
 *         &lt;element name="listaInformes" type="{http://www.cgr.cl/OSB/SectorPublico/V1/EXP/EjecucionEnvio}listaInformes"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "idEntidad",
    "usuario",
    "tipoArchivo",
    "listaInformes"
})
@XmlRootElement(name = "ejecutarEnvio")
public class EjecutarEnvio {

    @XmlElement(required = true)
    protected BigDecimal idEntidad;
    @XmlElement(required = true)
    protected String usuario;
    @XmlElement(required = true)
    protected BigDecimal tipoArchivo;
    @XmlElement(required = true)
    protected ListaInformes listaInformes;

    /**
     * Obtiene el valor de la propiedad idEntidad.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getIdEntidad() {
        return idEntidad;
    }

    /**
     * Define el valor de la propiedad idEntidad.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setIdEntidad(BigDecimal value) {
        this.idEntidad = value;
    }

    /**
     * Obtiene el valor de la propiedad usuario.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUsuario() {
        return usuario;
    }

    /**
     * Define el valor de la propiedad usuario.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUsuario(String value) {
        this.usuario = value;
    }

    /**
     * Obtiene el valor de la propiedad tipoArchivo.
     * 
     * @return
     *     possible object is
     *     {@link BigDecimal }
     *     
     */
    public BigDecimal getTipoArchivo() {
        return tipoArchivo;
    }

    /**
     * Define el valor de la propiedad tipoArchivo.
     * 
     * @param value
     *     allowed object is
     *     {@link BigDecimal }
     *     
     */
    public void setTipoArchivo(BigDecimal value) {
        this.tipoArchivo = value;
    }

    /**
     * Obtiene el valor de la propiedad listaInformes.
     * 
     * @return
     *     possible object is
     *     {@link ListaInformes }
     *     
     */
    public ListaInformes getListaInformes() {
        return listaInformes;
    }

    /**
     * Define el valor de la propiedad listaInformes.
     * 
     * @param value
     *     allowed object is
     *     {@link ListaInformes }
     *     
     */
    public void setListaInformes(ListaInformes value) {
        this.listaInformes = value;
    }

}
