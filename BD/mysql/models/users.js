var mysql = require('mysql'),

/*
//Hay errores cuando se intenta conectar con el host de mysql remotamente
aparece lo sgte. en la consola del servidor: getaddrinfo ENOTFOUND

connection  = mysql.createConnection({
    host:'mysql.hostinger.es',//'',
    user:'u960541651_user1',
    password:'matadorg1',
    database:'u960541651_divis'
})
*/
connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'matadorg1',
    database:'divercity',
    PORT:'3306'
})

var userModel = new Object()

userModel.getUsers = function(callback){
	if(connection){
		connection.query("SELECT * FROM users ORDER BY id",function(err,rows){
			if(err)	{console.log(err.message);}
			else callback(null,rows);
		})
	}
}

userModel.getUser = function(id,callback){
	if(connection){
		var sqlQuery = "SELECT * FROM users WHERE id ="+connection.escape(id);
		connection.query(sqlQuery,function(err,row){
			if(err) throw err;
			else callback(null,rows)
		})
	}
}

//añadir un nuevo usuario
userModel.insertUser = function(userData,callback)
{
    if (connection) 
    {
        connection.query('INSERT INTO users SET ?', userData, function(error, result) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}
 
//actualizar un usuario
userModel.updateUser = function(userData, callback)
{
    //console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE users SET username = ' + connection.escape(userData.username) + ',' +  
        'email = ' + connection.escape(userData.email) +
        'WHERE id = ' + userData.id;
 
        connection.query(sql, function(error, result) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg":"success"});
            }
        });
    }
}
 
//eliminar un usuario pasando la id a eliminar
userModel.deleteUser = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM users WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result) 
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = userModel;