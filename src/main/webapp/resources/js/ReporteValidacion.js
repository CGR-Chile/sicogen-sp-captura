$(document).load(function() {
	$('body').append('<div id="fadeLoadPage" class="overlay" style="display:block"></div>'+
			 '<div id="popLoadPage" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important">'+ 
			 '	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la informacion</div>'+
			 '    <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
			 '</div>');
});

$(document).ready(function() {
	$('#fadeLoadPage').remove();
	$('#popLoadPage').remove();
	
	$("#excel").click(function(e) {
		//var data = $("#grid").data("kendoGrid").dataSource.data();
	    var result = "data:application/vnd.ms-excel,";

	     result += "<table><tr><th>OrderID</th><th>Freight</th><th>Order Date</th><th>Ship Name</th><th>Ship City</th></tr>";
	     
	     result += "<tr>";

         result += "<td>";
         result += 1;
         result += "</td>";

         result += "<td>";
         result += 'aa';
         result += "</td>";

         result += "<td>";
         result += '2013/03/02';
         result += "</td>";

         result += "<td>";
         result += 'test';
         result += "</td>";

         result += "<td>";
         result += 'dada';
         result += "</td>";

         result += "</tr>";
	     
	     result += "</table>";
	     //$(this).attr({'download': 'prueba.xls','href': 'data:application/csv;charset=utf-8,' + encodeURIComponent(result),'target': '_blank'});
	     //window.open(result);
	     
	     
	     
	     e.preventDefault();
    });

	var dialogoDescarga = $('#dialogoDescarga').dialog({
		autoOpen: false,
		closeOnEscape: false,
		resizable: false,
		draggable: false,
		open: function(event, ui) {
			$(".ui-dialog-titlebar-close").hide();
		}
	});

	$('#progressbar').progressbar({
		value: false
	});

	$('#excel').click(function () {

		dialogoDescarga.dialog('open');

		var idFileUp = $('#idArchivo').val();

		$.fileDownload('reporte/descarga/excel?idFileUp=' + idFileUp, {
			successCallback: function (url) {
				dialogoDescarga.dialog('close');
			},
			failCallback: function (responseHtml, url) {
				dialogoDescarga.dialog('close');
				console.log(responseHtml);
				$.confirm({
					title: 'Disculpa las molestias...',
					content: "Ha ocurrido un error interno en el servidor",
					type: 'red',
					typeAnimated: true,
					boxWidth: '30%',
					useBootstrap: false,
					buttons: {
						close: {
							text: 'Cerrar',
							action: function(){
							}
						}
					}
				});
			}
		});
	});
});


function PrintPage1() {
	
	if (confirm("Â¿Imprimir pÃ¡gina?")){
		$('#' + "carga")[0].focus;
		$('#' + "carga")[0].contentWindow.print();
	}
}
	
function user(){
	   var periodo = document.getElementById("periodo").innerHTML;
	   var entidad = document.getElementById("entidad").innerHTML;
	   var action = 'showInforSendInf.action?periodo=' + periodo + "&entidad=" + entidad; 
	   console.log('periodo : '+periodo+"- entidad : "+ entidad);
	   console.log('*************************************************************************');
		//window.location.replace(action);
		$.ajax({url: action,
		    type: "POST",
		    dataType: "json",
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		    	var posfinal = null;
		    	posfinal = XMLHttpRequest.responseText.indexOf( "</informes>" );
		    	respuesta= null;
				respuesta = XMLHttpRequest.responseText.substring(0, posfinal  + 11);
				var xml =null;
				xml = (new DOMParser()).parseFromString(respuesta, 'text/xml');
		    },
		    success: function(data){
		    	var posfinal = null;
		    	posfinal = XMLHttpRequest.responseText.indexOf( "</informes>" );
		    	respuesta= null;
				respuesta = XMLHttpRequest.responseText.substring(0, posfinal  + 11);
				var xml =null;
				xml = (new DOMParser()).parseFromString(respuesta, 'text/xml');

		    }
		});
}
	
	
function PrintPage() {
	if (jConfirm("Â¿Imprimir pÃ¡gina?")){
    	 
      $("#pdf").css({ display: "none"});
      $("#excel").css({ display: "none"});
      $("#cerrar").css({ display: "none"});
      $(".DetalleInforme").css({ overflow: "visible"});
      $(".contErrores").css({ height: "auto"});
      $(".contErrores").css({ "overflow-x": "hidden"});
      $(".contErrores").css({ "overflow-y": "hidden"});
      
      $(".detalleContenido").css({ "max-height": "5000000px"});
      
      
      window.print();	      
      
      $("#pdf").css({ display: "inline"});
      $("#excel").css({ display: "inline"});
      $("#cerrar").css({ display: "inline"});
      $(".DetalleInforme").css({ overflow: "scroll"});	 
      $(".contErrores").css({ height: "75px"});
      $(".contErrores").css({ "overflow-x": "hidden"});
      $(".contErrores").css({ "overflow-y": "scroll"});     
      
      $(".detalleContenido").css({ "max-height": "250px"});

 	}

      
     //document.body.innerHTML = originalContents;
	// $('body').html(originalContents);
     
}
	
