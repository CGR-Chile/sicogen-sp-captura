package cl.contraloria.sicogen.model;

import java.util.ArrayList;
import java.util.List;


public class InformeArchivoDet extends Informes{

    private List<InformeDetDescarga> listaDetalle;

    public InformeArchivoDet() {
        listaDetalle = new ArrayList<InformeDetDescarga>();
    }

    public List<InformeDetDescarga> getListaDetalle() {
        return listaDetalle;
    }
    public void setListaDetalle(List<InformeDetDescarga> listaDetalle) {
        this.listaDetalle = listaDetalle;
    }
}
