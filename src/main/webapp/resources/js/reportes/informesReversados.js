function verAchivo(correccion){
	var url='descargaCorreccion.action?corr='+correccion;
	var param = "scrollbars, top=80,left=100,height=600,width=800";
	window.open(url, "", param);
}
function verRespaldo(obj){
	console.log($(obj).attr('id'));
	var url='descargaReversa.action?rever='+$(obj).attr('id');
	var param = "scrollbars, top=80,left=100,height=600,width=800";
	window.open(url, "", param);
}