function ExcelCabecera(tipoInforme){
	/** Agregados */
	var tipoDocumentoNombre = document.getElementById('EncValor1>').innerHTML;
	var tipoDocumentovalor = document.getElementById("Enc1").innerHTML;
	var	entidadEmisoraNombre =document.getElementById("EncValor2>").innerHTML;
	var entidadEmisoraValor = document.getElementById("Enc2").innerHTML;
	var denominacionNombre =document.getElementById("EncValor3>").innerHTML;
	var denominacionValor = document.getElementById("Enc3").innerHTML;
	var periodoNombre =document.getElementById("EncValor4>").innerHTML;
	var periodoValor = document.getElementById("Enc4").innerHTML;
	var folioEmisionNombre =document.getElementById("EncValor5>").innerHTML;
	var folioEmisionValor = document.getElementById("Enc5").innerHTML;
	var fechaEmisionNombre =document.getElementById("EncValor6>").innerHTML;
	var fechaEmisionValor = document.getElementById("Enc6").innerHTML;
	var cantidadRegistroNombre =document.getElementById("EncValor7>").innerHTML;
	var cantidadRegistroValor = document.getElementById("Enc7").innerHTML;
	var totalAumentosNombre =document.getElementById("EncValor8>").innerHTML;
	var totalAumentosValor = document.getElementById("Enc8").innerHTML;
	var totalDisminucionNombre =document.getElementById("EncValor9>").innerHTML;
	var totalDisminucionValor = document.getElementById("Enc9").innerHTML;
	
	encabezadoArchivo ="<tr><td colspan='2' style='border: solid green'>Encabezado de archivo Cargado (L&iacute;nea 1)  </td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  tipoDocumentoNombre  + "</td><td style='border: solid green'>"+  tipoDocumentovalor  + "</td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  entidadEmisoraNombre  + "</td><td style='border: solid green'>"+  entidadEmisoraValor  + "</td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  denominacionNombre  + "</td><td style='border: solid green'>"+  denominacionValor  + "</td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  periodoNombre  + "</td><td style='border: solid green'>"+  periodoValor  + "</td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  folioEmisionNombre  + "</td><td style='border: solid green'>"+  folioEmisionValor  + "</td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  fechaEmisionNombre  + "</td><td style='border: solid green'>"+  fechaEmisionValor  + "</td></tr>";
	encabezadoArchivo +="<td style='border: solid green'>"+  cantidadRegistroNombre  + "</td><td style='border: solid green'>"+  cantidadRegistroValor  + "</td></tr>"; 
	encabezadoArchivo +="<td style='border: solid green'>"+  totalAumentosNombre  + "</td><td style='border: solid green'>"+  totalAumentosValor  + "</td></tr>";    	
	if( 0 <tipoInforme  && tipoInforme < 6)
	{
		encabezadoArchivo +="<td style='border: solid green'>"+  totalDisminucionNombre  + "</td><td style='border: solid green'>"+  totalDisminucionValor  + "</td></tr><tr><td></td></tr>"; 
	}
	
	if( 5 <tipoInforme  && tipoInforme < 8)
	{
    	var totalDebitosNombre =document.getElementById("EncValor10>").innerHTML;
    	var totalDebitosValor = document.getElementById("Enc10").innerHTML;
    	var totalCreditosNombre =document.getElementById("EncValor11>").innerHTML;
    	var totalCreditosValor = document.getElementById("Enc11").innerHTML;
    	encabezadoArchivo +="<td style='border: solid green'>"+  totalDisminucionNombre  + "</td><td style='border: solid green'>"+  totalDisminucionValor  + "</td></tr>"; 
    	encabezadoArchivo +="<td style='border: solid green'>"+  totalDebitosNombre  + "</td><td style='border: solid green'>"+  totalDebitosValor  + "</td></tr>"; 
    	encabezadoArchivo +="<td style='border: solid green'>"+  totalCreditosNombre  + "</td><td style='border: solid green'>"+  totalCreditosValor  + "</td></tr><tr><td></td></tr>";  
    	
	}
	
	return encabezadoArchivo;
}
	
	
   
    function Excel(informe){
        var html ;
        var Titulo = "<tr ><td colspan = '10'><center>Reporte de validaci&oacute;n</center></td></tr>";
        var trhtml = Titulo + "<tr></tr>";
        var tdhtml = "";
        var Glosa = "";
    	var Valor = "";
        var Estado = true;
        color1="red";
        color2="green";
        var i = 0;
        
    	estadovalidacionNombre = document.getElementById('EstadoValidacion').innerHTML;
    	estadovalidacionNombreVal = document.getElementById('EstadoValidacionVal').innerHTML;
    	informeValidadoNombre = document.getElementById('informe').innerHTML;
    	informeValidadoVal = document.getElementById('informeVal').innerHTML;
    	ejercicio = document.getElementById('Ejercicio').innerHTML;
    	ejercicioVal = document.getElementById('EjercicioVal').innerHTML;
    	user = document.getElementById('User').innerHTML;
    	userVal = document.getElementById('UserVal').innerHTML;
    	entidad = document.getElementById('Entidad').innerHTML;
    	entidadVal = document.getElementById('EntidadVal').innerHTML;
    	
    	periodo = document.getElementById('Periodo1').innerHTML;
    	periodoVal = document.getElementById('Periodo1Val').innerHTML;
        //Recupera usuario
    	usuario = "<tr><td colspan='2' style='border: solid green'> Informaci&oacute;n General </td></tr>";
    	usuario = usuario + "<td style='border: solid green'>"+  estadovalidacionNombre  + "</td><td style='border: solid green'>"+  estadovalidacionNombreVal  + "</td></tr>";
    	usuario = usuario + "<td style='border: solid green'>"+  informeValidadoNombre  + "</td><td style='border: solid green'>"+  informeValidadoVal  + "</td></tr>";
    	usuario =usuario+ "<td style='border: solid green'>"+ periodo   + "</td><td style='border: solid green'>"+ periodoVal   + "</td></tr>";
    	usuario = usuario + "<td style='border: solid green'>"+  ejercicio  + "</td><td style='border: solid green'>"+  ejercicioVal  + "</td></tr>";
    	usuario =usuario+ "<td style='border: solid green'>"+  user  + "</td><td style='border: solid green'>"+  userVal  + "</td></tr>";
       	usuario = usuario+ "<td style='border: solid green'>"+entidad    + "</td><td style='border: solid green'>"+ entidadVal   + "</td></tr><th><tr><td></td></tr>";
       
    	tdhtml +=  ExcelCabecera(informe) + usuario;      
//------------------Errores cabecera--------
    	console.log("---Errores cabecera--------");
    	
   	if($("#erroresCabecera").html()!=null){
    		$("#erroresCabecera div").each(function( index ) {
    			  //console.log( index + ": " + $( this ).text() );
    			console.log("<tr><td colspan="+$("#detalle .row04 div").length+" style='border: solid green'>"+ $( this ).html()+"</td></tr>");
        		tdhtml = tdhtml +"<tr><td colspan="+$("#detalle .row04 div").length+" style='border: solid green'>"+ $( this ).html()+"</td></tr>";
    			  
    			});
    		
    	}
    	
//------------------Recorre cabecera--------
   	
   	tdhtml = tdhtml +"<tr><td></td></tr><tr><td></td></tr><tr><td colspan="+$("#detalle .row04 div").length+" style='border: solid green'>"+ $("#detalle .row03").html()+"</td></tr>";
   	
   	tdhtml = tdhtml +"<tr>";
   	$("#detalle .row04 div").each(function( index ) {
		  //console.log( index + ": " + $( this ).text() );
		console.log("<td style='border: solid green'>"+  $( this ).html()  + "</td>");
		tdhtml = tdhtml +"<td style='border: solid green'>"+  $( this ).html()  + "</td>";
		//tdhtml = tdhtml +"<tr><td colspan='3' style='border: solid green'>"+ $( this ).html()+"</td></tr>";
		  
		});
   tdhtml = tdhtml +"</tr>"; 
	/*
        while(Estado == true){
        	i = i+1;
        	try {        		
        	tdhtml = tdhtml +"<tr>";
        	Glosa = document.getElementById('Enc'+i).innerHTML;
        	Valor = document.getElementById('EncValor'+i).innerHTML;


        	
        	tdhtml = tdhtml +"<td style='border: solid green'>"+  Valor  + "</td>";
        	tdhtml = tdhtml +"<td style='border: solid green'>"+  Glosa  + "</td>";	
        	}catch(e){ 
        		tdhtml = tdhtml +"</tr>"; 
        		Estado = false;
        		}
        }*/
//-----------------Recorre Encabezado Detalle-------------- 
 
   	var impar =  $("#detalle .detalleContenido .rwDetImp").length;
   	var par  = $("#detalle .detalleContenido .rwDetPar").length;
   	total =  impar + par;
   	var maxValueRow = 0;
   	
   	$("#detalle .detalleContenido [name=rowDet]").each(function( index ) {
   	  	//console.log(index);
   	  
   	   // tdhtml = tdhtml +$( this ).html()
   		 maxValueRow = maxValueRow < $(this).children("div").length ? $(this).children("div").length: maxValueRow;
        console.log(maxValueRow);
        if($(this).children("div").length  <2){
        	 $(this).children("div div").each(function( index2 ) {
        		 tdhtml = tdhtml +"<tr>";
        		 tdhtml = tdhtml +"<td style='border: solid green' colspan="+maxValueRow+" >Errores Detectados L&iacute;nea</td>";
        		 tdhtml = tdhtml +"</tr>"; 
        		 tdhtml = tdhtml +"<tr>";
        		 tdhtml = tdhtml +"<td style='border: solid green' colspan="+maxValueRow+" >"+  $( this ).html()  + "</td>";
        		 tdhtml = tdhtml +"</tr>"; 
    	   	   });
        }
        else{
        	tdhtml = tdhtml +"<tr>";
	   	    $(this).children("div").each(function( index2 ) {
	   	     tdhtml = tdhtml +"<td style='border: solid green'>"+  $( this ).html()  + "</td>";
	   	    });
	   	   tdhtml = tdhtml +"</tr>"; 
        }
   	  

   	  	});
   	
  //------------------Errores Genericos--------
		console.log("---Errores Genericos--------");
		if($("#erroresGenericos").html()!=null){
			tdhtml = tdhtml +"<tr><td colspan="+$("#detalle .row04 div").length+" style='border: solid green'>Errores Gen&eacute;ricos Detectados</td></tr>";
			$("#erroresGenericos div").each(function( index ) {
				if($(this).children("div div").length > 0){
					tdhtml = tdhtml +"<tr>";	
			    	$(this).children("div div").each(function( index3 ) {
			    		if(index3 == 0){
				    		tdhtml = tdhtml +"<td style='border: solid green'>"+ $( this ).html()+"</td>";
				    	}else{
				    		tdhtml = tdhtml +"<td colspan="+($("#detalle .row04 div").length -1) +" style='border: solid green'>"+ $( this ).html()+"</td>";
				    	}
			    	});
			    	tdhtml = tdhtml +"</tr>"; 
				}
			});
		}
		trhtml = trhtml +  tdhtml;
		html = "<meta http-equiv='Content-Type' content='text/html;  charset=utf-8'>";
		html += "<table >"+trhtml+"</table>";
		// MS OFFICE 2007  : application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
		window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        
        /*
		var a = document.createElement('a');
		//getting data from our div that contains the HTML table
		var data_type = 'data:application/vnd.ms-excel';
		//var table_div = document.getElementById('dvData');
		//var table_html = table_div.outerHTML.replace(/ /g, '%20');
		var table_html=html;
		a.href = data_type + ', ' + table_html;
		//setting the file name
		//a.download = 'exported_table_' + postfix + '.xls';
		a.download='Reporte Validación '+'.xls';
		//triggering the function
		a.click();
		//just in case, prevent default behaviour
		//e.preventDefault();
        */
    }
    
    function Cerrar()
    {
    	if(confirm("Â¿Desea Cerrar la pestaÃ±a del Reporte de Validación?"))
    		$(window).unload( function () { alert("Bye now!"); } );
    }
    
    function changePeriodo(){
    	var periodo = $("#Periodo1Val").text();
    	
    	if (periodo==00){$("#Periodo1Val").text("Apertura");}else
    	if (periodo==01){$("#Periodo1Val").text("Enero");}else
    	if (periodo==02){$("#Periodo1Val").text("Febrero");}else
    	if (periodo==03){$("#Periodo1Val").text("Marzo");}else
    	if (periodo==04){$("#Periodo1Val").text("Abril");}else
    	if (periodo==05){$("#Periodo1Val").text("Mayo");}else
    	if (periodo==06){$("#Periodo1Val").text("Junio");}else
    	if (periodo==07){$("#Periodo1Val").text("Julio");}else
    	if (periodo==08){$("#Periodo1Val").text("Agosto");}else
    	if (periodo==09){$("#Periodo1Val").text("Septiembre");}else
    	if (periodo==10){$("#Periodo1Val").text("Octubre");}else
    	if (periodo==11){$("#Periodo1Val").text("Noviembre");}else
    	if (periodo==12){$("#Periodo1Val").text("Diciembre");}else
    	if (periodo==13){$("#Periodo1Val").text("Cierre");}   	
    	
    }
    function reporteValidacionPDF(Informe,param1,param2,param3){
    	location.href='downPDFReporteInforme'+Informe+'.action?inf='+Informe+'&prm1='+param1+'&prm2='+param2+'&prm3='+param3;
    }
    function reporteValidacionExcel(Informe,param1,param2,param3){
    	location.href='downExcelReporteValidacion'+Informe+'.action?inf='+Informe+'&prm1='+param1+'&prm2='+param2+'&prm3='+param3;
    }
    
    function reporteValidacionPDFNew(informe, entidad, periodo, tipoArchivo){

    	var url='downPDFReporteInforme'+informe+
		'?inf='+informe+
		'&prm1='+entidad+
		'&prm2='+periodo +
		'&prm3='+tipoArchivo;
		
    	var pop='<div id="popDownloadpdf">'+
		'<div id="preparing-file-modal-pdf" title="Preparando Reporte en Formato Pdf" style="display: none;">'+
    	'	Se esta generando el reporte en formato Pdf, por favor espere...'+
    	'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 100%; height:22px; margin-top: 20px;"></div>'+
    	'</div>'+
    	'<div id="error-modal-modal-pdf" title="Error" style="display: none;">'+
    	'	A ocurrido un error al intentar de generar el reporte en formato Pdf, por favor reintente si el error persiste contacte al administrador del sistema.'+
    	'</div></div>';

			//$('body').append("");
		if($('#popDownloadpdf').length==0){
			$('body').append(pop);

		}
					
				
		var $preparingFileModal = $("#preparing-file-modal-pdf");
	    $preparingFileModal.dialog({ modal: true,position: ['50%',28], });
	    $(".ui-icon-closethick").css({'left':'0','top':'0'});
		
		
		var $preparingFileModal = $("#preparing-file-modal-pdf");
	    $preparingFileModal.dialog({ modal: true,position: ['50%',28], });
	    $(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');
	    $.fileDownload(url, {
	    	successCallback: function (url) {
	              setTimeout(function(){$preparingFileModal.dialog('close');}, 1500);
	        },
	        failCallback: function (responseHtml, url){
	        	 $( "#toggle" ).toggle( "blind" );
	            $preparingFileModal.dialog('close');
	            $("#error-modal-modal-pdf").dialog({ modal: true,position: ['50%',28], });
	        }
	    });
	    return false; //this is critical to stop the click event which will trigger a normal file download!
    }