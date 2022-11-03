WIDTH = 1000
HEIGHT = 500

class Game {
  constructor() {
    this.background = new Background()
		this.player = new Player()
		this.obstacles = []
    this.obstacleImgs = {obs1: null, obs2: null, obs3: null}
    this.goal = new Goal()
  }

  preload() {
    this.background.preload()
    this.player.preload()
    this.obstacleImgs.obs1 = loadImage(`../assets/obs1.png`)
    this.obstacleImgs.obs2 = loadImage(`../assets/obs2.png`)
    this.obstacleImgs.obs3 = loadImage(`../assets/obs3.png`)
    this.goal.preload()
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
    this.drawGoal()
    if (this.win()) this.gameOver("You won!", "Congratulations! You reached the trash can of plenty! 👏")
    this.obstacles.forEach((obstacle) => {
      if (this.collision(obstacle)) this.gameOver("Game over!", "Oh no, you got smashed! 😟")
    })
  }

  scroll() {
    if (this.player.x >= (WIDTH - WIDTH / 2) && this.background.x > -(this.background.width - WIDTH) && (keyIsDown(39)) && this.player.alive) {
      this.background.x -= 10
    } else if (this.background.x < 0 && (keyIsDown(37)) && this.player.alive) {
      this.background.x += 10
    }
  }

  addObstacles() {
    let keys = Object.keys(this.obstacleImgs)
    if (frameCount % 30 === 0 && (this.background.x >= -3800)) {
			this.obstacles.push(new Obstacle(this.obstacleImgs[keys[keys.length * Math.random() << 0]]))
		}
  }

  drawObstacles() {
    this.addObstacles()
    this.obstacles.forEach((obstacle) => {
      image(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      obstacle.y += obstacle.direction
      if (obstacle.y + obstacle.height >= (this.player.y + this.player.height / 2 + 20)) {
        obstacle.direction = -obstacle.direction
      }
    })
  }

  drawGoal() {
    if (this.background.x >= -4000 && this.background.x <= -3900 ) {
      image(this.goal.image, WIDTH - this.goal.width, this.goal.y, this.goal.width, this.goal.height)
    }
  }

  collision(obstacle) {
    if (obstacle.y + obstacle.height > this.player.y + this.player.height / 2 && (obstacle.x + obstacle.width / 2 >= this.player.x && obstacle.x + obstacle.width / 2 <= this.player.x + this.player.width )) {
      this.player.alive = false
      this.player.image = this.player.imageLoose
      document.getElementById("loose").play()
      return true
    }
  }

  win() {
    if ((dist(this.player.x, this.player.y, this.goal.x, this.goal.y)) >= 730 && (this.background.x >= -4000 && this.background.x <= -3900 )) {
      this.player.image = this.player.imageWin
      document.getElementById("win").play()
      return true
    }
  }

  gameOver(title, text) {
    const modal = document.querySelector(".modal")
    modal.style.visibility = "visible";
    document.querySelector(".close-btn").addEventListener("click", () => {modal.style.display = "none"})
    document.querySelector(".action-btn").addEventListener("click", () => {location.reload()})
    document.querySelector(".flex-col h2").innerText = title
    document.querySelector(".flex-col p").innerText = text
  }
}
