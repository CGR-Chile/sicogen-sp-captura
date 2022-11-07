package cl.contraloria.sicogen.utils;

import cl.contraloria.sicogen.model.Informes;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.net.URL;
import java.sql.Clob;
import java.sql.SQLException;

public class Utils {

    public static String readClob(Clob clob) throws SQLException, IOException {

       // logger.info("clob: "+clob);

        StringBuilder sb = new StringBuilder((int) clob.length());
        Reader r = clob.getCharacterStream();
        char[] cbuf = new char[2048];
        int n;
        while ((n = r.read(cbuf, 0, cbuf.length)) != -1) {
            sb.append(cbuf, 0, n);
        }
        return sb.toString();
    }

    public Informes getImagenEstado(int estado, int infId){

        Informes inf = new Informes();
        switch (estado){
            case 1:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/loader.gif");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setInformeMensaje("");
                break;
            case 2:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/loader.gif");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setInformeMensaje("");
                break;
            case 3:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/error.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/document_inspector.png");
                inf.setInformeAccion("verReporteValidacion("+infId+")");
                inf.setInformeMensaje("");
                break;
            case 4:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/Validado.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/document_inspector.png");
                inf.setInformeAccion("verReporteValidacion("+infId+")");
                inf.setInformeMensaje("");
                break;
            case 5:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/ValidadoOBS.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/document_inspector.png");
                inf.setInformeAccion("verReporteValidacion("+infId+")");
                inf.setInformeMensaje("");
                break;
            case 6:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/Procesado.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/document_inspector.png");
                inf.setInformeAccion("verReporteValidacion("+infId+")");
                inf.setInformeMensaje("Proceso");
                break;
            case 7:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/ProcesadoOBS.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/document_inspector.png");
                inf.setInformeAccion("verReporteValidacion("+infId+")");
                inf.setInformeMensaje("Proceso con Observaciones");
                break;
            case 8:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/NotMov.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setInformeMensaje("Sin Movimiento");
                break;
            case 9:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/NotMovProc.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setInformeMensaje("Anulado");
                break;
            case 10:
                inf.setImgCarga("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setImgValid("/SICOGEN2_PUB/resources/img/NotMovProc.png");
                inf.setImgRV("/SICOGEN2_PUB/resources/img/blanco.png");
                inf.setInformeMensaje("Procesado sin movimiento");
                break;
        }
        return inf;
    }

    public static String validaXMLSchema(URL xsdFile, InputStream xml) {

        try {
            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema schema = factory.newSchema(xsdFile);
            Validator validator = schema.newValidator();
            validator.validate(new StreamSource(xml));
        } catch (SAXException e) {
            return e.getLocalizedMessage();
        } catch (IOException e) {
            return e.getLocalizedMessage();
        }

        return null;
    }
}
