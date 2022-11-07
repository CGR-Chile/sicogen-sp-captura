function SunComunas(value){		$('#ExpenseTableContainer').jtable('load', {padreId:value});	}
function loadTbl(value){		SunComunas(value);	}

function loadProvincia(value){
	var action='loadProvincias?regionId=' + $("#cbRegion option:selected").val();
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",
	    error: function(data){
	    	$('#cbProvincia').empty();
	    	$("#cbProvincia").get(0).options[$("#cbProvincia").get(0).options.length] = new Option( 'Selec.',-1);
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbProvincia').empty();
	    	$("#cbProvincia").get(0).options[$("#cbProvincia").get(0).options.length] = new Option( 'Selec.',-1);
	    	$.each(data.listaProvincia, function(i, itm) {	    		
	        $("#cbProvincia").get(0).options[$("#cbProvincia").get(0).options.length] = new Option(itm.nombre,itm.id );
            });
	    }
	});
}

$(document).ready(function() {          		 
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Comunas',
		selecting: true, //Enable selecting 
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: true, //Enable sorting
		actions: {
			listAction: 'listTblComunas',
			createAction: 'addTblComunas',
			updateAction: 'updTblComunas',
			deleteAction: 'delTblComunas'
		},messages: {
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
			canNotDeletedRecords: '�No se puede eliminar {0} de {1} registro',
			deleteProggress: 'Eliminado {0} de {1} archivos, procesamiento de ...'
		},fields: {
        	id: {			title: 'ID',	key: true,	list: false,	create: false,	edit: false},
        	padreId: {		list: false,visibility: 'hidden',inputClass: 'InputHidden'},
        	codigo: {		title: 'Codigo', width: '15%'	},
        	codigo2: {		title: 'Codigo Ini',width:'15%'	},
        	nombre: {		title: 'Nombre',width: '15%'},
        	usuario:{		title: 'Usuario',width: '100px', edit: false,create:false},
			fecha:{			title: 'Fecha',width: '120px', edit: false,create:false},
        	anulacion: {	title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create: false,},
        	//provinciaId:{	visibility: 'hidden',inputClass: 'InputHidden'},
        },formCreated: function (event, data){
			data.form.find('input[name="codigo"]').attr('maxlength','10');
			data.form.find('input[name="codigo2"]').attr('maxlength','5');
			data.form.find('input[name="nombre"]').attr('maxlength','50');
		},formSubmitting: function (event, data) {
            var aux = data.form.validationEngine('validate');
            if (data.form.find('input[name="codigo"]').val().length==0){
            	jAlert("Debe ingresar un codigo para la comuna",'Mantenedor de Comunas');						return false;
            }
            if (data.form.find('input[name="codigo2"]').val().length==0){
            	jAlert("Debe ingresar un codigo ini para la comuna",'Mantenedor de Comunas');					return false;
            }
            if (data.form.find('input[name="nombre"]').val().length==0){
            	jAlert("Debe ingresar un nombre para la comuna",'Mantenedor de Comunas');						return false;
            }
            if ((data.form.find('input[name=padreId]').val()==-1) || (data.form.find('input[name=padreId]').val().length==0)){
            	jAlert("Debe seleccionar la provincia a la cual pertenecera la comuna",'Mantenedor de Comunas');return false;
            }
            return aux;
         },rowInserted: function (event, data) {$('#ExpenseTableContainer').jtable('selectRows', data.row);
        },recordAdded: function(event, data){	$('#ExpenseTableContainer').jtable('load', { padreId:$("#cbProvincia option:selected").val()});
        },recordUpdated: function(event, data){	$('#ExpenseTableContainer').jtable('load', { padreId:$("#cbProvincia option:selected").val()});},
	});
    $("#newItem").each(function(i){
    	$(this).attr({'onClick' : 'loadInput()'});
    });
}); 
 
function loadInput(){
	console.log('hola');
	$("#Edit-padreId").val($("#cbProvincia option:selected").val());
	$("#Edit-padreId").parent().parent().hide();
	$("#Edit-codigo").attr('maxlength','10');
	$("#Edit-codigo2").attr('maxlength','5');
}

function loadData(){
	$('#ExpenseTableContainer').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {});
	});
	$('#LoadRecordsButton').click();
}