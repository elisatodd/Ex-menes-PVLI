/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 */
 export default class Border extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @param {Phaser.Scene} scene Escena a la que pertenece
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, scaleX, scaleY, player, grupo) {
        super(scene, x, y, 'border');
        
        this.displayWidth = scaleX;
        this.displayHeight= scaleY;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true); // TRUE -> para un objeto estático

        grupo.add(this);
    }
}