;!function(window,$,undefined){
  var l = console;
	 var anchoVen = window.outerWidth; //el ancho(en pixeles) de la ventana del navegador(todos los navegadores), ultimas versiones

  l.log(anchoVen)
  $(function(){
  	var lateral = $('.lateral');
  		lateral.status = false;//esta retraido(como oculto)
  	lateral.css({
  		"left":(anchoVen-50)+"px"
  	});
  	var trip = $('.trip');
  	l.log(trip);
  	trip.on("click",function(){
  		l.log("click");
  		var sentido = ((lateral.status==true)?"+":"-");
		 		lateral.animate({
		 			left:sentido+"=200px",
		 			opacity:"show"
		 		},800,function(){
		 			if(sentido=="-")
		 				lateral.status = true;//esta visible
		 			else
		 				lateral.status = false;//esta oculto

		 		});
  	});
  	trip.on("mouseenter",function(){
  		if(!lateral.status){

	  		l.log("mouseenter");
	  		lateral.animate({
	  			left:"-=10px"
	  		},205,function(){
	  			lateral.animate({left:"+=10px"},205)
	  			
	  		});
  		
  		}
  	});

  	$(window).on("resize",function(){
  		l.log("redimensionaste la ventana");
	 		var anchoVen = window.outerWidth; //el ancho(en pixeles) de la ventana del navegador(todos los navegadores), ultimas versiones
  		lateral.css({
  			"left":(anchoVen-50)+"px"
  		});
  		lateral.status = false;
  		l.log("lateral.status: "+lateral.status)
  	});


  })

  
}(window,jQuery,undefined);
