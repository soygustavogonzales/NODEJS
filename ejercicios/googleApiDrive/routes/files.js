var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/pdf', function(req, res) {
	console.log(__dirname)
  //res.sendfile();
  res.sendfile("./public/documents/documento1.pdf")
});

module.exports = router;
