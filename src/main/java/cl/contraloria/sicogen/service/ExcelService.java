package cl.contraloria.sicogen.service;

import cl.contraloria.sicogen.model.*;
import cl.contraloria.sicogen.utils.AddImageExcel;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExcelService {

    private InformesService informesService;

    public ExcelService(InformesService informesService) {
        this.informesService = informesService;
    }

    public Map<String, InputStreamResource> generaExcelReporteValidacion(URL logoSicogen,
                                                                         Integer idArchivo,
                                                                         URL tipError1,
                                                                         URL tipError2,
                                                                         URL tipError3) throws IOException {

        InformacionGeneralRV datosGeneralInforme = informesService.obtieneInfoGeneralRV(idArchivo);
        InformeContableDTO datosDetalleInforme = informesService.obtieneDatosInformeContable(idArchivo);
        ReporteValidacionPaginacion detalleInforme = informesService.obtieneReporteValidacionPaginacion(idArchivo,
                1, 0, 0, "1");
        List<ReporteValidacionData> dataInforme = detalleInforme.getData();

        XSSFWorkbook book = new XSSFWorkbook();
        XSSFSheet resumen = book.createSheet();
        XSSFSheet detalle = book.createSheet();

        book.setSheetName(0, "Resumen");
        book.setSheetName(1, "Detalle");

        resumen.setColumnWidth(1, 8000);
        resumen.setColumnWidth(2, 30000);

        /* Styling */

        /* Backgrounds */
        XSSFColor bckTitulos =  new XSSFColor(new java.awt.Color(63,135,193));
        XSSFColor bckTabla =  new XSSFColor(new java.awt.Color(215,215,217));
        XSSFColor bckBlanco =  new XSSFColor(new java.awt.Color(255,255,255));
        XSSFColor bckError =  new XSSFColor(new java.awt.Color(255, 199, 206));
        XSSFColor bckWarning =  new XSSFColor(new java.awt.Color(255, 254, 120));
        XSSFColor bckInterno =  new XSSFColor(new java.awt.Color(204, 195, 255));

        /* Fonts */

        XSSFFont fntTituloReporte = book.createFont();
        fntTituloReporte.setFontHeightInPoints((short) 20);
        fntTituloReporte.setColor(new XSSFColor(new java.awt.Color(69, 70, 72)));
        fntTituloReporte.setBold(Boolean.TRUE);
        fntTituloReporte.setFontName("Arial");

        XSSFFont fntTitulos = book.createFont();
        fntTitulos.setFontHeightInPoints((short) 11);
        fntTitulos.setColor(new XSSFColor(new java.awt.Color(255, 255, 255)));
        fntTitulos.setBold(Boolean.TRUE);
        fntTitulos.setFontName("Arial");

        XSSFFont fntDatosEncabezados = book.createFont();
        fntDatosEncabezados.setFontHeightInPoints((short) 11);
        fntDatosEncabezados.setColor(new XSSFColor(new java.awt.Color(102, 102, 102)));
        fntDatosEncabezados.setFontName("Arial");

        XSSFFont fntEncTblDet = book.createFont();
        fntEncTblDet.setFontHeightInPoints((short) 11);
        fntEncTblDet.setColor(new XSSFColor(new java.awt.Color(69, 70, 72)));
        fntEncTblDet.setBold(Boolean.TRUE);
        fntEncTblDet.setFontName("Arial");

        XSSFFont fntTblDet = book.createFont();
        fntTblDet.setFontHeightInPoints((short) 11);
        fntTblDet.setColor(new XSSFColor(new java.awt.Color(69, 70, 72)));
        fntTblDet.setFontName("Arial");

        XSSFFont fntTitulosEncabezados = book.createFont();
        fntTitulosEncabezados.setFontHeightInPoints((short) 11);
        fntTitulosEncabezados.setColor(new XSSFColor(new java.awt.Color(102, 102, 102)));
        fntTitulosEncabezados.setBold(Boolean.TRUE);
        fntTitulosEncabezados.setFontName("Arial");

        /* Cell Styles */

        XSSFCellStyle csTituloReporte = book.createCellStyle();
        csTituloReporte.setFont(fntTituloReporte);
        csTituloReporte.setFillForegroundColor(bckTabla);
        csTituloReporte.setFillBackgroundColor(bckTabla);
        csTituloReporte.setAlignment(HorizontalAlignment.CENTER);
        csTituloReporte.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csTitulos = book.createCellStyle();
        csTitulos.setFont(fntTitulos);
        csTitulos.setFillForegroundColor(bckTitulos);
        csTitulos.setFillBackgroundColor(bckTitulos);
        csTitulos.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        csTitulos.setAlignment(HorizontalAlignment.CENTER);

        XSSFCellStyle csEncabezados0 = book.createCellStyle();
        csEncabezados0.setFillForegroundColor(bckBlanco);
        csEncabezados0.setFillBackgroundColor(bckBlanco);
        csEncabezados0.setFont(fntTitulosEncabezados);
        csEncabezados0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csEncabezados1 = book.createCellStyle();
        csEncabezados1.setFont(fntTitulosEncabezados);
        csEncabezados1.setFillForegroundColor(bckTabla);
        csEncabezados1.setFillBackgroundColor(bckTabla);
        csEncabezados1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosEnc0 = book.createCellStyle();
        csDatosEnc0.setFont(fntDatosEncabezados);
        csDatosEnc0.setFillForegroundColor(bckBlanco);
        csDatosEnc0.setFillBackgroundColor(bckBlanco);
        csDatosEnc0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosEnc1 = book.createCellStyle();
        csDatosEnc1.setFont(fntDatosEncabezados);
        csDatosEnc1.setFillForegroundColor(bckTabla);
        csDatosEnc1.setFillBackgroundColor(bckTabla);
        csDatosEnc1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csEncTblDet = book.createCellStyle();
        csEncTblDet.setFont(fntEncTblDet);
        csEncTblDet.setFillForegroundColor(bckBlanco);
        csEncTblDet.setFillBackgroundColor(bckBlanco);
        csEncTblDet.setAlignment(HorizontalAlignment.CENTER);
        csEncTblDet.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        csEncTblDet.setBorderBottom(BorderStyle.MEDIUM);

        XSSFCellStyle csDatosTblDet0 = book.createCellStyle();
        csDatosTblDet0.setFont(fntTblDet);
        csDatosTblDet0.setFillForegroundColor(bckBlanco);
        csDatosTblDet0.setFillBackgroundColor(bckBlanco);
        csDatosTblDet0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDet1 = book.createCellStyle();
        csDatosTblDet1.setFont(fntTblDet);
        csDatosTblDet1.setFillForegroundColor(bckTabla);
        csDatosTblDet1.setFillBackgroundColor(bckTabla);
        csDatosTblDet1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentrado0 = book.createCellStyle();
        csDatosTblDetCentrado0.setFont(fntTblDet);
        csDatosTblDetCentrado0.setFillForegroundColor(bckBlanco);
        csDatosTblDetCentrado0.setFillBackgroundColor(bckBlanco);
        csDatosTblDetCentrado0.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentrado0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentrado1 = book.createCellStyle();
        csDatosTblDetCentrado1.setFont(fntTblDet);
        csDatosTblDetCentrado1.setFillForegroundColor(bckTabla);
        csDatosTblDetCentrado1.setFillBackgroundColor(bckTabla);
        csDatosTblDetCentrado1.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentrado1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerecha0 = book.createCellStyle();
        csDatosTblDetDerecha0.setFont(fntTblDet);
        csDatosTblDetDerecha0.setFillForegroundColor(bckBlanco);
        csDatosTblDetDerecha0.setFillBackgroundColor(bckBlanco);
        csDatosTblDetDerecha0.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerecha0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerecha1 = book.createCellStyle();
        csDatosTblDetDerecha1.setFont(fntTblDet);
        csDatosTblDetDerecha1.setFillForegroundColor(bckTabla);
        csDatosTblDetDerecha1.setFillBackgroundColor(bckTabla);
        csDatosTblDetDerecha1.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerecha1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetError = book.createCellStyle();
        csDatosTblDetError.setFont(fntTblDet);
        csDatosTblDetError.setFillForegroundColor(bckError);
        csDatosTblDetError.setFillBackgroundColor(bckError);
        csDatosTblDetError.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentradoError = book.createCellStyle();
        csDatosTblDetCentradoError.setFont(fntTblDet);
        csDatosTblDetCentradoError.setFillForegroundColor(bckError);
        csDatosTblDetCentradoError.setFillBackgroundColor(bckError);
        csDatosTblDetCentradoError.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentradoError.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerechaError = book.createCellStyle();
        csDatosTblDetDerechaError.setFont(fntTblDet);
        csDatosTblDetDerechaError.setFillForegroundColor(bckError);
        csDatosTblDetDerechaError.setFillBackgroundColor(bckError);
        csDatosTblDetDerechaError.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerechaError.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetWarning = book.createCellStyle();
        csDatosTblDetWarning.setFont(fntTblDet);
        csDatosTblDetWarning.setFillForegroundColor(bckWarning);
        csDatosTblDetWarning.setFillBackgroundColor(bckWarning);
        csDatosTblDetWarning.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentradoWarning = book.createCellStyle();
        csDatosTblDetCentradoWarning.setFont(fntTblDet);
        csDatosTblDetCentradoWarning.setFillForegroundColor(bckWarning);
        csDatosTblDetCentradoWarning.setFillBackgroundColor(bckWarning);
        csDatosTblDetCentradoWarning.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentradoWarning.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerechaWarning = book.createCellStyle();
        csDatosTblDetDerechaWarning.setFont(fntTblDet);
        csDatosTblDetDerechaWarning.setFillForegroundColor(bckWarning);
        csDatosTblDetDerechaWarning.setFillBackgroundColor(bckWarning);
        csDatosTblDetDerechaWarning.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerechaWarning.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetInterno = book.createCellStyle();
        csDatosTblDetInterno.setFont(fntTblDet);
        csDatosTblDetInterno.setFillForegroundColor(bckInterno);
        csDatosTblDetInterno.setFillBackgroundColor(bckInterno);
        csDatosTblDetInterno.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentradoInterno = book.createCellStyle();
        csDatosTblDetCentradoInterno.setFont(fntTblDet);
        csDatosTblDetCentradoInterno.setFillForegroundColor(bckInterno);
        csDatosTblDetCentradoInterno.setFillBackgroundColor(bckInterno);
        csDatosTblDetCentradoInterno.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentradoInterno.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerechaInterno = book.createCellStyle();
        csDatosTblDetDerechaInterno.setFont(fntTblDet);
        csDatosTblDetDerechaInterno.setFillForegroundColor(bckInterno);
        csDatosTblDetDerechaInterno.setFillBackgroundColor(bckInterno);
        csDatosTblDetDerechaInterno.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerechaInterno.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        /* Imagen de cabecera */
        resumen.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
        new AddImageExcel().addImageToSheet("B2", resumen, resumen.createDrawingPatriarch(), logoSicogen,
                100, 25, AddImageExcel.OVERLAY_ROW_AND_COLUMN);

        /* Titulos */
        int rowNumTit1 = 7;
        int rowNumTit2 = 9;
        int rowNumTit3 = 17;
        int rowNumTit4 = 22;

        /* Titulo General */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit1, rowNumTit1, 1, 2));
        XSSFRow rowTit1 = resumen.createRow(rowNumTit1);
        XSSFCell cellTit1 = rowTit1.createCell(1);
        cellTit1.setCellStyle(csTituloReporte);
        cellTit1.setCellValue(new XSSFRichTextString("REPORTE DE VALIDACI�N"));

        /* Titulo 1 */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit2, rowNumTit2, 1, 2));
        XSSFRow rowTit2 = resumen.createRow(rowNumTit2);
        XSSFCell cellTit2 = rowTit2.createCell(1);
        cellTit2.setCellStyle(csTitulos);
        cellTit2.setCellValue(new XSSFRichTextString("Informaci�n General"));

        /* Titulo 2 */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit3, rowNumTit3, 1, 2));
        XSSFRow rowTit3 = resumen.createRow(rowNumTit3);
        XSSFCell cellTit3 = rowTit3.createCell(1);
        cellTit3.setCellStyle(csTitulos);
        cellTit3.setCellValue(new XSSFRichTextString("Detalle de Archivo Cargado"));

        /* Titulo 3 */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit4, rowNumTit4, 1, 2));
        XSSFRow rowTit4 = resumen.createRow(rowNumTit4);
        XSSFCell cellTit4 = rowTit4.createCell(1);
        cellTit4.setCellStyle(csTitulos);
        cellTit4.setCellValue(new XSSFRichTextString("Errores Gen�ricos"));

        /* Encabezados Titulo 2 */

        XSSFRow rowEnc1Tit2 = resumen.createRow(10);
        XSSFCell cellEnc1Tit2 = rowEnc1Tit2.createCell(1);
        cellEnc1Tit2.setCellStyle(csEncabezados1);
        cellEnc1Tit2.setCellValue(new XSSFRichTextString("ESTADO DE VALIDACI�N"));

        XSSFRow rowEnc2Tit2 = resumen.createRow(11);
        XSSFCell cellEnc2Tit2 = rowEnc2Tit2.createCell(1);
        cellEnc2Tit2.setCellStyle(csEncabezados0);
        cellEnc2Tit2.setCellValue(new XSSFRichTextString("TIPO DE INFORME"));

        XSSFRow rowEnc3Tit2 = resumen.createRow(12);
        XSSFCell cellEnc3Tit2 = rowEnc3Tit2.createCell(1);
        cellEnc3Tit2.setCellStyle(csEncabezados1);
        cellEnc3Tit2.setCellValue(new XSSFRichTextString("INFORME"));

        XSSFRow rowEnc4Tit2 = resumen.createRow(13);
        XSSFCell cellEnc4Tit2 = rowEnc4Tit2.createCell(1);
        cellEnc4Tit2.setCellStyle(csEncabezados0);
        cellEnc4Tit2.setCellValue(new XSSFRichTextString("PER�ODO"));

        XSSFRow rowEnc5Tit2 = resumen.createRow(14);
        XSSFCell cellEnc5Tit2 = rowEnc5Tit2.createCell(1);
        cellEnc5Tit2.setCellStyle(csEncabezados1);
        cellEnc5Tit2.setCellValue(new XSSFRichTextString("EJERCICIO"));

        XSSFRow rowEnc6Tit2 = resumen.createRow(15);
        XSSFCell cellEnc6Tit2 = rowEnc6Tit2.createCell(1);
        cellEnc6Tit2.setCellStyle(csEncabezados0);
        cellEnc6Tit2.setCellValue(new XSSFRichTextString("USUARIO"));

        XSSFRow rowEnc7Tit2 = resumen.createRow(16);
        XSSFCell cellEnc7Tit2 = rowEnc7Tit2.createCell(1);
        cellEnc7Tit2.setCellStyle(csEncabezados1);
        cellEnc7Tit2.setCellValue(new XSSFRichTextString("ENTIDAD"));

        /* Encabezados Titulo 3 */

        XSSFRow rowEnc1Tit3 = resumen.createRow(18);
        XSSFCell cellEnc1Tit3 = rowEnc1Tit3.createCell(1);
        cellEnc1Tit3.setCellStyle(csEncabezados1);
        cellEnc1Tit3.setCellValue(new XSSFRichTextString("INFORME"));

        XSSFRow rowEnc2Tit3 = resumen.createRow(19);
        XSSFCell cellEnc2Tit3 = rowEnc2Tit3.createCell(1);
        cellEnc2Tit3.setCellStyle(csEncabezados0);
        cellEnc2Tit3.setCellValue(new XSSFRichTextString("PARTIDA"));

        XSSFRow rowEnc3Tit3 = resumen.createRow(20);
        XSSFCell cellEnc3Tit3 = rowEnc3Tit3.createCell(1);
        cellEnc3Tit3.setCellStyle(csEncabezados1);
        cellEnc3Tit3.setCellValue(new XSSFRichTextString("CAPITULO"));

        XSSFRow rowEnc4Tit3 = resumen.createRow(21);
        XSSFCell cellEnc4Tit3 = rowEnc4Tit3.createCell(1);
        cellEnc4Tit3.setCellStyle(csEncabezados0);
        cellEnc4Tit3.setCellValue(new XSSFRichTextString("RUT"));

        /* Encabezado Detalle reporte */

        XSSFRow rowEncTblDet = detalle.createRow(0);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Programa", 0, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "�rea Transaccional", 1, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Moneda", 2, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Movim.", 3, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Cuenta Contable", 4, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "C�digo BIP", 5, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Denominaci�n Proyecto", 6, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Debe CLP", 7, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Haber CLP", 8, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Debe USB", 9, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Haber USD", 10, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Denominaci�n Cuenta", 11, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Folio Contable", 12, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Tipo Transacci�n", 13, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Cuenta Presupuestaria", 14, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Estado R002", 15, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Mensaje R002", 16, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Estado R003", 17, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Mensaje R003", 18, csEncTblDet);


        /* Volcamiento de datos */

        /* Informacion General */
        setValorEncabezado(rowEnc1Tit2, csDatosEnc1, datosGeneralInforme.getEstado());
        setValorEncabezado(rowEnc2Tit2, csDatosEnc0, datosGeneralInforme.getTipoInforme());
        setValorEncabezado(rowEnc3Tit2, csDatosEnc1, datosGeneralInforme.getInforme());
        setValorEncabezado(rowEnc4Tit2, csDatosEnc0, datosGeneralInforme.getPeriodo());
        setValorEncabezado(rowEnc5Tit2, csDatosEnc1, datosGeneralInforme.getEjercicio());
        setValorEncabezado(rowEnc6Tit2, csDatosEnc0, datosGeneralInforme.getUsuario());
        setValorEncabezado(rowEnc7Tit2, csDatosEnc1, datosGeneralInforme.getEntidad());

        /* Detalle del Archivo Cargado */
        setValorEncabezado(rowEnc1Tit3, csDatosEnc1, datosDetalleInforme.getUuid());
        setValorEncabezado(rowEnc2Tit3, csDatosEnc0, datosDetalleInforme.getPartida());
        setValorEncabezado(rowEnc3Tit3, csDatosEnc1, datosDetalleInforme.getCapitulo());
        setValorEncabezado(rowEnc4Tit3, csDatosEnc0, datosDetalleInforme.getRut());

        /* Errores Genericos */
        if (!datosDetalleInforme.getErroresGenericos().isEmpty()) {
            for (int i = 0 ; i < datosDetalleInforme.getErroresGenericos().size(); i++) {
                rowNumTit4 = rowNumTit4 + 1;
                resumen.addMergedRegion(new CellRangeAddress(rowNumTit4, rowNumTit4, 1, 2));
                XSSFRow rowErrGen = resumen.createRow(rowNumTit4);
                XSSFCell cellErrGen = rowErrGen.createCell(1);

                ErrorGenerico error = datosDetalleInforme.getErroresGenericos().get(i);
                cellErrGen.setCellValue("   " + error.getMensaje());

                if (error.getTipoError() == 1) {
                    new AddImageExcel().addImageToSheet("B" + (rowNumTit4 + 1), resumen, resumen.createDrawingPatriarch(), tipError1,
                            2, 5, AddImageExcel.OVERLAY_ROW_AND_COLUMN);
                } else if (error.getTipoError() == 2) {
                    new AddImageExcel().addImageToSheet("B" + (rowNumTit4 + 1), resumen, resumen.createDrawingPatriarch(), tipError2,
                            2, 5, AddImageExcel.OVERLAY_ROW_AND_COLUMN);
                } else if (error.getTipoError() == 3) {
                    new AddImageExcel().addImageToSheet("B" + (rowNumTit4 + 1), resumen, resumen.createDrawingPatriarch(), tipError3,
                            2, 5, AddImageExcel.OVERLAY_ROW_AND_COLUMN);
                }

                if (i%2 == 0) {
                    cellErrGen.setCellStyle(csDatosEnc1);
                } else {
                    cellErrGen.setCellStyle(csDatosEnc0);
                }
            }
        } else {
            resumen.addMergedRegion(new CellRangeAddress(23, 23, 1, 2));
            XSSFRow rowErrGen = resumen.createRow(23);
            XSSFCell cellErrGen = rowErrGen.createCell(1);
            cellErrGen.setCellValue("El informe contable no presenta errores gen�ricos");
            cellErrGen.setCellStyle(csDatosEnc0);
        }

        /* Datos tabla detalle */
        if (datosDetalleInforme.getErrorEsquema().equals(0)) {
            int nextIndex;

            for (int i = 0; i < dataInforme.size(); i++) {
                nextIndex = i + 1;

                ReporteValidacionData data = dataInforme.get(i);
                XSSFRow rowInfTblDet = detalle.createRow(nextIndex);

                if (data.getEstadpRegla2().equals(1) || data.getEstadpRegla3().equals(1)) {

                    String tipoerror = "";

                    if (data.getTipoErrorRegla2().equals("1") || data.getTipoErrorRegla3().equals("1")) {
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDetError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDetError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentradoError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentradoError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentradoError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentradoError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentradoError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerechaError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerechaError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerechaError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerechaError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDetError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDetError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDetError);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentradoError);
                        tipoerror = "1";
                    } else if (data.getTipoErrorRegla2().equals("2") || data.getTipoErrorRegla3().equals("2")) {
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDetWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDetWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentradoWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentradoWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentradoWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentradoWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentradoWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerechaWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerechaWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerechaWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerechaWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDetWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDetWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDetWarning);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentradoWarning);
                        tipoerror = "2";
                    } else {
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDetInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDetInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentradoInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentradoInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentradoInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentradoInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentradoInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerechaInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerechaInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerechaInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerechaInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDetInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDetInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDetInterno);
                        creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentradoInterno);
                    }

                    if (data.getEstadpRegla2().equals(1)) {
                        if (tipoerror.equals("1")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "NOK", 15, csDatosTblDetCentradoError);
                            creaCeldaDataTablaDetalle(rowInfTblDet, data.getMensajeRegla2(), 16, csDatosTblDetError);
                        } else if (tipoerror.equals("2")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "NOK", 15, csDatosTblDetCentradoWarning);
                            creaCeldaDataTablaDetalle(rowInfTblDet, data.getMensajeRegla2(), 16, csDatosTblDetWarning);
                        } else {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "NOK", 15, csDatosTblDetCentradoInterno);
                            creaCeldaDataTablaDetalle(rowInfTblDet, data.getMensajeRegla2(), 16, csDatosTblDetInterno);
                        }
                    } else {
                        if (tipoerror.equals("1")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 15, csDatosTblDetCentradoError);
                            creaCeldaDataTablaDetalle(rowInfTblDet, "", 16, csDatosTblDetError);
                        } else if (tipoerror.equals("2")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 15, csDatosTblDetCentradoWarning);
                            creaCeldaDataTablaDetalle(rowInfTblDet, "", 16, csDatosTblDetWarning);
                        } else {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 15, csDatosTblDetCentradoInterno);
                            creaCeldaDataTablaDetalle(rowInfTblDet, "", 16, csDatosTblDetInterno);
                        }
                    }

                    if (data.getEstadpRegla3().equals(1)) {
                        if (tipoerror.equals("1")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "NOK", 17, csDatosTblDetCentradoError);
                            creaCeldaDataTablaDetalle(rowInfTblDet, data.getMensajeRegla3(), 18, csDatosTblDetError);
                        } else if (tipoerror.equals("2")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "NOK", 17, csDatosTblDetCentradoWarning);
                            creaCeldaDataTablaDetalle(rowInfTblDet, data.getMensajeRegla3(), 18, csDatosTblDetWarning);
                        } else {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "NOK", 17, csDatosTblDetCentradoInterno);
                            creaCeldaDataTablaDetalle(rowInfTblDet, data.getMensajeRegla3(), 18, csDatosTblDetInterno);
                        }
                    } else {
                        if (tipoerror.equals("1")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 17, csDatosTblDetCentradoError);
                            creaCeldaDataTablaDetalle(rowInfTblDet, "", 18, csDatosTblDetError);
                        } else if (tipoerror.equals("2")) {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 17, csDatosTblDetCentradoWarning);
                            creaCeldaDataTablaDetalle(rowInfTblDet, "", 18, csDatosTblDetWarning);
                        } else {
                            creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 17, csDatosTblDetCentradoInterno);
                            creaCeldaDataTablaDetalle(rowInfTblDet, "", 18, csDatosTblDetInterno);
                        }
                    }
                } else if (i%2 == 0) {
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 15, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "", 16, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 17, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "", 18, csDatosTblDet0);
                } else {
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 15, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "", 16, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "OK", 17, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, "", 18, csDatosTblDet1);
                }
            }
        }

        /* Ordena Hoja Detalle */
        for (int i = 0; i < 19; i++) {
            detalle.autoSizeColumn(i);
        }

        detalle.setAutoFilter(new CellRangeAddress(0, detalleInforme.getRecordsTotal(), 0, 18));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        book.write(baos);
        baos.close();
        byte[] bArray = baos.toByteArray();
        InputStream is = new ByteArrayInputStream(bArray);

        Map<String, InputStreamResource> result = new HashMap<String, InputStreamResource>();
        result.put(generaNombreArchivo(datosDetalleInforme.getUuid()), new InputStreamResource(is));

        return result;
    }

    private void creaCeldaEncTablaDetalle(XSSFRow rowEncTblDet, String nombre, Integer indice, XSSFCellStyle style) {
        XSSFCell cell = rowEncTblDet.createCell(indice);
        cell.setCellStyle(style);
        cell.setCellValue(new XSSFRichTextString(nombre));
    }

    private void setValorEncabezado(XSSFRow row, XSSFCellStyle style, String valor) {
        XSSFCell cell = row.createCell(2);
        cell.setCellStyle(style);
        cell.setCellValue(valor);
    }

    private void creaCeldaDataTablaDetalle(XSSFRow rowInfTblDet, String valor, Integer indice, XSSFCellStyle style) {
        XSSFCell cell = rowInfTblDet.createCell(indice);
        cell.setCellStyle(style);
        cell.setCellValue(valor);
    }

    private String generaNombreArchivo(String uuid) {

        String extensionArchivo = ".xlsx";

        if (uuid.toLowerCase().contains(".xml")) {
            return uuid.substring(0, uuid.length() - 4).concat(extensionArchivo);
        } else {
            return uuid.concat(extensionArchivo);
        }
    }

    public Map<String, InputStreamResource> generaExcelVerIC(URL logoSicogen, Integer idArchivo) throws IOException {

        InformacionGeneralRV datosGeneralInforme = informesService.obtieneInfoGeneralRV(idArchivo);
        InformeContableDTO datosDetalleInforme = informesService.obtieneDatosInformeContable(idArchivo);
        ReporteValidacionPaginacion detalleInforme = informesService.obtieneReporteValidacionPaginacion(idArchivo,
                1, 0, 0, "1");
        List<ReporteValidacionData> dataInforme = detalleInforme.getData();

        XSSFWorkbook book = new XSSFWorkbook();
        XSSFSheet resumen = book.createSheet();
        XSSFSheet detalle = book.createSheet();

        book.setSheetName(0, "Resumen");
        book.setSheetName(1, "Detalle");

        resumen.setColumnWidth(1, 8000);
        resumen.setColumnWidth(2, 30000);

        /* Styling */

        /* Backgrounds */
        XSSFColor bckTitulos =  new XSSFColor(new java.awt.Color(63,135,193));
        XSSFColor bckTabla =  new XSSFColor(new java.awt.Color(215,215,217));
        XSSFColor bckBlanco =  new XSSFColor(new java.awt.Color(255,255,255));
        XSSFColor bckError =  new XSSFColor(new java.awt.Color(255, 199, 206));

        /* Fonts */

        XSSFFont fntTituloReporte = book.createFont();
        fntTituloReporte.setFontHeightInPoints((short) 20);
        fntTituloReporte.setColor(new XSSFColor(new java.awt.Color(69, 70, 72)));
        fntTituloReporte.setBold(Boolean.TRUE);
        fntTituloReporte.setFontName("Arial");

        XSSFFont fntTitulos = book.createFont();
        fntTitulos.setFontHeightInPoints((short) 11);
        fntTitulos.setColor(new XSSFColor(new java.awt.Color(255, 255, 255)));
        fntTitulos.setBold(Boolean.TRUE);
        fntTitulos.setFontName("Arial");

        XSSFFont fntDatosEncabezados = book.createFont();
        fntDatosEncabezados.setFontHeightInPoints((short) 11);
        fntDatosEncabezados.setColor(new XSSFColor(new java.awt.Color(102, 102, 102)));
        fntDatosEncabezados.setFontName("Arial");

        XSSFFont fntTitulosEncabezados = book.createFont();
        fntTitulosEncabezados.setFontHeightInPoints((short) 11);
        fntTitulosEncabezados.setColor(new XSSFColor(new java.awt.Color(102, 102, 102)));
        fntTitulosEncabezados.setBold(Boolean.TRUE);
        fntTitulosEncabezados.setFontName("Arial");

        XSSFFont fntEncTblDet = book.createFont();
        fntEncTblDet.setFontHeightInPoints((short) 11);
        fntEncTblDet.setColor(new XSSFColor(new java.awt.Color(69, 70, 72)));
        fntEncTblDet.setBold(Boolean.TRUE);
        fntEncTblDet.setFontName("Arial");

        XSSFFont fntTblDet = book.createFont();
        fntTblDet.setFontHeightInPoints((short) 11);
        fntTblDet.setColor(new XSSFColor(new java.awt.Color(69, 70, 72)));
        fntTblDet.setFontName("Arial");

        /* Cell Styles */

        XSSFCellStyle csTituloReporte = book.createCellStyle();
        csTituloReporte.setFont(fntTituloReporte);
        csTituloReporte.setFillForegroundColor(bckTabla);
        csTituloReporte.setFillBackgroundColor(bckTabla);
        csTituloReporte.setAlignment(HorizontalAlignment.CENTER);
        csTituloReporte.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csTitulos = book.createCellStyle();
        csTitulos.setFont(fntTitulos);
        csTitulos.setFillForegroundColor(bckTitulos);
        csTitulos.setFillBackgroundColor(bckTitulos);
        csTitulos.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        csTitulos.setAlignment(HorizontalAlignment.CENTER);

        XSSFCellStyle csEncabezados0 = book.createCellStyle();
        csEncabezados0.setFillForegroundColor(bckBlanco);
        csEncabezados0.setFillBackgroundColor(bckBlanco);
        csEncabezados0.setFont(fntTitulosEncabezados);
        csEncabezados0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csEncabezados1 = book.createCellStyle();
        csEncabezados1.setFont(fntTitulosEncabezados);
        csEncabezados1.setFillForegroundColor(bckTabla);
        csEncabezados1.setFillBackgroundColor(bckTabla);
        csEncabezados1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosEnc0 = book.createCellStyle();
        csDatosEnc0.setFont(fntDatosEncabezados);
        csDatosEnc0.setFillForegroundColor(bckBlanco);
        csDatosEnc0.setFillBackgroundColor(bckBlanco);
        csDatosEnc0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosEnc1 = book.createCellStyle();
        csDatosEnc1.setFont(fntDatosEncabezados);
        csDatosEnc1.setFillForegroundColor(bckTabla);
        csDatosEnc1.setFillBackgroundColor(bckTabla);
        csDatosEnc1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csEncTblDet = book.createCellStyle();
        csEncTblDet.setFont(fntEncTblDet);
        csEncTblDet.setFillForegroundColor(bckBlanco);
        csEncTblDet.setFillBackgroundColor(bckBlanco);
        csEncTblDet.setAlignment(HorizontalAlignment.CENTER);
        csEncTblDet.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        csEncTblDet.setBorderBottom(BorderStyle.MEDIUM);

        XSSFCellStyle csDatosTblDet0 = book.createCellStyle();
        csDatosTblDet0.setFont(fntTblDet);
        csDatosTblDet0.setFillForegroundColor(bckBlanco);
        csDatosTblDet0.setFillBackgroundColor(bckBlanco);
        csDatosTblDet0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDet1 = book.createCellStyle();
        csDatosTblDet1.setFont(fntTblDet);
        csDatosTblDet1.setFillForegroundColor(bckTabla);
        csDatosTblDet1.setFillBackgroundColor(bckTabla);
        csDatosTblDet1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentrado0 = book.createCellStyle();
        csDatosTblDetCentrado0.setFont(fntTblDet);
        csDatosTblDetCentrado0.setFillForegroundColor(bckBlanco);
        csDatosTblDetCentrado0.setFillBackgroundColor(bckBlanco);
        csDatosTblDetCentrado0.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentrado0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentrado1 = book.createCellStyle();
        csDatosTblDetCentrado1.setFont(fntTblDet);
        csDatosTblDetCentrado1.setFillForegroundColor(bckTabla);
        csDatosTblDetCentrado1.setFillBackgroundColor(bckTabla);
        csDatosTblDetCentrado1.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentrado1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerecha0 = book.createCellStyle();
        csDatosTblDetDerecha0.setFont(fntTblDet);
        csDatosTblDetDerecha0.setFillForegroundColor(bckBlanco);
        csDatosTblDetDerecha0.setFillBackgroundColor(bckBlanco);
        csDatosTblDetDerecha0.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerecha0.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerecha1 = book.createCellStyle();
        csDatosTblDetDerecha1.setFont(fntTblDet);
        csDatosTblDetDerecha1.setFillForegroundColor(bckTabla);
        csDatosTblDetDerecha1.setFillBackgroundColor(bckTabla);
        csDatosTblDetDerecha1.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerecha1.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetError = book.createCellStyle();
        csDatosTblDetError.setFont(fntTblDet);
        csDatosTblDetError.setFillForegroundColor(bckError);
        csDatosTblDetError.setFillBackgroundColor(bckError);
        csDatosTblDetError.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetCentradoError = book.createCellStyle();
        csDatosTblDetCentradoError.setFont(fntTblDet);
        csDatosTblDetCentradoError.setFillForegroundColor(bckError);
        csDatosTblDetCentradoError.setFillBackgroundColor(bckError);
        csDatosTblDetCentradoError.setAlignment(HorizontalAlignment.CENTER);
        csDatosTblDetCentradoError.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        XSSFCellStyle csDatosTblDetDerechaError = book.createCellStyle();
        csDatosTblDetDerechaError.setFont(fntTblDet);
        csDatosTblDetDerechaError.setFillForegroundColor(bckError);
        csDatosTblDetDerechaError.setFillBackgroundColor(bckError);
        csDatosTblDetDerechaError.setAlignment(HorizontalAlignment.RIGHT);
        csDatosTblDetDerechaError.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        /* Imagen de cabecera */
        resumen.addMergedRegion(new CellRangeAddress(1, 1, 1, 2));
        new AddImageExcel().addImageToSheet("B2", resumen, resumen.createDrawingPatriarch(), logoSicogen,
                100, 25, AddImageExcel.OVERLAY_ROW_AND_COLUMN);

        /* Titulos */
        int rowNumTit1 = 7;
        int rowNumTit2 = 9;
        int rowNumTit3 = 17;

        /* Titulo General */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit1, rowNumTit1, 1, 2));
        XSSFRow rowTit1 = resumen.createRow(rowNumTit1);
        XSSFCell cellTit1 = rowTit1.createCell(1);
        cellTit1.setCellStyle(csTituloReporte);
        cellTit1.setCellValue(new XSSFRichTextString("INFORME CONTABLE"));

        /* Titulo 1 */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit2, rowNumTit2, 1, 2));
        XSSFRow rowTit2 = resumen.createRow(rowNumTit2);
        XSSFCell cellTit2 = rowTit2.createCell(1);
        cellTit2.setCellStyle(csTitulos);
        cellTit2.setCellValue(new XSSFRichTextString("Informaci�n General"));

        /* Titulo 2 */
        resumen.addMergedRegion(new CellRangeAddress(rowNumTit3, rowNumTit3, 1, 2));
        XSSFRow rowTit3 = resumen.createRow(rowNumTit3);
        XSSFCell cellTit3 = rowTit3.createCell(1);
        cellTit3.setCellStyle(csTitulos);
        cellTit3.setCellValue(new XSSFRichTextString("Detalle de Archivo Cargado"));

        /* Encabezados Titulo 2 */

        XSSFRow rowEnc1Tit2 = resumen.createRow(10);
        XSSFCell cellEnc1Tit2 = rowEnc1Tit2.createCell(1);
        cellEnc1Tit2.setCellStyle(csEncabezados1);
        cellEnc1Tit2.setCellValue(new XSSFRichTextString("ESTADO DE VALIDACI�N"));

        XSSFRow rowEnc2Tit2 = resumen.createRow(11);
        XSSFCell cellEnc2Tit2 = rowEnc2Tit2.createCell(1);
        cellEnc2Tit2.setCellStyle(csEncabezados0);
        cellEnc2Tit2.setCellValue(new XSSFRichTextString("TIPO DE INFORME"));

        XSSFRow rowEnc3Tit2 = resumen.createRow(12);
        XSSFCell cellEnc3Tit2 = rowEnc3Tit2.createCell(1);
        cellEnc3Tit2.setCellStyle(csEncabezados1);
        cellEnc3Tit2.setCellValue(new XSSFRichTextString("INFORME"));

        XSSFRow rowEnc4Tit2 = resumen.createRow(13);
        XSSFCell cellEnc4Tit2 = rowEnc4Tit2.createCell(1);
        cellEnc4Tit2.setCellStyle(csEncabezados0);
        cellEnc4Tit2.setCellValue(new XSSFRichTextString("PER�ODO"));

        XSSFRow rowEnc5Tit2 = resumen.createRow(14);
        XSSFCell cellEnc5Tit2 = rowEnc5Tit2.createCell(1);
        cellEnc5Tit2.setCellStyle(csEncabezados1);
        cellEnc5Tit2.setCellValue(new XSSFRichTextString("EJERCICIO"));

        XSSFRow rowEnc6Tit2 = resumen.createRow(15);
        XSSFCell cellEnc6Tit2 = rowEnc6Tit2.createCell(1);
        cellEnc6Tit2.setCellStyle(csEncabezados0);
        cellEnc6Tit2.setCellValue(new XSSFRichTextString("USUARIO"));

        XSSFRow rowEnc7Tit2 = resumen.createRow(16);
        XSSFCell cellEnc7Tit2 = rowEnc7Tit2.createCell(1);
        cellEnc7Tit2.setCellStyle(csEncabezados1);
        cellEnc7Tit2.setCellValue(new XSSFRichTextString("ENTIDAD"));

        /* Encabezados Titulo 3 */

        XSSFRow rowEnc1Tit3 = resumen.createRow(18);
        XSSFCell cellEnc1Tit3 = rowEnc1Tit3.createCell(1);
        cellEnc1Tit3.setCellStyle(csEncabezados1);
        cellEnc1Tit3.setCellValue(new XSSFRichTextString("INFORME"));

        XSSFRow rowEnc2Tit3 = resumen.createRow(19);
        XSSFCell cellEnc2Tit3 = rowEnc2Tit3.createCell(1);
        cellEnc2Tit3.setCellStyle(csEncabezados0);
        cellEnc2Tit3.setCellValue(new XSSFRichTextString("PARTIDA"));

        XSSFRow rowEnc3Tit3 = resumen.createRow(20);
        XSSFCell cellEnc3Tit3 = rowEnc3Tit3.createCell(1);
        cellEnc3Tit3.setCellStyle(csEncabezados1);
        cellEnc3Tit3.setCellValue(new XSSFRichTextString("CAPITULO"));

        XSSFRow rowEnc4Tit3 = resumen.createRow(21);
        XSSFCell cellEnc4Tit3 = rowEnc4Tit3.createCell(1);
        cellEnc4Tit3.setCellStyle(csEncabezados0);
        cellEnc4Tit3.setCellValue(new XSSFRichTextString("RUT"));

        /* Encabezado Detalle reporte */

        XSSFRow rowEncTblDet = detalle.createRow(0);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Programa", 0, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "�rea Transaccional", 1, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Moneda", 2, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Movim.", 3, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Cuenta Contable", 4, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "C�digo BIP", 5, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Denominaci�n Proyecto", 6, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Debe CLP", 7, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Haber CLP", 8, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Debe USB", 9, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Haber USD", 10, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Denominaci�n Cuenta", 11, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Folio Contable", 12, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Tipo Transacci�n", 13, csEncTblDet);
        creaCeldaEncTablaDetalle(rowEncTblDet, "Cuenta Presupuestaria", 14, csEncTblDet);


        /* Volcamiento de datos */

        /* Informacion General */
        setValorEncabezado(rowEnc1Tit2, csDatosEnc1, datosGeneralInforme.getEstado());
        setValorEncabezado(rowEnc2Tit2, csDatosEnc0, datosGeneralInforme.getTipoInforme());
        setValorEncabezado(rowEnc3Tit2, csDatosEnc1, datosGeneralInforme.getInforme());
        setValorEncabezado(rowEnc4Tit2, csDatosEnc0, datosGeneralInforme.getPeriodo());
        setValorEncabezado(rowEnc5Tit2, csDatosEnc1, datosGeneralInforme.getEjercicio());
        setValorEncabezado(rowEnc6Tit2, csDatosEnc0, datosGeneralInforme.getUsuario());
        setValorEncabezado(rowEnc7Tit2, csDatosEnc1, datosGeneralInforme.getEntidad());

        /* Detalle del Archivo Cargado */
        setValorEncabezado(rowEnc1Tit3, csDatosEnc1, datosDetalleInforme.getUuid());
        setValorEncabezado(rowEnc2Tit3, csDatosEnc0, datosDetalleInforme.getPartida());
        setValorEncabezado(rowEnc3Tit3, csDatosEnc1, datosDetalleInforme.getCapitulo());
        setValorEncabezado(rowEnc4Tit3, csDatosEnc0, datosDetalleInforme.getRut());

        /* Datos tabla detalle */
        if (datosDetalleInforme.getErrorEsquema().equals(0)) {
            int nextIndex;

            for (int i = 0; i < dataInforme.size(); i++) {
                nextIndex = i + 1;

                ReporteValidacionData data = dataInforme.get(i);
                XSSFRow rowInfTblDet = detalle.createRow(nextIndex);

                if (i%2 != 0) {
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentrado0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerecha0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDet0);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentrado0);
                } else {
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getPrograma(), 0, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getAreaTransaccional(), 1, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMoneda(), 2, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getMovimiento(), 3, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaContable(), 4, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCodigoBIP(), 5, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionProyecto(), 6, csDatosTblDetCentrado1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeCLP(), 7, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberCLP(), 8, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDebeUSD(), 9, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getHaberUSD(), 10, csDatosTblDetDerecha1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getDenominacionCuenta(), 11, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getFolioContable(), 12, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getTipoTransaccion(), 13, csDatosTblDet1);
                    creaCeldaDataTablaDetalle(rowInfTblDet, data.getCuentaPresupuestaria(), 14, csDatosTblDetCentrado1);
                }
            }
        }

        /* Ordena Hoja Detalle */
        for (int i = 0; i < 19; i++) {
            detalle.autoSizeColumn(i);
        }

        detalle.setAutoFilter(new CellRangeAddress(0, detalleInforme.getRecordsTotal(), 0, 14));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        book.write(baos);
        baos.close();
        byte[] bArray = baos.toByteArray();
        InputStream is = new ByteArrayInputStream(bArray);

        Map<String, InputStreamResource> result = new HashMap<String, InputStreamResource>();
        result.put(generaNombreArchivo(datosDetalleInforme.getUuid()), new InputStreamResource(is));

        return result;
    }
}
