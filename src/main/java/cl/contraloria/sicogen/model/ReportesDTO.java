package cl.contraloria.sicogen.model;

public class ReportesDTO {

    private String nombreReporte;
    private int    idReporte;
    private String accionNombre;
    private String accionPdf;
    private String accionExcel;

    public String getNombreReporte() {
        return nombreReporte;
    }
    public void setNombreReporte(String nombreReporte) {
        this.nombreReporte = nombreReporte;
    }
    public int getIdReporte() {
        return idReporte;
    }
    public void setIdReporte(int idReporte) {
        this.idReporte = idReporte;
    }
    public String getAccionNombre() {
        return accionNombre;
    }
    public void setAccionNombre(String accionNombre) {
        this.accionNombre = accionNombre;
    }
    public String getAccionPdf() {
        return accionPdf;
    }
    public void setAccionPdf(String accionPdf) {
        this.accionPdf = accionPdf;
    }
    public String getAccionExcel() {
        return accionExcel;
    }
    public void setAccionExcel(String accionExcel) {
        this.accionExcel = accionExcel;
    }
}
