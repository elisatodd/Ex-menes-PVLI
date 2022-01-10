

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 */
 export default class Platform extends Phaser.GameObjects.Sprite {

    cont = 0;
    
    constructor(scene, x, y, player, moverse) {
        super(scene, x, y, 'platform');

        this.setScale(0.5, 0.5);

        this.scene.add.existing(this);

        this.scene.physics.add.existing(this, moverse);
        

        this.collider = this.scene.physics.add.collider(this, player);
        this.body.checkCollision.down = false;

        this.player = player;
    } 


    update()
    {
        /*if (this.player.jump)
        {
            this.desactivarCollider(this.collider);
        }*/

        if (cont <= 0) {
            this.body.setVelocity(0, -64*2);
            cont++;
        }
        else if (cont > 20) {
            this.body.setVelocity(0, +64*2);
            cont--;
        }
       
    }

    /*desactivarCollider(col)
    {
        this.physics.world.removeCollider(col);
    }
    */

}
