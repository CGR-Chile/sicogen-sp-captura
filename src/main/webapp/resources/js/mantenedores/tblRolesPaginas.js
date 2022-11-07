function load(){	paginas();		}

function paginas(){	$('#ExpenseTableContainer').jtable('load');return false;	} 

$(document).ready(function(){
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Paginas Roles',
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
				listAction: 'listTblRolesPaginas',
				createAction: 'addTblRolesPaginas',
				updateAction: 'updTblRolesPaginas',
				deleteAction: 'delTblRolesPaginas'
			},fields: {
				rolpagID:{	title: 'ID',key: true,list:false,edit:false,create: false},
				nombre: {	title: 'Nombre',width: '10%',create: false,edit: false},
				accion: {	title: 'Acci&oacute;n',width: '10%',create: false,edit: false},
				paginas: {	title: 'Paginas',width: '10%',list: false,options: function(data){return 'loadPaginasOption'; }},
				roles: {	title: 'Roles',width: '15%',edit: false,create: false,list: false},
				userupdate:{title: 'Usuario Modificaci&oacute;n',width: '15%',edit: false,create: false},
				update:{	title: 'Fecha Modificaci&oacute;n',width: '15%',edit: false,create: false},
				rolID: {	title: 'Rol ID',width: '10%',list: false,type: 'hidden'},
				id: {		title: 'Rol Pag ID',width: '10%',list: false,create: false,type: 'hidden'},
				vigente: {	title: 'Vigente',width: '10%',create: false,edit: false}
			},formCreated: function (event, data) {
				data.form.find('input[name="rolID"]').val($("#cbRoles :selected").val());
			},rowInserted: function (event, data) {
				$('#ExpenseTableContainer').jtable('selectRows', data.row);
			},recordAdded: function(event, data){
				$('#ExpenseTableContainer').jtable('load', { rolID:$("#cbRoles :selected").val()});
			},recordUpdated: function(event, data){
				$('#ExpenseTableContainer').jtable('load', { rolID:$("#cbRoles :selected").val()});
			}
		});
		$("#AddRecordDialogSaveButton").each(function(i){$(this).attr({'onClick' : 'loadBombo()'});});
		$('#LoadRecordsButton').attr('style','display:none'); 
});  
	
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			rolID:  $("#cbRoles :selected").val()
		});
	});
	$('#LoadRecordsButton').click();
}