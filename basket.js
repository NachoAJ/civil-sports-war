class Basket {
	constructor(ctx, gameWidth, gameHeight, x, direction, distance) {
		this.ctx = ctx
		this.gameHeight = gameHeight
		this.gameWidth = gameWidth
		this.direction = direction
		this.distance = distance
		this.height = 150
		this.velY = 1
		this.width = 15
		this.x = x
		this.y = this.gameHeight / 2 - this.height
		this.y0 = this.gameHeight / 2 - this.height
		this.rimHeight = 10
		this.rimWidth = 80
		this.rimX = (this.x - this.rimWidth + this.distance) * this.direction
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

	move() {
		this.y -= this.velY
		this.rimY -= this.velY
		if (this.y < 0 || this.y > this.y0) this.velY *= -1
	}
}
