WIDTH = 1000
HEIGHT = 500

class Game {
  constructor() {
    this.background = new Background()
		this.player = new Player()
		this.obstacles = []
    this.obstacleImgs = {obs1: null, obs2: null, obs3: null}
    this.goal
  }

  preload() {
    this.background.preload()
    this.player.preload()
    this.obstacleImgs.obs1 = loadImage(`../assets/obs1.png`)
    this.obstacleImgs.obs2 = loadImage(`../assets/obs2.png`)
    this.obstacleImgs.obs3 = loadImage(`../assets/obs3.png`)
    this.goal = loadImage(`../assets/goal.gif`)
  }

  draw() {
    clear()
		this.background.draw()
    // if player is close to the border on the right or left the background should scroll
    this.scroll()
    this.player.draw()
    // Draw the obstacles
		this.drawObstacles()
    //Draw goal
    image(this.goal, this.background.width - 200, this.player.y, (WIDTH * 0.2), (HEIGHT * 0.2))
  }

  scroll() {
    if (this.player.x >= (WIDTH - this.player.width) && this.background.x > -(this.background.width - WIDTH) && (keyIsDown(39))) {
      this.background.x -= 20
    } else if (this.background.x < 0 && (keyIsDown(37))) {
      this.background.x += 20
    }
  }

  addObstacles() {
    let keys = Object.keys(this.obstacleImgs)
    if (frameCount % 50 === 0) {
			this.obstacles.push(new Obstacle(this.obstacleImgs[keys[keys.length * Math.random() << 0]]))
		}
  }

  collision(player, obstacle) {
      if (obstacle.y + obstacle.height > this.player.y + this.player.height / 2 && (obstacle.x + obstacle.width / 2 >= player.x && obstacle.x + obstacle.width / 2 <= player.x + player.width )) {
        this.player.image = this.player.imageLoose
        return true
    }
	}

  drawObstacles() {
    // if obstacle's y is between 0 and player's y it should move down
    // if obstacle's y reaches player's y obstacle should move up until it reaches 0
    this.addObstacles()
    this.obstacles.forEach((obstacle) => {
      image(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      obstacle.y += obstacle.direction
      if (obstacle.y + obstacle.height >= (this.player.y + this.player.height / 2 + 20)) {
        obstacle.direction = -obstacle.direction
      }
      if (this.collision(this.player, obstacle)) this.gameOver()
    })
	}

  gameOver() {
    const modal = document.querySelector(".modal")
    modal.style.display = "block";
    modal.style.top = "25%";
    document.querySelector(".btn-close").addEventListener("click", () => {modal.style.display = "none"})
    document.querySelector(".btn-primary").addEventListener("click", () => {location.reload()})

  }
}
