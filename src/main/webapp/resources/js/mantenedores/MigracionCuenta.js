$(document).ready(function() { 
	$('#btnMigracion').val('Migrar Cuentas');
	console.log('ok3');
	$('#btnMigracion').attr('onclick','migraCuenta()');
});


function migraCuenta(){
	if ($("#cbEjercicioInicio :selected").val()==-1){
		jAlert('Error, debe seleccionar el ejercicio de origen ','Migracion de cuentas');
		return;
	}
	if ($("#cbEjercicioInicio :selected").val()==$("#cbEjercicioFin :selected").val()){
		jAlert('Error, debe seleccionar ejercicios distintos','Migracion de cuentas');
		return;
	}
	if ($("#cbEjercicioFin :selected").val()==-1){
		jAlert('Error, debe seleccionar el ejercicio de Destino ','Migracion de cuentas');
		return;
	}
	action='migraEjercicio?origen='+$("#cbEjercicioInicio :selected").val()+'&destino='+$("#cbEjercicioFin :selected").val();
	$.ajax({url: action, type: "GET", dataType:'json',
		success: function(data){
			console.log(data);
			switch(data.estado){
				case -2:jAlert(data.mensaje, "Migracion de cuentas", function(r){if(r){$(location).attr('href',url='verMigracionCuenta.action');}} );break;
				case -1:jAlert(data.mensaje, "Migracion de cuentas", function(r){if(r){$(location).attr('href',url='login');}} );break;
				default:jAlert(data.mensaje, "Migracion de cuentas");
			}
			jAlert('Terminada la migracion de cuentas ','Migracion de cuentas');
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			jAlert('Ocurrio un error al migrar las cuentas.','Migracion de cuentas');
		}
	});
	
	
}



/*                    updateAction: 'updTblEntSubAreas',
                     deleteAction: 'delTblEntSubAreas'
                 },
                 fields: {
                	 entSubAreaID: {
                		 title: 'ID',
                         key: true,
                         list: false,
                         create: false,
                         edit: false
                     },
                     entAreaID: {
                         title: 'Entidad Area',
                         width: '30%'
                     },
                     subAreaID: {
                         title: 'SubArea',
                         width: '15%',
                         options: function(data) {                      
                             return 'loadSubAreasOption';
                         }
                     },
                     region: {
                         title: 'Region',
                         width: '15%',
                         visibility: 'hidden',
                         edit: false,
             
                     },
                     entidad: {
                         title: 'Entidad',
                         width: '15%',
                         visibility: 'hidden',
                         edit: false
                
                     },
                     area: {
                         title: 'Area',
                         width: '15%',
                         visibility: 'hidden',
                         edit: false
                     },
                     isValid: {
                         title: 'Fecha Anulación',
                         width: '15%',
                         edit: false,
                         create: false
                     },
                     usuario: {
                         title: 'Usuario',
                         width: '15%',
                         edit: false,
                         create: false
                     }
                 },
                 formCreated: function (event, data) {
                     data.form.find('input[name="entAreaID"]').addClass('validate[required]');
                     data.form.validationEngine();
                 },
                 formSubmitting: function (event, data) {
                     return data.form.validationEngine('validate');
                 },
                 formClosed: function (event, data) {
                     data.form.validationEngine('hide');
                     data.form.validationEngine('detach');
                 },
                 rowInserted: function (event, data) {
 
                         $('#ExpenseTableContainer').jtable('selectRows', data.row);
                	
                 },
                 //Register to selectionChanged event to hanlde events                                     
                 recordAdded: function(event, data){
                
             		$('#ExpenseTableContainer').jtable('load', {
            			region: $("#cbRegion :selected").val(),
            			entidad: $("#cbEntidad :selected").val(),
            			area: $("#cbArea :selected").val()
            		}); 
                 },
                 recordUpdated: function(event, data){
              		$('#ExpenseTableContainer').jtable('load', {
            			region: $("#cbRegion :selected").val(),
            			entidad: $("#cbEntidad :selected").val(),
            			area: $("#cbArea :selected").val()
            		}); 
                 }
                 
             });
    	       $("#newItem").each(function(i){	$(this).attr({'onClick' : 'loadInput()'}); });
  	     	  // $("#EditDialogSaveButton").each(function(i){$(this).attr({'onClick' : 'loadBombo()'});});
  	     	//   $("#AddRecordDialogSaveButton").each(function(i){ $(this).attr({'onClick' : 'loadBombo()'});});   
    	       $('#LoadRecordsButton').attr('style','display:none'); 
         });  


function loadInput(){
	var x = $("#cbRegion :selected").val();	$("#Edit-region").val(x);
	x = $("#cbEntidad :selected").val();	$("#Edit-entidad").val(x);
	x = $("#cbArea :selected").val();	$("#Edit-area").val(x);
	
	  $("#Edit-region").parent().parent().hide();
	  $("#Edit-entidad").parent().parent().hide();
	  $("#Edit-area").parent().parent().hide();

}

	function loadBombo(){	loadData();	}
	
function loadData(){
	$('#LoadRecordsButton').click(function (e) {
		e.preventDefault();
		$('#ExpenseTableContainer').jtable('load', {
			region: $("#cbRegion :selected").val(),
			entidad: $("#cbEntidad :selected").val(),
			area: $("#cbArea :selected").val()
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

    function loadRegion(){
    	console.log('loadRegion: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadRegion';
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
    				
    				$("#cbRegion").get(0).options.length = 0;
    				$("#cbRegion").get(0).options[0] = new Option("Selec. Informe", "-1"); 
    				$.each(data.listaRegiones, function(i, item){$("#cbRegion").get(0).options[$("#cbRegion").get(0).options.length] = new Option(item.nombre, item.regId);});
    				
    				if(data.listaRegiones.length>0){ 
    						$('#cbRegion').removeAttr("disabled"); 
    					}else{ 
    						$('#cbRegion').attr("disabled", "disabled");
    					}
    			}
    	});

    }

    function loadEntidad(region){
    	
    	console.log('loadEntidad: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadEntidad?region=' + region;
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
    				$.each(data.listaEntidad, function(i, item){$("#cbEntidad").get(0).options[$("#cbEntidad").get(0).options.length] = new Option(item.nombre, item.codigo);});
    				
    				if(data.listaEntidad.length>0){ 
    						$('#cbEntidad').removeAttr("disabled"); 
    					}else{ 
    						$('#cbEntidad').attr("disabled", "disabled");
    					}
    			}
    	});
    }

    function loadArea(entidad){
    	
    	console.log('loadArea: ');
    	//var action = 'loadInformes1.action?ejercicio=' + ejercicio; 
    	var action='loadArea?entidad=' + entidad;
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
    				$("#cbArea").get(0).options[0] = new Option("Selec. Area", "-1"); 
    				$.each(data.listaArea, function(i, item){$("#cbArea").get(0).options[$("#cbArea").get(0).options.length] = new Option(item.areaNombre, item.areaId);});
    				
    				if(data.listaArea.length>0){ 
    						$('#cbArea').removeAttr("disabled"); 
    					}else{ 
    						$('#cbArea').attr("disabled", "disabled");
    					}
    			}
    	});
    }*/