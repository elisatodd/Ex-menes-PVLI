

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 */
 export default class Player extends Phaser.GameObjects.Sprite {

    puntuation = -1;
    label;
    jump =false;

    constructor(scene, x, y) {

        super(scene, x, y, 'dude');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(1, 1);

        this.body.setCollideWorldBounds();

        this.anims.create({
            key: 'runDer',
            frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 9 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'runIzq',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3}),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 4 }),
            frameRate: 3,
            repeat: -1
        });


        this.speed = 300;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.canMove = true;

        this.label = this.scene.add.text(10, 10, "");
        this.diamanteRecogido();
    } 

   
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        
        if (this.cursors.space.isDown && this.body.onFloor()) {
            this.scene.player.body.setVelocity(0, -64*5);
            //this.jump = true;
        }
        else if (this.cursors.left.isDown) {
            this.anims.play('runIzq', true);
            this.body.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown) {
            this.anims.play('runDer', true);
            this.body.setVelocityX(this.speed);
        }
        else {
           
            this.scene.player.body.setVelocityX(0);
            this.anims.play('stop', true);

            //this.jump = false;
        }
    }

    diamanteRecogido()
    {

        if (this.puntuation > -1)
        {
            this.scene.sound.add('death').play();
        }

        this.puntuation++;
        
        console.log(this.puntuation);
        this.label.text = 'Numero de monedas: ' + this.puntuation;

        if (this.puntuation === 3)
        {
            this.scene.scene.start('endScene');
        }

    }

}
