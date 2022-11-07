function load(){
	entidadSubAreas();
}

function entidadSubAreas(){	$('#ExpenseTableContainer').jtable('load');return false;	} 

$(document).ready(function(){
     $('#ExpenseTableContainer').jtable({
         title: 'Entidad SubArea',
         selecting: true, //Enable selecting 
         paging: true, //Enable paging
         pageSize: 10, //Set page size (default: 10)
         sorting: true, //Enable sorting
         messages: {
 			serverCommunicationError: 'Se ha producido un error al comunicarse con el servidor.',
 			loadingMessage: 'Cargando Registros ...',
 			noDataAvailable: 'No hay registros!',
 			addNewRecord: 'Crear Registro',
 			editRecord: 'Editar',
 			areYouSure: '&iquest;Est&aacute; seguro?',
 			deleteConfirmation: 'Se eliminar&aacute; este registro. &iquest;Est&aacute; seguro? ',
 			save: 'Guardar',
 			saving: 'Guardando',
 			cancel: 'Cancelar',
 			deleteText: 'Eliminar',
 			deleting: 'Borrado',
 			error: 'Error',
 			close: 'Cerrar',
 			cannotLoadOptionsFor: 'No se puede cargar las opciones para el campo {0}',
 			pagingInfo: 'Mostrando: {0}-{1}, de: {2}',
 			pageSizeChangeLabel: 'Numero de Registros',
 			gotoPageLabel: 'ir a la p&aacute;gina',
 			canNotDeletedRecords: '¡No se puede eliminar {0} de {1} registro',
 			deleteProggress: 'Eliminado {0} de {1} archivos, procesamiento de ...'
 		},actions:{
             listAction: 'listTblEntSubAreas',
             createAction: 'addTblEntSubAreas',
             updateAction: 'updTblEntSubAreas',
             deleteAction: 'delTblEntSubAreas'
         },
         fields:{
        	 entSubAreaID:{	title: 'ID', key: true, list: false, create: false,edit: false},
        	 entAreaID:{ 	title: 'Entidad Area',			width:'10%',type: 'hidden',},
        	 entid: {		title: 'Entidad',				width:'10%',type: 'hidden',},
        	 subAreaID:{	title: 'SubArea',				create:true,width:'30%',options: function(data) {return 'loadSubAreasOption';}},
             usuario:{		title: 'Usuario',				width:'15%',edit: false,create: false},
             fecha:{		title: 'Fecha',					width:'15%',edit: false,create: false},
             anulacion:{	title: 'Fecha Anulaci&oacute;n',width:'15%',edit: false,create: false}
         },
         rowInserted: function (event, data) {  $('#ExpenseTableContainer').jtable('selectRows', data.row);		},
        recordAdded: function(event, data){
        	$('#ExpenseTableContainer').jtable('load', {
    			region: $("#cbRegion :selected").val(),
    			entidad: $("#cbEntidad :selected").val(),
    			area: $("#cbArea :selected").val()
    		}); 
         },
         recordUpdated: function(event, data){
      		$('#ExpenseTableContainer').jtable('load', {
    			region: 	$("#cbRegion :selected").val(),
    			entidad: 	$("#cbEntidad :selected").val(),
    			area: 		$("#cbArea :selected").val()
    		});
         }
     });
     $("#newItem").each(function(i){	$(this).attr({'onClick' : 'loadInput()'}); });
     $('#LoadRecordsButton').attr('style','display:none'); 
});


function loadInput(){
	$("#Edit-entid").val( $("#cbEntidad :selected").val());   //$("#Edit-entid").parent().parent().hide();
	$("#Edit-entAreaID").val( $("#cbArea :selected").val());  //$("#Edit-entid").parent().parent().hide();
	
	//Edit-subAreaID
	
	var x = $("#cbRegion :selected").val();	$("#Edit-region").val(x);
	x = $("#cbEntidad :selected").val();	$("#Edit-entidad").val(x);
	x = $("#cbArea :selected").val();	$("#Edit-area").val(x);
	
	$("#Edit-entID").val( $("#cbArea :selected").val());
	$("#Edit-entID").parent().parent().hide();
	
	$("#Edit-region").parent().parent().hide();
	$("#Edit-entidad").parent().parent().hide();
	$("#Edit-area").parent().parent().hide();
}

