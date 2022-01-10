/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        this.speed = 300;

        // para que el player se mueva
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.canMove = true;
    }

    /**
     * Devuelve si el player se está moviendo
     */
    isMoving() {
        return (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0);
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.canMove) {
            // falta normalizar -> movimiento diagonal
            // hay que cambiarlo y poner un vector
            if (this.cursors.up.isDown) {
                this.body.setVelocityY(-this.speed);
                this.scene.movingTween();
            }
            else if (this.cursors.left.isDown) {
                this.body.setVelocityX(-this.speed);
                this.scene.movingTween();
            }
            else if (this.cursors.right.isDown) {
                this.body.setVelocityX(this.speed);
                this.scene.movingTween();
            }
            else if (this.cursors.down.isDown) {
                this.body.setVelocityY(this.speed);
                this.scene.movingTween();
            } else {
                // Animación:
                // Solo da comienzo al tween de estar estático si viene de estar moviendose.
                if (this.isMoving()) {
                    this.scene.staticTween.resume();
                }

                this.body.setVelocityX(0); //no se mueve si no se está pulsando nada
                this.body.setVelocityY(0);

                // this.body.stop(); //<- tambien se puede hacer eso
            }
        }

    }


    /**
     * Termina el movimiento del jugador.
     * Además evita que se pueda mover por input.
     */
    stopMoving() {
        this.body.velocity.set(0, 0);

        this.canMove = false;
    }
}
