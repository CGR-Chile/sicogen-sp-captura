var xmlHttp;
function nuevoAjax()
{ 
    var xmlhttp=false; 
    try 
    { 
        xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); 
    }
    catch(e)
    { 
        try
        { 
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
        } 
        catch(E) { xmlhttp=false; }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') { xmlhttp=new XMLHttpRequest(); } 

    return xmlhttp; 
}

function pos(){
	var windowWidth = 0, windowHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	} 
	else if(document.documentElement && (document.documentElement.clientWidth ||document.documentElement.clientHeight ) ) {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	}
	else if(document.body && ( document.body.clientWidth ||	document.body.clientHeight ) ) {
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	
	//Variable para saber si se usa explorer o mozilla
	var gko = navigator.userAgent.toLowerCase();
	
	if(gko.indexOf('gecko')!=-1){ //si soporta gecko, es Mozilla, Netscape, Safari, etc
		document.getElementById("Login1").style.left = ((windowWidth/2)-200) +" px";
		document.getElementById("Login1").style.top  = (windowHeight/4) +" px";
	}
	else{
		document.getElementById("Login1").style.left = ((windowWidth/2)-200);
		document.getElementById("Login1").style.top  = (windowHeight/4);		
	}
}

function setFocus() {
	document.getElementById("user.nombreU").select();
	document.getElementById("user.nombreU").focus();
}


function loguea(){
    document.getElementById("formLogin").action = "includes/validate.aspx?username=" + document.getElementById("formLogin").username.value + "&passwd=" + document.getElementById("formLogin").passwd.value;
	document.getElementById("formLogin").submit();
}

function changeDisplayImage() {
	if (document.adminForm.imageurl.value !='') {
		document.adminForm.imagelib.src='../images/banners/' + document.adminForm.imageurl.value;
	} else {
		document.adminForm.imagelib.src='images/blank.png';
	}
}

function submitbutton(pressbutton) {
	var form = document.adminForm;
	if (pressbutton == 'cancel') {
		submitform( pressbutton );
		return;
	}
	// do field validation
	if (form.name.value == "") {
		alert( "Debes facilitar un nombre de anuncio." );
	} else if (getSelectedValue('adminForm','cid') < 1) {
		alert( "Por favor, selecciona un cliente." );
	/*} else if (!getSelectedValue('adminForm','imageurl')) {
		alert( "Por favor, selecciona una imagen." );*/
	/*} else if (form.clickurl.value == "") {
		alert( "Por favor, rellena la URL para el anuncio." );*/
	} else if ( getSelectedValue('adminForm','catid') == 0 ) {
		alert( "Por favor, selecciona la categoría." );
	} else {
		submitform( pressbutton );
	}
}

function muestra(objDiv){
    if(objDiv == "inicio"){
        document.getElementById("divSave").style.display = "none"; 
        document.getElementById("divSave").style.visibility = "hidden";
        
        document.getElementById("divAdd").style.display = "block"; 
        document.getElementById("divAdd").style.visibility = "visible";
        
        document.getElementById("divCancel").style.display = "none"; 
        document.getElementById("divCancel").style.visibility = "hidden";
        
        document.getElementById("tblListado").style.display = "block"; 
        document.getElementById("tblListado").style.visibility = "visible";
        
        document.getElementById("tblRegiones").style.display = "none"; 
        document.getElementById("tblRegiones").style.visibility = "hidden";
    }
    else{
        document.getElementById("divSave").style.display = "block"; 
        document.getElementById("divSave").style.visibility = "visible";
        
        document.getElementById("divAdd").style.display = "none"; 
        document.getElementById("divAdd").style.visibility = "hidden";
        
        document.getElementById("divCancel").style.display = "block"; 
        document.getElementById("divCancel").style.visibility = "visible";
        
        document.getElementById("tblListado").style.display = "none"; 
        document.getElementById("tblListado").style.visibility = "hidden";
        
        document.getElementById("tblRegiones").style.display = "block"; 
        document.getElementById("tblRegiones").style.visibility = "visible";
    }
}

function muestraP(objDiv){
    if(objDiv == "inicio"){
        document.getElementById("divSave").style.display = "none"; 
        document.getElementById("divSave").style.visibility = "hidden";
        
        document.getElementById("divAdd").style.display = "block"; 
        document.getElementById("divAdd").style.visibility = "visible";
        
        document.getElementById("divCancel").style.display = "none"; 
        document.getElementById("divCancel").style.visibility = "hidden";
        
        document.getElementById("ListadoPaises").style.display = "block"; 
        document.getElementById("ListadoPaises").style.visibility = "visible";
        
        document.getElementById("tablaPais").style.display = "none"; 
        document.getElementById("tablaPais").style.visibility = "hidden";
    }
    else{
        document.getElementById("divSave").style.display = "block"; 
        document.getElementById("divSave").style.visibility = "visible";
        
        document.getElementById("divAdd").style.display = "none"; 
        document.getElementById("divAdd").style.visibility = "hidden";
        
        document.getElementById("divCancel").style.display = "block"; 
        document.getElementById("divCancel").style.visibility = "visible";
        
        document.getElementById("ListadoPaises").style.display = "none"; 
        document.getElementById("ListadoPaises").style.visibility = "hidden";
        
        document.getElementById("tablaPais").style.display = "block"; 
        document.getElementById("tablaPais").style.visibility = "visible";
    }
}

function cargaMenu(){
	document.getElementById("strMenu").innerHTML = "";
	var xmlHttp = nuevoAjax();
	var url = "../servlet/menuSIC.ser";
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState == 4) { 
			if (xmlHttp.status == 200) { 
			prompt(1,xmlHttp.responseText);
				document.getElementById("strMenu").innerHTML = xmlHttp.responseText;
		   	}
		}
	}
	xmlHttp.send(null);
}
