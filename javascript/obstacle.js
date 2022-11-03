class Obstacle {
	constructor(img) {
		this.image = img
		this.x = (Math.random() * WIDTH)
		this.y = -200
		this.width = 200
		this.height = 410
    this.direction = 5
	}

  preload() {
    this.img1 = loadImage(`../assets/obs1.png`)
    this.img2 = loadImage(`../assets/obs2.png`)
    this.img3 = loadImage(`../assets/obs3.png`)
  }
}
