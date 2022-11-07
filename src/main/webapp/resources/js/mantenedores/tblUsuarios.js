function load(){		entidadSubAreas();}

function entidadSubAreas(){	
	$('#ExpenseTableContainer').jtable('load');	
	
	return false;	
} 

$(document).ready(function(){  
	$('#ExpenseTableContainer').jtable({
		title: 'Mantenedor de Usuarios',
		selecting: true, //Enable selecting
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: true, //Enable sorting
		defaultSorting: 'Name ASC',
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
			listAction: 'listTblUsuarios',
			createAction: 'addTblUsuarios',
			updateAction: 'updTblUsuarios',
			deleteAction: 'delTblUsuarios'
		},fields: {
			id: {				title: 'ID',key: true,list:false,edit:false,create: false},
			nombre: {			width: '10%',title: 'Usuario Nombre'},
			nick: {				width: '10%',title: 'Nick'},
			codigo: {			width: '10%',title: 'User ID'},
			perfil: {			width: '10%',title: 'Perfil',options: function(data) {return 'loadRolesOption';}},
			telefono: {			width: '10%',title: 'Telefono'},
			email: {			width: '10%',title: 'Email'},
			cargo: {			width: '15%',title: 'Cargo'},
			usuario: {			width: '15%',title: 'Usuario',edit: false,create: false},
			fecha: {			width: '15%',title: 'Fecha',edit: false,create: false},
			anulacion: {		width: '15%',title: 'Fecha Anulaci&oacute;n',edit: false,create: false},
			entidadID: {		width: '15%',title: 'Entidad',options: function(data) {return $.map($('#cbEntidad')[0].options,function(elem){return({Value:elem.value,DisplayText:elem.text});});}}
		},formCreated: function (event, data) {
			
		},formSubmitting: function (event, data) {
            var aux = data.form.validationEngine('validate');
            if (data.form.find('input[name="nombre"]').val().length==0){
            	jAlert("Debe ingresar un nombre del usuario",'Mantenedor Usuarios');						return false;
            }
            if (data.form.find('input[name="codigo"]').val().length==0){
            	jAlert("Debe ingresar un codigo para el usuario",'Mantenedor Usuarios');					return false;
            }
            if (data.form.find('input[name="nick"]').val().length==0){
            	jAlert("Debe ingresar un nick para el usuario",'Mantenedor Usuarios');						return false;
            }
            if ($('[name=entidadID] option:selected').val().toString()+"" =="-1"){
            	jAlert("Debe seleccionar Entidad a la cual pertenece el usuario",'Mantenedor Usuarios');	return false;
            }
            return aux;
         },
         formClosed: function (event, data) {	
            	 data.form.validationEngine('hide');
            	 data.form.validationEngine('detach');
         },rowInserted: function (event, data) {
        	 $('#ExpenseTableContainer').jtable('selectRows', data.row);
         },recordAdded: function(event, data){
        	 
         },recordUpdated: function(event, data){
        		$('#ExpenseTableContainer').jtable('load', {
        			entidad:  $("#cbEntidad :selected").val()
        		});
         }
         
     	});
     	$("#AddRecordDialogSaveButton").each(function(i){$(this).attr({'onClick' : 'loadBombo()'});});
     	$('#LoadRecordsButton').attr('style','display:none');
     	
     	$(".jtable").css({'width':'1200px'});
 });  
    

