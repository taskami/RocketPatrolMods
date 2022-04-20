class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    // load images/tiles
    this.load.image("rocket1", "./assets/rocket1.png");
    this.load.image("rocket2", "./assets/rocket2.png");
    this.load.image("spaceship", "./assets/spaceship.png");
    this.load.image("starfield0", "./assets/starfield0.png");
    this.load.image("starfield1", "./assets/starfield1.png");
    this.load.image("starfield2", "./assets/starfield2.png");
    this.load.image("particle", "./assets/particle.png");

    // load spritesheet
    this.load.spritesheet("explosion", "./assets/explosion.png", {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9,
    });
  }

  create() {
    //key definition
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // place tile sprites
    this.starfield0 = this.add
      .tileSprite(0, 0, 640, 480, "starfield0")
      .setOrigin(0, 0);
    this.starfield1 = this.add
      .tileSprite(0, 0, 640, 480, "starfield1")
      .setOrigin(0, 0);
    this.starfield2 = this.add
      .tileSprite(0, 0, 640, 480, "starfield2")
      .setOrigin(0, 0);

    // green UI background
    this.add
      .rectangle(
        0,
        borderUISize + borderPadding,
        game.config.width,
        borderUISize * 2,
        0x00ff00
      )
      .setOrigin(0, 0);
    // white borders
    this.add
      .rectangle(0, 0, game.config.width, borderUISize, 0xffffff)
      .setOrigin(0, 0);
    this.add
      .rectangle(
        0,
        game.config.height - borderUISize,
        game.config.width,
        borderUISize,
        0xffffff
      )
      .setOrigin(0, 0);
    this.add
      .rectangle(0, 0, borderUISize, game.config.height, 0xffffff)
      .setOrigin(0, 0);
    this.add
      .rectangle(
        game.config.width - borderUISize,
        0,
        borderUISize,
        game.config.height,
        0xffffff
      )
      .setOrigin(0, 0);

    // add rocket (player 1)
    this.p1Rocket = new Rocket(
      this,
      game.config.width / 2,
      game.config.height - borderUISize - borderPadding,
      "rocket1",
      0,
      keyLEFT,
      keyRIGHT,
      keyUP
    ).setOrigin(0.5, 0);
    // p2 rocket
    this.p2Rocket = new Rocket(
      this,
      game.config.width / 2,
      borderUISize + borderPadding,
      "rocket2",
      0,
      keyA,
      keyD,
      keyW
    ).setOrigin(0.5, 0);

    // add spaceships (x3)
    this.ship01 = new Spaceship(
      this,
      game.config.width + borderUISize * 6,
      borderUISize * 4,
      "spaceship",
      0,
      30
    ).setOrigin(0, 0);
    this.ship02 = new Spaceship(
      this,
      game.config.width + borderUISize * 3,
      borderUISize * 5 + borderPadding * 2,
      "spaceship",
      0,
      20
    ).setOrigin(0, 0);
    this.ship03 = new Spaceship(
      this,
      game.config.width,
      borderUISize * 6 + borderPadding * 4,
      "spaceship",
      0,
      10
    ).setOrigin(0, 0);

    // animation config
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 9,
        first: 0,
      }),
      frameRate: 30,
    });

    // init score
    this.p1Score = 0;
    this.p2Score = 0;

    // display score
    let scoreConfig = {
      fontFamily: "Courier",
      fontSize: "28px",
      backgroundColor: "#F3B141",
      color: "#843605",
      align: "right",
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100,
    };
    this.scoreLeft = this.add.text(
      borderUISize + borderPadding,
      borderUISize + borderPadding * 2,
      this.p1Score,
      scoreConfig
    );
    this.scoreRight = this.add.text(
      game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth,
      borderUISize + borderPadding * 2,
      this.p2Score,
      scoreConfig
    );

    // GAME OVER flag
    this.gameOver = false;

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(
      game.settings.gameTimer,
      () => {
        this.add
          .text(
            game.config.width / 2,
            game.config.height / 2,
            "GAME OVER",
            scoreConfig
          )
          .setOrigin(0.5);
        this.add
          .text(
            game.config.width / 2,
            game.config.height / 2 + 64,
            "Press (R) to Restart or ← for Menu",
            scoreConfig
          )
          .setOrigin(0.5);
        this.gameOver = true;
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        if (this.p2Score > highscore) {
          highscore = this.p2Score;
        }
        this.highscoreText.setText("Highscore: " + highscore);
      },
      null,
      this
    );

    this.clockText = this.add
      .text(
        game.config.width / 2 - borderUISize * 3 - borderPadding * 2,
        borderUISize + borderPadding * 2,
        this.clock.delay - this.clock.elapsed,
        scoreConfig
      )
      .setOrigin(0.5, 0);
    this.highscoreText = this.add
      .text(
        game.config.width / 2 + borderUISize + borderPadding,
        borderUISize + borderPadding * 2,
        "Highscore: " + highscore,
        scoreConfig
      )
      .setOrigin(0.5, 0);
  }

  update() {
    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }

    // moves starfield to the left
    this.starfield0.tilePositionX -= 2;
    this.starfield1.tilePositionX -= 3;
    this.starfield2.tilePositionX -= 4;

    if (!this.gameOver) {
      this.p1Rocket.update(); // update rocket sprite
      this.p2Rocket.update(); // update rocket sprite
      this.ship01.update(); // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
    }

    // check collisions
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01, 1);
    } else if (this.checkCollision(this.p2Rocket, this.ship01)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship01, 2);
    }

    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02, 1);
    } else if (this.checkCollision(this.p2Rocket, this.ship02)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship02, 2);
    }

    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03, 1);
    } else if (this.checkCollision(this.p2Rocket, this.ship03)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship03, 2);
    }

    // timer text
    this.clockText.setText(
      ((this.clock.delay - this.clock.elapsed) / 1000).toFixed(2)
    );
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (
      rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  shipExplode(ship, rocketNum) {
    // temporarily hide ship
    ship.alpha = 0;
    /*
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');            // play explode animation
      boom.on('animationcomplete', () => {   // callback after animation completes
         ship.reset();                       // reset ship position
         ship.alpha = 1;                     // make ship visible again
         boom.destroy();                     // remove explosion sprite
      });*/

    // particle emitter for explosion
    let emitter = this.add.particles("particle").createEmitter({
      x: ship.x,
      y: ship.y,
      speed: { min: 10, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      blendMode: "ADD",
      lifespan: 800,
    });

    this.time.delayedCall(250, () => {
      ship.reset();
      ship.alpha = 1;
      emitter.stop();
    });

    // score increment and repaint
    if (rocketNum == 1) {
      this.p1Score += ship.points;
      this.scoreLeft.text = this.p1Score;
    } else if (rocketNum == 2) {
      this.p2Score += ship.points;
      this.scoreRight.text = this.p2Score;
    }
    this.clock.delay += 5000;

    // play sound
    this.sound.play("sfx_explosion", { volume: 0.5 });
  }
}
