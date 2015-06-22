var ping = require('ping');

var hosts = ['google.com','127.0.0.0:3500'];
for (var i = 101 - 1; i >= 0; i--) {
	hosts.forEach(function (host) {
	   ping.promise.probe(host)
	       .then(function (res) {
	           console.log(res);
	       });
	});
};