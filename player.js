class Player {
	constructor(ctx, x, gameHeight, src, keys) {
		this.ctx = ctx
		this.x = x
		this.gameHeight = gameHeight
		this.y = this.gameHeight - 100
		this.y0 = this.gameHeight - 100
		this.image = new Image()
		this.image.src = src
		this.image.frames = 4
		this.image.framesIndex = 0
		this.keys = keys
		this.width = 80
		this.height = 100
		this.velX = 8
		this.velY = 1
		this.gravity = 0.5
		this.setListeners()
	}

	draw() {
		this.ctx.drawImage(
			this.image,
			this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
			0,
			Math.floor(this.image.width / this.image.frames),
			this.image.height,
			this.x,
			this.y - this.height,
			this.width,
			this.height
		)
	}

	move(framesCounter) {
		this.y += this.velY
		this.velY += this.gravity
		if (this.y > this.gameHeight - 100) {
			this.y = this.gameHeight - 100
			this.velY = 0
		}
		if (this.keys.RIGHT.down) {
			this.x += this.velX
			this.animate(framesCounter)
		}
		if (this.keys.LEFT.down) {
			this.x -= this.velX
			this.animate(framesCounter)
		}
		if (this.keys.JUMP.down) {
			if (this.y === this.y0) {
				this.y -= 50
				this.velY -= 10
			}
		}
	}

	animate(framesCounter) {
		if (framesCounter % 5 == 0) {
			this.image.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
			if (this.image.framesIndex > 3) {
				this.image.framesIndex = 0
			}
		}
	}
	setListeners() {
		document.addEventListener('keydown', e => {
			switch (e.keyCode) {
				case this.keys.RIGHT.code:
					this.keys.RIGHT.down = true
					break
				case this.keys.LEFT.code:
					this.keys.LEFT.down = true
					break
				case this.keys.JUMP.code:
					this.keys.JUMP.down = true
					break
			}
		})
		document.addEventListener('keyup', e => {
			switch (e.keyCode) {
				case this.keys.RIGHT.code:
					this.keys.RIGHT.down = false
					this.image.framesIndex = 0
					break
				case this.keys.LEFT.code:
					this.keys.LEFT.down = false
					this.image.framesIndex = 0
					break
				case this.keys.JUMP.code:
					this.keys.JUMP.down = false
					break
			}
		})
	}
}
