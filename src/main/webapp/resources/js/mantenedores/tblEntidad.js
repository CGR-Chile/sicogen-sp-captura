function load(){	entidadSubAreas();}

function entidadSubAreas(){	$('#ExpenseTableContainer').jtable('load');	return false;	} 

$(document).ready(function(){
    $('#ExpenseTableContainer').jtable({
		title: 'Tabla de Entidad',
		selecting: true, //Enable selecting 
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: false, //Enable sorting
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
		},actions: {
			listAction: 'listTblEntidad',
			createAction: 'addTblEntidad',
			updateAction: 'updTblEntidad',
			deleteAction: 'delTblEntidad'
		},fields:{
			entid:{			title: 'ID',key: true,list: false,create: false,edit: false},
			reg:{			title: 'Regi&oacute;n',width: '15%',list:false,edit: false,options: function(data) {return $.map($('#cbRegion')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			comunaId:{		title: 'Comuna',width: '15%',options: function(data) {return $.map($('#cbComuna')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}},
			codigo:{		title: 'Codigo',width: '15%'},
			nombre:{		title: 'Descripci&oacute;n',width: '15%'},
			comuna:{		title: 'Entidad',width: '15%',edit: false,create:false},
			tipoent:{		title: 'Tipo Entidad',width: '30%' ,type: 'hidden',},
			usuario:{		title: 'Usuario Creaci&oacute;n',width: '15%',edit: false,create: false},
			fecha:{			title: 'Fecha Creaci&oacute;n',width: '15%',edit: false,create: false},
			userupdate:{	title: 'Usuario Actualizaci&oacute;n',width: '15%',edit: false,create: false,visibility:'hidden'},
			dateupdate:{	title: 'Fecha Actualizaci&oacute;n',width: '15%',edit: false,create: false},
			anulacion:{		title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create: false},
			
		
			
		},
		rowInserted: function (event, data){	 $('#ExpenseTableContainer').jtable('selectRows', data.row);	},
		recordAdded: function(event, data){	},
		recordUpdated: function(event, data){		}
	});     
	$('#LoadRecordsButton').attr('style','display:none');
	$("#EditDialogSaveButton").each(function(i){		$(this).attr({'onClick' : 'loadBombo()'});	});
	$("#AddRecordDialogSaveButton").each(function(i){	$(this).attr({'onClick' : 'loadBombo()'});	});
    $("#newItem").each(function(i){						$(this).attr({'onClick' : 'loadInput()'});	});
 });
    

function loadInput(){
	$("#Edit-reg").val($("#cbRegion :selected").val());
	$("#Edit-comunaId").val($("#cbComuna :selected").val());
	$("#Edit-tipoent").val($("#cbTipoEntidad :selected").val());
	
}

	function loadBombo(){	loadData();	}
	
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			region: $("#cbRegion :selected").val(),
			comuna: x = $("#cbComuna :selected").val(),
			tentidad:  $("#cbTipoEntidad :selected").val()
		});
		});
	$('#LoadRecordsButton').click();}
    function cargaEjercicio(){
    	console.log('loadInformes1: '+ ejercicio);
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
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

    

    
    function loadRegiones(){
    	var action='loadRegion.action';
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

    				$("#cbRegion").get(0).options.length = 0; $("#cbRegion").get(0).options[0] = new Option("Selec. Regi&oacute;n", "-1"); 
    				$.each(data.listaRegiones, function(i, item){$("#cbRegion").get(0).options[$("#cbRegion").get(0).options.length] = new Option(item.nombre, item.regId);});
    				
    				if(data.listaRegiones.length>0){ 
    					$('#cbRegion').removeAttr("disabled"); 
    				}else{ 
    					$('#cbRegion').attr("disabled", "disabled");
    				}
    			}
    	});
    }
    function loadComuna(region){
    	var action='loadComuna?region='+region;
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
    				
    				$("#cbComuna").get(0).options.length = 0;
    				$("#cbComuna").get(0).options[0] = new Option("Selec. Comuna", "-1"); 
    				$.each(data.listaComunas, function(i, item){$("#cbComuna").get(0).options[$("#cbComuna").get(0).options.length] = new Option(item.nombre, item.comId);});
    				
    				if(data.listaComunas.length>0){ 
    						$('#cbComuna').removeAttr("disabled"); 
    					}else{ 
    						$('#cbComuna').attr("disabled", "disabled");
    					}
    			}
    	});
    }
    
