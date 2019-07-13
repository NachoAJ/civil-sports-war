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
		}, 1000 / this.fps)
	},

	reset: function() {
		this.player = new Player(this.ctx, 0, this.height, 'images/deadpool.png')
	},

	drawAll: function() {
		Background.draw(this.ctx, this.width, this.height)
		this.player.draw()
	}
}
