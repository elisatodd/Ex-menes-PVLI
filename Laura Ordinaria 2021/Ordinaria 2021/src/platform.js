


export default class Platform extends Phaser.GameObjects.Sprite {
  
  //Plataforma en la parte de arriba con la que colisiona el gancho
  constructor(scene,scale, x, y) {
    super(scene, x, y, 'platform');
    this.setScale(scale,0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setImmovable(true);
  }

}
 