package cl.contraloria.sicogen.model;

public class ErroresReglas {
    private String cantidad;
    private String estado;
    private String numero;
    private String campo;
    private int lineaId;
    private String mensaje;
    public String getCantidad() {
        return cantidad;
    }
    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getNumero() {
        return numero;
    }
    public void setNumero(String numero) {
        this.numero = numero;
    }
    public String getCampo() {
        return campo;
    }
    public void setCampo(String campo) {
        this.campo = campo;
    }
    public int getLineaId() {
        return lineaId;
    }
    public void setLineaId(int lineaId) {
        this.lineaId = lineaId;
    }
    public String getMensaje() {
        return mensaje;
    }
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

}
