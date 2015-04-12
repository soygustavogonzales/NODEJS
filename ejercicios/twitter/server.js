var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'x6UaZBfEd7EwqQcViowAU7YVt',
  consumer_secret: 'pjlg5gxU0W0uXyM6cWYZFNJUjx5RkRGKtdW7Mnhu3kzxPmJVC6',
  access_token_key: '153242714-peCOP1ODhgusm62226hA1VGHERXkIyTfUX9FATTq',
  access_token_secret: 'Za9zn2qyXn1IErLgWSlBIVtWXEh7cDxUXUBFbEpb1Lw9P'
});

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

client.stream('statuses/filter', {track: 'ted'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });

  stream.on('close', function(error) {
    console.log("**");
  });
});
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