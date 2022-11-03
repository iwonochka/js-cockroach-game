WIDTH = 1000
HEIGHT = 500

const game = new Game()

function preload() {
	game.preload()
}

function setup() {
	createCanvas(WIDTH, HEIGHT)
}

function draw() {
	game.draw()
}

