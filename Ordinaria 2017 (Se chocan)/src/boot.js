/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    this.load.audio('ballSound','assets/sounds/miau.wav');
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('player', 'sus.png');
    this.load.image('player2', 'sus2.png');
    this.load.image('ball','ball.png');
    this.load.image('walabi','walabi.png');
    this.load.image('menuWallpaper','menuWallpaper.jpg');
    this.load.spritesheet('susAnimation','susAnimation.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('sus2Animation','sus2Animation.png', { frameWidth: 64, frameHeight: 64 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
  }
}