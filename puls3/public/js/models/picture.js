var app = app || {};

app.Picture = Backbone.Model.extend({
	defaults:{
		title:"Titulo de la Foto",
		author:"Desconocido",
		image:"img/bilbao.jpg",
		votes:"0"		
	},
	idAttribute: "_id",
	urlRoot: "/picture"

});
