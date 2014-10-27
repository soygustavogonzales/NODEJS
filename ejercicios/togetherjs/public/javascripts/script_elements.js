var whiteboard = new fabric.Canvas('whiteboard',{
		backgroundColor:'#514949',
		width:800,
		height:600
})

var rect = new fabric.Rect({
	width:150,
	height:75,
	fill:"rgba(240,243,234,.9)",
	top:100,
	left:100,
	stroke:'transparent'
})
whiteboard.add(rect)

TogetherJSConfig_disableWebRTC = true
TogetherJSConfig_cloneClicks = true
TogetherJSConfig_cloneClicks = ".whiteboard"