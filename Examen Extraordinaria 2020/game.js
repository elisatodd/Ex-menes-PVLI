import Boot from './boot.js'
import GameScene from './gameScene.js';
import EndScene from './end.js';
import Pause from './pause.js';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  autoCenter: true,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 400},
      debug: true
    }
  },
  scene: [
    Boot, GameScene, EndScene, Pause
  ]
};

new Phaser.Game(config);