function loadBombo(){	loadData();	}
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			region: $("#cbRegion :selected").val(),
			entidad: $("#cbEntidad :selected").val(),
			area: $("#cbArea :selected").val()
		});
		});
	$('#LoadRecordsButton').click();
}
function cargaEjercicio(){
    	console.log('loadInformes1: '+ ejercicio);
    	var action='chargeEjercicio?ejercicio='+ejercicio;
    	$.ajax({
    		 url: action,
    			type: "POST",
    			dataType: "json",
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    				alert('Error ' + textStatus);
    				alert(errorThrown);
    				alert(XMLHttpRequest.responseText);
    			},
    			success: function(data){
    				switch(data.estado){
    				case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
    				}
    				
    				$("#cbInforme").get(0).options.length = 0;
    				$("#cbInforme").get(0).options[0] = new Option("Selec. Informe", "-1"); 
    				$.each(data.listaInformes, function(i, item){$("#cbInforme").get(0).options[$("#cbInforme").get(0).options.length] = new Option(item.tipoNombre, item.tipoId);});
    				
    				if(data.listaInformes.length>0){ $('#cbInforme').removeAttr("disabled"); }else{ $('#cbInforme').attr("disabled", "disabled");}
    			}
    	});

    }

    function loadRegion(){
    	console.log('loadRegion: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadRegion';
    	$.ajax({
    		 url: action,
    			type: "POST",
    			dataType: "json",
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    				alert('Error ' + textStatus);
    				alert(errorThrown);
    				alert(XMLHttpRequest.responseText);
    			},
    			success: function(data){
    				switch(data.estado){
    				case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
    				}
    				
    				$("#cbRegion").get(0).options.length = 0;
    				$("#cbRegion").get(0).options[0] = new Option("Selec. Informe", "-1"); 
    				$.each(data.listaRegiones, function(i, item){$("#cbRegion").get(0).options[$("#cbRegion").get(0).options.length] = new Option(item.nombre, item.regId);});
    				
    				if(data.listaRegiones.length>0){ 
    						$('#cbRegion').removeAttr("disabled"); 
    					}else{ 
    						$('#cbRegion').attr("disabled", "disabled");
    					}
    			}
    	});

    }

    function loadEntidad(region){
    	
    	console.log('loadEntidad: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadEntidad?region=' + region;
    	$.ajax({
    		 url: action,
    			type: "POST",
    			dataType: "json",
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    				alert('Error ' + textStatus);
    				alert(errorThrown);
    				alert(XMLHttpRequest.responseText);
    			},
    			success: function(data){
    				switch(data.estado){
    				case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
    				}
    				
    				$("#cbEntidad").get(0).options.length = 0;
    				$("#cbEntidad").get(0).options[0] = new Option("Selec. Entidad", "-1"); 
    				$.each(data.listaEntidad, function(i, item){$("#cbEntidad").get(0).options[$("#cbEntidad").get(0).options.length] = new Option(item.nombre, item.codigo);});
    				
    				if(data.listaEntidad.length>0){ 
    						$('#cbEntidad').removeAttr("disabled"); 
    					}else{ 
    						$('#cbEntidad').attr("disabled", "disabled");
    					}
    			}
    	});
    }

    function loadArea(entidad){
    	
    	console.log('loadArea: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadArea?entidad=' + entidad;
    	$.ajax({
    		 url: action,
    			type: "POST",
    			dataType: "json",
    			error: function(XMLHttpRequest, textStatus, errorThrown){
    				alert('Error ' + textStatus);
    				alert(errorThrown);
    				alert(XMLHttpRequest.responseText);
    			},
    			success: function(data){
    				switch(data.estado){
    				case -3:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -2:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='showFormCarga.action?abreCarga=0');}} );break;
    				case -1:jAlert(data.mensaje, "Carga de archivos", function(r){if(r){$(location).attr('href',url='login');}} );break;
    				}
    				
    				$("#cbArea").get(0).options.length = 0;
    				$("#cbArea").get(0).options[0] = new Option("Selec. Area", "-1"); 
    				$.each(data.listaArea, function(i, item){$("#cbArea").get(0).options[$("#cbArea").get(0).options.length] = new Option(item.areaNombre, item.areaId);});
    				
    				if(data.listaArea.length>0){ 
    						$('#cbArea').removeAttr("disabled"); 
    					}else{ 
    						$('#cbArea').attr("disabled", "disabled");
    					}
    			}
    	});
    }