var http = require('http'),
		express	=	require('express'),
		mongoose = require('mongoose'),
		app = express(),
		PORT=2525;

var l = console.log;//para simplificar
mongoose.connect("mongodb://localhost/employees");

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))
db.once('open', function callback(){
	l("conectado  a la db de MongoDB!!")
});

var EmployeesSchema = mongoose.Schema({
	name : String,
	lastname : String,
	age : Number,
	date_born : Date,
	date_inscription : Date,
	wage : Number,
	sex : String,
	country : String,
	characteristic : Array
});

var Employees = mongoose.model('Employees', EmployeesSchema);

//El objeto que se insertara en la BD
	var employeed = new Employees({
		name:'Andres'
		,lastname:'Ramos'
		,age:'28'
		,date_born:'04/09/1990'
		,date_inscription:(new Date)
		,wage:480.78
		,sex:'M'
		,country:'Peru'
		,characteristic: ['hobbit','menudo','inteligente','egocentrico','programador']
	});
/*
	employeed.save(function(err,new_doc,nroDocs){
	//Insertando y Guardando el documento en la Base de Datos
	//new_doc : es el documento nuevo que se esta insertando
		if(err)l("Ocurrio un error: "+ err)
		else {
			l("Se insertaron :"+nroDocs+" documentos");
			//l("el documento nuevo es: "+new_doc);
		}
	});
*/
	var mostrarDocs = function(){
		Employees.find(function(err,documents){
			/*
		Este metodo buscara todos os documentos dentro del esquema de Employees
			*/
			if(err)l("Ocurrio un error: "+err);
			else {
				l(documents);	
				l("Se encontraron : "+documents.length+" coincidencias");	
			}
		});
	}
	var eliminarDoc = function(){
		Employees.remove({_id:'524f9d226063eefc69f17672'},function(error,doc){
			l((!error)?"Se elimino el documento":'Ocurrio un error: '+error)
			l(doc);//1, cantidad de documentos eliminados
			
			mostrarDocs()
		});
	}
		
	var mostrarDoc = function(){
		Employees.findOne({_id:'52507b66ace953b411000001'},'name',function(err,doc){
			/*FindOne() solo obtiene un documento asi existan varios semejantes
				Es mas util y aprpiado usarlo para busquedas con _id
				el 2do parametro indica que campos/atributos queremos ver de los devueltos
			*/
			if(!err){
				l("Unico documento encontrado: \n");
				l(doc)
			}
			else{
				l("Error oops!!")
			}
		})
	};
	//mostrarDoc();
	
	var actualizar = function(){
		Employees.update(
			{name:'Erick'},
			{multi:true},
			{$set:
				{"lastname":"Davalos"}},
			function(err,doc){
				if(!err){
					l("documento actualizado")
					l(doc)
				}else{
					l("OOps ocurrio un error: "+err)
				}
					
		})
	}

	actualizar();