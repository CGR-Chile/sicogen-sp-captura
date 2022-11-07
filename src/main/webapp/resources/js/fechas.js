function formatoFecha(fecha,sep,formato){
	var fec=fecha.split(sep);
	if(fec.length!=3){
		return false;
	}
	
	switch (formato){
		case 'ddmmyyyy':	dia=fec[0];mes=fec[1];anio=fec[2]; break;
		case 'yyyymmdd':	dia=fec[2];mes=fec[1];anio=fec[0]; break;
		case 'mmddyyyy':	dia=fec[1];mes=fec[0];anio=fec[2]; break;
	}
	
	if (dia < 1 || dia > 31){
		return false;
	}
	if (mes < 1 || mes > 12){ 
		return false;
	}
	if ((mes==4 || mes==6 || mes==9 || mes==11) && dia==31){
		return false;
	}
	if (mes == 2) { // bisiesto
		var bisiesto = (anio % 4 == 0 && (anio % 100 != 0 || anio % 400 == 0));
		if (dia > 29 || (dia==29 && !bisiesto)) {
			return false;
		}
	}
	return true;
}