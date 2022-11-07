package cl.contraloria.sicogen.model;

import java.util.List;

public class ReporteValidacionPaginacion {
    private Integer draw;
    private Integer recordsTotal;
    private Integer recordsFiltered;
    private List<ReporteValidacionData> data;

    public Integer getDraw() {
        return draw;
    }

    public void setDraw(Integer draw) {
        this.draw = draw;
    }

    public Integer getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(Integer recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public Integer getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(Integer recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public List<ReporteValidacionData> getData() {
        return data;
    }

    public void setData(List<ReporteValidacionData> data) {
        this.data = data;
    }
}
