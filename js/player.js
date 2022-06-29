class Player {
    constructor (ctx) {
        // Atributes
        this.ctx = ctx
        this.width = 44  
        this.height = 56
        this.position = {
            x: CANVAS_WIDTH / 2,
            y: FLOOR - this.height
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.7
        this.actions = {
            left: false,
            right: false,
            jump: false,
            shoot: false
        }
        this.maxY = FLOOR
        this.maxX = 0
        // Stats in Game
        this.health = 100
        this.isInvincible = false
        // Weapons
        this.weapon = new Weapon(this)
        this.sword = new Sword(this.ctx)
        // Graphics
        this.rightSprite = './assets/img/playerRight.png'
        this.leftSprite = './assets/img/playerLeft.png'
        this.playerImg = new Image()
        this.playerImg.src = this.rightSprite
        this.playerImg.frames = 12
        this.playerImg.frameIndex = 6
        this.tick = 0
        // Sound
        this.jumpSound = new Audio()
        this.jumpSound.src = './assets/sound/jump1.mp3'
        // Others
        this.setListener()
    }

    move() {
        this.playerActions()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= this.maxY) {
            this.velocity.y += this.gravity
        } else {
            this.velocity.y = 0
        }
        this.weapon.move();
    }

    setListener() {
        document.onkeydown = event => this.getInput(event.key, true)
        document.onkeyup = event => this.getInput(event.key, false)
    }

    getInput(key, state) {
        switch (key) {
        case 'A':
        case 'a':
            this.actions.left = state
            break;
        case 'D':
        case 'd':
            this.actions.right = state
            break;
        case ' ': // Space
            this.actions.jump = state
            break;
        case 'Q':
        case 'q':
        case 'Shift':
            this.actions.shoot = state
            break;
        } 
    }

    playerActions() {
        this.collisionLimits()
        this.isOnFloor()
        this.playerHealth()
        if(this.actions.left) {
            this.velocity.x = -5
            this.playerImg.src = this.leftSprite
            this.weapon.direction = "left"
        } else if (this.actions.right) {
            this.velocity.x = 5
            this.playerImg.src = this.rightSprite
            this.weapon.direction = "right"
        } else {
            this.velocity.x = 0
        }

        if(this.actions.jump && !this.isJumping()) {
            this.velocity.y -= 18
            this.jumpSound.play()
        }
        if (this.actions.shoot) {
            this.weapon.shoot()
        }
    }

    isOnFloor() {
        if (this.position.y + this.height >= this.maxY) {
            this.velocity.y = 0
            this.position.y = Math.round(this.maxY - this.height)
        }
    }

    isJumping() {
        return this.position.y < Math.round(this.maxY - this.height)
    }

    playerHealth(){
        if(this.health > 100) {
            this.health = 100
        }
        if(this.health <= 0) {
            this.health = 0
        }
    }

    collisionLimits() {
        if(this.position.x + this.width >= RIGHT_LIMIT) {
            this.velocity.x = 0
            this.position.x = Math.round(RIGHT_LIMIT - this.width)
        }
        if(this.position.x <= LEFT_LIMIT) {
            this.velocity.x = 0
            this.position.x = Math.round(LEFT_LIMIT)
        }
    }
    
    draw() {
        this.ctx.drawImage(
            this.playerImg,
            this.playerImg.frameIndex * this.playerImg.width / this.playerImg.frames,
            0,
            this.playerImg.width / this.playerImg.frames,
            this.playerImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
        this.weapon.draw()
        this.weapon.clearSwords()
    }

    animate() {
        if (this.actions.right || this.actions.left) {
            this.animationMove()
        } else {
            this.animationIdle()
        }

        if(this.isJumping()) {
            this.animationJump()
        }
    }

    // State Animation (idle, move, jump)
    animationIdle() {
        this.tick++
        
        if (this.tick > 3) {
          this.tick = 0
          this.playerImg.frameIndex++
        }
        if (this.playerImg.frameIndex >= 5) {
          this.playerImg.frameIndex = 0
        }
    }
    animationMove() {
        this.tick++
        
        if (this.tick > 3) {
          this.tick = 0
        
            if (this.actions.right || this.actions.left) {
                this.playerImg.frameIndex++
            } else {
            this.playerImg.frameIndex= 6
            }
        }
        if (this.playerImg.frameIndex >= 11) {
          this.playerImg.frameIndex = 6
        }
    }
    animationJump() {
        this.playerImg.frameIndex = 11
    }
}