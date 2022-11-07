package cl.contraloria.sicogen.utils;

import cl.contraloria.sicogen.model.Informes;
import cl.contraloria.sicogen.model.Periodos;

import java.util.ArrayList;
import java.util.List;

public class InformesEstadosAnualBO {
    private List<Informes> informes;
    private List<InformeArchivoDTO> estados;
    private List<Informes> correcciones;
    private List<InformeArchivoDTO> pendientes;
    private List<Periodos> periodosEjercicio;

    public InformesEstadosAnualBO(){
        informes =new ArrayList<Informes>();
        estados=new ArrayList<InformeArchivoDTO>();
        correcciones=new ArrayList<Informes>();
        pendientes=new ArrayList<InformeArchivoDTO>();
    }
    public List<Informes> getInformes(){
        return informes;
    }
    public void setInformes(List<Informes> informes) {
        this.informes = informes;
    }
    public List<InformeArchivoDTO> getEstados() {
        return estados;
    }
    public void setEstados(List<InformeArchivoDTO> estados) {
        this.estados = estados;
    }
    public List<Informes> getCorrecciones() {
        return correcciones;
    }
    public void setCorrecciones(List<Informes> correcciones) {
        this.correcciones = correcciones;
    }
    public List<InformeArchivoDTO> getPendientes() {
        return pendientes;
    }
    public void setPendientes(List<InformeArchivoDTO> pendientes) {
        this.pendientes = pendientes;
    }

    public List<Periodos> getPeriodosEjercicio() {
        return periodosEjercicio;
    }

    public void setPeriodosEjercicio(List<Periodos> periodosEjercicio) {
        this.periodosEjercicio = periodosEjercicio;
    }
}
