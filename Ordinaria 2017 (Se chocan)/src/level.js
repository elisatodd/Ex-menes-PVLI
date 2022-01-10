
import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });{
      
    }
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.background = this.add.image(350 ,200 , 'walabi', './assets/sprites/walabi.png');

    this.player1 = new Player(this, 300, 250, true);
    //this.add.image(100, 200, 'player');

  }
  
  update(t, dt) {

   
  }
 


}
