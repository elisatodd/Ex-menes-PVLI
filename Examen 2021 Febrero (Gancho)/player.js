import Hook from './hook.js';

/**
 * Clase que representa el jugador del juego. 
 * se mueve de izquierda
a derecha (teclas A-D) y dispara con la barra espaciadora.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, scale, wallsGroup, enemiesGroup) {
        super(scene, x, y, 'player');

        this.scene = scene; // guardo ref a la escena
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(scale);

        this.speed = 300;
        this.canShoot = true;

        // Teclas para las acciones del player
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //this.input.keyboard.on('keydown-SPACE', () => { this.shoot });

        this.cooldown = 2000; // 2 segundos de cooldown para el gancho

        // ganchos que dispara
        this.hooks = this.scene.add.group(); 

        this.scene.physics.add.collider(this.hooks, this.scene.borders);
        this.scene.physics.add.overlap(this.hooks, this.scene.enemies, (h, e) => { e.die(); h.die() });
        // Hacemos overlap en lugar de collision
    }

    /**
     * Métodos preUpdate de Phaser.
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.space.isDown) {
            if (this.canShoot)
                this.shoot();
        }
        else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
            this.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
            this.anims.play('right', true);
        } else {
            this.body.setVelocityX(0); //no se mueve si no se está pulsando nada
            this.body.setVelocityY(0);
            this.anims.play('turn');
            // this.body.stop(); //<- tambien se puede hacer eso
        }
    }

    /**
     * El player dispara un gancho hacia el techo
     */
    shoot() {
        this.anims.play('shoot', true);
        this.canShoot = false;
        this.isShooting = true;
        this.scene.time.delayedCall(this.cooldown, function () { this.canShoot = true }, [], this); // cuando acaba el cooldown, puedo disparar de nuevo

        //this.time.delayedCall(1000, function () { this.player.isShooting = false }, [], this); // hasta que el gancho llegue al techo , no puede moverse

        let hook = new Hook(this.scene, this.x, this.y, this.hooks);

        this.scene.time.delayedCall(3000, function () { hook.destroy() }, [], this); // lo destruye cuando lleve 3 seg en el techo

    }


}
