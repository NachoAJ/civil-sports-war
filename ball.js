class Ball {
	constructor(ctx, gameHeight, gameWidth, x, src) {
		this.ctx = ctx
		this.gameHeight = gameHeight
		this.gameWidth = gameWidth
		this.x = x
		this.y = this.gameHeight - 400
		this.width = 30
		this.height = 30
		this.velY = 1
		this.velX = 0
		this.bounce = 0.7
		this.gravity = 0.5
		this.friction = 0.07
		this.image = new Image()
		this.image.src = src
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
	}

	move() {
		this.y += this.velY
		this.velY += this.gravity
		this.x += this.velX
		if (this.x + this.width > this.gameWidth || this.x < 0) {
			this.velX *= -1
		}
		if (this.y + this.height > this.gameHeight - 100) {
			this.y = this.gameHeight - this.height - 100
			this.velY *= -this.bounce
			console.log(this.velY)
			if (this.velY != -0.7) {
				document.getElementById('bounce').play()
			}
			if (this.velY < 0 && this.velY > -2.5) this.velY = 0
			if (Math.abs(this.velX) < 1.1) this.velX = 0
			this.xFriction()
		}
	}

	xFriction() {
		if (this.velX > 0) this.velX -= this.friction
		if (this.velX < 0) this.velX += this.friction
	}
}
