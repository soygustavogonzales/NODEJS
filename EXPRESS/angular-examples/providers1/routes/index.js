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

module.exports = router;
