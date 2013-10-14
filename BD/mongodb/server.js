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
		Employees.findOne(
			{_id:'52507b66ace953b411000001'}
			,'name'//atributo que solo queremos ver, se deja en blanco si queremos todos los atributos
			,function(err,doc){
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
			{name:'Erick'}//condicion, busqueda
			,{$set://setear
			{"lastname":"Avalos"
			,"age":30
			}
			}
			,{multi:true}//para modificar a todos los campos donde se encontro coincidencia.Sino solo modificara al primero que encuentre y a los demas no.
			,function(error,doc){
				if(!error){//si no hay error
					l("documentos actualizados: "+doc)
				}else{
					l("OOps ocurrio un error: "+error)
				}
					
		})
	}


	//actualizar();

	/*Insertar varios documentos*/

	var employeed_lote = [
	{
		name:'Marcela'
		,lastname:'Santander'
		,age:32
		,date_born:'05/08/1986'
		,date_inscription:(new Date)
		,wage:480.78
		,sex:'M'
		,country:'Peru'
		,characteristic: ['elfo','menudo','inteligente','egocentrico','programador']
	},
	{
		name:'Melinda'
		,lastname:'Torres'
		,date_born:'04/09/1980'
		,date_inscription:(new Date)
		,wage:4809.78
		,sex:'F'
		,country:'Brasil'
		,characteristic: ['Hermosa','inteligente']
	}
	];
	/*
	
	{
		name:'Victoria'
		,lastname:'Secret'
		,age:'24'
		,date_born:'14/10/1984'
		,date_inscription:(new Date)
		,wage:14000.78
		,sex:'F'
		,country:'Argentina'
		,characteristic: ['hermosa','inteligente','adicta','egocentrico','estudiante']
	},
	{
		name:'Marcela'
		,lastname:'Aranda'
		,age:'23'
		,date_born:'14/10/1990'
		,date_inscription:(new Date)
		,wage:1400.78
		,sex:'F'
		,country:'Argentina'
		,characteristic: ['hermosa','inteligente','adicta','egocentrico','estudiante']
	}
	*/

	Employees.create(employeed_lote,function(error,o1,o2){
		if(!error){
			l("Oops un error al crear por lote: "+error);
		}
		else{
			l("Creacion en lote correcta!!");
			l(o1)
			l(o2)
		}
	})