
function repValidacionExcel(informe, entidad, periodo, tipoArchivo){
		
		var url='excelValidacion'+informe+'.action'+
		'?informe='+informe+
		'&periodo='+periodo+
		'&tpArchivo='+tipoArchivo+
		'&entidad='+entidad;
		
		var pop='<div id="popDownload-excel">'+
		'<div id="preparing-file-modal-excel" title="Preparando Reporte en Formato Excel" style="display: none;">'+
    	'	Se esta generando el reporte en formato Excel, por favor espere...'+
    	'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 100%; height:22px; margin-top: 20px;"></div>'+
    	'</div>'+
    	'<div id="error-modal-excel" title="Error" style="display: none;">'+
    	'	A ocurrido un error al intentar de generar el reporte en formato Excel, por favor reintente si el error persiste contacte al administrador del sistema.'+
    	'</div></div>';

		if($('#popDownload-excel').length==0){
			$('body').append(pop);

		}
				
		var $preparingFileModal = $("#preparing-file-modal-excel");
	    $preparingFileModal.dialog({ modal: true,position: ['50%',28], });
	    $(".ui-icon-closethick").css({'left':'0','top':'0'});
		
		
		var $preparingFileModal = $("#preparing-file-modal-excel");
	    $preparingFileModal.dialog({ modal: true,position: ['50%',28], });
	    $(".ui-dialog-titlebar-close").css('background-color', '#F2F2F2');
	    $.fileDownload(url, {
	    	successCallback: function (url) {
	            setTimeout(function(){$preparingFileModal.dialog('close');}, 1500);
	        },
	        failCallback: function (responseHtml, url){
	        	 $( "#toggle" ).toggle( "blind" );
	        	//blind.close();
	            $preparingFileModal.dialog('close');
	            $("#error-modal-excel").dialog({ modal: true,position: ['50%',28], });
	        }
	    });
	}

/*function mostrarErrores(objeto){
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
}*/
