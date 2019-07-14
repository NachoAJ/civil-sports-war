class Basket {
	constructor(ctx, gameWidth, gameHeight) {
		this.ctx = ctx
		this.gameHeight = gameHeight
		this.gameWidth = gameWidth
		this.height = 150
		this.width = 15
		this.x = this.gameWidth - 30
		this.y = this.gameHeight / 2 - this.height
		this.rimHeight = 10
		this.rimWidth = 80
		this.rimX = this.x - this.rimWidth - 10
		this.rimY = this.y + this.height - 15
	}

	draw() {
		this.ctx.fillStyle = 'white'
		this.ctx.strokeStyle = 'black'
		this.ctx.fillRect(this.x, this.y, this.width, this.height)
		this.ctx.strokeRect(this.x, this.y, this.width, this.height)

		this.ctx.fillStyle = 'red'
		this.ctx.strokeStyle = 'black'
		this.ctx.fillRect(this.rimX, this.rimY, this.rimWidth, this.rimHeight)
		this.ctx.strokeRect(this.rimX, this.rimY, this.rimWidth, this.rimHeight)
	}
}
