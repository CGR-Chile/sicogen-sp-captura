package cl.contraloria.sicogen.model;

public class Periodos {

    private int periodoId;
    private String periodoNombre;
    private String periodoCodigo;
    private int correccion;
    private String periodoAbrev;

    public Periodos() {
    }

    public Periodos(int periodoId, String periodoCodigo, String periodoNombre, String periodoAbrev) {
        //super();
        this.periodoId = periodoId;
        this.periodoNombre = periodoNombre;
        this.periodoCodigo = periodoCodigo;
        this.periodoAbrev = periodoAbrev;
    }

    public int getPeriodoId() {
        return periodoId;
    }


    public void setPeriodoId(int periodoId) {
        this.periodoId = periodoId;
    }
    public String getPeriodoNombre() {
        return periodoNombre;
    }
    public void setPeriodoNombre(String periodoNombre) {
        this.periodoNombre = periodoNombre;
    }

    public String getPeriodoCodigo() {
        return periodoCodigo;
    }
    public void setPeriodoCodigo(String periodoCodigo) {
        this.periodoCodigo = periodoCodigo;
    }
    public int getCorreccion() {
        return correccion;
    }
    public void setCorreccion(int correccion) {
        this.correccion = correccion;
    }

    public String getPeriodoAbrev() {
        return periodoAbrev;
    }

    public void setPeriodoAbrev(String periodoAbrev) {
        this.periodoAbrev = periodoAbrev;
    }
}
