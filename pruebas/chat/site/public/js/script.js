	var l=console;
	var socket = io.connect("/");
	var myChatApp = angular.module("myChatApp",[]);

	/*controlador Angular*/
					window.insertarMsj = function(data){
						window.$scope.messages.push({
							message:data.msj,
							remitente:data.remitente,
							destinatario:data.destinatario
						});
					};
		var btnShowMyId = $(".btnShowMyId");
	socket.on('connect',function(){
		window.lanzarMetodo = function(data){
							socket.emit('window.insertarMsj',data);
							l.log("emitido desde cliente");
		}
		

		btnShowMyId.on("click",function(e){
			l.log(window.$scope.remitente);
			socket.emit("showMyId",{username:window.$scope.remitente});
		});
		socket.on('showMyId',function(data){
			l.log("escuchado desde cliente...btnShowMyId")
			l.log(data);
		});
		socket.on('window.insertarMsj',function(data){
			l.log("escuchado desde cliente...")
			l.log(data)
			window.insertarMsj(data);
			window.keypear("chat");
		});
		socket.on('showUsers',function(data){
			l.log("nueva lista usuarios: ")
			l.log(data);
			window.listUsersnames = data.listUsersnames;
			window.keypear("listUsers");
		})

	});
		myChatApp.controller("ListUsersCtrl",function($scope){
			$scope.users = [];
			$scope.add = function(){
				l.log("estamos en add()");
				l.log(window.listUsersnames);
				var list = window.listUsersnames;//array de usernames
				angular.forEach(list, function(value, key){
					$scope.users[key] = value
				});
				l.log($scope.users)
			}
		});
		myChatApp.controller("ListMessageCtrl",function($scope){
					$scope.remitente	=	location.pathname.substring(location.pathname.lastIndexOf("/")+1);
					$scope.messages = [{}];

			socket.emit("new_user",{username:$scope.remitente});
					$scope.sendMessage = function(e){	
						var tecla = e.keyCode.toString();
						if(tecla == "13"){
							window.lanzarMetodo({
								msj:$scope.new_message,
								remitente:$scope.remitente,
								destinatario:null
							});
							$scope.new_message = "";
						}	
					}//sendMessage
					window.$scope = $scope;
		});//ListMessage
		
	/*end controlador Angular*/
		!function($){
				var input = $('#chat-input');
				var box = document.querySelector("#messages");
				var listUsers = $('.listUsers');
				/*
				window.clikear = function(){
					input.trigger("click");
				}
				*/
				window.keypear = function(ctrl){
					switch(ctrl){
						case"chat":
							input.trigger("keypress");
							/*scrolleando la caja de mensajes*/
							var dif = (box.scrollHeight - box.scrollTop);
							box.scrollByLines(dif);
						break;
						case"listUsers":
							listUsers.trigger("keypress",function(){
								console.log("keypress .....**")
							});
						break;
						default:
						break;
					}
				}
		}(jQuery)

