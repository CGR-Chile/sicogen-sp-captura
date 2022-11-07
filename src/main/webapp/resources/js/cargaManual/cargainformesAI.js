var aCtasPresup=new Array();
var descuentoAux=0;
var aumentoAux=0;;
function cambiaSubtituloPresupuesto(subtitulo){
	
	$('#textoCargando').text('Cargando Item Presupuestarios');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountBySubtitle?periodo=' + $('#periodoInt').text() 
	+ '&subtitle='+subtitulo;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbItem').empty();
	    	$('#cbAsig').empty();
	    	$('#cbSubAsig').empty();
	    	
	    	$("#cbItem").get(0).options[$("#cbItem").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {
	    		$("#cbItem").get(0).options[$("#cbItem").get(0).options.length] = new Option(itm.item, itm.item);                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbItem').empty();
	    	$('#cbAsig').empty();
	    	$('#cbSubAsig').empty();
	    	
	    	$("#cbItem").get(0).options[$("#cbItem").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbItem").get(0).options[$("#cbItem").get(0).options.length] = new Option(itm.item, itm.item);
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}
function cambiaItemPresupuesto(item){
	
	$('#textoCargando').text('Cargando Asignacion Presupuestarios');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByItem?periodo=' + $('#periodoInt').text() 
	+ '&subtitle='+$('#cbSubtitulos').val() 
	+ '&item='+item;
		
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbAsig').empty();
	    	$('#cbSubAsig').empty();
	    	
	    	$("#cbAsig").get(0).options[$("#cbAsig").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbAsig").get(0).options[$("#cbAsig").get(0).options.length] = new Option(itm.asignacion, itm.asignacion);                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbAsig').empty();
	    	$('#cbSubAsig').empty();
	    	
	    	$("#cbAsig").get(0).options[$("#cbAsig").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbAsig").get(0).options[$("#cbAsig").get(0).options.length] = new Option(itm.asignacion, itm.asignacion);
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}
function cambiaAsignPresupuesto(asign){
	
	console.log('asign:' + asign);
	console.log('asign:' + asign);
	
	$('#textoCargando').text('Cargando Sub Asignacion Presupuestarias');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action ='loadPresupAccountByAsign?periodo=' + $('#periodoInt').text() 
	+ '&' + 'subtitle='+$('#cbSubtitulos').val() 
	+ '&item='+$('#cbItem').val()
	+ '&asign='+asign;
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){	    	
	    	$('#cbSubAsig').empty();
	    	
	    	console.log(data);
	    	$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option(	itm.subAsignacion, 
	    																							itm.subAsignacion);                
	    		console.log(itm.denominacion);
	    		$("#Denomc").text(itm.denominacion.text());
	    	});
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbSubAsig').empty();
	    	
	    	$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option(	itm.subAsignacion,
	    																							itm.subAsignacion);	    		
	    		$("#Denomc").val(itm.denominacion);
	    		
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}
function cambiaSubAsignPresupuesto(subAsign){
	$('#textoCargando').text('Cargando SubAsignacion Presupuestarios');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByAsign?periodo=' + $('#periodoInt').text() 
	+ '&subtitle='+$('#cbSubtitulos').val() 
	+ '&item='+$('#cbAsig').val()
	+ '&asign='+asign;
	console.log(action);
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){	    	
	    	$('#cbSubAsig').empty();
	    	$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option(itm.asignacion, itm.asignacion);                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbSubAsig').empty();
	    	$("#cbSubAsig").get(0).options[$("#cbSubAsig").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listSubtitulos, function(i, itm) {	    		
	    		$("#cbSubAsig").get(0).options[$("cbSubAsig").get(0).options.length] = new Option(itm.asignacion, itm.asignacion);
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
	
}

function cargarXML_Ctas(){
	
	var action='';
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(XMLHttpRequest, textStatus, errorThrown){
	    	var posfinal = XMLHttpRequest.responseText.indexOf( "</informes>" );
			
	    	respuesta = XMLHttpRequest.responseText.substring(0, posfinal  + 11);			
			console.dirxml(respuesta);
			
			var xml = (new DOMParser()).parseFromString(respuesta, 'text/xml');
			actualizaObjetosPorValidacion(xml);
			$("body").css("cursor", "default");
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	var posfinal = XMLHttpRequest.responseText.indexOf( "</informes>" );
			respuesta = XMLHttpRequest.responseText.substring(0, posfinal  + 11);			
			console.dirxml(respuesta);
			
			var xml = (new DOMParser()).parseFromString(respuesta, 'text/xml');
			actualizaObjetosPorValidacion(xml);
			$("body").css("cursor", "default");
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
	
}
//contador de numeros de filas de detalle
var contador = 0;
//funcion para editar una linea de detalle
function editar(idpadreHijo, idpadre, idhijo, x, y,informe) {
    if(!confirm("Advertencia: Seguro que desea editar la linea seleccionada")) {	return false;}
    var muni = $('#Denom').val();
	
    var titulo = $("#ltitulo" + x).val();
    var grupo = $("#lgrupo" + x).val();
    var subGrupo = $("#lsubGrupo" + x).val();
    var cuentaNivel = $("#lcuentaNivel" + x).val();
    var cuentaNivel2 = $("#lcuentaNivel2" + x).val();
    var cuentaNivel3 = $("#lcuentaNivel3" + x).val();
    var cuentaNivel4 = $("#lcuentaNivel4" + x).val();
    var cuentaNivel5 = $("#lcuentaNivel5" + x).val();
    var preobligado = $("#lobligado" + x).val();
    var obligado = $("#ldisminucion" + x).val();
    var aumento = $("#laumento" + x).val();
    var disminucion = $("#ldisminucion" + x).val();
    var saldoDeudor = $("#lsaldoDeudor" + x).val();
    var saldoAcreedor = $("#lsaldoAcreedor" + x).val();
    var distribucion = $("#ldistribucion" + x).val();
   
//volcado de datos para editarlos y posteriormente se elimina la linea de detalle a editar
    $("#Denom").val(muni);
    $("#cbTitulo option[value="+titulo+"]").attr("selected",true);
    $("#cbGrupo option[value="+grupo+"]").attr("selected",true);
    $("#cbSubGrupo option[value="+subGrupo+"]").attr("selected",true);
    $("#cbCuentaNivel option[value="+cuentaNivel+"]").attr("selected",true);
    $("#cbNivel2 option[value="+cuentaNivel2+"]").attr("selected",true);
    $("#cbNivel3 option[value="+cuentaNivel3+"]").attr("selected",true);
    $("#cbNivel4 option[value="+cuentaNivel4+"]").attr("selected",true);
    $("#cbNivel5 option[value="+cuentaNivel5+"]").attr("selected",true);
    $("#Tdebito").val(preobligado);
    $("#Tcredito").val(obligado);
    $("#txtAumento").val(aumento);
    $("#txtDisminucion").val(disminucion);
    $("#txtSaldoDeudor").val(saldoDeudor);
    $("#txtSaldoAcreedor").val(saldoAcreedor);
    $("#Distribucion").val(distribucion);
    var op =0;
  
    eliminar(op, "", "", idpadreHijo, idpadre, idhijo, x, y, informe);

}
//funcion para eliminar una linea de detalle
function eliminar(op, area, subArea, idpadreHijo, idpadre, idhijo, x, y, informe){
	
	var aumento = $("#laumento" + x).val();
	var disminucion = $("#ldisminucion" + x).val();
	var informes   =   $('#informe').val();  	
	
	
	var tdebito   = $('#Tdebito').val();
    var tcredito  = $('#Tcredito').val();
    var periodo   = $('#codigoPeriodo').val();
    var registros = $("#Registros").val();
    var rut  = $("#rut").val();
    var dv  = $("#dv").val();
    //resta
    if (tdebito == ""  || isNaN(tdebito)) tdebito = 0;
    if (tcredito == "" || isNaN(tcredito)) tcredito = 0;
    tdebito = parseFloat(tdebito) - parseFloat(aumento);
    tcredito = parseFloat(tcredito) - parseFloat(disminucion);
   
	if(registros=="" || isNaN(registros)) registros=0;
	registros = parseInt(registros) - 1;
	
	//resta
	if (op ==1){
	if(!confirm("Advertencia: Seguro que desea eliminar el detalle seleccionado")) 	return false;
	}
	
	$('#textoCargando').text('Eliminando detalle');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';

	var action ='eliminarDetalle.action?secuenciaHijo=' + idhijo 
	+'&secuenciaPadre='+idpadre
	+'&secuenciaPadreConHijo='+idpadreHijo
	+'&area='+ area
	+'&subarea='+ subArea 
	+'&registros='+ registros 
	+'&tdebito='+ tdebito 
	+'&tcredito='+ tcredito
	+'&periodo='+ periodo
	+'&informe='+ informes
	+'&rut='+ rut
	+'&dv='+ informes;
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	alert("Ocurrio un problema eliminarDetalle");
	    	document.getElementById('fade').style.display='none';
		    document.getElementById('formEnvio').style.display='none';
		    //alert($.each(data.codigoError));
		    $('#secuenciaPadre').val($.each(data.secuenciaPadre));
		    
	    },
	    success: function(data){
	    	$('#secuenciaPadre').val($.each(data.secuenciaPadre));
	    	$('#secuenciaPadreConHijo').val($.each(data.secuenciaPadreConHijo));
	       	document.getElementById('fade').style.display='none';
	    	document.getElementById('formEnvio').style.display='none';
	    	//alert($.each(data.codigoError));
	    	eliminarFila(idpadreHijo, idpadre, idhijo, x, y, informe);

	    }
	});
	
}
function eliminarFila(idpadreHijo, idpadre, idhijo, x, y, informe) {
	
    var nfilas = document.getElementById("lista").rows.length;
    if (y == 0) { 
    	Disminucion(x, informe);
 	    if (nfilas == 1) {
 	        $('#line' + x).remove();
 	        $('#lineTitulo').remove();
 	        contador = 0;
 	    } else {
 	        $('#line' + x).remove();
 	        contador--;  		}
    }else{
    		Disminucion(x, informe);
    		
    if (nfilas == 1) {
        $('#line' + x).remove();
        $('#lineTitulo').remove();
        contador = 0;
    } else {
        $('#line' + x).remove();
        contador--;
    		}
    	}
    contadorR(02);
} 

//llamada al servicio grabarCabecera
function grabarCabecera(informe){
	var pasa = false;
	if($('#rut').val()==null || $('#rut').val()=="" || $('#dv').val()=="" || $('#dv').val()==null){
		alert('Debe Ingresar rut y dv');
		return;
	}else{
		pasa = Rut($('#rut').val()+"-"+$('#dv').val());
	}	
	
	if (pasa == true)
	{
	
		if($("#cbTitulo option:selected").val()==null || $("#cbTitulo option:selected").val()=="" || $("#cbTitulo option:selected").val()=="-1"){
			alert('Debe seleccionar Titulo');
			return;
		}	
		if($("#cbGrupo option:selected").val()==null || $("#cbGrupo option:selected").val()=="" || $("#cbGrupo option:selected").val()=="-1"){
			alert('Debe seleccionar Grupo');
			return;
		}
		if($("#cbSubGrupo option:selected").val()==null || $("#cbSubGrupo option:selected").val()=="" || $("#cbSubGrupo option:selected").val()=="-1"){
			alert('Debe seleccionar Sub Grupo');
			return;
		}
		if($("#cbCuentaNivel option:selected").val()==null || $("#cbCuentaNivel option:selected").val()=="" || $("#cbCuentaNivel option:selected").val()=="-1"){
			alert('Debe seleccionar Cuenta Nivel ');
			return;
		}	
		if($("#cbNivel2 option:selected").val()==null || $("#cbNivel2 option:selected").val()=="" || $("#cbNivel2 option:selected").val()=="-1"){
			alert('Debe seleccionar Nivel 2 ');
			return;
		}	
		if($("#cbNivel3 option:selected").val()==null || $("#cbNivel3 option:selected").val()=="" || $("#cbNivel3 option:selected").val()=="-1"){
			alert('Debe seleccionar Nivel 3 ');
			return;
		}	
		if($("#cbNivel4 option:selected").val()==null || $("#cbNivel4 option:selected").val()=="" || $("#cbNivel4 option:selected").val()=="-1"){
			alert('Debe seleccionar Nivel 4 ');
			return;
		}	
		if($("#cbNivel5 option:selected").val()==null || $("#cbNivel5 option:selected").val()=="" || $("#cbNivel5 option:selected").val()=="-1"){
			alert('Debe seleccionar Nivel 5 ');
			return;
		}	
	
	}else{
		return;
	}
	
	$('#textoCargando').text('Grabando Archivo');
	
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	var informe   =   $('#informe').val();
	var periodo   =   $('#codigoPeriodo').val();
	var entidad   =   $('#muni').val();
	var moneda = $("#moneda").val();
	var rut   =   $('#rut').val();
	var dv   =   $('#dv').val();
	var registros =   $('#Registros').val();
	var Pobligado   =   $('#Pobligado').val();
	var ejercicio =   $('#ejercicio').val();
	var Obligado   =   $('#Obligado').val();
	var tdebito   =   $('#txtAumento').val();
	var tcredito   =   $('#txtDisminucion').val();
	var secuenciaPadre = $('#secuenciaPadre').val();
	var secuenciaPadreConHijo = $('#secuenciaPadreConHijo').val();
	var ejercicio =   $('#ejercicio').val();
	var glosaEjercicio = $('#glosaEjercicio').val();
	var glosaPeriodo = $('#glosaPeriodo').val();
	var totalPreObligado = $('#totalPreObligado').val();
	var saldodeudor    = $('#txtSaldoDeudor').val(); 
	var saldoacreedor= $('#txtSaldoAcreedor').val(); 
	
	if(secuenciaPadre =="0" && secuenciaPadreConHijo =="0"){
		
		var action ='insertaCabecera.action?periodo=' + periodo 
		+'&informe='+ informe  
		+'&periodo='+periodo
		+'&entidad='+entidad
		+'&moneda='+moneda
		+'&rut='+ rut
		+'&dv='+ dv
		+'&registros='+ registros 
		+'&ejercicio='+ejercicio
		+'&pobligado='+ Pobligado 
		+'&obligado='+ Obligado 
		+'&tdebito='+ tdebito 
		+'&tcredito='+ tcredito 
		+'&ejercicio='+ejercicio 
		+'&glosaEjercicio='+glosaEjercicio
		+'&glosaPeriodo='+glosaPeriodo
		+'&saldoDeudor='+ saldodeudor 
		+'&saldoAcreedor='+ saldoacreedor;
		$.ajax({url: action,
		    type: "POST",
		    dataType: "json",	    
		    error: function(data){
		    	alert("Ocurrio un problema insertaCabecera");
		    	document.getElementById('fade').style.display='none';
			    document.getElementById('formEnvio').style.display='none';
		    },
		    success: function(data){
		    	
		    	$('#secuenciaPadre').val($.each(data.secuenciaPadre));
		    	$('#secuenciaPadreConHijo').val($.each(data.secuenciaPadreConHijo));
		    	grabarCabecera(informe);
		    }
		});
	}else{
		grabarDetalle(informe);
	
	}
	
}

//llamada al servicio grabarDetalle
function grabarDetalle(informe){
	var periodo   =   $('#codigoPeriodo').val();
	var informe   =   $('#informe').val();
	var ejercicio =   $('#ejercicio').val();
	var entidad = $('#muni').val();	
	var region = $('#region').val();
	//titulo + grupo + sub-grupo + Cuenta Nivel
	var cuenta = $("#cbTitulo option:selected").text()+$("#cbGrupo option:selected").text()+$("#cbSubGrupo option:selected").text()+$("#cbCuentaNivel option:selected").text();	//Nivel 2 +Nivel 3+ Nivel 4 + Nivel 5
	var CodAnalitico=  $("#cbCuentaNivel option:selected").text()+$("#cbNivel2 option:selected").text()+$("#cbNivel3 option:selected").text()+$("#cbNivel4 option:selected").text()+"00";
	var codigoCuenta =  $("#cbNivel2 option:selected").text()+$("#cbNivel3 option:selected").text()+$("#cbNivel4 option:selected").text();
	var Pobligado    = $('#Pobligado').val(); 
	var Obligado= $('#Obligado').val(); 
	var aumento    = $('#txtAumento').val(); 
	var disminucion = $('#txtDisminucion').val(); 
	var saldodeudor    = $('#txtSaldoDeudor').val(); 
	var saldoacreedor= $('#txtSaldoAcreedor').val(); 
	var denominacion       = $("#Denom").val();
	var glosaEjercicio = $('#glosaEjercicio').val();
	var glosaPeriodo = $('#glosaPeriodo').val();
	var registros =   $('#Registros').val();
	var secuenciaPadre = $('#secuenciaPadre').val();
	var secuenciaPadreConHijo = $('#secuenciaPadreConHijo').val();
	var denominacionCuenta = $("#cbNivel5 option:selected").text();
	var moneda = $("#moneda").val();
	var rut   =   $('#rut').val();
	var dv   =   $('#dv').val();
	//suma
    var tdebito = $('#Tdebito').val();
    var tcredito= $('#Tcredito').val();
    var demonimacionProyecto= $('#txtDenominacionProyecto').val();
    var codigoProyecto= $('#txtProyecto').val();
    if (tdebito == ""  || isNaN(tdebito)) tdebito = 0;
    if (tcredito == "" || isNaN(tcredito)) tcredito = 0;
    
    tdebito = parseFloat(tdebito) + parseFloat(aumento);
    tcredito = parseFloat(tcredito) + parseFloat(disminucion);
   
   
	if(registros=="" || isNaN(registros)) registros=0;
	registros = parseInt(registros) + 1;
	//Suma
	var action ='insertaDetalle.action?periodo=' + periodo 
	+'&entidad='+entidad 
	+'&region='+region
	+'&cuenta='+ cuenta 
	+'&CodAnalitico='+ CodAnalitico 
	+'&preobligado='+ Pobligado 
	+'&ejercicio='+ejercicio 
	+'&obligado='+ Obligado
	+'&moneda='+moneda
	+'&aumento='+ aumento 
	+'&disminucion='+ disminucion
	+'&debe='+ aumento 
	+'&rut='+ rut
	+'&dv='+ dv
	+'&haber='+ disminucion
	+'&secuenciaPadre='+ secuenciaPadre
	+'&secuenciaPadreConHijo='+ secuenciaPadreConHijo
	+'&saldoDeudor='+ saldodeudor 
	+'&saldoAcreedor='+ saldoacreedor
	+'&registros='+ registros
	+'&denominacion='+ denominacion
	+'&glosaEjercicio='+ glosaEjercicio
	+'&informe='+ informe  
	+'&tdebito='+ tdebito
	+'&tcredito='+ tcredito  
	+'&denominacionCuenta='+ denominacionCuenta  
	+'&totalPreObligado='+ tdebito  
	+'&totalObligado='+ tcredito 
	+'&codigoProyecto='+ codigoProyecto 
	+'&codigoCuenta='+ codigoCuenta 
	+'&demonimacionProyecto='+ demonimacionProyecto 
	+'&glosaPeriodo='+ glosaPeriodo;


	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	   error: function(XMLHttpRequest, textStatus, errorThrown){
			
			console.log(textStatus);
			console.log(errorThrown);
			console.log('falla');
	    	document.getElementById('fade').style.display='none';
		    document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#secuenciaPadre').val($.each(data.secuenciaPadre));
	    	$('#secuenciaPadreConHijo').val($.each(data.secuenciaPadreConHijo));
	       	document.getElementById('fade').style.display='none';
	    	document.getElementById('formEnvio').style.display='none';
	    	//alert($.each(data.secuenciaHijo));
	    	AddItem(informe, $.each(data.secuenciaHijo), $.each(data.secuenciaPadre), $.each(data.secuenciaPadreConHijo));

	    }
	});
	
}

    //agrega mas lineas de detalle

function AddItem(informe, idhijo, idpadre, idpadreHijo) {
	
	console.log('agrega Item');	
	var area = $("#cbArea option:selected").val();	
	var subArea = $("#cbSubArea option:selected").val();
	var entidadCode = $('#muni').val();
	var auxEntidad ="";
	if(area =="01"){
		auxEntidad = area +  entidadCode + subArea;
	}else{
		auxEntidad ="00" + entidadCode + area;
	}
    //Validacion campos vacios
    if ($('#txtAumento').val() == "") {
    	alert("Error:Campo Aumento esta vacio");
    	return false;
    }
    if ($('#txtDisminucion').val()== "") {
    	alert("Error:Campo Disminuci&oacute;n esta vacio");
    	return false;
    }

    Totales($('#txtAumento').val(), $('#txtDisminucion').val(), informe);
    contadorR(01);
    //introduce los valores a la lista de detalle
    var tr= "<tr id='line"+contador+"'>" +
				"<td><input id='lmuni" 		  + contador + "' disabled='true' class='txtFile' style='width:120px;'  type='text' value='" + $('#Denom').val() + "'></td>" +
				"<td><input id='lcodProyecto" 	  + contador + "' disabled='true' class='txtFile' style='width:66px;text-align: right;' type='text' value='" + $('#txtProyecto').val() + "'></td>" +
				"<td><input id='ltitulo" 	  + contador + "' disabled='true' class='txtFile' style='width:66px;text-align: right;' type='text' value='" + $('#cbTitulo').val() + "'></td>" +
				"<td><input id='lgrupo" 	  + contador + "' disabled='true' class='txtFile' style='width:50px;text-align: right;' type='text' value='" + $('#cbGrupo').val() + "'></td>" +
				"<td><input id='lsubGrupo" 	  + contador + "' disabled='true' class='txtFile' style='width:66px;text-align: right;' type='text' value='" + $('#cbSubGrupo').val() + "'></td>" +
				"<td><input id='lcuentaNivel" + contador + "' disabled='true' class='txtFile' style='width:66px;text-align: right;' type='text' value='" + $('#cbCuentaNivel').val() + "'></td>" +
				"<td><input id='lcuentaNivel2" + contador + "' disabled='true' class='txtFile' style='width:50px;text-align: right;' type='text' value='" + $('#cbNivel2').val() + "'></td>" +
				"<td><input id='lcuentaNivel3" + contador + "' disabled='true' class='txtFile' style='width:50px;text-align: right;' type='text' value='" + $('#cbNivel3').val() + "'></td>" +
				"<td><input id='lcuentaNivel4" + contador + "' disabled='true' class='txtFile' style='width:50px;text-align: right;' type='text' value='" + $('#cbNivel4').val() + "'></td>" +
				"<td><input id='lpreobligado"     + contador + "' disabled='true' class='txtFile' style='width:75px;' type='text' value='" + $('#Pobligado').val() + "'></td>" +
				"<td><input id='lobligado"     + contador + "' disabled='true' class='txtFile' style='width:75px;' type='text' value='" + $('#Obligado').val() + "'></td>" +
				"<td><input id='laumento"     + contador + "' disabled='true' class='txtFile' style='width:60px;text-align: right;' type='text' value='" + $('#txtAumento').val() + "'></td>" +
				"<td><input id='ldisminucion" + contador + "' disabled='true' class='txtFile' style='width:60px;text-align: right;' type='text' value='" + $('#txtDisminucion').val() + "'></td>" +
				"<td><input id='ldenominacionCuen"     + contador + "' disabled='true' class='txtFile' style='width:80px;' type='text' value='" + $('#cbNivel5').val() +  $('#cbNivel2').val() + $('#cbNivel3').val()+  $('#cbNivel4').val() + "00"+"'></td>" +
				"<td><input id='ldenominacionProy" + contador + "' disabled='true' class='txtFile' style='width:110px;' type='text' value='" + $('#txtDenominacionProyecto').val() + "'></td>" +
				"<td style='display:none;'><input id='ldistri"      + contador + "' disabled='true' class='txtFile' style='width:50px;' type='text' value='" + 1 + "'></td>" +
				"<td style='display:none;'><input id='secuenciaPadreConHijo" + contador + "' disabled='true' class='txtFile' style='width:67px;'  type='text' value='" + idpadreHijo + "'></td>" +
				"<td style='display:none;'><input id='secuenciaPadre" + contador + "' disabled='true' class='txtFile' style='width:67px;'  type='text' value='" + idpadre + "'></td>" +
				"<td style='display:none;'><input id='secuenciaHijo" + contador + "' disabled='true' class='txtFile' style='width:67px;'  type='text' value='" +  idhijo + "'></td>" +
				"<td><img id='edit' src='images/edititem.png' alt='descripción' class='img25' onClick='editar("+ idpadreHijo + ","+ idpadre + "," + idhijo + "," + contador + ",1,04)' />" +
				"<img id='delete' src='images/delete.png' alt='descripción' class='img25' onClick='eliminar("+ 1  + "," + "0" +"," + "0" +"," + idpadreHijo + "," + idpadre + "," + idhijo + "," + contador + ",0,04)' /></td>" +
			"</tr>";
    console.log(tr);
    $('#lista > tfoot:first').after(tr);
    $("#lista > tfoot > tr:first").after("<tr><td>some</td><td>content</tr></tr>");
    contador++;
    $("#Cuenta").val("");
    $("#Analitico").val("");
	//$("#Subt option[value="+miValue+"]").attr("selected",true);
	//$("#item option[value="+miValue+"]").attr("selected",true);
	//$("#Asig option[value="+miValue+"]").attr("selected",true);
	//$("#Suba option[value="+miValue+"]").attr("selected",true);
	$("#Denomc").val("");
	$("#txtAumento").val("0");
	$("#txtDisminucion").val("0");
	console.log('OK');
}
//contador de registros
function contadorR(x) {

	var reg=$("#Registros").val();
	if(reg=="" || isNaN(reg)) reg=0;
	if (x==01){reg = parseInt(reg) + 1;$("#Registros").val(reg);}
	if (x==02){reg = parseInt(reg) - 1;$("#Registros").val(reg);}	
	
	
}
// acumula los totales del saldo debito y saldo credito
function Totales(aumento, dism,informe) {

    var tdebito = $('#Tdebito').val();
    var tcredito= $('#Tcredito').val();
    if (tdebito == ""  || isNaN(tdebito)) tdebito = 0;
    if (tcredito == "" || isNaN(tcredito)) tcredito = 0;
    
    tdebito = parseFloat(tdebito) + parseFloat(aumento);
    tcredito = parseFloat(tcredito) + parseFloat(dism);
        
    $('#Tdebito').val(tdebito);
    $('#Tcredito').val(tcredito);
    
}
// disminuye los totales de saldos debito y saldos creditos
function Disminucion(x, informe) {
	
    var debe = $("#laumento" + x).val();
    var haber = $("#ldisminucion" + x).val();
    var tdebito = $("#Tdebito").val();
    var tcredito = $("#Tcredito").val();
    
    if (debe == "" || isNaN(debe)) debe = 0;
    if (haber == "" || isNaN(haber)) haber = 0;
    if (tdebito == "" || isNaN(tdebito)) tdebito = 0;
    if (tcredito == "" || isNaN(tcredito)) tcredito = 0;
    
    var totald = 0;
    var totalc = 0;
 
    totald = parseFloat(tdebito) - parseFloat(debe);
    totalc = parseFloat(tcredito) - parseFloat(haber);
    $("#Tdebito").val(totald);
    $("#Tcredito").val(totalc);
}
//Muestra pop-up de plan de cuenta
function mostrar() {    $("#pop").fadeIn('slow');}
//Validacion campos numericos
function numerico(x, c) {
    if (!/^([0-9])*[,]?[0-9]*$/.test(x)) {
        alert("El valor " + x + " no es un número Valido, solo se aceptan numeros(0-9) y coma(,)");
        document.getElementById(c).value = "";
        return false;
    }
}
//funciones cargadas al inicio de la pagina, principalmente se encuentran funciones o los atributos del popup del plan de cuenta
$(document).ready(function () {
    var img_w = 300;
    var img_h = 300;
    //Darle el alto y ancho
    $("#pop").css('width', img_w + 'px');
    $("#pop").css('height', img_h + 'px');
    //Esconder el popup
    $("#pop").hide();
    var w = $(this).width();
    var h = $(this).height();
    //Centra el popup   
    w = (w / 2) - (img_w / 2);
    h = (h / 2) - (img_h / 2);
    $("#pop").css("left", w + "px");
    $("#pop").css("top", h + "px");
    // setTimeout("mostrar()",1500);
    $("#pop").click(function () {
        $(this).fadeOut('slow');
    });
});
/*script para digitacion de informe AN*/
$(document).ready(function () {
    var img_w = 300;
    var img_h = 300;
    //Darle el alto y ancho
    $("#pop2").css('width', img_w + 'px');
    $("#pop2").css('height', img_h + 'px');
    //Esconder el popup
    $("#pop2").hide();
    var w = $(this).width();
    var h = $(this).height();
    //Centra el popup   
    w = (w / 2) - (img_w / 2);
    h = (h / 2) - (img_h / 2);
    $("#pop2").css("left", w + "px");
    $("#pop2").css("top", h + "px");
    // setTimeout("mostrar()",1500);
    $("#pop2").click(function () {
        $(this).fadeOut('slow');
    });
});
//pop up analiticos
function mostrar2() {
    $("#pop2").fadeIn('slow');
}


function cambiaSubArea(area){
	
	$('#textoCargando').text('Cargando Item Sub Area');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountBySubArea?codigoArea=' +area;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbSubArea').empty();
	    	
	    	$.each(data.listSubAreas, function(i, itm) {
	    		$("#cbSubArea").get(0).options[$("#cbSubArea").get(0).options.length] = new Option(itm.subAreaNombre ,itm.subAreaCodigo);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	console.log("valores "+data);
	    	
	    	$('#cbSubArea').empty();
	    
	    	
	    	$.each(data.listSubAreas, function(i, itm) {	    		
	    		$("#cbSubArea").get(0).options[$("#cbSubArea").get(0).options.length] = new Option(itm.subAreaNombre ,itm.subAreaCodigo);                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}

function cambiaGrupo(titulo){
	
	$('#textoCargando').text('Cargando Grupo');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByGrupo?titulo=' +titulo;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbGrupo').empty();
	    	
	    	$.each(data.listGrupo, function(i, itm) {
	    		$("#cbGrupo").get(0).options[$("#cbGrupo").get(0).options.length] = new Option(itm.grupo ,itm.grupo);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	console.log("valores "+data);
	    	
	        $('#cbGrupo').empty();
	    	
	    	$.each(data.listGrupo, function(i, itm) {
	    		$("#cbGrupo").get(0).options[$("#cbGrupo").get(0).options.length] = new Option(itm.grupo ,itm.grupo);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}

function cambiaSubGrupo(grupo){
	
	var titulo = $("#cbTitulo option:selected").val();
	$('#textoCargando').text('Cargando Sub Grupo');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountBySubGrupo?titulo=' +titulo 
	+"&grupo=" + grupo;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbGrupo').empty();
	    	
	    	$.each(data.listSubGrupo, function(i, itm) {
	    		$("#cbSubGrupo").get(0).options[$("#cbSubGrupo").get(0).options.length] = new Option(itm.subGrupo ,itm.subGrupo);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	console.log("valores "+data);
	    	
	    	$('#cbSubGrupo').empty();
	    
	    	
	    	$.each(data.listSubGrupo, function(i, itm) {
	    		$("#cbSubGrupo").get(0).options[$("#cbSubGrupo").get(0).options.length] = new Option(itm.subGrupo ,itm.subGrupo);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}	

function cambiaCuentaNivel(subGrupo){
	
	var titulo = $("#cbTitulo option:selected").val();
	var grupo = $("#cbGrupo option:selected").val();
	$('#textoCargando').text('Cargando Cuenta Nivel');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByCuentaNivel?titulo=' +titulo 
	+"&grupo=" + grupo
	+"&subGrupo=" + subGrupo;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbCuentaNivel').empty();
	    	
	    	$.each(data.listCuentaNivel, function(i, itm) {
	    		$("#cbCuentaNivel").get(0).options[$("#cbCuentaNivel").get(0).options.length] = new Option(itm.cuenta ,itm.cuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	console.log("valores "+data);
	    	
	    	$('#cbCuentaNivel').empty();
	    	
	    	$.each(data.listCuentaNivel, function(i, itm) {
	    		$("#cbCuentaNivel").get(0).options[$("#cbCuentaNivel").get(0).options.length] = new Option(itm.cuenta ,itm.cuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}	


function cambiaCuenta(cuenta){
	
	var titulo = $("#cbTitulo option:selected").val();
	var grupo = $("#cbGrupo option:selected").val();
	var subGrupo = $("#cbSubGrupo option:selected").val();
	$('#textoCargando').text('Cargando Descripcion ');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByCuenta2?titulo=' +titulo 
	+"&grupo=" + grupo
	+"&subGrupo=" + subGrupo
	+"&cuenta=" + cuenta
	+"&subGrupo=" + subGrupo;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	
	    	$('#cbNivel2').empty();
	    	
	    	$("#cbNivel2").get(0).options[$("#cbNivel2").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listCuenta2, function(i, itm) {
	    		$("#cbNivel2").get(0).options[$("#cbNivel2").get(0).options.length] = new Option(itm.subCuenta ,itm.subCuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbNivel2').empty();
	    	$("#cbNivel2").get(0).options[$("#cbNivel2").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listCuenta2, function(i, itm) {
	    		$("#cbNivel2").get(0).options[$("#cbNivel2").get(0).options.length] = new Option(itm.subCuenta ,itm.subCuenta);                                
            });
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}	


function cambiaCuenta2(subCuenta){
	
	var titulo = $("#cbTitulo option:selected").val();
	var grupo = $("#cbGrupo option:selected").val();
	var subGrupo = $("#cbSubGrupo option:selected").val();
	var cuenta = $("#cbCuentaNivel option:selected").val();
	$('#textoCargando').text('Cargando Descripcion ');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByCuenta3?titulo=' +titulo 
	+"&grupo=" + grupo
	+"&subGrupo=" + subGrupo
	+"&cuenta=" + cuenta
	+"&subCuenta=" + subCuenta;
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbNivel3').empty();
	    	$("#cbNivel3").get(0).options[$("#cbNivel3").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listCuenta3, function(i, itm) {
	    		$("#cbNivel3").get(0).options[$("#cbNivel3").get(0).options.length] = new Option(itm.subCuenta ,itm.subCuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	console.log("valores "+data);
	    	
	    	$('#cbNivel3').empty();
	    	$("#cbNivel3").get(0).options[$("#cbNivel3").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listCuenta3, function(i, itm) {
	    		$("#cbNivel3").get(0).options[$("#cbNivel3").get(0).options.length] = new Option(itm.anaSubCuenta ,itm.anaSubCuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}	

function cambiaCuenta3(anaSubCuenta){
	
	var titulo = $("#cbTitulo option:selected").val();
	var grupo = $("#cbGrupo option:selected").val();
	var subGrupo = $("#cbSubGrupo option:selected").val();
	var cuenta = $("#cbCuentaNivel option:selected").val();
	var subCuenta = $("#cbNivel2 option:selected").val();
	$('#textoCargando').text('Cargando Descripcion ');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByCuenta4?titulo=' +titulo 
	+"&grupo=" + grupo
	+"&subGrupo=" + subGrupo
	+"&cuenta=" + cuenta
	+"&subCuenta=" + subCuenta
	+"&anaSubCuenta=" + anaSubCuenta;
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	
	    	$('#cbNivel4').empty();
	    	$("#cbNivel4").get(0).options[$("#cbNivel4").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listCuenta4, function(i, itm) {
	    		$("#cbNivel4").get(0).options[$("#cbNivel4").get(0).options.length] = new Option(itm.subAnaSubCuenta ,itm.subAnaSubCuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	$('#cbNivel4').empty();
	    	$("#cbNivel4").get(0).options[$("#cbNivel4").get(0).options.length] = new Option( '--',-1);
	    	$.each(data.listCuenta4, function(i, itm) {
	    		$("#cbNivel4").get(0).options[$("#cbNivel4").get(0).options.length] = new Option(itm.subAnaSubCuenta ,itm.subAnaSubCuenta);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}	

function cambiaCuenta4(subAnaSubCuenta){
	
	var titulo = $("#cbTitulo option:selected").val();
	var grupo = $("#cbGrupo option:selected").val();
	var subGrupo = $("#cbSubGrupo option:selected").val();
	var cuenta = $("#cbCuentaNivel option:selected").val();
	var subCuenta = $("#cbNivel2 option:selected").val();
	var anaSubCuenta = $("#cbNivel3 option:selected").val();
	$('#textoCargando').text('Cargando Descripcion ');
	document.getElementById('fade').style.display='block';
	document.getElementById('formEnvio').style.display='block';
	
	var action='loadPresupAccountByCuenta5?titulo=' +titulo 
	+"&grupo=" + grupo
	+"&subGrupo=" + subGrupo
	+"&cuenta=" + cuenta
	+"&subCuenta=" + subCuenta
	+"&anaSubCuenta=" + anaSubCuenta
	+"&subAnaSubCuenta=" + subAnaSubCuenta;
	
	$.ajax({url: action,
	    type: "POST",
	    dataType: "json",	    
	    error: function(data){
	    	$('#cbNivel5').empty();
	    	
	    	$.each(data.listCuenta5, function(i, itm) {
	    		$("#cbNivel5").get(0).options[$("#cbNivel5").get(0).options.length] = new Option(itm.descripcion ,itm.descripcion);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    },
	    success: function(data){
	    	console.log("valores "+data);
	    	
	    	$('#cbNivel5').empty();
	    	
	    	$.each(data.listCuenta5, function(i, itm) {
	    		$("#cbNivel5").get(0).options[$("#cbNivel5").get(0).options.length] = new Option(itm.descripcion ,itm.descripcion);                                
            });
	    	
			document.getElementById('fade').style.display='none';
			document.getElementById('formEnvio').style.display='none';
	    }
	});
}	

function revisarDigito( dvr )
{	
	dv = dvr + "";	
	if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K')	
	{		
		alert("Debe ingresar un digito verificador valido");		
		//window.document.form1.rut.focus();		
		//window.document.form1.rut.select();		
		return false;	
	}	
	return true;
}

function revisarDigito2( crut )
{	
	largo = crut.length;	
	if ( largo < 2 )	
	{		
		alert("Debe ingresar el rut completo");		
		//window.document.form1.rut.focus();		
		//window.document.form1.rut.select();		
		return false;	
	}	
	if ( largo > 2 )		
		rut = crut.substring(0, largo - 1);	
	else		
		rut = crut.charAt(0);	
	dv = crut.charAt(largo-1);	
	revisarDigito( dv );	

	if ( rut == null || dv == null )
		return 0;	

	var dvr = '0'	;
	suma = 0	;
	mul  = 2	;

	for (i= rut.length -1 ; i >= 0; i--)	
	{	
		suma = suma + rut.charAt(i) * mul;		
		if (mul == 7)			
			mul = 2		;
		else    			
			mul++	;
	}	
	res = suma % 11	;
	if (res==1)		
		dvr = 'k'	;
	else if (res==0)		
		dvr = '0'	;
	else	
	{		
		dvi = 11-res	;	
		dvr = dvi + ""	;
	}
	if ( dvr != dv.toLowerCase() )	
	{		
		alert("EL rut es incorrecto")	;	
		//window.document.form1.rut.focus();		
		//window.document.form1.rut.select();		
		return false	;
	}

	return true;
}

function Rut(texto)
{	
	var tmpstr = "";	
	for ( i=0; i < texto.length ; i++ )		
		if ( texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-' )
			tmpstr = tmpstr + texto.charAt(i);	
	texto = tmpstr;	
	largo = texto.length;	

	if ( largo < 2 )	
	{		
		alert("Debe ingresar el rut completo");		
		//window.document.form1.rut.focus();		
		//window.document.form1.rut.select();		
		return false;	
	}	

	for (i=0; i < largo ; i++ )	
	{			
		if ( texto.charAt(i) !="0" && texto.charAt(i) != "1" && texto.charAt(i) !="2" && texto.charAt(i) != "3" && texto.charAt(i) != "4" && texto.charAt(i) !="5" && texto.charAt(i) != "6" && texto.charAt(i) != "7" && texto.charAt(i) !="8" && texto.charAt(i) != "9" && texto.charAt(i) !="k" && texto.charAt(i) != "K" )
 		{			
			alert("El valor ingresado no corresponde a un R.U.T valido");			
			//window.document.form1.rut.focus();			
			//window.document.form1.rut.select();			
			return false;		
		}	
	}	

	var invertido = "";	
	for ( i=(largo-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + texto.charAt(i);	
	var dtexto = "";	
	dtexto = dtexto + invertido.charAt(0);	
	dtexto = dtexto + '-';	
	cnt = 0;	

	for ( i=1,j=2; i<largo; i++,j++ )	
	{		
		//alert("i=[" + i + "] j=[" + j +"]" );		
		if ( cnt == 3 )		
		{			
			dtexto = dtexto + '.';			
			j++;			
			dtexto = dtexto + invertido.charAt(i);			
			cnt = 1;		
		}		
		else		
		{				
			dtexto = dtexto + invertido.charAt(i);			
			cnt++;		
		}	
	}	

	invertido = "";	
	for ( i=(dtexto.length-1),j=0; i>=0; i--,j++ )		
		invertido = invertido + dtexto.charAt(i);	

	//window.document.form1.rut.value = invertido.toUpperCase()		

	if ( revisarDigito2(texto) )		
		return true;	

	return false;
}

function Solo_Numerico(variable){
    Numer=parseInt(variable);
    if (isNaN(Numer)){
        return "";
    }
    return Numer;
}
function ValNumero(Control){
    Control.value=Solo_Numerico(Control.value);
}
