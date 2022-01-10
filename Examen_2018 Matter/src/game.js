import Boot from './boot.js';
import Level from './level.js';

/**
 * Configuración de juego
 */
let config = {
    type: Phaser.auto,
    width:  800,
    height: 500,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [Boot, Level],
    physics: { 
        default: 'matter', 
        matter: { 
            enableSleeping: true,
            gravity: {
                y: 0
            },
            debug: {
                showBody: false,
                showStaticBody: false
            }
        } 
    }
}
new Phaser.Game(config);