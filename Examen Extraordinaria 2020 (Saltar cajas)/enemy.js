/**
 * Clase que representa las esferas del juego. Estas se mueven aleatoreamente por el escenario.
 */
export default class Enemy extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del enemigo
     * @param {Phaser.Scene} scene Escena a la que pertenece
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {number} size Tamaño de la bola
     * @param {group} group Grupo de enemigos
     * @param {number} lives número de veces que se puedo
     */
    constructor(scene, x, y, size, group, speed, player) {
        super(scene, x, y, 'enemy');

        this.s = scene; // guarda la escena en la que se encuentra
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.group = group; // guarda el grupo al que pertenece
        group.add(this);

        this.displayWidth = size;
        this.displayHeigth = size;
        this.speed = speed;

        //this.body.velocity.set(-this.speed*2, 0);
        this.body.setVelocity(-64 * 2, 0);

        // Queremos que no se salga de los límites del mundo
        this.body.setCollideWorldBounds();

        this.player = player;

        this.destroyed = false;
    }

    /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
    preUpdate() {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate();

        if (!this.destroyed && this.x < this.player.x - this.displayWidth){
            console.log('caja superada');
            this.scene.obstaculoSuperado();
            this.destroyed = true;
            this.scene.time.addEvent({ delay: 2500, callback: this.destroy, callbackScope: this });
        }
    }

    /**
     * Qué ocurre cuando recibe una colisión.
     * Se llama desde la escena de juego.
     */
    die() {
        if (this.lives > 0) {

            // Animación división
            new Enemy(this.s, this.body.x, this.body.y, this.size / 2, this.group, this.player, this.lives - 1, -1);
            new Enemy(this.s, this.body.x, this.body.y, this.size / 2, this.group, this.player, this.lives - 1);

            // Efecto de sonido esfera dividida
            const config = {
                mute: false,
                volume: 0.5,
                loop: false,
                delay: 0,
            };
            let sfx = this.s.sound.add('hit', config);
            sfx.play();


            this.destroy();

        } else {
            this.body.enable = false; // Para que no siga colisionando
            // Animación de esfera destruída
            let tween = this.s.tweens.add({
                targets: this,
                alpha: 0,
                duration: 1000,
                ease: 'Sine.easeOutExpo',
                repeat: 0,
                callback: function (event) { this.destroyMe },
                callbackScope: this
            });
            // Efecto de sonido esfera destruída
            const config = {
                mute: false,
                volume: 0.5,
                loop: false,
                delay: 0,
            };
            let sfx = this.s.sound.add('whoosh', config);
            sfx.play();

        }

    }

    /**
     * Termina el movimiento de este enemigo
     */
    stopMoving() {
        this.body.velocity.set(0, 0);
    }

    /**
     * Se destruye a sí mismo
     */
    destroyMe() {
        this.destroy();
    }
}
