var l = console.log
var myModule = require("./my_modules.js");//necesario pones el ./ q indica a la raiz, normalmente estamos acostumbrados a solo colocar el nombre completo del archivo , cuando al q llamamos esta en la misma ruta(estan dentro de una misma carpeta), pero en node es crucial e importante.
var userDevice = require("./device.js");//necesario pones el ./ q indica a la raiz, normalmente estamos acostumbrados a solo colocar el nombre completo del archivo , cuando al q llamamos esta en la misma ruta(estan dentro de una misma carpeta), pero en node es crucial e importante.
l("hello ",myModule.hello("mundo"));
var gagd=myModule.gustavo;//importando al objeto gustavo
l("hello "+gagd.name);
l(userDevice("").isPc())
