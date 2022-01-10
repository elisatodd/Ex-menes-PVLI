import Boot from './boot.js';
import Lose from './lose.js';
import Win from './win.js';
import Level from './level.js';
import Menu from './Menu.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width:  700,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot,Menu, Level, Lose,Win],
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: false 
        } 
    }
};

new Phaser.Game(config);