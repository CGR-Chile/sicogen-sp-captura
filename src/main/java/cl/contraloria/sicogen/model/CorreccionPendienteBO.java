package cl.contraloria.sicogen.model;

public class CorreccionPendienteBO {

    private String correccionID;
    private String partidaID;
    private String capituloID;
    private String comentario;
    private String correccionInformeID;
    private String idPeriodoEjercicio;
    private String idFileUpload;
    private String informeID;
    private String periodosEjerciciosID;
    private String ejercicioID;
    private String periodoID;
    private String periodoNombre;
    private String anioNombre;
    private String periodoCodigo;

    @Override
    public String toString() {
        return "CorreccionPendienteBO [correccionID=" + getCorreccionID()
                + ", partidaID=" + getPartidaID() + ", capituloID=" + getCapituloID()
                + ", comentario=" + getComentario() + ", correccionInformeID="
                + getCorreccionInformeID() + ", idPeriodoEjercicio="
                + getIdPeriodoEjercicio() + ", idFileUpload=" + getIdFileUpload()
                + ", informeID=" + getInformeID() + ", periodosEjerciciosID=" + getPeriodosEjerciciosID() +", ejercicioID=" + getEjercicioID()
                + ", periodoID=" + getPeriodoID() + ", periodoNombre="
                + getPeriodoNombre() + ", anioNombre=" + getAnioNombre()
                + ", periodoCodigo=" + getPeriodoCodigo() + "]";
    }

    public String getCorreccionID() {
        return correccionID;
    }

    public void setCorreccionID(String correccionID) {
        this.correccionID = correccionID;
    }

    public String getPartidaID() {
        return partidaID;
    }

    public void setPartidaID(String partidaID) {
        this.partidaID = partidaID;
    }

    public String getCapituloID() {
        return capituloID;
    }

    public void setCapituloID(String capituloID) {
        this.capituloID = capituloID;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getCorreccionInformeID() {
        return correccionInformeID;
    }

    public void setCorreccionInformeID(String correccionInformeID) {
        this.correccionInformeID = correccionInformeID;
    }

    public String getIdPeriodoEjercicio() {
        return idPeriodoEjercicio;
    }

    public void setIdPeriodoEjercicio(String idPeriodoEjercicio) {
        this.idPeriodoEjercicio = idPeriodoEjercicio;
    }

    public String getIdFileUpload() {
        return idFileUpload;
    }

    public void setIdFileUpload(String idFileUpload) {
        this.idFileUpload = idFileUpload;
    }

    public String getInformeID() {
        return informeID;
    }

    public void setInformeID(String informeID) {
        this.informeID = informeID;
    }

    public String getPeriodosEjerciciosID() {
        return periodosEjerciciosID;
    }

    public void setPeriodosEjerciciosID(String periodosEjerciciosID) {
        this.periodosEjerciciosID = periodosEjerciciosID;
    }

    public String getEjercicioID() {
        return ejercicioID;
    }

    public void setEjercicioID(String ejercicioID) {
        this.ejercicioID = ejercicioID;
    }

    public String getPeriodoID() {
        return periodoID;
    }

    public void setPeriodoID(String periodoID) {
        this.periodoID = periodoID;
    }

    public String getPeriodoNombre() {
        return periodoNombre;
    }

    public void setPeriodoNombre(String periodoNombre) {
        this.periodoNombre = periodoNombre;
    }

    public String getAnioNombre() {
        return anioNombre;
    }

    public void setAnioNombre(String anioNombre) {
        this.anioNombre = anioNombre;
    }

    public String getPeriodoCodigo() {
        return periodoCodigo;
    }

    public void setPeriodoCodigo(String periodoCodigo) {
        this.periodoCodigo = periodoCodigo;
    }
}
