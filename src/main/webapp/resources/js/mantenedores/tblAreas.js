function load(){ Areas(); }
function Areas(){ 
	$('#ExpenseTableContainer').jtable('load'); 
	$('.jtable-edit-command-button').each(function(i){$(this).attr({'onclick' : 'loadInput()'});});
	return false;
}
$(document).ready(function () {
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Areas',
		 
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
        },
		actions: {
			listAction: 'listTblAreas',
			createAction: 'addTblArea',
			updateAction: 'updTblArea',
			deleteAction: 'delTblArea'
		},
		formCreated: function (event, data) {
			data.form.find('input[name="codigo"]').attr('maxlength','10');
			data.form.find('input[name="nombre"]').attr('maxlength','20');
		},
		fields: {
			id: 		{title: 'ID',key: true,list: false,create: false,edit: false},
			codigo: 	{title: 'Codigo',list:true,width: '50px',},
			nombre: 	{title: 'Nombre',width: '400px', maxlength:3},
			usuario: 	{title: 'Usuario',width: '400px', edit: false,create:false},
			fecha: 		{title: 'Fecha',width: '400px', edit: false,create:false},
			anulacion: 	{title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create:false}
		},
		rowInserted: function(event, data){  $('#ExpenseTableContainer').jtable('selectRows', data.row);},
		recordAdded: function(event, data){  $('#ExpenseTableContainer').jtable('load');},
		recordUpdated: function(event, data){$('#ExpenseTableContainer').jtable('load');}
    });
	$('#newItem').each(function(i){$(this).attr({'onclick' : 'loadInput()'});});
    load();
});
function loadInput(){
	$("#Edit-codigo").attr('maxlength','10');
	$("#Edit-nombre").attr('maxlength','20');
}
function loadData(){
	$('#ExpenseTableContainer').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {});
	});
	$('#LoadRecordsButton').click();
}