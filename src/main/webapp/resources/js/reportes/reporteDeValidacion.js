$(document).ready(function () {
	
	$('#errCabBtn').click(function (e){	mostrarErrores(this);});
	$('#errDetBtn').click(function (e){	mostrarErrores(this);});
	$('#errTotBtn').click(function (e){	mostrarErrores(this);});
	$('#errGenBtn').click(function (e){	mostrarErrores(this);});
	
});

function mostrarErrores(objeto){
	console.log(objeto);
	console.log($(objeto).attr('id'));
	console.log($(objeto).attr('id').substring(0, 6)+'Dinam');
	
	if($('.'+$(objeto).attr('id').substring(0, 6)+'Dinam').css('display')=='none'){
		$(objeto).attr('src','images/ocultar.png');
		$('.'+$(objeto).attr('id').substring(0, 6)+'Dinam').fadeTo('fast',1);
	}else{
		$(objeto).attr('src','images/mostrar.png');
		$('.'+$(objeto).attr('id').substring(0, 6)+'Dinam').fadeOut('fast');
	}
}


function obtieneReporteValIC(idFileIp){
	
	//alert("Obtener Reporte validacion para IC: "+idFileIp);
	var action = '../validacion/Reporte?idFileUp='+idFileIp;
	
	//Nueva Ventana para el Reporte !!
	console.log(action);
	window.open(action,'_blank','scrollbars=1,resizable=1,height=650,width=1300');
}

$(document).ready(function () {

	$('#pdf').click(function (){
		
		var url='downPDFValidacionIC.action'+'?idFileUp='+$('#idFile').val();
		
		var pop='<div id="popDownloadPdf">'+
					'<div id="preparing-file-modal-pdf" title="Preparando Reporte en Formato PDF" style="display: none;">'+
						'	Se esta generando el reporte en formato PDF, por favor espere...'+
						'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 200px; height:32px; margin-top: 20px;"></div>'+
					'</div>'+
					'<div id="error-modal" title="Error" style="display: none;">'+
						'	A ocurrido un error al intentar de generar el reporte en formato PDF, por favor reintente si el error persiste contacte al administrador del sistema.'+
					'</div>'+
				'</div>';
		
		if($('#popDownloadPdf').length==0){
			$('body').append(pop);
			
		}
				
		var $preparingFileModalPdf = $("#preparing-file-modal-pdf");
		$preparingFileModalPdf.dialog({ modal: true,position: ['70%',38], });
	    
	    $(".ui-icon-closethick").css({'left':'0','top':'0'});
	    $('.ui-dialog-title').css({width: 'auto'});
		$('.ui-widget-content').css({width:'auto'});
	    
	    $.fileDownload(url, {
	    	successCallback: function (url) {
	            setTimeout(function(){$preparingFileModalPdf.dialog('close');}, 1500);
	        },
	        failCallback: function (responseHtml, url){
	        	blind.close();
	        	$preparingFileModalPdf.dialog('close');
	            $("#error-modal").dialog({ modal: true,position: ['50%',28], });
	        }
	    });
	});
	
	
	
	
	$('#excel').click(function (){
		
		var url='downExcelValidacionIC.action'+'?idFileUp='+$('#idFile').val();
		
		var pop='<div id="popDownloadExcel">'+
					'<div id="preparing-file-modal-excel" title="Preparando Reporte en Formato Excel" style="display: none;">'+
						'	Se esta generando el reporte en formato Excel, por favor espere...'+
						'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 200px; height:32px; margin-top: 20px;"></div>'+
					'</div>'+
					'<div id="error-modal" title="Error" style="display: none;">'+
						'	A ocurrido un error al intentar de generar el reporte en formato Excel, por favor reintente si el error persiste contacte al administrador del sistema.'+
					'</div>'+
				'</div>';

		if($('#popDownloadExcel').length==0){
			$('body').append(pop);
		}
				
		var $preparingFileModalExcel = $("#preparing-file-modal-excel");
		$preparingFileModalExcel.dialog({ modal: true,position: ['70%',38], });
		
	    $(".ui-icon-closethick").css({'left':'0','top':'0'});
	    $('.ui-dialog-title').css({width: 'auto'});
		$('.ui-widget-content').css({width:'auto'});
		
		
	    $.fileDownload(url, {
	    	successCallback: function (url) {
	            setTimeout(function(){$preparingFileModalExcel.dialog('close');}, 1500);
	        },
	        failCallback: function (responseHtml, url){
	        	blind.close();
	        	$preparingFileModalExcel.dialog('close');
	            $("#error-modal").dialog({ modal: true,position: ['50%',28], });
	        }
	    });
	});


	

});



