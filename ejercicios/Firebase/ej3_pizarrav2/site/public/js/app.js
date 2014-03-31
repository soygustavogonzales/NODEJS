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
		//console.log(canvas);
		//canvas[0].width = canvas[0].width;
		//ctx.fillStyle = "green";		
		//ctx.fillRect(0,0,canvas.width,canvas.height);
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
			if(!modoBorrador){
					$scope.coords.$child(coord).$set(colorBoard);;		
				}else{
					console.log($scope.coords[coord]);
					$scope.coords[coord].$remove();
				}

		}
	});
	canvas.mouseup(function(e) {
		inicio = false;
		ctx.closePath()
	});

	$scope.coords.$on('child_removed',function(snapshot){
		var coords = snapshot.snapshot.name.split(':');
		console.log(coords);
		var x = coords[0];
		var y = coords[1];
				ctx.clearRect(x,y,4,4);
	})
	$scope.coords.$on('child_added',function(snapshot){
		//console.log(snapshot.snapshot.name);
		var coords = snapshot.snapshot.name.split(':');
		var x = coords[0];
		var y = coords[1];
		//console.log(coords);
	/*
				ctx.beginPath();//le digo a canvas q empezare a rgaficar
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#000000";
				ctx.strokeRect(x,y,1,1);
				ctx.stroke();
	*/	
		ctx.lineTo(x,y)
		ctx.stroke()	
	})

	//$scope.boardRef.$bind($scope,'coords');
}]);