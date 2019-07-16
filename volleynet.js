let VolleyNet = {
	x: undefined,
	y: undefined,
	width: 20,
	height: 165,
	draw: function(ctx, width, height) {
		this.x = width / 2
		this.y = height - 265
		ctx.fillStyle = 'white'
		ctx.fillRect(this.x, this.y, this.width, this.height)
		ctx.strokeRect(this.x, this.y, this.width, this.height)
	}
}
