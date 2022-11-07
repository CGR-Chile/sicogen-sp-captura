package cl.contraloria.sicogen.model;

import java.util.ArrayList;
import java.util.List;

public class DatosEjecucionEnvio {

    private List<Informes> informesEnviados;
    private String fechaEnvio;
    private String rq;
    private String nroCertificado;

    public DatosEjecucionEnvio() {
        this.informesEnviados = new ArrayList<Informes>();
    }

    public List<Informes> getInformesEnviados() {
        return informesEnviados;
    }

    public void setInformesEnviados(List<Informes> informesEnviados) {
        this.informesEnviados = informesEnviados;
    }

    public String getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(String fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public String getRq() {
        return rq;
    }

    public void setRq(String rq) {
        this.rq = rq;
    }

    public String getNroCertificado() {
        return nroCertificado;
    }

    public void setNroCertificado(String nroCertificado) {
        this.nroCertificado = nroCertificado;
    }
}
