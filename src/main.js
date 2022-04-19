// Lily Pham
// Rocket Patrol Mods
// 4/17/2022
// took ~3 hours not including breaks
// collaborated with Tai Wen Lee and section group to help things go smoother
//
// Point break Down:
// Implement a simultaneous two-player mode (30) 40 min
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20) 10 min
// Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (20) 20 min
// Implement parallax scrolling (10) 20 min
// Display the time remaining (in seconds) on the screen (10) 5 min
// Allow the player to control the Rocket after it's fired (5) 1 min
// Track a high score that persists across scenes and display it in the UI (5) 6 min

let config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  scene: [Menu, Play],
};

let game = new Phaser.Game(config);

// reserve keyboard bars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyA, keyD, keyW;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let highscore = 0;
