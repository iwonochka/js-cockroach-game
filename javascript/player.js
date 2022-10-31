class Player {
  constructor() {
    this.width = 140
		this.height = 140
    this.image
    this.imageLeft
    this.imageRight
		this.x = 0
		this.y = 450 - this.height
  }

  preload() {
    this.imageRight = loadImage("../assets/cockroach-right.gif")
    this.imageLeft = loadImage("../assets/cockroach-left.gif")
    this.image = this.imageRight
  }

  draw() {
    image(this.image, this.x, this.y, this.width, this.height)
    if (keyIsDown(39)) {
      game.player.goRight()
      this.image = this.imageRight
    } else if (keyIsDown(37)) {
      game.player.goLeft()
      this.image = this.imageLeft
    }
  }

  goLeft() {
    if (this.x > WIDTH - (WIDTH - 50)) {
      this.x -= 20
    }
  }

  goRight() {
    if (this.x < WIDTH - 50) {
      this.x += 20
    }
  }
}
