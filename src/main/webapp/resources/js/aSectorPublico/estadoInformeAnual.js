
function actualizarGrillaInformesJSON(data, idEjercicio){

	$("#titCorr").text("COR");
	//$("#titCorr").css("width","37px");

	//limpia contenedor
	$('#contEstInfAnual').text('');

	var periodosNom = [ 'Ape','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic','Cor','Cie' ];
	var periodosCod = [ '00','01','02','03','04','05','06','07','08','09','10','11','12','Cor','13' ];

	$.each(data.infomes, function(i, itm) {


		//crea contenedor de informe  informeNombre
		var row='rw_inf0'+(itm.informeId);
		var clase='';
		if ((i+1) %2 == 0){ clase= "rwdetInfPar"; }else{ clase= "rwdetInfImp";}
		jQuery('<div/>', {id:row,class:clase}).appendTo('.contEstInfAnual');

		//imprime contenedor con el nombre del informe
		var rowcol = 'inf' + (itm.informeId);
		clase = 'detalleInfCol01';
		jQuery('<div/>', {
			id: rowcol,
			class: clase,
			html:  "<div style='display:none;width:2%;vertical-align:top;'>"+itm.informeCodigo+"</div>"+"<div style='display:inline-block;width:2%;vertical-align:top;'>"+" </div>"+"<div id='envio_"+itm.informeId+"' style='display:inline-block;width:92%;'> "+itm.informeNombre+"</div> "
		}).appendTo('#'+row);

		clase = 'detalleInfColPer';
		$.each(periodosCod, function(p, pitm){
			var rowcol='inf'+(itm.informeId)+'_'+pitm;
			jQuery('<div/>', { id: rowcol, class: clase}).appendTo('#' + row);
			var objeto=	"<img id='inf0"+(itm.informeId)+'_'+pitm+"' src='/SICOGEN2_PUB/resources/img/blanco.png' class='img18 popUpInf pi"+itm.informeId+" cod"+pitm+"' aria-describedby='ui-tooltip-8' />";
			//var objeto=	"<img id='inf0"+(itm.informeId)+'_'+pitm+"'  class='img18 popUpInf pi"+itm.informeId+" cod"+pitm+"' aria-describedby='ui-tooltip-8' />";
			$('#' + rowcol).append(objeto);

			if(pitm=='Cor'){
				//$('#inf'+(itm.informeId)+'_'+pitm).hide();
			}
		});

		$.each(data.estados, function(p, pitm){
			switch(pitm.archivoEstadoId){
				case  3:	imagen='/SICOGEN2_PUB/resources/img/error.png';break;
				case  4:	imagen='/SICOGEN2_PUB/resources/img/Validado.png';break;
				case  5:	imagen='/SICOGEN2_PUB/resources/img/ValidadoOBS.png';break;
				case  6:	imagen='/SICOGEN2_PUB/resources/img/Procesado.png';break;
				case  7:	imagen='/SICOGEN2_PUB/resources/img/ProcesadoOBS.png';break;
				case  8:	imagen='/SICOGEN2_PUB/resources/img/NotMov.png';break;
				case 10:	imagen='/SICOGEN2_PUB/resources/img/NotMovProc.png';break;
				default:	imagen='/SICOGEN2_PUB/resources/img/blanco.png';break;
			}
			//$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').attr('src',imagen);
			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').attr('src',imagen);
			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').attr('idFileUpload',pitm.archivoId);


			var fechasArr;
			var dia = "", hora = "";
			if(pitm.archivoFecha != null){
				fechasArr = pitm.archivoFecha.split(' ');
				dia = fechasArr[0];
				hora = fechasArr[1];
			}
			var menEstado="";
			switch(pitm.archivoEstadoId){
				case  3:	menEstado="Informe con error bloqueante cargado ";break;
				case  4:	menEstado="Validado en CGR ";break;
				case  5:	menEstado="Validado con observaciones en CGR ";break;
				case  6:	menEstado="Enviado a CGR ";break;
				case  7:	menEstado="Enviado con observaciones a CGR ";break;
				case  8:	menEstado="Validado sin movimiento en CGR ";break;
				case 10:	menEstado="Enviado sin movimiento a CGR ";break;
			}

			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').live({
				mouseenter: function(){
					$(this).css({'cursor':'pointer'});

					tooltip="<div class='ui-tooltip-content' style='width:450px;position:absolute; '>"+
						"<div class='tooltip-title'>"+ $('#inf'+pitm.informeId).text() +"</div>"+
						"<div class='tooltip-content'>"+
						"<p style='margin:0;padding:0;'>"+menEstado+" por "+pitm.archivoUsuario+" el "+dia+" a las "+hora+
						"</p>";

					if((pitm.archivoEstadoId=="6")||(pitm.archivoEstadoId=="7")||(pitm.archivoEstadoId=="10")){
						tooltip=tooltip+"<br><p style='margin:0;padding:0;'>N&deg; de Env&iacuteo: "+pitm.certificadoId+"</p>";
					}
					tooltip=tooltip+"<br><p style='margin:0;padding:0;' class='tooltip-message'>Para Acceder a m&aacutes Informacion Haga Click sobre el Icono del Estado del Informe</p></div></div>";

					$('body').append(tooltip);

					izq=0;
					if ($(this).offset().left<820){ izq=$(this).offset().left+20;}
					else{							izq=$(this).offset().left-450;}
					$('.ui-tooltip-content').css({left:izq,top: $(this).offset().top});
					//}
				},
				mouseleave: function(){
					//if ($(this).attr('onclick')){
					$('div').remove('.ui-tooltip-content');}
				//}
			});
			$('img[class="img18 popUpInf pi'+pitm.informeId+' cod'+pitm.periodoCodigo+'"]').click({
				informe: 	pitm.informeId, 			//3
				periodo: 	pitm.periodoInformeId,		//90
				ejercicio:	pitm.ejercicioId,			//2
				usuario:	pitm.archivoUsuario,		//smoke
				fecha:		pitm.archivoFecha,			//'01/10/2015 16:57:20'			
				periodo2:	pitm.periodoEjercicioId,	//
				certificado:pitm.certificadoId,			//certificadoId
				estado:		pitm.archivoEstadoId,		//archivoEstadoId
				idFileUpload: pitm.archivoId//variable titan
			}, abrePopUpEvent);
		});
	});

	//ESTO TAMBIEN ESTABA COMENTADO

	$.each(data.correcciones, function(i, itm) {
		var param=$("#cbEjercicio option:selected").val()+','+
			itm.informeId+',"'+
			$('#inf0'+itm.informeId).text()+'","'+
			$("#cbEjercicio option:selected").text()+'"';


		var clasesCorr = 'img18 pi'+itm.informeId;
		var objeto = "<img onclick='verComplementosEnviados("+param+")' class='"+clasesCorr+"' style='cursor: pointer;' src='/SICOGEN2_PUB/resources/img/ver_correccion.png'/>";
		//alert("objeto");
		//alert(objeto);

		var append = '#inf0'+itm.informeId+'_Cor';

		//alert("append");
		//alert(append);
		$( append).replaceWith( objeto );
		//$(objeto).appendTo( append );
		$('#gbgs'+i).css({'cursor':'pointer'});
	});
}

