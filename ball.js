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
		this.image.frames = 4
		this.image.framesIndex = 0
	}

	draw() {
		this.ctx.drawImage(
			this.image,
			this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
			0,
			Math.floor(this.image.width / this.image.frames),
			this.image.height,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}

	move(framesCounter) {
		this.y += this.velY
		this.velY += this.gravity
		this.x += this.velX
		if (this.velX != 0) this.animate(framesCounter)
		if (this.x + this.width > this.gameWidth || this.x < 0) {
			this.velX *= -1
		}
		if (this.y + this.height > this.gameHeight - 100) {
			this.y = this.gameHeight - this.height - 100
			this.velY *= -this.bounce
			if (this.velY != -0.7) {
				document.getElementById('bounce').play()
			}
			if (this.velY < 0 && this.velY > -2.5) this.velY = 0
			if (Math.abs(this.velX) < 1.1) this.velX = 0
			this.xFriction()
		}
	}

	animate(framesCounter) {
		console.log(framesCounter % 5)
		if (framesCounter % 5 == 0) {
			this.image.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
			if (this.image.framesIndex > 3) {
				this.image.framesIndex = 0
			}
		}
	}

	xFriction() {
		if (this.velX > 0) this.velX -= this.friction
		if (this.velX < 0) this.velX += this.friction
	}
}
