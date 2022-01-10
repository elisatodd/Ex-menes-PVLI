
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 */
 export default class Joya extends Phaser.GameObjects.Sprite {


    first = true;
    cogerya = false;
    puntos = 0;
    label;
    
    constructor(scene, x, y, player) {
        super(scene, x, y, 'joya');

        this.setScale(0.05, 0.05);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.player = player;
            
    } 

    preUpdate()
    {
        super.preUpdate();

        
        if (this.scene.player.body.onFloor() && this.first)
        {
            this.cogerya = true;
            this.first = false;
        }
        
    
        if (this.scene.physics.overlap(this.scene.player, this) && this.cogerya) {
            this.destroy();
            this.player.diamanteRecogido();
            console.log("des");
        }

    }

    /*
    diamanteRecogido()
    {
        this.puntos++;
        this.label.text = 'Numero de monedas: ' + this.puntos;

    }*/


}
