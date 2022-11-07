package cl.contraloria.sicogen.model;

import java.util.ArrayList;
import java.util.List;

public class CertificadoEnvioDTO {

    private String certificado;
    private String usuario;
    private String fecha;
    private String hora;
    private String entidad;
    private String ejercicio;
    private String rowClass;

    private List<Informes> detInf;

    public CertificadoEnvioDTO(){
        detInf = new ArrayList<Informes>();
    }

    public void addDetInf(String tipoInforme, String subTipoInforme, String informe, String periodo,String ejercicio,String nota) {
        Informes inf=new Informes();
        inf.setTipoInformeNombre(tipoInforme);
        inf.setSubTipoInformeNombre(subTipoInforme);
        inf.setInformeNombre(informe);
        inf.setInformePeriodoCod(periodo);
        inf.setInformeEjercicio(ejercicio);
        inf.setInformeMensaje(nota);
        detInf.add(inf);
    }
    public String getCertificado() {
        return certificado;
    }
    public void setCertificado(String certificado) {
        this.certificado = certificado;
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
    public String getEntidad() {
        return entidad;
    }
    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }
    public String getEjercicio() {
        return ejercicio;
    }
    public void setEjercicio(String ejercicio) {
        this.ejercicio = ejercicio;
    }
    public String getHora() {
        return hora;
    }
    public void setHora(String hora) {
        this.hora = hora;
    }
    public List<Informes> getDetInf() {
        return detInf;
    }
    public void setDetInf(List<Informes> detInf) {
        this.detInf = detInf;
    }

    public String getRowClass() {
        return rowClass;
    }

    public void setRowClass(String rowClass) {
        this.rowClass = rowClass;
    }
}
