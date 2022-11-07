function validaFecha(fecha){
	var re = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
	if( re.test(fecha)){
        var adata = fecha.split('/');
        var dd = parseInt(adata[0],10);
        var mm = parseInt(adata[1],10);
        var yyyy = parseInt(adata[2],10);
        var xdata = new Date(yyyy,mm-1,dd);
        if ( (xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
            check = true;
        else
            check = false;
    } else
        check = false;
	return check;
}
function fechaMayor(desde,hasta){
	var spfec1=desde.split('/');
	ifecha1=parseInt(spfec1[2]+spfec1[1]+spfec1[0] ,10);
	var spfec2=hasta.split('/');
	ifecha2=parseInt(spfec2[2]+spfec2[1]+spfec2[0] ,10);
	if(ifecha1>ifecha2){
		return false;
	}else{
		return true;
	}
}