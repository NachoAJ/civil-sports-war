let Game = {
	canvas: undefined,
	ctx: undefined,
	width: undefined,
	height: undefined,
	fps: 60,
	score1: 0,
	score2: 0,
	framesCounter: 0,

	init: function() {
		this.canvas = document.getElementById('game')
		this.ctx = this.canvas.getContext('2d')
		this.width = window.innerWidth * 0.99
		this.height = window.innerHeight * 0.99
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.setListeners()
		this.start()
	},

	start: function() {
		this.reset()
		this.interval = setInterval(() => {
			this.drawAll()
			this.moveAll()
			this.pickBall1()
			this.pickBall2()
			this.framesCounter++
		}, 1000 / this.fps)
	},

	reset: function() {
		this.player = new Player(this.ctx, 0, this.height, 'images/america-sprite.png', {
			RIGHT: { code: 68, down: false },
			LEFT: { code: 65, down: false },
			JUMP: { code: 87, down: false }
		})
		this.player2 = new Player(this.ctx, this.width - this.player.width, this.height, 'images/iron-sprite.png', {
			RIGHT: { code: 39, down: false },
			LEFT: { code: 37, down: false },
			JUMP: { code: 38, down: false }
		})
		this.ball = new Ball(this.ctx, this.height, this.width)
		this.basket = new Basket(this.ctx, this.width, this.height, this.width - 30, 1, -10)
		this.basket2 = new Basket(this.ctx, this.width, this.height, 15, -1, 23)
		this.scoreboard = ScoreBoard
		this.scoreboard.init(this.ctx)
		this.score1 = 0
		this.score2 = 0
	},

	drawAll: function() {
		Background.draw(this.ctx, this.width, this.height)
		this.player.draw()
		this.player2.draw()
		this.ball.draw()
		this.basket.draw()
		this.basket2.draw()
		this.drawScore()
		this.point()
	},

	moveAll: function() {
		this.ball.move()
		this.player.move(this.framesCounter)
		this.player2.move(this.framesCounter)
		this.colisions()
		this.outOfBounds()
		Background.move(this.width)
		this.perks()
	},

	perks: function() {
		if (this.score1 >= 5) this.basket.move()
		if (this.score2 >= 5) this.basket2.move()
		if (this.score1 - this.score2 > 2) this.player2.velX = this.player2.velX0 + 7
		else this.player2.velX = this.player2.velX0
		if (this.score2 - this.score1 > 2) this.player.velX = this.player.velX0 + 7
		else this.player.velX = this.player.velX0
		if (this.score2 - this.score1 > 5) this.player.velJump = -15
		else this.player.velJump = this.player.velJump0
		if (this.score1 - this.score2 > 5) this.player2.velJump = -15
		else this.player2.velJump = this.player2.velJump0
	},

	playersColision: function() {
		if (
			this.player.x + this.player.width > this.player2.x &&
			this.player.x < this.player2.x + this.player2.width &&
			this.player.y > this.player2.y - this.player2.height &&
			this.player.y - this.player.height < this.player2.y
		) {
			return true
		}
	},

	pickBall1: function() {
		if (!this.playersColision()) {
			if (
				this.ball.x + this.ball.width > this.player.x &&
				this.ball.x < this.player.x + this.player.width &&
				this.ball.y + this.ball.height > this.player.y - this.player.height &&
				this.ball.y < this.player.y
			) {
				this.ball.x = this.player.x + 40
				this.ball.y = this.player.y - 65
				this.ball.velX = 0
				this.ball.velY = 0
				return true
			}
		}
	},

	pickBall2: function() {
		if (!this.playersColision()) {
			if (
				this.ball.x + this.ball.width > this.player2.x &&
				this.ball.x < this.player2.x + this.player2.width &&
				this.ball.y + this.ball.height > this.player2.y - this.player2.height &&
				this.ball.y < this.player2.y
			) {
				this.ball.x = this.player2.x
				this.ball.y = this.player2.y - 65
				this.ball.velX = 0
				this.ball.velY = 0
				return true
			}
		}
	},

	setListeners: function() {
		document.addEventListener('keypress', e => {
			if (e.keyCode === 103 && this.pickBall1()) {
				this.ball.x += 60
				this.ball.velX = 5
				this.ball.velY = -15
			}
		})
		document.addEventListener('keypress', e => {
			if (e.keyCode === 108 && this.pickBall2()) {
				this.ball.x -= 60
				this.ball.velX = -5
				this.ball.velY = -15
			}
		})
	},

	colisions: function() {
		if (
			//Colision bola con el tablero
			this.ball.x + this.ball.width > this.basket.x &&
			this.ball.y < this.basket.y + this.basket.height &&
			this.ball.y + this.ball.height > this.basket.y
		) {
			this.ball.velX *= -1
		}
		if (
			//Colision bola con parte izquierda del aro
			this.basket.rimX < this.ball.x + this.ball.width &&
			this.basket.rimX > this.ball.x &&
			this.ball.y + this.ball.height > this.basket.rimY &&
			this.ball.y < this.basket.rimY + this.basket.rimHeight
		) {
			this.ball.velY *= -this.ball.bounce
		}
		if (
			//Colision bola con parte derecha del aro
			this.basket.rimX + this.basket.rimWidth < this.ball.x + this.ball.width &&
			this.basket.rimX + this.basket.rimWidth > this.ball.x &&
			this.ball.y + this.ball.height > this.basket.rimY &&
			this.ball.y < this.basket.rimY + this.basket.rimHeight
		) {
			this.ball.velY *= -this.ball.bounce
		}
		if (
			//Colision bola con el tablero izquierdo
			this.ball.x < this.basket2.x + this.basket2.width &&
			this.ball.y < this.basket2.y + this.basket2.height &&
			this.ball.y + this.ball.height > this.basket2.y
		) {
			this.ball.velX *= -1
		}
		if (
			this.basket2.rimX + this.basket2.rimWidth > this.ball.x &&
			this.basket2.rimX + this.basket2.rimWidth < this.ball.x + this.ball.width &&
			this.basket2.rimY > this.ball.y &&
			this.basket2.rimY < this.ball.y + this.ball.height
		) {
			this.ball.velY *= -this.ball.bounce
		}
		if (
			this.basket2.rimX > this.ball.x &&
			this.basket2.rimX < this.ball.x + this.ball.width &&
			this.basket2.rimY > this.ball.y &&
			this.basket2.rimY < this.ball.y + this.ball.height
		) {
			this.ball.velY *= -this.ball.bounce
		}
	},

	drawScore: function() {
		this.scoreboard.update(this.score1, this.score2, this.width)
	},

	point: function() {
		if (
			this.basket.rimY + this.basket.rimHeight < this.ball.y + this.ball.height &&
			this.basket.rimY + this.basket.rimHeight > this.ball.y &&
			this.ball.x > this.basket.rimX + 10 &&
			this.ball.x < this.basket.rimX + 60
		) {
			this.ball.x = this.width / 2
			this.ball.y = this.height - 400
			this.ball.velX = 0
			this.player.x = 0
			this.player2.x = this.width - this.player2.width
			this.score1++
		}

		if (
			this.basket2.rimY + this.basket2.rimHeight < this.ball.y + this.ball.height &&
			this.basket2.rimY + this.basket2.rimHeight > this.ball.y &&
			this.ball.x > this.basket2.rimX + 10 &&
			this.ball.x < this.basket2.rimX + 60
		) {
			this.ball.x = this.width / 2
			this.ball.y = this.height - 400
			this.ball.velX = 0
			this.player.x = 0
			this.player2.x = this.width - this.player2.width
			this.score2++
		}
	},

	outOfBounds: function() {
		if (this.ball.x < 0) {
			this.ball.x = 1
		} else if (this.ball.x > this.width) {
			this.ball.x = this.width - this.ball.width
		}
	}
}
