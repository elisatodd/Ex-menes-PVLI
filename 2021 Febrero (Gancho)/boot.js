export default class Boot extends Phaser.Scene{

    /**
     * Escena donde se cargan todos los assets necesarios para el juego
     */
    constructor(){
        super({key: 'boot'});
    }

    preload(){
        this.load.setPath('./assets');

        this.load.image('button', './button.png');

        this.load.image('background', './background.png');
        this.load.image('wallH', './wallH.png');
        this.load.image('wallV', './wallV.png');
        this.load.image('bubble', './bubble.png');
        this.load.image('hook', './arrow.png');

        this.load.audio('hit', './hit.wav');

        //Cargamos las spritesheets
        this.load.spritesheet('player', './personaje.png', { frameWidth: 383.75, frameHeight: 554.25 });

    }

    /**
     * Crea las animaciones que se usan en el juego. En este caso las del jugador moviéndose.
     */
    createAnimations() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 0 }]
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'shoot',
            frames: [{ key: 'player', frame: 4 }],
        });
    }


    create() {
        this.createAnimations();
        this.scene.start('mainMenu');
    }
}