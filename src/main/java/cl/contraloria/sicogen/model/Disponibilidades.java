package cl.contraloria.sicogen.model;

import java.util.List;

public class Disponibilidades {


    private List<Resumen> cabeceraVar;
    private List<Resumen> cabeceraCom;
    private List<Resumen> recDisp;
    private List<Resumen> ctaxCob;
    private List<Resumen> ctaxPag;
    private List<Resumen> ctaComp;
    private Long recDispDebe;
    private Long recDispHaber;
    private Long ctaCobDebe;
    private Long ctaCobHaber;
    private Long ctaPagDebe;
    private Long ctaPagHaber;
    private Long ctaComDebe;
    private Long ctaComHaber;

    private String nombreEntidad;
    private String ejercicioNombre;
    private String periodoNombre;
    private String resultado;

    public Long getRecDispDebe() {
        return recDispDebe;
    }
    public void setRecDispDebe(Long recDispDebe) {
        this.recDispDebe = recDispDebe;
    }
    public Long getRecDispHaber() {
        return recDispHaber;
    }
    public void setRecDispHaber(Long recDispHaber) {
        this.recDispHaber = recDispHaber;
    }
    public Long getCtaCobDebe() {
        return ctaCobDebe;
    }
    public void setCtaCobDebe(Long ctaCobDebe) {
        this.ctaCobDebe = ctaCobDebe;
    }
    public Long getCtaCobHaber() {
        return ctaCobHaber;
    }
    public void setCtaCobHaber(Long ctaCobHaber) {
        this.ctaCobHaber = ctaCobHaber;
    }
    public Long getCtaPagDebe() {
        return ctaPagDebe;
    }
    public void setCtaPagDebe(Long ctaPagDebe) {
        this.ctaPagDebe = ctaPagDebe;
    }
    public Long getCtaPagHaber() {
        return ctaPagHaber;
    }
    public void setCtaPagHaber(Long ctaPagHaber) {
        this.ctaPagHaber = ctaPagHaber;
    }
    public Long getCtaComDebe() {
        return ctaComDebe;
    }
    public void setCtaComDebe(Long ctaComDebe) {
        this.ctaComDebe = ctaComDebe;
    }
    public Long getCtaComHaber() {
        return ctaComHaber;
    }
    public void setCtaComHaber(Long ctaComHaber) {
        this.ctaComHaber = ctaComHaber;
    }
    public List<Resumen> getCabeceraVar() {
        return cabeceraVar;
    }
    public void setCabeceraVar(List<Resumen> cabeceraVar) {
        this.cabeceraVar = cabeceraVar;
    }
    public List<Resumen> getCabeceraCom() {
        return cabeceraCom;
    }
    public void setCabeceraCom(List<Resumen> cabeceraCom) {
        this.cabeceraCom = cabeceraCom;
    }
    public List<Resumen> getRecDisp() {
        return recDisp;
    }
    public void setRecDisp(List<Resumen> recDisp) {
        this.recDisp = recDisp;
    }
    public List<Resumen> getCtaxCob() {
        return ctaxCob;
    }
    public void setCtaxCob(List<Resumen> ctaxCob) {
        this.ctaxCob = ctaxCob;
    }
    public List<Resumen> getCtaxPag() {
        return ctaxPag;
    }
    public void setCtaxPag(List<Resumen> ctaxPag) {
        this.ctaxPag = ctaxPag;
    }
    public List<Resumen> getCtaComp() {
        return ctaComp;
    }
    public void setCtaComp(List<Resumen> ctaComp) {
        this.ctaComp = ctaComp;
    }
    public String getNombreEntidad() {
        return nombreEntidad;
    }
    public void setNombreEntidad(String nombreEntidad) {
        this.nombreEntidad = nombreEntidad;
    }
    public String getEjercicioNombre() {
        return ejercicioNombre;
    }
    public void setEjercicioNombre(String ejercicioNombre) {
        this.ejercicioNombre = ejercicioNombre;
    }
    public String getPeriodoNombre() {
        return periodoNombre;
    }
    public void setPeriodoNombre(String periodoNombre) {
        this.periodoNombre = periodoNombre;
    }
    public String getResultado() {
        return resultado;
    }
    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

}
