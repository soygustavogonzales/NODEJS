var express = require('express'),
	getImages = require('../modules/scrapping-google.js'),
	router = express.Router(),
	l = console.log;

/*
*/
router.get('/:page/keyword/:keyword', function(req, res) {
			l(req.params)
			l((req.params.page.toString()!='')&&(req.params.page == 'originalGoogleImage')&&(req.params.keyword.toString()!=''))
			switch(true){
					case(req.params.page&&(req.params.page == 'googleimage')):
						res.sendfile('./views/googleImage.html')
						break;
					case((req.params.page.toString()!='')&&(req.params.page == 'originalGoogleImage')&&(req.params.keyword.toString()!='')):
						getImages(req.params.keyword.toString(),function(imgs){
				  	imgs&&l(imgs)//mostrara en consola un array de imagenes
				  	res.render('index',{imgs:imgs})
						})
					break;
					default:
					 res.render('index')
			}
				
			//Con res.sendfile todo ok ,pero hay problemas usando res.sendFile -->
			//arroja este error: path must be absolute or specify root to res.sendFile
});
			
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
