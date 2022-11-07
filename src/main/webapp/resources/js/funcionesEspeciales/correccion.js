/**  Carga tipos Informes en la grilla informes*/
function loadCheckPeriodo(){
	console.log('paso 1');
	var accion = 'estadoInformesAnualByEntity?tipoInfId=' + $("#cbtipoInformeCorrec option:selected").val() + 
		'&ejercicioId=' + $("#cbEjercicioAnoCorrec option:selected").val()+
		'&ejercicioName=' + $("#cbEjercicioAnoCorrec option:selected").text()+
	    '&ComunaEntidad=' + $("#cbComunaCorrec").val();
	
	$.ajax({
		url: accion,
		type: "POST",
		dataType:"json",
		error: function(XMLHttpRequest, textStatus, errorThrown){
		},
	    success: function(data){
	    	console.log('ok loadCheckPeriodo...');
			actualizarGrillaCorrecciones(data, $("#cbEjercicioAnoCorrec option:selected").val()  );
	    }
	});
 }
/**  Actualiza check en  grilla informes*/
function actualizarGrillaCorrecciones(xml, idEjercicio){
	//limpia titulo correcciones
	//console.log('complemento? '+xml.hayComplementos);
	if(xml.hayComplementos>0){
		$("#titCorr").text("COR"); $("#titCorr").css("width","37px");
		//$('.grillaInformes').css('width','925px');
	} else{ 
		$("#titCorr").text("");  $("#titCorr").css("width","0px");
		//$('.grillaInformes').css(;
	}
	console.log('ok loadCheckPeriodo...');
	//limpia contenedor
	$('#contEstInfAnual').text('');
	$.each(xml.listEstInfAnual, function(i, itm) {
		var row = 'rw_inf0' + (i+1);
		var clase = '';
		if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp";}
		jQuery('<div/>', {id:row,class:clase}).appendTo('.contEstInfAnual');
		
		//imprime contenedor con el nombre del informe
		var rowcol = 'inf0' + (i+1);
		clase = 'detalleInfCol01';
		jQuery('<div/>', { id: rowcol, class: clase, text: itm.informe, style: "width:315px"}).appendTo('#'+row);
		
		clase = 'detalleInfColPer';
		var periodos = [ 'Ape','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Cie' ];
		var estados=[itm.iEstApe, itm.iEstEne, itm.iEstFeb, itm.iEstMar, itm.iEstAbr, itm.iEstMay, itm.iEstJun,
		             itm.iEstJul, itm.iEstAgo, itm.iEstSep, itm.iEstOct, itm.iEstNov, itm.iEstDic, itm.iEstCie];
		var ident=	[itm.idApe, itm.idEne, itm.idFeb, itm.idMar, itm.idAbr, itm.idMay, itm.idJun,
		             itm.idJul, itm.idAgo, itm.idSep, itm.idOct, itm.idNov, itm.idDic, itm.idCie];
		
		for(var a=0;a<estados.length;a++){
			var rowcol='inf0'+(i+1)+'_'+periodos[a];
			jQuery('<div/>', { id: rowcol, class: clase,style:'width:37px;'}).appendTo('#' + row);
			
			if(estados[a]=="6" || estados[a]=="7" || estados[a]=="10"){
				$('#' + rowcol).append("<input type='checkbox' id='inf0"+i+'_'+periodos[a]+'_p'+ident[a]+"' name="+periodos[a]+" />");
				//jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
			}else{
				var objeto=	"<img id='inf0"+i+'_p'+ident[a]+periodos[a]+"' src='images/blanco.png' class='img18 popUpInf' aria-describedby='ui-tooltip-8' />";
				$('#' + rowcol).append(objeto);
			}
		}
	});
}
/** Nueva Correccion */
function saveNuevaCorreccion(){
	var flag = true;
	var isAlmostOneChekCount = 0;
	// Confirmar Correccion
	var titulo = 'Correcci&oacute;n';
	var eEjer='Debe seleccionar Ejercicio';
	var eReg='Debe seleccionar Regi&oacute;n';
	var eCom='Debe seleccionar Comuna';
	var eCmn='Debe agregar comentario';
	var eFeI='Debe agregar fecha inicio';
	var eFeF='Debe agregar fecha fin';
	var vFeI='Debe Ingresar una fecha inicio valida';
	var vFeF='Debe Ingresar una fecha fin valida';
	var eSel='No existen per&iacute;odos e informes marcados.';
	var conf='&iquest;Est&aacute; seguro que desea habilitar la correcci&oacute;n?';
	
	if(formatoFecha($("#dateDesde").val(),'-','ddmmyyyy')==false ){	jAlert(vFeI,titulo);	return;}
	if(formatoFecha($("#dateHasta").val(),'-','ddmmyyyy')==false){	jAlert(vFeF,titulo);	return;}
	if($("#cbEjercicioAnoCorrec option:selected").val()=="-1"){		jAlert(eEjer,titulo);	return;}
	else if($("#cbRegionCorrec option:selected").val()=="-1"){		jAlert(eReg,titulo);	return;}
	if($("#cbComunaCorrec option:selected").val()=="-1"){			jAlert(eCom,titulo);	return;}
	if($("#txtAreaComentarios").val()==""){							jAlert(eCmn,titulo);	return;}
	if($("#dateDesde").val()==""||$("#dateDesde").val()== "Desde"){	jAlert(eFeI,titulo);	return;}
	if($("#dateHasta").val()==""||$("#dateHasta").val() =="Hasta"){	jAlert(eFeF,titulo);	return;}
	
	var tipoInforme = $("#cbtipoInformeCorrec option:selected").val();
	var ejercicio = $("#cbEjercicioAnoCorrec option:selected").val();
	var region = $("#cbRegionCorrec option:selected").val();
	var comuna = $("#cbComunaCorrec option:selected").val();	
	var mensaje = $("#txtAreaComentarios").val();
	var fileName = $("#fileUploadHidden").val();
	var dateDesde=$("#dateDesde").val();	
	var dateHasta=$("#dateHasta").val();
	var action= "correcionInformes.action";
	
	var countCheckbox = $('input[type=checkbox]').length;
	
	if(countCheckbox == 0){jAlert(eSel,titulo);return false;}
	
	if(flag){
		console.log('entra en marcador');
		
		var checkPeriodos1 = [false, false, false, false, false, false, false, false];
		var checkPeriodos2 = [false, false, false, false, false, false, false, false];
		var checkPeriodos3 = [false, false, false, false, false, false, false, false];
		var checkPeriodos4 = [false, false, false, false, false, false, false, false];
		var checkPeriodos5 = [false, false, false, false, false, false, false, false];
		var checkPeriodos6 = [false, false, false, false, false, false, false, false];
		var checkPeriodos7 = [false, false, false, false, false, false, false, false];
		var checkPeriodos8 = [false, false, false, false, false, false, false, false];
		var checkPeriodos9 = [false, false, false, false, false, false, false, false];
		var checkPeriodos10 =[false, false, false, false, false, false, false, false];
		var checkPeriodos11= [false, false, false, false, false, false, false, false];
		var checkPeriodos12 =[false, false, false, false, false, false, false, false];
		var checkPeriodos13 =[false, false, false, false, false, false, false, false];
		var checkPeriodos14 =[false, false, false, false, false, false, false, false];
		
		for(var i=1 ; i<15; i++){
			$('input[name='+getPeriodoByNumber(i)+']').each( function (e) {
				if($(this).is(':checked')){
					isAlmostOneChekCount++;
						switch (i) {
						case 1: checkPeriodos1[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 2: checkPeriodos2[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 3: checkPeriodos3[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 4: checkPeriodos4[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 5: checkPeriodos5[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 6: checkPeriodos6[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 7: checkPeriodos7[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 8: checkPeriodos8[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 9: checkPeriodos9[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 10: checkPeriodos10[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 11: checkPeriodos11[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 12: checkPeriodos12[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 13: checkPeriodos13[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						case 14: checkPeriodos14[Number($(this).attr("id").substring(3,5))]= $(this).is(':checked'); break;
						default: break;
					}
				}
			});	
		}
			
		if(isAlmostOneChekCount > 0){
			var informesByCheck = "";
			if( checkPeriodos1.indexOf(true) >=0){informesByCheck += "&checkPeriodos1="+checkPeriodos1;}
			if( checkPeriodos2.indexOf(true) >=0){informesByCheck += "&checkPeriodos2="+checkPeriodos2;}
			if( checkPeriodos3.indexOf(true) >=0){informesByCheck += "&checkPeriodos3="+checkPeriodos3;}
			if( checkPeriodos4.indexOf(true) >=0){informesByCheck += "&checkPeriodos4="+checkPeriodos4;}
			if( checkPeriodos5.indexOf(true) >=0){informesByCheck += "&checkPeriodos5="+checkPeriodos5;}
			if( checkPeriodos6.indexOf(true) >=0){informesByCheck += "&checkPeriodos6="+checkPeriodos6;}
			if( checkPeriodos7.indexOf(true) >=0){informesByCheck += "&checkPeriodos7="+checkPeriodos7;}
			if( checkPeriodos8.indexOf(true) >=0){informesByCheck += "&checkPeriodos8="+checkPeriodos8;}
			if( checkPeriodos9.indexOf(true) >=0){informesByCheck += "&checkPeriodos9="+checkPeriodos9;}
			if( checkPeriodos10.indexOf(true)>=0){informesByCheck += "&checkPeriodos10="+checkPeriodos10;}
			if( checkPeriodos11.indexOf(true)>=0){informesByCheck += "&checkPeriodos11="+checkPeriodos11;}
			if( checkPeriodos12.indexOf(true)>=0){informesByCheck += "&checkPeriodos12="+checkPeriodos12;}
			if( checkPeriodos13.indexOf(true)>=0){informesByCheck += "&checkPeriodos13="+checkPeriodos13;}
			if( checkPeriodos14.indexOf(true)>=0){informesByCheck += "&checkPeriodos14="+checkPeriodos14;}
			
			action= action+"?region=" + region + "&comuna=" + comuna + "&tipoInforme=" + tipoInforme 
			+ "&ejercicio="+ejercicio + "&mensaje="+mensaje + "&fileName="+fileName
			+ "&dateDesde="+dateDesde + "&dateHasta="+dateHasta+informesByCheck;
					
			jConfirm(conf, titulo, function(r) {
				if(r){
					if($('#fileUpload').val() == '') {
						console.log('sin archivo');
						$.ajax({
							url: action,
							type: "POST",
							dataType: "json",
							error: function(XMLHttpRequest, textStatus, errorThrown){
								jAlert('Error ' + textStatus);
								/*alert('Error ' + textStatus);alert(errorThrown);alert(XMLHttpRequest.responseText)|;*/
							},
							success: function(data){
								console.log(data);
								if(data.estado==-1){
									jAlert(data.mensaje, "Complemento", function(r){if(r){$(location).attr('href',url='login');return false;}} );
								}else{
									console.log('Estado: '+data.estado);
									if(data.estado<-1){
										jAlert(data.mensaje, titulo, function(r){ 
											if(r){ 
												//selCorreccion('correcciones');
											} 
										});
									}else{
										jAlert(data.mensaje, titulo, function(r){ 
											if(r){ 
												selCorreccion('correcciones');
											} 
										});
									}
								}
								//jAlert(data.mensaje, titulo);
								//console.log("OK."+data.respuestaPl);
								//selCorreccion('correcciones');
							}
						});
					}else{
						console.log('con archivo');
						$.ajaxSetup({ scriptCharset: "windows-1252",contentType:"application/json;charset=windows-1252"});
						$("#formID").ajaxSubmit({
							cache : false,
							type: "POST",
							url: action,
							scriptCharset: 'windows-1252',
							contentType: "application/x-www-form-urlencoded;charset=windows-1252",
							jsonpCallback: 'jsonpCallback',
							data: $(this).serialize(),
							dataType:'json',
							complete:function( XMLHttpRequest ) {
								$("body").css("cursor", "default");
							},
							error: function(XMLHttpRequest, textStatus, errorThrown){
								jAlert('Error ' + textStatus);
							},
							success: function(data){
								if(data.estado==-1){
									jAlert(data.mensaje, "Complemento", function(r){if(r){$(location).attr('href',url='login');return false;}} );
								}else{
									console.log('Estado: '+data.estado);
									if(data.estado<-1){
										jAlert(data.mensaje, titulo, function(r){ 
											if(r){ 
												selCorreccion('correcciones');
											} 
										});
									}else{
										jAlert(data.mensaje, titulo, function(r){ 
											if(r){ 
												selCorreccion('correcciones');
											} 
										});
									}
								}
							}
						});
					}
				};
			});
		}else{
			jAlert("Debe seleccionar al menos un informe.", titulo);
		}
	}
	else{
		  consola.log("Se requieren acciones por ejecutar..",titulo);
	}

}

function verCorrecciones(){
	$("#Iframe").attr('src',"correcciones");
}

function validate(){
//	alert("Validate()");
	$('#formID').validate({ // initialize the plugin
        rules: {
        	
		    StartDate:
		    {
		    date: true
		    },
		    EndDate:
		    {
		    date: true
		    }
        },
  	  messages: {
		
		  StartDate:  "*",
		  EndDate:  "*"
			  
         }
    });	
}

function getPeriodoByString(cadena)
{
	switch (cadena) {
	case "Ape":
		return 0;
		break;
	case "Ene":
		return 1;
		break;
	case "Feb":
		return 2;
		break;
	case "Mar":
		return 3;
		break;
	case "Abr":
		return 4;
		break;
	case "May":
		return 5;
		break;
	case "Jun":
		return 6;
		break;
	case "Jul":
		return 7;
		break;
	case "Ago":
		return 8;
		break;
	case "Sep":
		return 9;
		break;
	case "Oct":
		return 10;
		break;
	case "Nov":
		return 11;
		break;
	case "Dic":
		return 12;
		break;
	case "Cie":
		return 13;
		break;
	default:
		break;
	}
}

function getPeriodoByNumber(numero)
{
	switch (numero) {
	case 1:
		return "Ape";
		break;
	case 2:
		return "Ene";
		break;
	case 3:
		return "Feb";
		break;
	case 4:
		return "Mar";
		break;
	case 5:
		return "Abr";
		break;
	case 6:
		return "May";
		break;
	case 7:
		return "Jun";
		break;
	case 8:
		return "Jul";
		break;
	case 9:
		return "Ago";
		break;
	case 10:
		return "Sep";
		break;
	case 11:
		return "Oct";
		break;
	case 12:
		return "Nov";
		break;
	case 13:
		return "Dic";
		break;
	case 14:
		return "Cie";
		break;
	default:
		break;
	}
}

function enableRegion()
{
	console.log("enableRegion");
	$("#cbRegionCorrec").val(-1);
	$("#cbComunaCorrec").val(-1);
	$('#cbRegionCorrec').removeAttr('disabled');
}

$( document ).ready(function() {
    console.log( "document loaded" );
});