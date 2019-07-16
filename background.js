let Background = {
	velX: 0.2,
	posX: 0,

	draw: function(ctx, width, height) {
		let bg = new Image()
		bg.src = 'images/bg.gif'
		ctx.drawImage(bg, 0, 0, width, height)
		let cloud = new Image()
		cloud.src = 'images/cloud.png'
		ctx.drawImage(cloud, this.posX, 0, 250, 220)
		ctx.drawImage(cloud, this.posX + 800, 80, 250, 220)
		ctx.drawImage(cloud, this.posX + width + 800, 80, 250, 220)
		ctx.drawImage(cloud, this.posX + width, 0, 250, 220)
		ctx.fillStyle = 'black'
		ctx.fillRect(0, height - 100, width, height)
	},

	move: function(width) {
		this.posX -= this.velX
		if (this.posX <= -width) this.posX = 0
	}
}
