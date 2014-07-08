var myBoard = angular.module('myBoard',['firebase']);
myBoard.service('svsBoard', ['$firebase',function ($firebase) {
		var ref = new Firebase('https://senseiapp.firebaseio.com/');
		this.ref = $firebase(ref);
		this.coords = this.ref.$child('coords');
}]);

myBoard.controller('ctrlBoard', ['$scope','svsBoard', function ($scope,svsBoard) {
	//var board = angular.element('#board');
	$scope.boardRef = svsBoard.ref;	
	$scope.coords = svsBoard.coords;
	//$scope.coords.$set({});
	var colorBoard = "green";
	var colorPlumon = "black";
	var modoBorrador = false;
	console.log($scope.coords);
	var canvas = angular.element('canvas');
	//console.log(canvas);
	canvas[0].style.background = colorBoard;
	var btnBorrarTodo = angular.element('.borrar');
	var btnBorrador = angular.element('.borrador');
	var btnPlumon = angular.element('.plumon');
	console.log(btnBorrarTodo);
	console.log(btnPlumon);
	console.log(btnBorrador);
	var ctx = canvas[0].getContext('2d');
	var inicio = false;
	btnPlumon.click(function(event) {
		modoBorrador = false;
		console.log(modoBorrador);
	});
	btnBorrador.click(function(e) {
		modoBorrador = true;
		console.log(modoBorrador);
	});

	btnBorrarTodo.click(function(event) {
		$scope.coords.$remove();
	});
	canvas.mousedown(function(e) {
		inicio = true;
		var x = e.clientX,y = e.clientY;
		ctx.beginPath()
		ctx.strokeStyle = "#000000"
		ctx.lineCap = "round"
		ctx.lineWidth = 1
		ctx.moveTo(x,y);
	});
	canvas.mousemove(function(e) {
		if(inicio){
				var x = e.clientX,y=e.clientY;
				var coord = x+":"+y
			if(!modoBorrador){//dibuja
					$scope.coords.$child(coord).$set(colorBoard);	
				}else{//borra
					console.log($scope.coords[coord]);
					$scope.coords.$remove(coord);
				}

		}
	});
	canvas.mouseup(function(e) {
		
		var x = e.clientX,y=e.clientY;
		ctx.closePath()
		inicio = false;
		//ctx.moveTo(x,y);
	});

	$scope.coords.$on('child_removed',function(snapshot){
		var coords = snapshot.snapshot.name.split(':');
		console.log(coords);
		var x = coords[0];
		var y = coords[1];
		angular.forEach([1,2,3,4], function(key,val){
			//console.log(key+" : "+val);
				ctx.clearRect(x-key,y-key,key,key);
				ctx.clearRect(x-key,y,key,key);
				ctx.clearRect(x,y-key,key,key);
				ctx.clearRect(x,y,key,key);
		})
})
	$scope.coords.$on('child_added',function(snapshot){
		//console.log(snapshot.snapshot.name);
		//ctx.beginPath();
			var coords = snapshot.snapshot.name.split(':');
			var x = coords[0];
			var y = coords[1];
		console.log(inicio);
		if(!inicio){
		/*
				ctx.beginPath()
				ctx.strokeStyle = "#000000"
				ctx.lineCap = "round"
				ctx.lineWidth = 2
				ctx.moveTo(x-1.9,y-1.9);

				ctx.lineTo(x,y)
				ctx.stroke()
				ctx.closePath();
		*/
			ctx.fillStyle="#000000"
			angular.forEach([0,1,2],function(key,val){
				ctx.fillRect(x-key,y-key,key,key)
				ctx.fillRect(x,y,key,key)
			})
		}else{
			ctx.lineTo(x,y)
			ctx.stroke()
		}
		

	})

	//$scope.boardRef.$bind($scope,'coords');
}]);