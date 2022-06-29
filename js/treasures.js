//*************** Coin ***************//
class Coin {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 22
        this.height = 22
        this.position = {
            x: x,
            y: y
        }
        // Graphics
        this.coinImg = new Image()
        this.coinImg.src = '/assets/img/coin.png'
        this.coinImg.frames = 4
        this.coinImg.frameIndex = 0
        this.tick = 0
        // Sound
        this.coinSound = new Audio();
        this.coinSound.src = '/assets/sound/coin2.wav';
    }

    coinCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.coinImg,
            this.coinImg.frameIndex * this.coinImg.width / this.coinImg.frames,
            0,
            this.coinImg.width / this.coinImg.frames,
            this.coinImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.tick++
        if (this.tick > 4) {
          this.tick = 0
          this.coinImg.frameIndex++
        }
        if (this.coinImg.frameIndex >= this.coinImg.frames) {
          this.coinImg.frameIndex = 0
        }
    }
}

//*************** Potion ***************//
class Potion {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 18
        this.height = 28
        this.position = {
            x: x,
            y: y
        }
        this.restore = 100
        // Graphics
        this.potionImg = new Image()
        this.potionImg.src = './assets/img/potion.png'
        this.potionImg.frames = 7
        this.potionImg.frameIndex = 0
        this.tick = 0
        // Sound
        this.potionSound = new Audio();
        this.potionSound.src = './assets/sound/potion.mp3';
        this.potionSound.volume = 0.2
    }

    potionCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.potionImg,
            this.potionImg.frameIndex * this.potionImg.width / this.potionImg.frames,
            0,
            this.potionImg.width / this.potionImg.frames,
            this.potionImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.tick++
        if (this.tick > 4) {
          this.tick = 0
          this.potionImg.frameIndex++
        }
        if (this.potionImg.frameIndex >= this.potionImg.frames) {
          this.potionImg.frameIndex = 0
        }
    }
}

//*************** Diamond ***************//
class Diamond {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 28
        this.height = 24
        this.position = {
            x: x,
            y: y
        }
        // Graphics
        this.diamondImg = new Image()
        this.diamondImg.src = './assets/img/diamond.png'
        this.diamondImg.frames = 4
        this.diamondImg.frameIndex = 0
        this.tick = 0
        // Sound
        this.diamondSound = new Audio();
        this.diamondSound.src = './assets/sound/diamond.mp3';
        this.diamondSound.volume = 0.2
    }

    diamondCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.diamondImg,
            this.diamondImg.frameIndex * this.diamondImg.width / this.diamondImg.frames,
            0,
            this.diamondImg.width / this.diamondImg.frames,
            this.diamondImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.tick++
        if (this.tick > 4) {
          this.tick = 0
          this.diamondImg.frameIndex++
        }
        if (this.diamondImg.frameIndex >= this.diamondImg.frames) {
          this.diamondImg.frameIndex = 0
        }
    }
}