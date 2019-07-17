window.onload = () => {
	document.getElementById('start-basket').onclick = function() {
		document.getElementById('start-basket').className = 'display-none'
		document.getElementById('start-volley').className = 'display-none'
		document.getElementsByTagName('h1')[0].className = 'display-none'
		document.getElementById('game-volley').className = 'display-none'
		document.getElementById('game-basket').className = 'display'
		Game.initBasket('game-basket')
	}
	document.getElementById('start-volley').onclick = function() {
		document.getElementById('start-basket').className = 'display-none'
		document.getElementById('start-volley').className = 'display-none'
		document.getElementById('game-basket').className = 'display-none'
		document.getElementsByTagName('h1')[0].className = 'display-none'
		document.getElementById('game-volley').className = 'display'
		Game.initVolley('game-volley')
	}
}
