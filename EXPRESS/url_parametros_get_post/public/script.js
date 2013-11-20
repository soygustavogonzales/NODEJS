!function($,window,undefined){
	var form = $('#form');
	$('#form>input[type="submit"]').on('click',function(e){
		e.preventDefault();//prevengo al metodo por default que se ejecutaria al continuar el submit
		console.log(this);//arroja al input[type="submit"]
		var req = form.serialize();//codifica la consulta para enviarla por una URL
		//console.log(form[0].action);
		//console.log(location.host);
		/*
			var cad = "as asas %% && = ))(($$ /+*%";//una cadena de ejemplo
			console.log(encodeURI(cad));//codifica solo caracteres alfanumericos, no los especiales
			codificado = encodeURIComponent(cad);//se codifica todos los caraacteres, es mas potente que encodeURI
			console.log(codificado);
			var decodificado = decodeURIComponent(codificado);//decodifica la cadena codificada
			console.log(decodificado);
		*/
		console.log(form[0].action+"?"+req);
		location.assign(form[0].action+"?"+req);//redireccono a esta pagina y le envio el query por en la misma URL
	});
}(jQuery,window,undefined)