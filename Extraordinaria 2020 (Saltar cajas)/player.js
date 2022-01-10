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
    constructor(scene, x, y, size, enemiesGroup) {
        super(scene, x, y, 'player');

        this.playerSize = size;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        this.setDepth(1);

        // Tamaño del player (por el enunciado)
        this.displayWidth = this.playerSize;
        this.displayHeigth = this.playerSize;

        this.play('runningRight');

        this.scene.game.config.physics.arcade.gravity.y; // ACCESO A LA GRAVEDAD
        this.jumpSpeed = -(5 * this.playerSize * 1.4); // el 1.4 es un offset para que salte más alto
        this.jumpTime = 2000;

        // Colisión con los enemigos
        this.scene.physics.add.collider(enemiesGroup, this, (e,p) => {this.playerHit();});

        // para que el player salte con cualquier tecla
        scene.input.keyboard.on('keydown', () => { this.jump() }, this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    jump() {
        if (this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);

            // sonido
            let sfx = this.scene.sound.add('jump', {});
            sfx.play();

            this.play('jump');
            this.on('animationcomplete', this.stopJump);
        }

        //        this.time.addEvent({ delay: this.jumpTime, callback: this.stopJump, callbackScope: this });
    }

    playerHit(){
        console.log('mueres');
        this.scene.collide();

    }
    /**
     * Para el salto. Solo es visual: cambia la animación a andar de nuevo
     */
    stopJump() {
        this.play('runningRight');
    }
}
