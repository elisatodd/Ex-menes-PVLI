export default class Gun extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,scale,) {
      super(scene, x, y, 'gun');
      this.setScale(scale);
      this.scene.add.existing(this);
  
      //Le mete físicas al objeto
      this.scene.physics.add.existing(this);
      this.scene.physics.add.collider(this, this.scene.platform);
      this.speedY = 500;
      this.body.velocity.set(0, -this.speedY);
    }
    

  }