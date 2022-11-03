class Goal {
  constructor() {
    this.image
    this.x = 0
    this.y = 100
    this.width = 200
    this.height = 300
  }

  preload() {
    this.image = loadImage(`assets/goal.gif`)
  }
}
