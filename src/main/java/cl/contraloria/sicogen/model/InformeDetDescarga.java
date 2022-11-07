package cl.contraloria.sicogen.model;

import java.util.ArrayList;
import java.util.List;

public class InformeDetDescarga
{
    private int lineaId;
    private String nombre;
    private String linea;
    private List<ErroresReglas> erroresDetalle;

    public InformeDetDescarga() {
        erroresDetalle = new ArrayList<ErroresReglas>();
    }

    public int getLineaId() {
        return lineaId;
    }

    public void setLineaId(int lineaId) {
        this.lineaId = lineaId;
    }

    public String getLinea() {
        return linea;
    }

    public void setLinea(String linea) {
        this.linea = linea;
    }

    public List<ErroresReglas> getErroresDetalle() {
        return erroresDetalle;
    }

    public void setErroresDetalle(List<ErroresReglas> erroresDetalle) {
        this.erroresDetalle = erroresDetalle;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
