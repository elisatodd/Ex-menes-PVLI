import GameScene from './gameScene.js';
import EndScene from './end.js';

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 400
            },
          debug: true
        }
    },
    scene: [
        GameScene, EndScene
    ]
    };
  
  
  
  new Phaser.Game(config);