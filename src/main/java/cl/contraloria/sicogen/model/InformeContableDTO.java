package cl.contraloria.sicogen.model;

import java.util.List;

public class InformeContableDTO {

    private String uuid;
    private String partida;
    private String capitulo;
    private String rut;
    private List<ErrorGenerico> erroresGenericos;
    private Integer errorEsquema;
    private Integer fileuId;
    private String periodo;
    private String ejercicio;
    private String informe;
    private String codPartida;
    private String codCapitulo;
    private String codPeriodo;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getPartida() {
        return partida;
    }

    public void setPartida(String partida) {
        this.partida = partida;
    }

    public String getCapitulo() {
        return capitulo;
    }

    public void setCapitulo(String capitulo) {
        this.capitulo = capitulo;
    }

    public Integer getErrorEsquema() {
        return errorEsquema;
    }

    public void setErrorEsquema(Integer errorEsquema) {
        this.errorEsquema = errorEsquema;
    }

    public List<ErrorGenerico> getErroresGenericos() {
        return erroresGenericos;
    }

    public void setErroresGenericos(List<ErrorGenerico> erroresGenericos) {
        this.erroresGenericos = erroresGenericos;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public Integer getFileuId() {
        return fileuId;
    }

    public void setFileuId(Integer fileuId) {
        this.fileuId = fileuId;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getEjercicio() {
        return ejercicio;
    }

    public void setEjercicio(String ejercicio) {
        this.ejercicio = ejercicio;
    }

    public String getInforme() {
        return informe;
    }

    public void setInforme(String informe) {
        this.informe = informe;
    }

    public String getCodPartida() {
        return codPartida;
    }

    public void setCodPartida(String codPartida) {
        this.codPartida = codPartida;
    }

    public String getCodCapitulo() {
        return codCapitulo;
    }

    public void setCodCapitulo(String codCapitulo) {
        this.codCapitulo = codCapitulo;
    }

    public String getCodPeriodo() {
        return codPeriodo;
    }

    public void setCodPeriodo(String codPeriodo) {
        this.codPeriodo = codPeriodo;
    }
}
