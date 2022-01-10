
export default class Boot extends Phaser.Scene{

    /**
     * Escena donde se cargan todos los assets necesarios para el juego
     */
    constructor(){
        super({key: 'boot'});
    }

    preload(){
        this.load.setPath('./assets') // pongo la direccion default

        this.load.image('background', 'background.png');
        this.load.image('mountains0', 'mountains-back.png');
        this.load.image('mountains1', 'mountains-mid1.png');
        this.load.image('mountains2', 'mountains-mid2.png');
        this.load.image('enemy', 'block.png');

        this.load.audio('jump', 'hit.wav');
        //Cargamos las spritesheets
        this.load.spritesheet('player', 'dude.png', {frameWidth: 32, frameHeight: 48});
    }

    createAnimations(){
        this.anims.create({
            key: 'runningRight',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'runningLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            repeat: 1,
            duration: 1100 //  lo que dura el salto
            
        });
    }

    create() {
        this.createAnimations();
        this.scene.start('gameScene');
    }
}