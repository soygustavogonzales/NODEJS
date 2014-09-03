var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res){
	res.render("index")
})
router.get('/:tema', function(req, res) {
	var tema = req.params.tema;
  res.render(tema, { pretty:true
  																		,title: 'Express'
  																		,app:tema });
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
