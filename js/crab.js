class Crab {
    constructor (ctx, positionX, vx) {
        this.ctx = ctx
        this.width = 84  
        this.height = 60
        this.position = {
            x: positionX,
            y: FLOOR - this.height
        }
        this.velocity = {
            x: vx,
            y: 0
        }
        this.gravity = 0.7
        this.maxY = FLOOR
        this.maxX = 0
        // In Game
        this.strength = 5
        // Graphics
        this.crabImg = new Image()
        this.crabImg.src = './assets/img/crab2.png'
        this.crabImg.frames = 16
        this.crabImg.frameIndex = 0
        this.tick = 0
        // Sound
        this.soundAttack = new Audio();
        this.soundAttack.src = './assets/sound/attack.mp3';
        this.soundAttack.volume = 0.5
    }

    move() {
        this.playerActions()
        // this.position.x += this.velocity.x
        // this.position.y += this.velocity.y
        // if(this.position.y + this.height + this.velocity.y <= this.maxY) {
        //     this.velocity.y += this.gravity
        // } else {
        //     this.velocity.y = 0
        // }
        this.position.x += this.velocity.x
    }

    crabCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    playerActions() {
        this.collisionLimits()
        // this.isOnFloor()
    }

    // isOnFloor() {
    //     if (this.position.y + this.height >= this.maxY) {
    //         this.velocity.y = 0
    //         this.position.y = Math.round(this.maxY - this.height)
    //     }
    // }

    collisionLimits() {
        if(this.position.x + this.width >= RIGHT_LIMIT) {
            this.velocity.x *= -1
            this.position.x = Math.round(RIGHT_LIMIT - this.width)
        }
        if(this.position.x <= LEFT_LIMIT) {
            this.velocity.x *= -1
            this.position.x = Math.round(LEFT_LIMIT)
        }
    } 

    draw() {
        this.ctx.drawImage(
            this.crabImg,
            this.crabImg.frameIndex * this.crabImg.width / this.crabImg.frames,
            0,
            this.crabImg.width / this.crabImg.frames,
            this.crabImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {    
        if (this.velocity.x !== 0) {
            this.animationMove()
        } else {
            this.animationIdle()
        }
        // if(!this.isOnFloor()) {
        //     this.animationJump()
        // }
    }

    // State Animation (idle, move, jump)
    animationIdle() {
        this.tick++
        if (this.tick > 4) {
          this.tick = 0
          this.crabImg.frameIndex++
        }
        if (this.crabImg.frameIndex >= 9) {
          this.crabImg.frameIndex = 0
        }
    }

    animationMove() {
        this.tick++
        if (this.tick > 4) {
          this.tick = 0
          this.crabImg.frameIndex++
        }
        if (this.crabImg.frameIndex >= 15) {
          this.crabImg.frameIndex = 9
        }
    }

    animationJump() {
        this.crabImg.frameIndex = 16
    }
}