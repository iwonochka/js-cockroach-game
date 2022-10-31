WIDTH = 1000
HEIGHT = 500

class Game {
  constructor() {
    this.background = new Background()
		this.player = new Player()
		this.obstacles = []
  }

  preload() {
    this.background.preload()
    this.player.preload()
    // obstacle images??
  }

  draw() {
    clear()
		this.background.draw()
    // if player is close to the border on the right or left the background should scroll
    this.scroll()
    this.player.draw()
  }

  scroll() {
    if (this.player.x > (WIDTH - 50) && this.player.x < (this.background.width - WIDTH) && (keyIsDown(39))) {
      this.background.x -= 20
    } else if (this.player.x < WIDTH - (WIDTH - 50) && this.player.x > 0 && (keyIsDown(37))) {
      this.background.x += 20
    }
  }
}
