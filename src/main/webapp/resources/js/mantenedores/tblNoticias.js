function load(){ Noticias(); }
function Noticias(){ 
	$('#MantNoticias').jtable('load'); 
	$('.jtable-edit-command-button').each(function(i){$(this).attr({'onclick' : 'loadInput()'});});
	return false;
}
function test(){
	$.datepicker.regional['es']={closeText: 'Cerrar',prevText: 'Previo',nextText: 'Próximo',
			monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
							'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
							'Jul','Ago','Sep','Oct','Nov','Dic'],
			monthStatus: 'Ver otro mes', yearStatus: 'Ver otro año',
			dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
			dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sáb'],
			dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
			dateFormat: 'dd/mm/yy', firstDay: 0,
			initStatus: 'Selecciona la fecha', isRTL: false};
	$.datepicker.setDefaults($.datepicker.regional['es']);

	$('#Edit-desde').datepicker();
	$('#Edit-hasta').datepicker();
}
$(document).ready(function () {
	$('#MantNoticias').jtable({
		title: 'Tabla de Noticias',
		 
		paging: true, //Enable paging
		pageSize: 10, //Set page size (default: 10)
		sorting: true, //Enable sorting
		defaultSorting: 'Name ASC',
		actions: {
			listAction: 'listMantNoticias',
			createAction: 'addNoticia',
			updateAction: 'updNoticia',
			deleteAction: 'delNoticia'
		},formCreated: function (event, data) {
			$('[name=desde] option:selected').datepicker('option', {dateFormat: 'yy-mm-dd'});
			//$('#Edit-desde').datepicker('option', {dateFormat: 'yy-mm-dd'});
        	$('#Edit-hasta').datepicker('option', {dateFormat: 'yy-mm-dd'});
        	test();
		},fields: {
			id: 		{title: 'ID',key: true,list: false,create: false,edit: false},
			titulo: 	{title: 'Titulo',list:true,width: '50px',},
			link: 		{title: 'Link',width: '400px', maxlength:3},
			noticia:	{title: 'Noticia',width: '400px', maxlength:3},
			//imagen:		function (data) {alert(data.records.image);return '<img src='+data.records.image+' ></img>';},
			imagen:		{title: 'Imagen',width: '400px', maxlength:3},
			desde:		{title: 'Desde',width: '400px', maxlength:3},
			hasta:		{title: 'Hasta',width: '400px', maxlength:3},
			usuario: 	{title: 'Usuario',width: '400px', edit: false,create:false},
			fecha: 		{title: 'Fecha',width: '400px', edit: false,create:false},
			anulacion: 	{title: 'Fecha Anulaci&oacute;n',width: '15%',edit: false,create:false}
		},formSubmitting: function (event, data) {
            var aux = data.form.validationEngine('validate');
            if (data.form.find('input[name="titulo"]').val().length==0){
            	jAlert("Debe ingresar un titulo para la noticia",'Mantenedor de Noticias');						return false;
            }
            if (data.form.find('input[name="noticia"]').val().length==0){
            	jAlert("Debe ingresar el texto de la noticia",'Mantenedor de Noticias');						return false;
            }
            if (data.form.find('input[name="link"]').val().length==0){
            	jAlert("Debe ingresar un link para la noticia",'Mantenedor de Noticias');						return false;
            }
            if (data.form.find('input[name="desde"]').val().length==0){
            	jAlert("Debe ingresar la fecha inicio de vigencia de la noticia",'Mantenedor de Noticias');		return false;
            }
            if (data.form.find('input[name="hasta"]').val().length==0){
            	jAlert("Debe ingresar la fecha limite de vigencia de la noticia",'Mantenedor de Noticias');		return false;
            }
            if(validaFecha(data.form.find('input[name="desde"]').val())==false){
            	jAlert("Debe ingresar una fecha de inicio valida para la noticia",'Mantenedor de Noticias');	return false;
            }
            if(validaFecha(data.form.find('input[name="hasta"]').val())==false){
            	jAlert("Debe ingresar una fecha de termino valida para la noticia",'Mantenedor de Noticias');	return false;
            }
            if(fechaMayor(data.form.find('input[name="desde"]').val(),data.form.find('input[name="hasta"]').val())==false){
            	jAlert("La fecha de inicio no puede ser superior a la fecha de termino de vigencia de la noticia",'Mantenedor de Noticias');	return false;
            }
            
            return aux;
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
    	    canNotDeletedRecords: '¡No se puede eliminar {0} de {1} registro',
    	    deleteProggress: 'Eliminado {0} de {1} archivos, procesamiento de ...'
        },
		rowInserted: function(event, data){ 	$('#MantNoticias').jtable('selectRows', data.row);},
		recordAdded: function(event, data){ 	$('#MantNoticias').jtable('load');},
		recordUpdated: function(event, data){	$('#MantNoticias').jtable('load');}
    });
	$('#newItem').each(function(i){$(this).attr({'onclick' : 'loadInput()'});});
    load();
});
function loadInput(){ //$("#Edit-codigo").attr('maxlength','10'); $("#Edit-nombre").attr('maxlength','20');
}
function loadData(){
	$('#MantNoticias').click(function (e) {
		e.preventDefault();
		$('#MantNoticias').jtable('load', {});
	});
	$('#LoadRecordsButton').click();
}