package cl.contraloria.sicogen.model;

public class EjerciciosDTO {

    private String ejercicioNombre;
    private String ejercicioCodigo;
    private int    ejercicioId;

    public EjerciciosDTO(){

    }

    public EjerciciosDTO(String ejercicioNombre, String ejercicioCodigo, int ejercicioId) {
        //super();
        this.ejercicioNombre = ejercicioNombre;
        this.ejercicioCodigo = ejercicioCodigo;
        this.ejercicioId = ejercicioId;
    }


    public String getEjercicioNombre() {
        return ejercicioNombre;
    }
    public void setEjercicioNombre(String ejercicioNombre) {
        this.ejercicioNombre = ejercicioNombre;
    }
    public String getEjercicioCodigo() {
        return ejercicioCodigo;
    }
    public void setEjercicioCodigo(String ejercicioCodigo) {
        this.ejercicioCodigo = ejercicioCodigo;
    }
    public int getEjercicioId() {
        return ejercicioId;
    }
    public void setEjercicioId(int ejercicioId) {
        this.ejercicioId = ejercicioId;
    }
    @Override
    public String toString() {
        return "Ejercicios [ejercicioNombre=" + ejercicioNombre
                + ", ejercicioCodigo=" + ejercicioCodigo + ", ejercicioId="
                + ejercicioId + "]";
    }
}
