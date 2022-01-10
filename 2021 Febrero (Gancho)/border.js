/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 */
 export default class Border extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @param {Phaser.Scene} scene Escena a la que pertenece
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {boolean} vertical Si el borde es un lateral (está colocado en vertical)
     * @param {Phaser.Group} grupo Grupo en el que introducimos el borde
     */
    constructor(scene, x, y, vertical, grupo) {

        if(vertical){
            super(scene, x, y, 'wallV');
        }else{
            super(scene, x, y, 'wallH');
        }

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);

        // -> no hace falta al ser estático
        //this.body.setImmovable = true; // no queremos que los muros se muevan
        //this.body.allowGravity = false; // tampoco tienen gravedad 

        grupo.add(this);
    }
}