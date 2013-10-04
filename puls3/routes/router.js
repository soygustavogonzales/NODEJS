// App routes

module.exports = function(app){

	var Picture = require('../model/picture');

	// Create a new pcture and save it
	
	picture = function(req,res){
		var picture= new Picture({title: req.body.title, image: req.body.image, author:req.body.author, votes:req.body.votes});
		picture.save();
		res.end();
	};

	// find all pictures
	
	list = function(req,res){
		Picture.find(function(err, pictures){
			res.send(pictures);
		});
	};

	// find picture by id
	
	find = (function(req,res){
		Picture.findOne({_id:req.params.id}, function(error, picture){
			res.send(picture);
		})	
	});
	
	// remove picture by id
	
	remove = (function(req,res){
		Picture.remove({_id:req.params.id}, function(error, picture){
			res.send(picture);
		})
	});

	// edit picture
	
	edit  = (function(req,res){
		fields = req.body
		Picture.update({_id:req.params.id}, {$set: {"votes":req.body.votes}}, function(error,picture){
			res.send(picture);
		})
	});

	// Link routes
	
	app.post('/picture', picture);
	app.get('/picture', list);
	app.get('/picture/:id', find);
	app.delete('/picture/:id', remove);		
	app.put('/picture/:id', edit);		
}
