package cl.contraloria.sicogen.utils;

import cl.contraloria.sicogen.model.Informes;

import java.util.ArrayList;
import java.util.List;

public class InformesPendientes {

    private List<Informes> informesEstados = new ArrayList<Informes>();
    private List<Informes> informesPendientes = new ArrayList<Informes>();
    public List<Informes> getInformesEstados() {
        return informesEstados;
    }
    public void setInformesEstados(List<Informes> informesEstados) {
        this.informesEstados = informesEstados;
    }
    public List<Informes> getInformesPendientes() {
        return informesPendientes;
    }
    public void setInformesPendientes(List<Informes> informesPendientes) {
        this.informesPendientes = informesPendientes;
    }
}
