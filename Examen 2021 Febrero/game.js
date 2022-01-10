import MainMenu from './mainmenu.js';
import GameScene from './gameScene.js';
import EndScene from './endScene.js';
import Boot from './boot.js';

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
        Boot, MainMenu, GameScene, EndScene
    ]
    };
  
  
  
  new Phaser.Game(config);