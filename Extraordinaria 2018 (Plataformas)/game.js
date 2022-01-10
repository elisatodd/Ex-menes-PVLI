
import GameScene from './gameScene.js';
import EndScene from './end.js';
import Menu from './menu.js';

let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
          debug: true
        }
    },
    scene: [
        Menu, GameScene, EndScene
    ]
    };
  
  
  
  new Phaser.Game(config);