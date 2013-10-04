var app = app || {};

app.ListView = Backbone.View.extend({
	el: '#maincontent',
	
	initialize: function(){
		var that = this;
		this.collection = new app.Pictures();
		this.collection.fetch({
			url:'/picture',
			success: function(data){
				console.log("JSON cargado satisfactoriamente", data);
				that.render();	
			},
			error: function(){
				console.log("Hay un error en la carga del JSON");
			}
		});
	},
	render: function(){
		this.collection.each(function(item){
			 var vista = new app.ItemView(item); 	
		});
	}
});
