var app = app || {};

app.Pictures = Backbone.Collection.extend({
	model: app.Picture,
	url:'/picture'
});