function loadInput(){
	var x = $("#cbRegion :selected").val();	$("#Edit-reg").val(x);
	x = $("#cbComuna :selected").val();	$("#Edit-comunaId").val(x);
	x = $("#cbTipoEntidad :selected").val();	$("#Edit-tipoent").val(x);
	  $("#Edit-reg").parent().parent().hide();
	  $("#Edit-comunaId").parent().parent().hide();
	  $("#Edit-tipoent").parent().parent().hide();
	  $("#Edit-comuna").parent().parent().hide();

}

	function loadBombo(){	loadData();	}
	
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			entidad:  $("#cbEntidad :selected").val()
		});
	});
	$('#LoadRecordsButton').click();
	ancho=parseInt($(".jtable").css('width'));

 	$(".jtable-title").css({'width':ancho+'px'});
 	$(".jtable-bottom-panel").css({'width':ancho+'px'});
}
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

    function loadEntidad(region, tipoEntidad){
    	
    	console.log('loadEntidad: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadEntidadByRegTipoEnt?region=' + region+ '&tipoEntidad='+tipoEntidad;
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
    				$.each(data.listaEntidadReg, function(i, item){$("#cbEntidad").get(0).options[$("#cbEntidad").get(0).options.length] = new Option(item.nombre, item.codigo);});
    				
    				if(data.listaEntidadReg.length>0){ 
    						$('#cbEntidad').removeAttr("disabled"); 
    					}else{ 
    						$('#cbEntidad').attr("disabled", "disabled");
    					}
    			}
    	});
    }


    function loadArea(Entidad){
    	
    	console.log('Entidad: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadAreaByEnt?Entidad=' + Entidad;
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
    				$("#cbArea").get(0).options[0] = new Option("Selec. Entidad", "-1"); 
    				$.each(data.listaEntidadArea, function(i, item){$("#cbArea").get(0).options[$("#cbArea").get(0).options.length] = new Option(item.nombre, item.codigo);});
    				
    				if(data.listaEntidadArea.length>0){ 
    						$('#cbArea').removeAttr("disabled"); 
    					}else{ 
    						$('#cbArea').attr("disabled", "disabled");
    					}
    			}
    	});
    }
    function loadRegionbyTpEntidad(tpEntidad){
    	var action='';
    	$('#cbRegion').attr("disabled", "disabled");
    	$('#cbEntidad').attr("disabled", "disabled");
    	$("#cbRegion").get(0).options.length = 0; $("#cbRegion").get(0).options[0] = new Option("Selec. Region", "-1");
    	$("#cbEntidad").get(0).options.length = 0; $("#cbEntidad").get(0).options[0] = new Option("Selec. Entidad", "-1");
    	if(parseInt(tpEntidad)!=1){
    		action='loadRegionBytpEntidad?tpEnt=' + tpEntidad;
    		console.log(action);
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
	       				$("#cbRegion").get(0).options.length = 0; $("#cbRegion").get(0).options[0] = new Option("Selec. Region", "-1");
	       				console.log(data.Records);
	       				$.each(data.Records, function(i, item){
	       					console.log(item);
	       					$("#cbRegion").get(0).options[$("#cbRegion").get(0).options.length] = new Option(item.nombre, item.areaID);
	       				});
	       				
	       				if(data.Records.length>0){ 
	       					$('#cbRegion').removeAttr("disabled"); 
	       				}else{ 
	       					$('#cbRegion').attr("disabled", "disabled");
	       				}
	       			}
	       	});
    	}else{
    		loadEntidad(0,1);
    		
    	}
    	
    	
    }
    function loadTipoEntidad(Comuna){    	
    	console.log('TipoEntidad: ');
    	var action='loadTipoEntidad?Comuna=' + Comuna;
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
    				$("#cbTipoEntidad").get(0).options.length = 0;
    				$("#cbTipoEntidad").get(0).options[0] = new Option("Selec. Entidad", "-1"); 
    				$.each(data.listaTipoEntidad, function(i, item){
    					$("#cbTipoEntidad").get(0).options[$("#cbTipoEntidad").get(0).options.length] = new Option(item.nombre, item.codigo);
    				});
    				
    				if(data.listaTipoEntidad.length>0){ 
    						$('#cbTipoEntidad').removeAttr("disabled"); 
    					}else{ 
    						$('#cbTipoEntidad').attr("disabled", "disabled");
    					}
    			}
    	});
    }
    

