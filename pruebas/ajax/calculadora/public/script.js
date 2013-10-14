;!function($,window,undefined){
		var btn = $('.btn');
		var cant1 = $('#c1'),//input
		cant2 = $('#c2'),//input
		rpta = $('#rpta'),//label
		getChek = function(radio){
					for (var i = radio.length - 1; i >= 0; i--) {
						if(radio[i].checked){
							return radio[i].value;
						}
					};
				return 'sumar';//default
		};
		window.rpta = rpta;
	btn.on('click',function(){
		var oper = $('input[type=radio]');
					//console.log(rpta)
		var obj = {
			c1: cant1[0].value
			,c2:cant2[0].value
			,oper: getChek(oper)
		}
			console.log(obj);

		$.ajax({
			url:'/calcular'
			,type:'POST'
			,dataType:'json'
			, data: obj//envio un json parseado como cadena
			,success:function(data){
				console.log(data);
				console.log(typeof(data));
				rpta.text(data)//muestro la rpta en el <label>
				//console.log("on sucess");
			}
		});//end ajax

	})
}(jQuery,window,undefined);