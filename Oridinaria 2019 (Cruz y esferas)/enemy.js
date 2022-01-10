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
    constructor(scene, x, y, size, group, player, lives = 3, direction = 1) {
        super(scene, x, y, 'enemy');

        this.s = scene; // guarda la escena en la que se encuentra
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.group = group; // guarda el grupo al que pertenece
        group.add(this);

        this.speed = 200;
        this.lives = lives; // vudas que tiene
        this.size = size; // tamaño de la pelota

        this.player = player; // referencia al player

        // al spawnear, cada pelota tiene una direccion diferente, determinada por direction
        this.body.velocity.set(this.speed * direction, this.speed);

        // Queremos que no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        // Y que rebote contra los muros
        this.body.bounce.set(1);

        //this.body.setSize(size, size); no se pero no hace falta
        this.setScale(size);

    }

    /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
    preUpdate() {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate();
        // animación moverse
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
                callback: function(event){this.destroyMe},
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
    destroyMe(){
        this.destroy();
    }
}
