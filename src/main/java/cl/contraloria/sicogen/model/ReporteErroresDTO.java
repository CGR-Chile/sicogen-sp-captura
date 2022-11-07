package cl.contraloria.sicogen.model;

public class ReporteErroresDTO {

    private String tipoError;
    private String mensajeError;

    public String getTipoError() {
        return tipoError;
    }
    public void setTipoError(String tipoError) {
        this.tipoError = tipoError;
    }
    public String getMensajeError() {
        return mensajeError;
    }
    public void setMensajeError(String mensajeError) {
        this.mensajeError = mensajeError;
    }

}
