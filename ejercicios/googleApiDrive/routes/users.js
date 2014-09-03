var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('HAS PEDIDO A TODOS LOS USUARIOS');
});

module.exports = router;
