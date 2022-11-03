class Background {
  constructor() {
    this.image
    this.speed = -1
    this.x = 0
    this.width = 5000
    this.height = 500
    }

  preload() {
    this.image = loadImage("assets/background.png")
  }

  draw() {
    image(this.image, this.x, 0, this.width, this.height)
  }
}
