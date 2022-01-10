import Data from './data.js'

export default class Boot extends Phaser.Scene{
    
    constructor(){
        super({key: 'boot'});
    }

    preload(){
        this.load.setPath('assets/sprites/');

        //Carga de GO
        this.load.image('box', 'box.png');
        
        Data.sprites.forEach(function(element){
            this.load.image(element, element + '.png');
        }, this);
        
        //Carga de audios
        this.load.setPath('assets/audio/');

        this.load.audio('destroy','destroy.wav');
        this.load.audio('impulse','impulse.wav');
        this.load.audio('create_box','create_box.wav');

    }

    create() {
        this.scene.start('level');
      }
}