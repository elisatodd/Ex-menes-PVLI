import Boot from './boot.js';
import Level from './level.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
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
                y: 400
            },
            debug: {
                showBody: false,
                showStaticBody: false
            }
        } 
    }
};

new Phaser.Game(config);