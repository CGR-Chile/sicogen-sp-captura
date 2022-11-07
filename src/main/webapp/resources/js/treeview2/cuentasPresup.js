$(document).ready(function () {
	
	var action='loadAccountPresup?ejercicio='+2;
	$('body').css('cursor', 'wait');
	$.ajax({url: action,type:'POST',dataType:'json',
		beforeSend: function (xhr){
			$('body').append('<div id="fadeCargaEntidad" class="overlay" style="display:block"></div>'+
			'<div id="waitCargaEntidad" class = "contEspera modalCarga" style="left:35%;position:absolute;width:350px;height:250px;z-index:2005;padding:15px !important;display:block;">'+
			' <div style="font:bold 14px arial,sans-serif;margin: 20px 0 0 40px;">Cargando las areas y sub areas</div>'+
			' <img id="estado" src="images/loader.gif" style="margin:40px 0 0 120px;width:96px;height:96px;" />'+
			'</div>');
		},complete: function (data) {
			$('#fadeCargaEntidad').remove();
			$('#waitCargaEntidad').remove();
		},success: function(data){
	    	console.log(data);
	    	var temp=data.listaCtas;
	    	$.each(data.listaCtas, function(i,rw){
	    		var tHtml='';
	    		var result=getObjects(temp, 'cuentaCodPadre', rw.cuentaCod);
	    		if(result){
	    			tHtml='<li class="collapsable '+rw.cuentaCod+'"><div class="hitarea collapsable-hitarea"></div><span class="folder seleccionable">'+rw.cuentaCod+' - '+rw.cuentaNombre+'</span><ul id="'+rw.cuentaCod+'"></ul></li>';
	    		}else{
	    			tHtml='<li><span class="file seleccionable">'+rw.cuentaCod+' - '+rw.cuentaNombre+'</span></li>';
	    		}
	    		if(parseInt(rw.cuentaCodPadre)==0){$('#browser').append(tHtml);}else{$('#'+rw.cuentaCodPadre).append(tHtml);}
	    	});
	    	$("#browser").treeview();
	    	
	    	$('.seleccionable').dblclick(function(){
	    		var cta=$(this).text().split(" - ");
  			  	//alert( cta[0]+'-'+cta[1] );
	    	});
	    	
	    	console.log('Treeview');
	    	$('body').css('cursor', 'default');

	    },error: function(XMLHttpRequest, textStatus, errorThrown){		    	
			
	    }
	});

});
function buscaHijos(lista, codigo){
	$.each(data.listaCtas, function(a,ln){
		
	});
	
}
function getObjects(obj, key, val) 
{
    var newObj = false; 
    $.each(obj, function()
    {
        var testObject = this; 
        $.each(testObject, function(k,v)
        {
            //alert(k);
            if(val == v && k == key)
            {
                newObj = testObject;
            }
        });
    });

    return newObj;
}