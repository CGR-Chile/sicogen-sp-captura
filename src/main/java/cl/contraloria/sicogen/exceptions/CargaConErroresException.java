package cl.contraloria.sicogen.exceptions;

public class CargaConErroresException extends RuntimeException {

    private Integer idArchivo;

    public CargaConErroresException(Integer idArchivo) {
        this.idArchivo = idArchivo;
    }

    public Integer getIdArchivo() {
        return idArchivo;
    }

    public void setIdArchivo(Integer idArchivo) {
        this.idArchivo = idArchivo;
    }
}
