var app = app || {};

app.ItemView = Backbone.View.extend({
	initialize: function(model) {
		var self = this;
		this.template = _.template($('#itemTemplate').html());		
		this.model = model;

		this.model.on('change', function(){
			self.render();
		});
	},
	tagName: 'article',
	events: {
		"click .icon-thumbs-up": "upVote",
		"click .icon-thumbs-up-2": "downVote"
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	upVote: function(e){
		e.stopImmediatePropagation();
		console.log("UPvote");
		var votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) + 1);
		this.model.save();
		console.log(votes);
	},
	downVote: function(e){
		e.stopImmediatePropagation();
		console.log("DownVote");
		var votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) - 1);
		this.model.save();
		console.log(votes);
	}

});
