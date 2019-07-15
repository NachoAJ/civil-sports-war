let Game = {
	canvas: undefined,
	ctx: undefined,
	width: undefined,
	height: undefined,
	fps: 60,
	framesCounter: 0,

	init: function() {
		this.canvas = document.getElementById('game')
		this.ctx = this.canvas.getContext('2d')
		this.width = window.innerWidth * 0.98
		this.height = window.innerHeight * 0.98
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.start()
	},

	start: function() {
		this.reset()
		this.interval = setInterval(() => {
			this.drawAll()
			this.moveAll()
			this.pickBall1()
			this.pickBall2()
			this.setListeners()
		}, 1000 / this.fps)
	},

	reset: function() {
		this.player = new Player(this.ctx, 0, this.height, 'images/deadpool-small.png', {
			RIGHT: { code: 39, down: false },
			LEFT: { code: 37, down: false },
			JUMP: { code: 38, down: false }
		})
		this.player2 = new Player(this.ctx, 150, this.height, 'images/ironman.png', {
			RIGHT: { code: 68, down: false },
			LEFT: { code: 65, down: false },
			JUMP: { code: 87, down: false }
		})
		this.ball = new Ball(this.ctx, this.height, this.width)
		this.basket = new Basket(this.ctx, this.width, this.height)
	},

	drawAll: function() {
		Background.draw(this.ctx, this.width, this.height)
		this.player.draw()
		this.player2.draw()
		this.ball.draw()
		this.basket.draw()
	},

	moveAll: function() {
		this.ball.move()
		this.player.move()
		this.player2.move()
		this.colisions()
	},

	pickBall1: function() {
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
	},

	pickBall2: function() {
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
	},

	setListeners: function() {
		document.addEventListener('keypress', e => {
			if (e.keyCode === 32 && this.pickBall1()) {
				this.ball.x += 60
				this.ball.velX = 5
				this.ball.velY = -15
			}
		})
		document.addEventListener('keypress', e => {
			if (e.keyCode === 103 && this.pickBall2()) {
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
	}
}
