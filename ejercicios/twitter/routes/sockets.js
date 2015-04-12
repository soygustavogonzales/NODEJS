var client = require('../model/connection.twitter.js')
//var Promise = require('promise')
module.exports = function(socket){
		//console.log(socket)
		var twitter = {}
		twitter.search = function(query){

		    client.stream('statuses/filter', {track: query}, function(stream) {
		      stream.on('data', function(tweet) {
		        //console.log(tweet.text)
		        socket.emit('new_tweet',tweet.text);
		      });

		      setTimeout(function(){
		        //console.log(stream.destroy())
		      },5000)
		     
		      stream.on('error', function(error) {
		        console.log(error);
		      });

		    });
		}

		socket.on('search', function(opt){
				twitter.search(opt.query)
		})

}