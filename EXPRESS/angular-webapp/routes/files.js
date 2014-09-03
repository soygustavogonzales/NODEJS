var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/pdf', function(req, res) {
	console.log(__dirname)
  //res.sendfile();
  res.sendfile("./public/documents/documento1.pdf")
});

router.get('/ppt', function(req, res) {
	console.log(__dirname)
  //res.sendfile();
  res.sendfile("./public/documents/documento2.pptx")
});
module.exports = router;
