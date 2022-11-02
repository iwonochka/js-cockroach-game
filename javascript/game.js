WIDTH = 1000
HEIGHT = 500
CANVAS = document.querySelector("canvas")

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
    // Collision
    // if (this.collision(this.player)) this.gameOver()
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

  collision(playerInfo) {
		// Get the bottom of the obstacle
		let obstacleX = this.obstacle.x
		let obstacleY = this.obstacle.y + this.obstacle.height

		// Get the middle of the player
		let playerX = playerInfo.x + playerInfo.width / 2
		let playerY = playerInfo.y + playerInfo.height / 2

        // dist(x1, y1, x2, y2) returns the distance between the objects
		if (dist(obstacleX, obstacleY, playerX, playerY) < 25) {
      return true
		} else {
			// Increment the score
			this.player.score += 10
			return false
		}
	}

  drawObstacles() {
    // if obstacle's y is between 0 and player's y it should move down
    // if obstacle's y reaches player's y obstacle should move up until it reaches 0
    this.addObstacles()
    this.obstacles.forEach((obstacle) => {
      image(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      obstacle.y += obstacle.direction
      if (obstacle.y + obstacle.height >= (this.player.y + this.player.height / 2)) {
        obstacle.direction = -obstacle.direction
      }
    })
	}



  // gameOver() {
  //   const popUp = document.createElement("section")
  //   CANVAS.appendChild(popUp)
  //   popUp.innerHTML = `<div class="modal" tabindex="-1">
  //   <div class="modal-dialog">
  //     <div class="modal-content">
  //       <div class="modal-header">
  //         <h5 class="modal-title">Modal title</h5>
  //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //       </div>
  //       <div class="modal-body">
  //         <p>Oh no, you got SMAAAASHED...Wanna try again?</p>
  //       </div>
  //       <div class="modal-footer">
  //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Quit</button>
  //         <button type="button" class="btn btn-primary">Play again</button>
  //       </div>
  //     </div>
  //   </div>
  // </div>`
  // }
}
