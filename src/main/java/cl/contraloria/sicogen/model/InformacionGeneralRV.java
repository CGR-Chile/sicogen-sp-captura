package cl.contraloria.sicogen.model;

public class InformacionGeneralRV {

    private String estado;
    private String tipoInforme;
    private String informe;
    private String periodo;
    private String ejercicio;
    private String usuario;
    private String entidad;
    private String idFileIp;


    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getTipoInforme() {
        return tipoInforme;
    }
    public void setTipoInforme(String tipoInforme) {
        this.tipoInforme = tipoInforme;
    }
    public String getInforme() {
        return informe;
    }
    public void setInforme(String informe) {
        this.informe = informe;
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
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getEntidad() {
        return entidad;
    }
    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }
    public String getIdFileIp() {
        return idFileIp;
    }
    public void setIdFileIp(String idFileIp) {
        this.idFileIp = idFileIp;
    }

}
