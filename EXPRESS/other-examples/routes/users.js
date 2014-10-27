var express = require('express');
var router = express.Router();
/*Otra forma de agregar latencia en la respuesta es
usando: var pause = require('connect-pause') 
ver mas en: https://github.com/flesler/connect-pause
*/
/* GET users listing. */
router.get('/description', function(req, res) {
	var text = 'Un usuario es un consumidor de la plataforma de software, no necesariamente un cliente, sino mas bien el consumidor final'
	setTimeout(function(){
  res.send(text);
	},5000)//agregando una latencia intencional
});
		

module.exports = router;
