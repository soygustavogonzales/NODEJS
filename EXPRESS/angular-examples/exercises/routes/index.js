var express = require('express');
var router = express.Router();
var path = require('path');
var jade2html = require('../modules/jade2html.js');
//var jade2html = require('jade2html');

/* GET home page. */
router.get('/',function(req,res){
	res.render("index")
})
router.get('/partials/:partial',function(req,res,next){
	var partial = req.params.partial
	var ext = partial.split('.').pop()
	if(ext=="html"){
		console.log(ext)
		console.log(partial)
		res.sendfile('./views/partials/'+partial)
	}else{
		res.render('partials/'+partial)
	}
})
router.get('/:tema', function(req, res,next) {
	var tema = req.params.tema;
	/*
  res.render(tema, { pretty:true
  																		,title: 'Express'
  																		,app:tema });
	*/
	var data = {title:'Express',app:tema}
	var result = jade2html({
															path:['./views/',tema,'.jade'].join(''),
															opts:{pretty:true,filename:[path.join('./views/layout')]},
															data:data
														})
	if(result instanceof Error)
		next(result)
	else
		res.send(result);
});

router.post('/login',function(req,res,next){
	var dni = req.body.dni;
	var pwd = req.body.pwd;
	
	res.json({
		dni:dni,
		pwd:pwd
	})

});

router.get('/users/:user', function(req, res){
	var name = (req.params.user)

	/*
	*/
	var data = [
		{name:name,lastname:"Gonzales"},{name:"Omar",lastname:"Gonzales"},{name:"Erick",lastname:"Gonzales"}
		]

	res.send(data)
})

module.exports = router;
