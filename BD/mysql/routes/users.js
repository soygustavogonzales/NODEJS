var express = require('express'),
userModel = require('../models/users'),
router = express.Router();



router.get('/user/update/:id',function(req,res){
    /*
     /usersBD/user/update/:id 
    */
	var id = req.params.id;
	if(!isNaN(id)){
		userModel.getUser(id,function(err,data){
			if(typeof data != undefined && data.length > 0) 
			{
				res.render('index',{
					title:'formulario',
					info:data
				})
			}else{
				res.json(404,{'msj':'notExist'})
			}
		})
	}else{
		res.json(500,{"msg":"The id must be numeric"});
	}
})

//formulario para crear un nuevo usuario
router.get("/create", function(req, res){
    /*
     /usersBD/create 
    */
    res.render("new",{ 
        title : "Formulario para crear un nuevo recurso"
    });
});

//formulario para eliminar un usuario
router.get("/delete", function(req, res){
    /*
     /usersBD/delete 
    */
    res.render("delete",{ 
        title : "Formulario para eliminar un recurso"
    });
});

//mostramos todos los usuarios 
router.get("/users", function(req,res){
    /*
     /usersBD/user/update/:id 
    */
    userModel.getUsers(function(error, data)
    {
        res.json(200,data);
    });
});

//obtiene un usuario por su id
router.get("/users/:id", function(req,res)
    /*
     /usersBD/users/:id 
    */  
{
    //id del usuario
    var id = req.params.id;
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        userModel.getUser(id,function(error, data)
        {
            //si el usuario existe lo mostramos en formato json
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.json(200,data);
            }
            //en otro caso mostramos una respuesta conforme no existe
            else
            {
                res.json(404,{"msg":"notExist"});
            }
        });
    }
    //si hay algún error
    else
    {
        res.json(500,{"msg":"Error"});
    }
});

//obtiene un usuario por su id
router.post("/users", function(req,res)
    /*
     /usersBD/users
    */
{
    //creamos un objeto con los datos a insertar del usuario
    var userData = {
        id : null,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        created_at : null,
        updated_at : null
    };
    userModel.insertUser(userData,function(error, data)
    {
        //si el usuario se ha insertado correctamente mostramos su info
        if(data && data.insertId)
        {
            res.redirect("/usersBD/users/" + data.insertId);
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});

//función que usa el verbo http put para actualizar usuarios
router.put("/users", function(req,res)
{
    //almacenamos los datos del formulario en un objeto
    var userData = {id:req.param('id'),username:req.param('username'),email:req.param('email')};
    userModel.updateUser(userData,function(error, data)
    {
        //si el usuario se ha actualizado correctamente mostramos un mensaje
        if(data && data.msg)
        {
            res.json(200,data);
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});

//utilizamos el verbo delete para eliminar un usuario
router.delete("/users", function(req,res)
{
    //id del usuario a eliminar
    var id = req.param('id');
    userModel.deleteUser(id,function(error, data)
    {
        if(data && data.msg === "deleted" || data.msg === "notExist")
        {
            res.json(200,data);
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});

module.exports = router;
