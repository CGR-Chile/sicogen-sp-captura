package cl.contraloria.sicogen.controller;

import cl.contraloria.sicogen.service.InformesPersistencia;
import cl.contraloria.sicogen.service.InformesService;
import cl.contraloria.sicogen.utils.Convertidor;
import cl.contraloria.sicogen.model.InformacionGeneralRV;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.StringReader;
import java.io.StringWriter;

@Controller
@RequestMapping("/cargaInformes")
public class CargaInformesController {

    private String htmlRV;
    private InformacionGeneralRV infoGeneral = new InformacionGeneralRV();
    private InformesService informesService;
    private Convertidor convertidor;

    @Autowired
    public CargaInformesController(InformesService informesService, InformesPersistencia informe, Convertidor convertidor ) {
        this.informesService = informesService;
        this.convertidor = convertidor;
        //this.informe = informe;
    }

    @RequestMapping(value = "/validacionIC", method = RequestMethod.GET)
    public String getInformeUpload(ModelMap model, @RequestParam Integer idFileUp, HttpServletRequest request){

       String xmlPI = "";

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = null;
        Document doc = null;

        try{
            xmlPI = informesService.obtieneXMLInformePI(idFileUp);
            //logger.info("String PI: "+xmlPI);
            // Convertir el String en un XML con JAXB !!
            db = dbf.newDocumentBuilder();
            InputSource is = new InputSource();
            is.setCharacterStream(new StringReader(xmlPI));

            doc = db.parse(is);
            String message = doc.getDocumentElement().getTextContent();
            //logger.info("XML PI: "+message);

        }catch(Exception ex){
            ex.printStackTrace();
            return "error500page";
        }


        String xmlErrPI = "";
        //Llamar al DAO de PI para rescatar el XML con Errores del Informe
        try{
            xmlErrPI = informesService.obtieneXMLErroresPI(idFileUp);
            //logger.info("XML ERRORES PI: "+xmlErrPI);

        }catch(Exception ex){
            ex.printStackTrace();
            return "error500page";
        }

        Element root = doc.getDocumentElement();
        Node nodo = doc.createElement("listaErrores");
        root.appendChild(nodo);

        //logger.info("root: "+root.toString());

        DOMSource domSource = new DOMSource(doc);
        StringWriter writer = new StringWriter();
        StreamResult result = new StreamResult(writer);
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer;
        try {
            transformer = tf.newTransformer();
            transformer.transform(domSource, result);

            xmlPI = writer.toString();
            //logger.info("XML PI Formato String: \n" + xmlPI);

        } catch (TransformerConfigurationException e) {
            e.printStackTrace();
        } catch (TransformerException e) {

            e.printStackTrace();
        }

        // Reemplazar el TAG Vacio de Errores por la Lista !!
        String xmlRVPI = xmlPI.replace("<listaErrores/>", xmlErrPI);
        //logger.info("xmlRVPI con Errores: \n"+xmlRVPI);
        // Forma de implementar la JSP para desplegar la informacion OK !!
        try{
            this.htmlRV = convertidor.obtieneHtmlRV(xmlRVPI);
            //logger.info("htmlRV: "+htmlRV);

        }catch(Exception ex){
            ex.printStackTrace();
            return "error500page";
        }
        // Invocar al DAO para obtener Informacion General del Reporte de Validacion
        try{
            this.infoGeneral = informesService.obtieneInfoGeneralRV(idFileUp);
            //logger.info("Informacion General PI: "+infoGeneral.getInforme());

            this.infoGeneral.setIdFileIp(idFileUp.toString());
        }catch(Exception ex){
            ex.printStackTrace();
            return "error500page";
        }

        model.addAttribute("infoGeneral", infoGeneral);
        model.addAttribute("htmlRV", htmlRV);

        return "verInforme";
    }

}
