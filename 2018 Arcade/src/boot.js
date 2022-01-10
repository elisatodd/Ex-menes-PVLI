export default class Boot extends Phaser.Scene{
    /**
  * Constructor de la escena
  */
  constructor() {
    super({ key: 'boot' });
  }
  /**
  * Carga de los assets del juego
  */

  preload()
  {
    //IMAGENES
    this.load.setPath('assets/images/');
    this.load.image('box', 'box.png');
  }
  
  create() {
    this.scene.start('level');
   
  }
}