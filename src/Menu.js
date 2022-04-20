class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // load audio
    this.load.audio("sfx_select", "./assets/blip_select12.wav");
    this.load.audio("sfx_explosion", "./assets/explosion38.wav");
    this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
  }

  create() {
    // menu text config
    let menuConfig = {
      fontFamily: "Courier",
      fontSize: "28px",
      backgroundColor: "#F3B141",
      color: "#843605",
      align: "right",
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0,
    };

    // show menu text
    this.add
      .text(
        game.config.width / 2,
        game.config.height / 2 - borderUISize * 2 - borderPadding * 2,
        "ROCKET PATROL",
        menuConfig
      )
      .setOrigin(0.5);
    this.add
      .text(
        game.config.width / 2,
        game.config.height / 2 - borderUISize - borderPadding,
        "Highscore: " + highscore,
        menuConfig
      )
      .setOrigin(0.5);
    this.add
      .text(
        game.config.width / 2,
        game.config.height / 2,
        "1: Use ←→ arrows to move & ↑ to fire",
        menuConfig
      )
      .setOrigin(0.5);
    this.add
      .text(
        game.config.width / 2,
        game.config.height / 2 + borderUISize + borderPadding,
        "2: Use (a)(d) to move & (w) to fire",
        menuConfig
      )
      .setOrigin(0.5);
    menuConfig.backgroundColor = "#00FF00";
    menuConfig.color = "#000";
    this.add
      .text(
        game.config.width / 2,
        game.config.height / 2 + borderUISize * 2 + borderPadding * 2,
        "Press ← for Easy or → for Hard",
        menuConfig
      )
      .setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 30000,
      };
      this.sound.play("sfx_select", { volume: 0.5 });
      this.scene.start("playScene");
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 10000,
      };
      this.sound.play("sfx_select", { volume: 0.5 });
      this.scene.start("playScene");
    }
  }
}
