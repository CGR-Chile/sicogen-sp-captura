package cl.contraloria.sicogen.model;

public class ReportesBitacoraDTO {

    private String informe;
    private String estado;
    private String usuario;
    private String fechaEnvio;
    private String certificado;
    private String entidad;
    private String fechaTramitacion;

    public String getInforme() {
        return informe;
    }
    public void setInforme(String informe) {
        this.informe = informe;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getFechaEnvio() {
        return fechaEnvio;
    }
    public void setFechaEnvio(String fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }
    public String getCertificado() {
        return certificado;
    }
    public void setCertificado(String certificado) {
        this.certificado = certificado;
    }
    public String getEntidad() {
        return entidad;
    }
    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }
    public String getFechaTramitacion() {
        return fechaTramitacion;
    }
    public void setFechaTramitacion(String fechaTramitacion) {
        this.fechaTramitacion = fechaTramitacion;
    }

}