function loadEstadosInformeAnual(ejercicio, tipoInforme){


	if ($.isNumeric(ejercicio)==false){
		ejercicio=0;
	}
	if($.isNumeric(tipoInforme)==false){
		tipoInforme=1;
	}

	var action = './listadogeneral/list?ejercicioId='+ejercicio+"&tipoInforme="+tipoInforme;
	var data = {}

	$.ajax({
		url: action,
		type: "GET",
		contentType  : "application/json",
		data : JSON.stringify(data),
		dataType: "json",
		beforeSend: function (xhr) {
			$('body').append('<div id="fadePeriodos" class="overlay" style="display:block"></div>'+
				'<div id="waitPeriodos" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005px;padding:15px !important;display:block">'+
				'	  <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando la información...</div>'+
				'    <img id="estado" src="/SICOGEN2_PUB/resources/img/loader.gif" style="margin:40px 0 0 130px;width:96px;height:96px;" />'+
				'</div>');
		},complete: function (data) {
			$('#fadePeriodos').remove();
			$('#waitPeriodos').remove();
		},error: function(XMLHttpRequest, textStatus, errorThrown){
			//Session ha caducado
			$(".cuerpo").html("<html><head><link href='/SICOGEN2_PUB/resources/css/error/errorPageStyles.css' rel='stylesheet' media='all'><link href='/SICOGEN2_PUB/resources/css/error/bootstrap.min.css' rel='stylesheet' type='text/css'><link href='/SICOGEN2_PUB/resources/css/error/brain-theme.css' rel='stylesheet' type='text/css'><link href='/SICOGEN2_PUB/resources/css/error/errorPageStyles.css' rel='stylesheet' type='text/css'><link href='/SICOGEN2_PUB/resources/css/error/cuprum.css' rel='stylesheet' type='text/css'><link href='/SICOGEN2_PUB/resources/css/mensaje/jquery.alerts.css' rel='stylesheet' type='text/css' ></link></head><body><div class='page-content'><div class='page-title'><h5><i class='fa fa-warning'></i>Información</h5><div class='btn-group'><a href='#' class='btn btn-link btn-lg btn-icon dropdown-toggle' data-toggle='dropdown'><i class='fa fa-cogs'></i><span class='caret'></span></a><ul class='dropdown-menu dropdown-menu-right'><li><a href='#'>Action</a></li></ul></div></div><div class='error-wrapper text-center'><h2>El tiempo de sesión ha caducado</h2></div></div></body></html>");
		},
		success: function(data){
			console.log("SUCCESS: ", data["informes"]);


			console.log("estados de informes anual : "+data);
			actualizarGrillaInformesJSON(data, $("#cbEjercicio option:selected").val() );
		}
	});

}

