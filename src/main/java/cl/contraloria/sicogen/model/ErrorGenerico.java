package cl.contraloria.sicogen.model;

public class ErrorGenerico {
    private Integer tipoError;
    private String mensaje;

    public Integer getTipoError() {
        return tipoError;
    }

    public void setTipoError(Integer tipoError) {
        this.tipoError = tipoError;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}