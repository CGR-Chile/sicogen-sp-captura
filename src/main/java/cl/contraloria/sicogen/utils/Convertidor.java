package cl.contraloria.sicogen.utils;

import cl.contraloria.sicogen.model.InformacionGeneralRV;
import cl.contraloria.sicogen.service.InformesService;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Properties;

@Component
public class Convertidor {

    private InformesService informesService;
    private Environment env;

    public Convertidor(InformesService informesService,
                       Environment env) {
        this.informesService = informesService;
        this.env = env;
    }

    public Convertidor() {

    }

    public static String formatearFechaActual(String formatoFecha){

        String strFechaActual;
        DateFormat dfmFormateador=new SimpleDateFormat(formatoFecha);
        Date dteFecha=new Date();

        strFechaActual=dfmFormateador.format(dteFecha);

        return strFechaActual;
    }
    public static String formatearNumero(long numeroData){
        String strNumeroFormato;
        Locale locConfiguracion;
        NumberFormat nfmFormateador;

        locConfiguracion	= new Locale("es", "CL");
        nfmFormateador		= NumberFormat.getNumberInstance(locConfiguracion);
        strNumeroFormato	= nfmFormateador.format(numeroData);

        return strNumeroFormato;
    }

    public String obtieneHtmlRV(String xml){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Source xslDoc = new StreamSource(env.getProperty("rutaXSLIC") + env.getProperty("nombreXSLIC"));

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("UTF-8"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();
            // Se debe eliminar la primera linea (definicion de XML)
            strResult = strResult.substring(38);


        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }



    public static String obtieneHtmlRVPdf(String xml, HttpServletRequest request){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Properties prop = loadProperties(request);
            String xsl = prop.getProperty("nombreXSLICPDF");
            String ruta = prop.getProperty("rutaXSLIC");
            System.out.println(xsl);
            System.out.println(ruta);

            Source xslDoc = new StreamSource(ruta+xsl);

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("UTF-8"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();

        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }


    public static File obtieneCssRVPdf(HttpServletRequest request){

        File archivo = null;

        try{

            Properties prop = loadProperties(request);
            String css = prop.getProperty("nombreCSSICPDF");
            String ruta = prop.getProperty("rutaCSSIC");
            System.out.println(css);
            System.out.println(ruta);

            archivo = new File (ruta+css);

        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

        return archivo;
    }



    public static String obtieneHtmlRVExcel(String xml, HttpServletRequest request){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Properties prop = loadProperties(request);
            String xsl = prop.getProperty("nombreXSLICExcel");
            String ruta = prop.getProperty("rutaXSLIC");
            System.out.println(xsl);
            System.out.println(ruta);

            Source xslDoc = new StreamSource(ruta+xsl);

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("UTF-8"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();

        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }


    public String obtieneXMLCabecera(Integer idFileUp){

        InformacionGeneralRV datos = new InformacionGeneralRV();
        datos =  informesService.obtieneInfoGeneralRV(idFileUp);

        String xmlCab = "<datosCabecera><datos>";
        xmlCab+="<estadoValidacion>"+datos.getEstado()+"</estadoValidacion>";
        xmlCab+="<tipoInforme>"+datos.getTipoInforme()+"</tipoInforme>";
        xmlCab+="<informe>"+datos.getInforme()+"</informe>";
        xmlCab+="<periodo>"+datos.getPeriodo()+"</periodo>";
        xmlCab+="<ejercicio>"+datos.getEjercicio()+"</ejercicio>";
        xmlCab+="<usuario>"+datos.getUsuario()+"</usuario>";
        xmlCab+="<entidad>"+datos.getEntidad()+"</entidad>";
        xmlCab+="</datos></datosCabecera>";

        return xmlCab;

    }


    private static Properties loadProperties( HttpServletRequest request) throws Exception {

        Properties props = new Properties();
        FileInputStream in = null;
        ServletContext sc = request.getSession(false).getServletContext();

        try {
            in = new FileInputStream((String)sc.getInitParameter("properties")); //ServletActionContext.getServletContext().getInitParameter("properties"));
            props.load(in);
            in.close();
        }catch(IOException e) {
            //throw new ExcepcionSicogen("No se puede abrir el archivo de propiedades de la aplicacion.  En la ruta "+(String) ServletActionContext.getServletContext().getInitParameter("properties"));
        }catch (Exception ex) {
            throw ex;
        }

        return props;

    }


    public String obtieneHtmlRVFINCC(String xml){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Source xslDoc = new StreamSource(env.getProperty("rutaXSLIC") + env.getProperty("nombreXSLIC"));

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("Windows-1252"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();
            // Se debe eliminar la primera linea (definicion de XML)
            strResult = strResult.substring(38);


        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }

    public static String obtieneHtmlRVFINCO(String xml, HttpServletRequest request){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Properties prop = loadProperties(request);
            String xsl = prop.getProperty("nombreXSLFINCO");
            String ruta = prop.getProperty("rutaXSLIC");
            System.out.println(xsl);
            System.out.println(ruta);

            Source xslDoc = new StreamSource(ruta+xsl);

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("Windows-1252"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();
            // Se debe eliminar la primera linea (definicion de XML)
            strResult = strResult.substring(38);


        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }


    public static String obtieneHtmlRVFINEI(String xml, HttpServletRequest request){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Properties prop = loadProperties(request);
            String xsl = prop.getProperty("nombreXSLFINEI");
            String ruta = prop.getProperty("rutaXSLIC");
            System.out.println(xsl);
            System.out.println(ruta);

            Source xslDoc = new StreamSource(ruta+xsl);

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("Windows-1252"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();
            // Se debe eliminar la primera linea (definicion de XML)
            strResult = strResult.substring(38);

        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }


    public static String obtieneHtmlRVFINEJ(String xml, HttpServletRequest request){

        String strResult = "";

        try{

            TransformerFactory tFactory = TransformerFactory.newInstance();

            Properties prop = loadProperties(request);
            String xsl = prop.getProperty("nombreXSLFINEJ");
            String ruta = prop.getProperty("rutaXSLIC");
            System.out.println(xsl);
            System.out.println(ruta);

            Source xslDoc = new StreamSource(ruta+xsl);

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("Windows-1252"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();
            // Se debe eliminar la primera linea (definicion de XML)
            strResult = strResult.substring(38);

        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }

    public static String obtieneHtmlRVInformeFINICFinal(String xml, HttpServletRequest request){

        String strResult = "";
        try{
            TransformerFactory tFactory = TransformerFactory.newInstance();
            Properties prop = loadProperties(request);
            String xsl = prop.getProperty("nombreXSLFINICUnion");
            String ruta = prop.getProperty("rutaXSLIC");
            System.out.println(xsl);
            System.out.println(ruta);

            Source xslDoc = new StreamSource(ruta+xsl);

            InputStream isXml = new ByteArrayInputStream(xml.getBytes("Windows-1252"));
            Source xmlDoc = new StreamSource(isXml);

            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);

            Transformer transformer = tFactory.newTransformer(xslDoc);
            transformer.transform(xmlDoc, result);

            strResult = writer.toString();
            // Se debe eliminar la primera linea (definicion de XML)
            strResult = strResult.substring(38);

        }catch(Exception e){
            e.printStackTrace();
        }

        return strResult;
    }


}
