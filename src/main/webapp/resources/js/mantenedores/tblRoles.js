function load(){	Roles();	}

function Roles(){	$('#ExpenseTableContainer').jtable('load');		return false;	} 


$(document).ready(function() {       
	var codigo = $("#Edit-codigo").val();
	var nombre = $("#Edit-nombre").val();
	 
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Roles',
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
		},actions: {
			listAction: 'listTblRoles',
			createAction: 'addTblRoles',
			updateAction: 'updTblRoles',
			deleteAction: 'delTblRoles'
		},fields: {
			areaID: {		title:'ID',key: true,list: false,create: false,edit: false	},
			codigo: {		title:'Codigo',width: '30%'		},
			nombre: {		title: 'Nombre',width: '15%'	},
			usuario: {		title: 'Usuario',width: '15%',	edit: false,create: false	},
			fecha: {		title: 'Fecha',width: '15%',edit: false,create: false	},
			anulacion: {	title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create: false	},
		},formCreated: function (event, data) {
			data.form.find('input[name="codigo"]').addClass('validate[required]');
			data.form.find('input[name="nombre"]').addClass('validate[required]');
			data.form.validationEngine('attach', {
				relative: true,
				overflownDIV:"#divOverflown",
				promptPosition:"bottomLeft"
			});
		},formSubmitting: function (event, data) {
			return data.form.validationEngine('validate');
		},formClosed: function (event, data) {
			data.form.validationEngine('hide');
			data.form.validationEngine('detach');
		},
		rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load');
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load');
		}
	});
	load();
	loadData();
});    

    
function loadData(){
	$('#ExpenseTableContainer').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			tipoInforme: $("#TipoInforme :selected").val(),
			moneda: $("#cbRolesC1 :selected").val(),
			regionId : $("#cbRegion :selected").val(),
			comunaId : $("#cbComuna :selected").val()
		});
		});
	$('#LoadRecordsButton').click();
}