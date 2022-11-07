function load(){			entidadSubAreas();}
function entidadSubAreas(){	$('#ExpenseTableContainer').jtable('load');	return false;	} 

$(document).ready(function() {
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Parametros',
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
			listAction: 'listTblParam',
			createAction: 'addTblParam',
			updateAction: 'updTblParam',
			deleteAction: 'delTblParam'
		},fields: {
			areaID: {		title: 'ID',key: true,list:false,create: false,edit: false},
			entAreaID:{		title: 'Tipo Parametro',width:'5%',edit: false},
			codigo: {		title: 'Codigo',width: '15%'},
             nombre: {		title: 'Descripcion',width: '15%'},
             valor1:{		title: 'Valor1',width: '15%'},
             valor2:{		title: 'Valor2',width: '15%'},
             usuario: {		title: 'Usuario Creador',width: '15%',create: false,edit: false},
             usuarioupdate:{title: 'Usuario Actualizacion',width: '15%',create: false,edit: false,list:false},
             update: {		title: 'Fecha ultima actualizacion',width: '15%',create: false,edit: false},
             recordDate:{	title: 'Fecha Anulación',width: '15%',create: false,edit: false}
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows',data.row);
		},recordAdded: function(event, data){
		},recordUpdated: function(event, data){
		}
	});
	$("#newItem").each(function(i){	
		$(this).attr({'onClick' : 'loadInput()'});
	});
    $("#EditDialogSaveButton").each(function(i){
    	$(this).attr({'onClick' : 'loadBombo()'}); 
    });
    $("#AddRecordDialogSaveButton").each(function(i){
    	$(this).attr({'onClick' : 'loadBombo()'});
    });
    $('#LoadRecordsButton').attr('style','display:none');               
});

function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			paramID: $("#cbTparam :selected").val()
		});
		});
	$('#LoadRecordsButton').click();}
function loadInput(){
	var x = $("#cbTparam :selected").val();
	$("#Edit-entAreaID").val(x);
	$("#Edit-entAreaID").parent().parent().hide();
}

function loadBombo(){loadData();}
		
function loadInput(){
	var x = $("#cbTparam :selected").val();	$("#Edit-entAreaID").val(x);
	$("#Edit-entAreaID").parent().parent().hide();
}
