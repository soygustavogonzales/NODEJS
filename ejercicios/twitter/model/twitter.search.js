var client = require(__dirname+'/connection.twitter.js')
var Promise = require('promise')

/*
client.get('favorites/list', function(error, tweets, response){
  if(error) throw error;
  //console.log(tweets);  // The favorites. 
  tweets.forEach(function(val,index){
  		console.log(val.text)
  })
  //console.log(response);  // Raw response object. 
});
*/
var twitter = {}
twitter.search = function(query){

    client.stream('statuses/filter', {track: query}, function(stream) {
      stream.on('data', function(tweet) {
        //console.log(tweet.text)
        resolve(tweet.text);
      });
      stream.on('destroy', function() {
        console.log("***")
      });
      setTimeout(function(){
        console.log(stream.destroy())
      },5000)
     
      stream.on('error', function(error) {
        reject(error);
      });

    });
  })
}

module.exports = twitter;
/*
*/


 /*
client.get('search/tweets.json?q=justin', function(error, tweets, response){
	if(error){
		throw error
	}
 //console.log(response)
 //console.log(Object.prototype.toString.call(tweets.statuses))
 tweets.statuses.forEach(function(val,index){
 		console.log(val.text)
 })
})
 */