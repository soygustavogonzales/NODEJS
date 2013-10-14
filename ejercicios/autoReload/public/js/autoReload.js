;!function(window,undefined){

		socket = io.connect('/');
			function recargar(){
				window.location.reload();
			}

			socket.on('connect',function(){
				socket.on('reload',recargar);
			});
}(window,undefined);
