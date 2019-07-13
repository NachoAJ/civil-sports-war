class Player {
	constructor(ctx, x, gameHeight, src) {
		this.ctx = ctx
		this.x = x
		this.y = gameHeight - 100

		this.image = new Image()
		this.image.src = src

		this.width = 60
		this.height = 140
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height)
	}
}
