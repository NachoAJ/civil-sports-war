let Background = {
	draw: function(ctx, width, height) {
		ctx.fillStyle = '#9ec3ff'
		ctx.fillRect(0, 0, width, height)
		ctx.fillStyle = 'black'
		ctx.fillRect(0, height - 100, width, height)
	}
}
