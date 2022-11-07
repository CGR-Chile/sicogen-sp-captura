function SunTipoInformes(value){
	$('#ExpenseTableContainer').jtable('load', { subTipoInf: $('#cbLstSubTipoInforme').val()});
}

function SunCampos(value){
	$('#ExpenseTableContainer').jtable('load', { tipoInf:$("#cbtipoInforme option:selected").val(), subTipoinf:$("#cbLstSubTipoInforme option:selected").val(), inf:$("#cbLInforme option:selected").val()});
	$("#jtable-create-form").attr("action", "register.php?btnsubmit=Save");
} 


function loadTbl(value){
	SunCampos(value);
}

function loadSubTipoInforme(value)
{
	var action='loadSubTipoInforme?tipoInfo=' + $("#cbtipoInforme option:selected").val();
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",
	    error: function(data){	    	
	    	$('#cbLstSubTipoInforme').empty();
	    	$("#cbLstSubTipoInforme").get(0).options[$("#cbLstSubTipoInforme").get(0).options.length] = new Option( 'Selec.',-1);
	    },
	    success: function(data){
	    	$('#cbLstSubTipoInforme').empty();
	    	$("#cbLstSubTipoInforme").get(0).options[$("#cbLstSubTipoInforme").get(0).options.length] = new Option( 'Selec.',-1);
	    	$.each(data.listaSubTipoInf, function(i, itm) {	    		
	        $("#cbLstSubTipoInforme").get(0).options[$("#cbLstSubTipoInforme").get(0).options.length] = new Option(itm.nombre,itm.subTipoID );
            });
	    }
	});
}

function loadTblInforme(value){
	var action='listInforme?subTipoInf=' + $("#cbLstSubTipoInforme option:selected").val();
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){	    	
	    	$('#cbLInforme').empty();
	    	$("#cbLInforme").get(0).options[$("#cbLInforme").get(0).options.length] = new Option( 'Selec.',-1);
	    },
	    success: function(data){
	    	$('#cbLInforme').empty();
	    	$("#cbLInforme").get(0).options[$("#cbLInforme").get(0).options.length] = new Option( 'Selec.',-1);
	    	$.each(data.listaInformes, function(i, itm) {	    		
	        $("#cbLInforme").get(0).options[$("#cbLInforme").get(0).options.length] = new Option(itm.nombre,itm.id );
            });
	    }
	});
}

$(document).ready(function() {          		 
	$('#ExpenseTableContainer').jtable({
		title: 'Tabla de Campos',
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
			listAction: 'listTblCampos',
			createAction: 'addTblCampos',
			updateAction: 'updTblCampos',
			deleteAction: 'delTblCampos'
		},fields: {
			id:{	title: 'ID',key: true,list: false,create: false,edit: false},
			inf:{	title: 'inf',width: '10%',visibility: 'hidden',inputClass: 'InputHidden'},
			nombre:{title: 'Nombre',width: '15%'},
			inicio:{title: 'Inicio',width: '15%'},
			largo:{	title: 'Largo',width: '15%'},
			param:{	title: 'Parametro',width: '15%'},
			seccion:{title: 'seccion',width: '15%'},
			include:{title: 'Include',width: '15%'},
			isValid: {edit: false,create: false,title: 'Fecha Anulaci&oacute;n',width: '15%'},
		},rowInserted: function (event, data) {
			$('#ExpenseTableContainer').jtable('selectRows', data.row);
		},recordAdded: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { tipoInf:$("#cbtipoInforme option:selected").val(), subTipoinf:$("#cbLstSubTipoInforme option:selected").val(), inf:$("#cbLInforme option:selected").val()});
		},recordUpdated: function(event, data){
			$('#ExpenseTableContainer').jtable('load', { tipoInf:$("#cbtipoInforme option:selected").val(), subTipoinf:$("#cbLstSubTipoInforme option:selected").val(), inf:$("#cbLInforme option:selected").val()});
		}
	});
    $("#newItem").each(function(i){
    	$(this).attr({'onClick' : 'loadInput()'});
    });
}); 
function loadInput(){
	var x =  $("#cbLInforme option:selected").val();
    $("#Edit-inf").val(x);
    $("#Edit-inf").parent().parent().hide(); 
}