function submitForm(){

//CAMBIAR LLAMADA LUEGO 22/01/2020
	//var value_1 = $('#value_1').val();
	//var value_2 =  $('#value_2').val();
	$("#loading-spinner").addClass("is-active");
	window.location = './informes/formularioCarga?ejercicioId=' + document.getElementById('cbEjercicio').value;
	return false;

	//var url = './informes/formularioCarga?ejercicioId=' + document.getElementById('cbEjercicio').value;
	//var cf = new  net.ContentForm("listadoCorreccion",url, cargaMensajesLocal, "",null,null);




	/*document.getElementById('oculto').value = document.getElementById('cbEjercicio').value;

	var formData = new FormData(document.getElementById("listadoCorreccion"));
	formData.append("ejercicio", document.getElementById('cbEjercicio').value);
	formData.submit();



	/*var input = $("<input>")
		.attr("type", "hidden")
		.attr("id", "oculto")
		.attr("name", "oculto").val();
	$('#listadoCorreccion').append($(input));
	$('#listadoCorreccion').submit();




	//var data = $('#listadoCorreccion').serializeArray();
	//data.push({name: 'cbEjercicio', value: 'cbEjercicio'});
	/*var ejercicio = document.getElementById('cbEjercicio').value;
var url = './informes/formularioCarga?ejercicioId=' + ejercicio;
	var data = {}
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function(data){
			console.log("SUCCESS: ", data["informes"]);



		}
	});*/


	//$('#cbEjercicio').val();
	//$('#listadoCorreccion').submit();

}

function cargaMensajesLocal() {
	alert("golvy");
}

/*function bye(){
	//var ejercicio = document.getElementById('cbEjercicio').value;
	document.getElementById('listadoCorreccion').submit();
	//var elemento = document.getElementById("cbEjercicio").formAction = './listadogeneral/informesCorreccion?ejercicioId=' + ejercicio;
	//elemento.submit();

	//window.location = './listadogeneral/informesCorreccion?ejercicioId=' + ejercicio;
}*/


function showFormCarga() {

	var ejercicio = document.getElementById('cbEjercicio2').value;
	var action = './listadogeneral/listaPeriodos?ejercicioId=' + ejercicio
	var data = {}

	$.ajax({
		type: "POST",
		url: action,
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: "json",
		success: function (data) {
			$.each(data, function (key, registro) {
				$("#cbPeriodos").append('<option value=' + registro.periodoId + '>' + registro.periodoCodigo + '</option>');
				//$('#contEstInfAnual').remove();
			});

			mostrarDiv('cargaInformes');
			$('#contEstInfAnual').remove();
			ocultarDiv('cargaEntidad');

		},
		error: function (data) {
			alert('Error al cargar la información de Periodos');
		}
	});

}

