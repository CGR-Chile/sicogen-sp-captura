function load(){	Areas();	}

function Areas(){
	$('#ExpenseTableContainer').jtable('load');return false;
}

$(document).ready(function () {
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Tipo de Parametro',
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
			listAction: 'listTblTipoParam',
			createAction: 'addTblTipoParam',
			updateAction: 'updTblTipoParam',
			deleteAction: 'delTblTipoParam'
		},fields: {
			id: {		title: 'ID',key: true,list: false,create: false,edit: false},
			codigo: {	title: 'Codigo',width: '30%'},
			nombre: {	title: 'Nombre',width: '15%'},
			usuario:{	width:'15%',edit:false,create:false,title:'Usuario'},
			fecha:{		width:'15%',edit:false,create:false,title:'Fecha'},
			anulacion:{	width: '15%',edit: false,create: false,title: 'Fecha Anulaci&oacute;n'}
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load');
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load');
		}
	});
	$('#LoadRecordsButton').attr('style','display:none'); 
	load();
});
    
function loadData(){
	$('#ExpenseTableContainer').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			tipoInforme: $("#TipoInforme :selected").val(),
			ejercicio: $("#cbEjercicioC1 :selected").val(),
			regionId : $("#cbRegion :selected").val(),
			comunaId : $("#cbComuna :selected").val()
		});
	});
    $('#LoadRecordsButton').click();
}