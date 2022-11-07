package cl.contraloria.sicogen.model;

public class Resumen {
    private String linea;
    private String cuenta;
    private String codCta;
    private Long debe;
    private Long haber;
    private String estilo;

    public String getLinea() {
        return linea;
    }
    public void setLinea(String linea) {
        this.linea = linea;
    }
    public String getCuenta() {
        return cuenta;
    }
    public void setCuenta(String cuenta) {
        this.cuenta = cuenta;
    }
    public String getCodCta() {
        return codCta;
    }
    public void setCodCta(String codCta) {
        this.codCta = codCta;
    }
    public Long getDebe() {
        return debe;
    }
    public void setDebe(Long debe) {
        this.debe = debe;
    }
    public Long getHaber() {
        return haber;
    }
    public void setHaber(Long haber) {
        this.haber = haber;
    }
    public String getEstilo() {
        return estilo;
    }
    public void setEstilo(String estilo) {
        this.estilo = estilo;
    }
}
