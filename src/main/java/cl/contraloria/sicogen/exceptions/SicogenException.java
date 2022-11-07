package cl.contraloria.sicogen.exceptions;

public class SicogenException extends RuntimeException {

    private String codError;
    private String mensaje;

    public SicogenException(String codError, String mensaje) {
        this.codError = codError;
        this.mensaje = mensaje;
    }

    public String getCodError() {
        return codError;
    }

    public void setCodError(String codError) {
        this.codError = codError;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
