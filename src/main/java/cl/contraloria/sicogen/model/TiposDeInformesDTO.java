package cl.contraloria.sicogen.model;

public class TiposDeInformesDTO {
    private int    id;
    private String Nombre;
    private String Codigo;
    private String usuario;
    private String fecha;

    public TiposDeInformesDTO(int id, String nombre, String codigo) {
        super();
        this.id = id;
        Nombre = nombre;
        Codigo = codigo;
    }
    public TiposDeInformesDTO(){

    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getNombre() {
        return Nombre;
    }
    public void setNombre(String nombre) {
        Nombre = nombre;
    }
    public String getCodigo() {
        return Codigo;
    }
    public void setCodigo(String codigo) {
        Codigo = codigo;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public String getFecha() {
        return fecha;
    }
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    @Override
    public String toString() {
        return "TiposDeInformesDTO [id=" + id + ", Nombre=" + Nombre + ", Codigo="
                + Codigo + "]";
    }
}
