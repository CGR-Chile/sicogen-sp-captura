function descargaReporte(){
	var dataUrl,dataFile,dataReporte;

	var periodos = document.getElementById('cboCuaReportes').value;
	if(periodos=="-1"){
		$.confirm({
			title: 'Reporte de Cuadraturas',
			content: 'Debe realizar una busqueda, seleccione un reporte',
			type: 'blue',
			typeAnimated: true,
			buttons: {
				tryAgain:{
					text:'Aceptar',
					btnClass: 'btn-blue',
					action: function () {
					}
				},

			}
		});
		return false;
	}else {

		var url = './listadogeneral/descargaPDF';
		window.open(url);

		}

}


function exportarExcel(){
	var dataUrl,dataFile,dataReporte;

	var periodos = document.getElementById('cboCuaReportes').value;
	if(periodos=="-1"){
		$.confirm({
			title: 'Reporte de Cuadraturas',
			content: 'Debe realizar una busqueda, seleccione un reporte',
			type: 'blue',
			typeAnimated: true,
			buttons: {
				tryAgain:{
					text:'Aceptar',
					btnClass: 'btn-blue',
					action: function () {
					}
				},

			}
		});
		return false;
	}else {

		var url = './listadogeneral/exportarExcel';
		window.open(url);

	}

}





$(document).ready(function(){
	

	$(document).on("click","#btnExcelCuaDisponibilidades",function(){
		
		dataUrl	="downExcelCuaDisponibilidades?fileUploadID={0}";
		dataFile=$("#fileUpload").val();		
		dataUrl	=dataUrl.replace("{0}",dataFile);
		
		dataReporte	=$("#cboCuaReportes").val();		
		
		if(Number(dataReporte)==-1){
			
			mensaje="";		
			mensaje=mensaje+'<div>Es necesario seleccionar el reporte.</div>';
			
			var $dialog = $('<div></div>')
	    	.dialog({height: 200,width: 400,zIndex:2008,
	    		id: "erroresSelEnvio",
	    		title: 'Errores en Reporte de Cuadratura',
	    		buttons:{
	    			Aceptar:function(){
	    				$(this).dialog('close');
	    				$(this).remove();
	    			}
	    		},
	    		close: function(event, ui){	
	    			$(this).remove();	    		
	    		}
	    	});
			$dialog.css({'zIndex': 2008});
			$dialog.dialog('open');
			$dialog.html(mensaje);	
			
		}else{			
			var pop='<div id="popDownloadXls">'+
					'<div id="dlgModalXlsReporte" title="Preparando Reporte en Formato XLS" style="display: none;">'+
						'	Se esta generando el reporte en formato XLS, por favor espere...'+
						'<div class="ui-progressbar-value ui-corner-left ui-corner-right" style="width: 200px; height:32px; margin-top: 20px;"></div>'+
					'</div>'+
					'<div id="error-modal-xls" title="Error" style="display: none;">'+
						'	A ocurrido un error al intentar de generar el reporte en formato XLS, por favor reintente si el error persiste contacte al administrador del sistema.'+
					'</div>'+
					'</div>';
	
			if($('#popDownloadXls').length==0){
					$('body').append(pop);		
			}
			
			var $dlgReportePdf = $("#dlgModalXlsReporte");
			$dlgReportePdf.dialog({ modal: true,position: ['70%',38], });
			
			$(".ui-icon-closethick").css({'left':'0','top':'0'});
			$('.ui-dialog-title').css({width: 'auto'});
			$('.ui-widget-content').css({width:'auto'});
			
			$.fileDownload(dataUrl,{
				 successCallback:function(){
					 setTimeout(function(){$dlgReportePdf.dialog('close');}, 2500);	
				 },
				 failCallback: function (url) {
					 $dlgReportePdf.dialog('close');				
					 $("#error-modal-xls").dialog({ modal: true,position: ['50%',28], });
	             }
			})
		}
	})
});

function CargarReporteCuaDisponibilidad(){
	var dataUrl, dataFile,dataReporte;

	document.getElementById('btnPdfCuaDisponibilidades').disabled = true;
	document.getElementById('btnExcelCuaDisponibilidades').disabled = true;
	
	dataUrl		= './listadogeneral/getreporteCuadratura?idFileUpload={0}';
	dataFile	=$("#fileUpload").val();
	dataUrl		=dataUrl.replace("{0}",dataFile);	
	dataReporte	=$("#cboCuaReportes").val();		
	
	if(Number(dataReporte)==-1){

		$.confirm({
			title: 'Reporte de Cuadraturas',
			content: 'Es necesario seleccionar el reporte.',
			type: 'blue',
			typeAnimated: true,
			buttons: {
				tryAgain:{
					text:'Aceptar',
					btnClass: 'btn-blue',
					action: function () {
					}
				},

			}
		});
		
	}else{
		
		$('body').css('cursor','wait');
		$('#fadeChangeTab').show();
		$('#popEspera').show();
		$("#ui-datepicker-div").remove();
		
		$.ajax({
				url:dataUrl,
				type: "GET",
				dataType: "html",
				error:function (event, jqXHR, ajaxSettings, thrownError){
					stop();
					$.confirm({
						title: 'Reporte de Cuadraturas',
						content: jqXHR.status,
						type: 'blue',
						typeAnimated: true,
						buttons: {
							tryAgain:{
								text:'Aceptar',
								btnClass: 'btn-blue',
								action: function () {
								}
							},

						}
					});
					},
				success: function(data){
					stop();

					document.getElementById('btnPdfCuaDisponibilidades').disabled = false;
					document.getElementById('btnExcelCuaDisponibilidades').disabled = false;
					$("#repCuadratura").html(data);
					$('body').css('cursor','default');
					$('#fadeChangeTab').remove();
					$('#popEspera').remove();
				}
		});
	}
}
function CargarCboPeriodoSegunInformeEjercicio(informe,ejercicio){
	var dataUrl;
	dataUrl='CargarCboPeriodoSgnInfoEjer?informe={0}&ejercicio={1}';
	dataUrl=dataUrl.replace("{0}",informe);
	dataUrl=dataUrl.replace("{1}",ejercicio);
	
	$.ajax({
			url:dataUrl,
			type: "POST",
			dataType: "json",
			error:function (event, jqXHR, ajaxSettings, thrownError){
				jAlert(jqXHR.status);
			},
			success: function(data){
				
				if(data!=null){
					$("#cboCuaPeriodos").find("option").remove();
					$("#cboCuaPeriodos").append(new Option("Selec. Periodo","-1"));
					$.each(data.listaPeriodos,function(indice,elemento){
						$("#cboCuaPeriodos").append(new Option(elemento.periodoNombre,elemento.periodoId));
					})
				}
				
			}
	});
	
}
function CargarCboReporteSegunInforme(informe){
	var dataUrl;
	dataUrl='CargarCboReportesdoSgnInforme?informe={0}';	
	dataUrl=dataUrl.replace("{0}",informe);
	
	
	$.ajax({
			url:dataUrl,
			type: "POST",
			dataType: "json",
			error:function (event, jqXHR, ajaxSettings, thrownError){
				jAlert(jqXHR.status);
			},
			success: function(data){				
				
				if(data!=null){
					$("#cboCuaReportes").find("option").remove();
					$("#cboCuaReportes").append(new Option("Selec. Reporte","-1"));
					
					$.each(data.listaReportesSeguimiento,function(indice,elemento){
						$("#cboCuaReportes").append(new Option(elemento.nombreReporte,elemento.idReporte));
					})
				}
				
			}
	});
	
}
