export default class Hook extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, group) {
        super(scene, x, y, 'hook');

        //this.s = scene; // guarda la escena en la que se encuentra
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        group.add(this);
        
        this.body.allowGravity = false;
        this.body.setVelocity(0, -this.scene.cameras.main.height); // sube -> velocidad negativa en y
    }

    /**
     * Se destruye el gancho
     */
    die() {
        this.destroy();
    }
}