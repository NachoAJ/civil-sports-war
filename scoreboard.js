const ScoreBoard = {
	ctx: undefined,

	init: function(ctx) {
		this.ctx = ctx
		this.ctx.font = '80px sans-serif'
	},

	update: function(score1, score2, gameWidth) {
		this.ctx.fillStyle = 'white'
		this.ctx.fillText(`${score1} : ${score2}`, gameWidth / 2 - 70, 100)
		this.ctx.strokeText(`${score1} : ${score2}`, gameWidth / 2 - 70, 100)
	}
}
