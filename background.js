let Background = {
	draw: function(ctx, width, height) {
		let image = new Image()
		image.src = 'images/bg2.gif'
		ctx.drawImage(image, 0, 0, width, height)
		ctx.fillStyle = 'black'
		ctx.fillRect(0, height - 100, width, height)
	}
}
