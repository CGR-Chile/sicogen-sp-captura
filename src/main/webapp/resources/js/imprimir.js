// Create a jquery plugin that prints the given element.
jQuery.fn.print = function() {
    if (this.size() > 1) { this.eq(0).print(); return;
    } else if (!this.size()) {return; }

    var strFrameName = ("printer-" + (new Date()).getTime());
    var jFrame = $("<iframe name='" + strFrameName + "'>");
    jFrame.css("width", "1px").css("height", "1px").css("position", "absolute").css("left", "-9999px").appendTo($("body:first"));

    var objFrame = window.frames[strFrameName];
    var objDoc = objFrame.document;
    var jStyleDiv = $("<div>").append(
    $("style").clone()
    );
    
    estilo='.logo {background-image: url("../../images/sicogenii_logo.png");background-repeat: no-repeat;background-size:320px 90px;height:92px;padding-bottom:10px;width:960px;}'+
			' #carga{margin-left: 40px; width: 960px;}'+
			'#titulo{background-color:#D7D7D9;color:#454648;font:bold 20px Arial;padding:10px;text-align:center;width:936px;}'+
			'.EncabezadoUsuario {float: left;height: 185px;margin: 10px 0 5px 10px;opacity: 0.9;position: relative;width: 48.5%;}'+
			'.row01 {background-color: #464749;clear: both;color: #FFFFFF;font: bold 12px Arial;padding: 2.5px 0 2.5px 5px;text-align: justify;}'+
			'.row02 {background-color: #E2E1E1;color: #000000;text-align: justify;}'+
			'.row02EncCol01{background-color: #F8F8F8;float: left;font: bold 10px sans-serif;height: 18px;padding: 0 0 0 5px;width: 195px;}'+
			'.DetalleInforme {clear: both;max-height: 350px;min-height: 150px;opacity: 0.9;overflow: scroll;width: 960px;}'+
			'.row03{background-color:#0066B8;color:#FFFFFF;font:bold 12px Arial;padding:2.5px 0 2.5px 5px;text-align:justify;width:1100px;clear: both;}'+
			'.row04{background-color:#3C82C8;color:#FFFFFF;font:bold 10px arial;height: 25px;text-align: center;width: 1100px;}'+
			'.tituloDetCol01{float:left;text-align: center;width: 30px;}'+
			'.tituloDetCol02{float:left;text-align: center;width: 100px;}'+
			'.tituloDetCol03{float:left;text-align:center;width:110px;}'+
			'.tituloDetCol04{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol05{float:left;text-align:center;width:60px;}'+
			'.tituloDetCol06{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol07{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol08{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol09{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol10{float:left;text-align:center;width:250px;}'+
			'.tituloDetCol11{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol12{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol13{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol14{float:left;text-align:center;width:110px;}'+
			'.detalleContenido {font: 10px arial;max-height:250px;width:1100px;}'+
			'.rwDetImp{background-color: #FFFFFF;display: table;width: 100%;}'+
			'.rwDetPar{background-color: #BCCFED;display: table;width: 100%;}'+
			'.row02DetCol01{float:left;text-align: center;width:30px;}'+
			'.tituloDetCol02{float:left;text-align:center;width:100px;}'+
			'.tituloDetCol03{float:left;text-align:center;width:110px;}'+
			'.tituloDetCol04{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol05{float:left;text-align:center;width:60px;}'+
			'.tituloDetCol06{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol07{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol08{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol09{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol10{float:left;text-align:center;width:250px;}'+
			'.tituloDetCol11{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol12{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol13{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol14{float:left;text-align:center;width:110px;}';
    
    objDoc.open();
    objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    objDoc.write("<html>");
    objDoc.write("<body>");
    objDoc.write("<head>");
    objDoc.write("<title>");
    objDoc.write(document.title);
    objDoc.write("<style>"+estilo+"</style>");
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    objDoc.write("</head>");
    objDoc.write(this.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();
    objFrame.focus();
    objFrame.print();
    setTimeout(function() {jFrame.remove();},(60*1000));
};

function imprime2(objeto){
	estilo='.logo {background-image: url("../../images/sicogenii_logo.png");background-repeat: no-repeat;background-size:320px 90px;height:92px;padding-bottom:10px;width:960px;}'+
			' #carga{margin-left: 40px; width: 960px;}'+
	'#titulo{background-color:#D7D7D9;color:#454648;font:bold 20px Arial;padding:10px;text-align:center;width:936px;}'+
	'.EncabezadoUsuario {float: left;height: 185px;margin: 10px 0 5px 10px;opacity: 0.9;position: relative;width: 48.5%;}'+
	'.row01 {background-color: #464749;clear: both;color: #FFFFFF;font: bold 12px Arial;padding: 2.5px 0 2.5px 5px;text-align: justify;}'+
	'.row02 {background-color: #E2E1E1;color: #000000;text-align: justify;}'+
	'.row02EncCol01{background-color: #F8F8F8;float: left;font: bold 10px sans-serif;height: 18px;padding: 0 0 0 5px;width: 195px;}'+
	'.DetalleInforme {clear: both;max-height: 350px;min-height: 150px;opacity: 0.9;overflow: scroll;width: 960px;}'+
	'.row03{background-color:#0066B8;color:#FFFFFF;font:bold 12px Arial;padding:2.5px 0 2.5px 5px;text-align:justify;width:1100px;clear: both;}'+
	'.row04{background-color:#3C82C8;color:#FFFFFF;font:bold 10px arial;height: 25px;text-align: center;width: 1100px;}'+
	'.tituloDetCol01{float:left;text-align: center;width: 30px;}'+
	'.tituloDetCol02{float:left;text-align: center;width: 100px;}'+
	'.tituloDetCol03{float:left;text-align:center;width:110px;}'+
	'.tituloDetCol04{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol05{float:left;text-align:center;width:60px;}'+
	'.tituloDetCol06{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol07{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol08{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol09{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol10{float:left;text-align:center;width:250px;}'+
	'.tituloDetCol11{float:left;text-align:center;width:120px;}'+
	'.tituloDetCol12{float:left;text-align:center;width:120px;}'+
	'.tituloDetCol13{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol14{float:left;text-align:center;width:110px;}'+
	'.detalleContenido {font: 10px arial;max-height:250px;width:1100px;}'+
	'.rwDetImp{background-color: #FFFFFF;display: table;width: 100%;}'+
	'.rwDetPar{background-color: #BCCFED;display: table;width: 100%;}'+
	'.row02DetCol01{float:left;text-align: center;width:30px;}'+
	'.tituloDetCol02{float:left;text-align:center;width:100px;}'+
	'.tituloDetCol03{float:left;text-align:center;width:110px;}'+
	'.tituloDetCol04{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol05{float:left;text-align:center;width:60px;}'+
	'.tituloDetCol06{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol07{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol08{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol09{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol10{float:left;text-align:center;width:250px;}'+
	'.tituloDetCol11{float:left;text-align:center;width:120px;}'+
	'.tituloDetCol12{float:left;text-align:center;width:120px;}'+
	'.tituloDetCol13{float:left;text-align:center;width:50px;}'+
	'.tituloDetCol14{float:left;text-align:center;width:110px;}';
	
	var imp;
    imp = window.open(" ","Formato de Impresion"); 
    imp.document.open(); 
    imp.document.append(estilo); 
    imp.document.append($('#'+objeto).html());
    imp.document.close();
    imp.print();   
    imp.close(); 
	
	
	
	
}
function imprimir(id)
{
    var div, imp;
    estilo='<style>.logo {background-image: url("../../images/sicogenii_logo.png");background-repeat: no-repeat;background-size:320px 90px;height:92px;padding-bottom:10px;width:960px;}'+
			' #carga{margin-left: 40px; width: 960px;}'+
			'#titulo{background-color:#D7D7D9;color:#454648;font:bold 20px Arial;padding:10px;text-align:center;width:936px;}'+
			'.EncabezadoUsuario {float: left;height: 185px;margin: 10px 0 5px 10px;opacity: 0.9;position: relative;width: 48.5%;}'+
			'.row01 {background-color: #464749;clear: both;color: #FFFFFF;font: bold 12px Arial;padding: 2.5px 0 2.5px 5px;text-align: justify;}'+
			'.row02 {background-color: #E2E1E1;color: #000000;text-align: justify;}'+
			'.row02EncCol01{background-color: #F8F8F8;float: left;font: bold 10px sans-serif;height: 18px;padding: 0 0 0 5px;width: 195px;}'+
			'.DetalleInforme {clear: both;max-height: 350px;min-height: 150px;opacity: 0.9;overflow: scroll;width: 960px;}'+
			'.row03{background-color:#0066B8;color:#FFFFFF;font:bold 12px Arial;padding:2.5px 0 2.5px 5px;text-align:justify;width:1100px;clear: both;}'+
			'.row04{background-color:#3C82C8;color:#FFFFFF;font:bold 10px arial;height: 25px;text-align: center;width: 1100px;}'+
			'.tituloDetCol01{float:left;text-align: center;width: 30px;}'+
			'.tituloDetCol02{float:left;text-align: center;width: 100px;}'+
			'.tituloDetCol03{float:left;text-align:center;width:110px;}'+
			'.tituloDetCol04{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol05{float:left;text-align:center;width:60px;}'+
			'.tituloDetCol06{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol07{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol08{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol09{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol10{float:left;text-align:center;width:250px;}'+
			'.tituloDetCol11{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol12{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol13{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol14{float:left;text-align:center;width:110px;}'+
			'.detalleContenido {font: 10px arial;max-height:250px;width:1100px;}'+
			'.rwDetImp{background-color: #FFFFFF;display: table;width: 100%;}'+
			'.rwDetPar{background-color: #BCCFED;display: table;width: 100%;}'+
			'.row02DetCol01{float:left;text-align: center;width:30px;}'+
			'.tituloDetCol02{float:left;text-align:center;width:100px;}'+
			'.tituloDetCol03{float:left;text-align:center;width:110px;}'+
			'.tituloDetCol04{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol05{float:left;text-align:center;width:60px;}'+
			'.tituloDetCol06{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol07{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol08{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol09{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol10{float:left;text-align:center;width:250px;}'+
			'.tituloDetCol11{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol12{float:left;text-align:center;width:120px;}'+
			'.tituloDetCol13{float:left;text-align:center;width:50px;}'+
			'.tituloDetCol14{float:left;text-align:center;width:110px;}</style>';
    
    estilo='<link rel="stylesheet" href="css/reporteValidacion/cssInformes_PI_AP.css?V.1" type="text/css"></link>';
    
    div = document.getElementById(id);//seleccionamos el objeto
    imp = window.open(" ","Formato de Impresion"); //damos un titulo
    imp.document.open();     //abrimos
    imp.document.write(estilo); //tambien podriamos agregarle un <link ...
    imp.document.write(div.innerHTML);//agregamos el objeto
    imp.document.close();
    imp.print();   //Abrimos la opcion de imprimir
    imp.close(); //cerramos la ventana nueva
}