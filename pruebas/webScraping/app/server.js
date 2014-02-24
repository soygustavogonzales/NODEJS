/*
Este script se va a traer el DOM de una pagina solicitada, por tal 
podemos pedir imagenes, formularios , etc.
*/
var request = require('request'),//para tra
cheerio = require('cheerio'),
fs = require('fs'),
l = console.log;
var options = {
	url:"http://thehackernews.com/",
	encoding:"binary"
}
request(options,function(err,resp,html){
	//html: una cadena que contiene todo el DOM de la pagina solicitada
		if(!err&&resp.statusCode==200){//si no hat error y si la pagina si existe(pagina encontrada-rpta. del servidor-)
			l(typeof(html));//=> true
			l(html);//=> true
			var $ = cheerio.load(html);//mediante $ se puede acceder al DOM del documento de la pagina 
			//l($('.blog-posts').children());//obtengo al hijo de la clase .blog-posts
			/*Arbol parcial de la pagina de thehackernews
			.blog-posts (contiene a todos los posts)
					.hnews(contiene 1 post)
							h1(contiene al titulo del post)
								a(contiene al titulo del post para redireccionarlo)
					.hnews
							a
					.hnews
							a
					.hnews
							a
				
			*NOTA: Tened en cuenta que cada .hnews tiene 
			*/

			/*EL siguiente script capturara los titulos de cada post de la pagina solicitada
				$('.blog-posts .hnews h1 a')//obtengo a todos los <a> dentro de todos los <h1> dentro de todos los .hnews dentro de todos los .blog-posts
				.each(function(i,elem){

					//this <es igual a> elem
					var titulo = $(elem).html();
					l(i+"* : "+titulo);
				});
			*/
			/*EL siguiente script tendra el mismo efecto que el anterior*/
			/*
			$('.blog-posts .hnews').each(function(i,elem){
				var titulo = $(elem).find('h1 a').text();
				l(i+"* : "+titulo);
			});
			*/
			/*
			*/
			$('.blog-posts .post .post-body img').each(function(i,elem){
				var src = $(elem).attr('src');
				var imagen = fs.createWriteStream(__dirname+'/imgs/'+i+'.jpg');
				request(src).pipe(imagen);
				l(i+".:"+src)
				l("______________")
			});


		}
	})
