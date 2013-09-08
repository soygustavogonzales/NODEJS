var myModule = require("./my_modules.js");//necesario pones el ./ q indica a la raiz, normalmente estamos acostumbrados a solo colocar el nombre completo del archivo , cuando al q llamamos esta en la misma ruta(estan dentro de una misma carpeta), pero en node es crucial e importante.
console.log("hello ",myModule.hello("mundo"));
var gagd=myModule.gustavo;//importando al objeto gustavo
console.log("hello "+gagd.name);
