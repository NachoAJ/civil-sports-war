let Background = {
	draw: function(ctx, width, height) {
		let image = new Image()
		image.src = 'images/bg.gif'
		ctx.drawImage(image, 0, 0, width, height)
		// let image2 = new Image()
		// image2.src = 'images/court.jpg'
		// ctx.drawImage(image2, 0, height - 100, width, height)
		ctx.fillStyle = 'black'
		ctx.fillRect(0, height - 100, width, height)
	}
}
