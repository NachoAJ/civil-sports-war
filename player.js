class Player {
	constructor(ctx, x, gameHeight, src, keys) {
		this.ctx = ctx
		this.x = x
		this.gameHeight = gameHeight
		this.y = this.gameHeight - 100
		this.y0 = this.gameHeight - 100
		this.image = new Image()
		this.image.src = src
		this.keys = keys
		this.width = 80
		this.height = 100
		this.velX = 8
		this.velY = 1
		this.gravity = 0.5
		this.setListeners()
	}

	draw() {
		this.ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height)
	}

	move() {
		this.y += this.velY
		this.velY += this.gravity
		if (this.y > this.gameHeight - 100) {
			this.y = this.gameHeight - 100
			this.velY = 0
		}
		if (this.keys.RIGHT.down) {
			this.x += this.velX
		}
		if (this.keys.LEFT.down) {
			this.x -= this.velX
		}
		if (this.keys.JUMP.down) {
			if (this.y === this.y0) {
				this.y -= 50
				this.velY -= 10
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
					break
				case this.keys.LEFT.code:
					this.keys.LEFT.down = false
					break
				case this.keys.JUMP.code:
					this.keys.JUMP.down = false
					break
			}
		})
	}
}
