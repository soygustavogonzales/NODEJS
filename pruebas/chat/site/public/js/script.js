	var l=console;
	var ListMessage = function($scope){
		$scope.messages = [{
			message:"hola",
			remitente:"Gustavo"
		}]

		$scope.sendMessage = function(e){	
			var tecla = e.keyCode.toString();
			l.log(tecla)
			if(tecla == "13"){
				$scope.messages.push({
					message:$scope.new_message,
					remitente:"yo"
				});

				$scope.new_message = "";
				//$scope.remitente = "";
			}	
		}

	}