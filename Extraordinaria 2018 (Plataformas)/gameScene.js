import Player from './player.js';
import Platform  from './platform.js';
import Joya from './joya.js';

export default class GameScene extends Phaser.Scene {

    
    player;
    
    background;
    ground;

    blocks = [];

    playing = true;   
    jumping = false; 
    jumpingPoint = false;
    label;

    invoke;

    constructor() {       
        super({ key: 'gameScene' });       
        {
          
        };

         
    }

    preload()
    {
        this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        //this.load.image('player', './assets/topo.png');
        this.load.image('joya', './assets/qjoya.png');
        this.load.image('background', './assets/mina.jpg');
        this.load.image('block', './assets/block.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('platform', './assets/platform.png');

        this.load.audio('death', './assets/death.wav');
        this.load.audio('whoosh', './assets/ganarPuzzle.wav');
        this.load.audio('hit', './assets/perderPuzzle.wav');

    }

    create()
    {
        this.background = this.add.image(300,200, "background");

       this.ground = this.physics.add.image(400, 700, 'ground').setScale(2);
       this.ground.setImmovable(true);
       this.ground.body.allowGravity = false;
   
        this.player = new Player(this, 0, 0);

        this.p1 = new Platform(this, 500, 275, this.player, true);
        this.p2 = new Platform(this, 100, 275, this.player, true);
        this.p3 = new Platform(this, 300, 150, this.player, true);

        this.j1 = new Joya(this, 500, 240, this.player);
        this.j2 = new Joya(this, 100, 240, this.player);
        this.j3 = new Joya(this, 300, 115, this.player);


        this.label = this.add.text(10, 10, "");
        
    }


}