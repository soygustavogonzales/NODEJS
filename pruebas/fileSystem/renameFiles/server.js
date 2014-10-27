/*
Este algoritmo es creado para corregir el cambio que produce DROPBOX cuando se actualiza un archivo y crea
intencionalmente, por seguridad, un nuevo archivo (copia) con nombre 
 (Copia en conflicto de ...)

El objetivo es quedarse con una de las copias, solo con el que está o tiene
las ultimas modificaciones realizadas.  
*/

var fs = require('fs');
var path = '/media/ggonzales/DATA/GoogleDrive/Dropbox/PROYECTS/sensei2/public',
routes = '/media/ggonzales/DATA/GoogleDrive/Dropbox/PROYECTS/sensei2/routes',
views = '/media/ggonzales/DATA/GoogleDrive/Dropbox/PROYECTS/sensei2/views',
git = '/media/ggonzales/DATA/GoogleDrive/Dropbox/PROYECTS/sensei2/.git',
l = console.log,
pattern = "(Copia en conflicto de gustavo-PC 2014-10-23)"
///media/ggonzales/DATA/GoogleDrive/Dropbox/PROYECTS/sensei2/public/javascripts/development/dashboard (Copia en conflicto de gustavo-PC 2014-10-23).js

var analize = function(path){

	fs.readdir(path,function(err,files){
		if (err)
			l(err)
		else
			//l(files)
			files.forEach(function(filename,b){
				var newPath = path+'/'+filename
					fs.stat(newPath,function(err,stats){
							if(err)
								l(err)
							else
								if(stats.isFile()){
									var pos = filename.toString().indexOf(pattern);
									if(pos>-1)
									{
										//l(filename)
										//l("archivo en conflicto")
										var namefile = filename.substring(0,pos-1),ext = null, posExt = filename.lastIndexOf('.'), originalfile = null, fullPath = null,newName = null
										if(namefile&&namefile.toString().length>0){
											ext = (posExt>-1)?filename.substring(posExt+1):"";
											originalfile = namefile +((ext.length>0)?('.'+ext):'')
											fullPath = path+'/'+namefile +((ext.length>0)?('.'+ext):'')
											newName = path+'/'+namefile +'.'+'bkp'+((ext.length>0)?('.'+ext):'')
										}
										/*
										Teniendo como ejemplo a los siguientes archivos:
											file1: archivo.txt
											file2: archivo (Copia en conflicto de gustavo-PC 2014-10-23).txt
										fullPath : es la ruta completa(incluye el nombre del archivo) al archivo file1
										newName : es la ruta completa(incluye el nombre de archivo) al archivo file2, 
										path : es la ruta(sin nombre de archivo) al archivo file2 , es decir, raiz/.., sin tener en cuenta al nombre del file2 
										filename: es file2, (solo el nombre sin ruta)
										*/
										//renombro al incorrecto le agrego el .bkp.* antes de su extension(si no tiene extension esta la sera .bkp)
										rename(fullPath,newName,function(){
											//renombro el correcto (se le ha suprimido el texto que coloca dropbox: (Copia en confli ....bla bla bla))
											rename(path+'/'+filename,fullPath, function(){
												//borrar al incorrecto
												deleteFile(newName)
											})
										})
									}
								}
								else if(stats.isDirectory()){//si es una carpeta
									//lo mando a que se analice de forma recursiva
									analize(newPath)
								}
					})
			})
	})
				
}

var rename = function(currentPathName,newPathName,callback){
	//l(currentPathName)
	//l(newPathName)
	fs.rename(currentPathName,newPathName,function(err){
		//l("callback***")
		if(err) l(err)
		else{
			l(" rename OK :) ")
			callback&&callback()
		}

	})
}

var deleteFile = function(fullPathToFile){
		fs.unlink(fullPathToFile,function(){

		})

}
/*
analize(path)
analize(routes)
analize(views)
*/
analize(git)
