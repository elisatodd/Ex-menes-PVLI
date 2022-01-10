import Box from './box.js'

 export default class Level extends Phaser.Scene{

    /**
     * Constructor de la escena principal de juego
     */
    constructor(){
        super({key: 'level'})
    }

    create(){

        //Creamos los límites con el mundo
        this.matter.world.setBounds();

        this.boxes = [];

        this.impulseSound = this.sound.add('impulse');
        this.destroySound = this.sound.add('destroy');
        this.createSound = this.sound.add('create_box');

        //Input
        this.spacebar = this.input.keyboard.addKey('space');
        this.i = this.input.keyboard.addKey('i');
        this.k = this.input.keyboard.addKey('k');
        this.l = this.input.keyboard.addKey('l');
        this.j = this.input.keyboard.addKey('j');
        this.d = this.input.keyboard.addKey('d');

        this.impulse = 0.3;

        this.i.on('down', function () {
            this.selectedBox.thrustLeft(this.impulse);
            this.impulseSound.play()
        }, this);
        
        this.k.on('down', function () {
            this.selectedBox.thrustRight(this.impulse);
            this.impulseSound.play()
        }, this);
        
        this.j.on('down', function () {
            this.selectedBox.thrustBack(this.impulse);
            this.impulseSound.play()
        }, this);
        
        this.l.on('down', function () {
            this.selectedBox.thrust(this.impulse);
            this.impulseSound.play()
        }, this);

        this.spacebar.on('down', function () {
            let x = Phaser.Math.Between(0, this.cameras.main.width);
            let y = Phaser.Math.Between(0, this.cameras.main.height);
            new Box(this, x, y, this.boxes);
            this.createSound.play();
            if(this.boxes.length === 1) //Si la caja que hay es la única
            {
                this.selectNewBox();
            }
        }, this);

        this.d.on('down', function () {
            if (this.boxes.length > 0){

                this.destroySound.play()
                this.selectedBox.destroy();
                this.boxes.shift();
                if(this.boxes.length > 0){
                    this.selectNewBox();
                }
            }
        }, this);
    }

    selectNewBox()
    {
        //La selección que hacemos en este caso es el primer elmento del array
        this.selectedBox = this.boxes[0];
        this.selectedBox.select();
    }
 }

