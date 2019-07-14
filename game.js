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
			this.pickBall()
			this.setListeners()
		}, 1000 / this.fps)
	},

	reset: function() {
		this.player = new Player(this.ctx, 0, this.height, 'images/deadpool-small.png')
		this.ball = new Ball(this.ctx, this.height, this.width)
	},

	drawAll: function() {
		Background.draw(this.ctx, this.width, this.height)
		this.player.draw()
		this.ball.draw()
	},

	moveAll: function() {
		this.ball.move()
		this.player.move()
	},

	pickBall: function() {
		if (
			this.ball.x + this.ball.width > this.player.x &&
			this.ball.x < this.player.x + this.player.width &&
			this.ball.y + this.ball.height > this.player.y - this.player.height &&
			this.ball.y < this.player.y
		) {
			console.log('pickeddd')
			this.ball.x = this.player.x + 35
			this.ball.y = this.player.y - 60
			this.ball.velX = 0
			this.ball.velY = 0
			return true
		}
		return false
	},

	setListeners: function() {
		document.onkeypress = e => {
			console.log('teclaaa')
			if (e.keyCode === 32 && this.pickBall()) {
				console.log('espaciooo')
				this.ball.x += 60
				this.ball.velX = 5
				this.ball.velY = -15
			}
		}
	}
}

// drawAll: function() {
// 	Background.draw(this.ctx, this.width, this.height)
// 	this.player.draw()
// 	Ball.draw(this.ctx, this.height, this.width)
// },

// moveAll: function() {
// 	Ball.move()
// 	this.player.move()
// }
