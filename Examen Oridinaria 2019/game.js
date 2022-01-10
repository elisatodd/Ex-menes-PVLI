
import GameScene from './gameScene.js';
import EndScene from './end.js';

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  autoCenter: true,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [
    GameScene, EndScene
  ]
};

new Phaser.Game(config);