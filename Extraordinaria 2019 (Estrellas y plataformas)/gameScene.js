
import Player from './player.js';
import Star from './star.js';
import Plataform from './plataform.js';


export default class GameScene extends Phaser.Scene {

    
    player;
    puntuation = 0;

    star;
    lastStarPos = 5;
   
    plataforms;
    
    constructor() {     
        
        super({ key: 'gameScene' });       
        {
          
        };
         
     
    }

    preload()
    {
        //this.load.image('player', './assets/player.png');
        this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('background', './assets/background.png');       
        this.load.image('wall', './assets/wall.png');
        this.load.image('star', './assets/star.png'); 
        this.load.audio('hit', './assets/hit.wav');
        this.load.audio('win', './assets/win.wav');
    }

    
    create()
    {
      
        this.background = this.add.image(0, 0, "background");
        this.text =  this.add.text(25, 25, "Puntuation : " + this.puntuation, { font: '16px Courier', fill: '#ffffff' }).setScrollFactor(0);

      //usar grupos normales mriar plataforma
        this.plataforms = this.add.group();

      
        new Plataform(this, 100, 200, 1, this.plataforms);
        new Plataform(this, 700, 200, 1, this.plataforms);
        new Plataform(this, 400, 400, 1, this.plataforms);
        new Plataform(this, 100, 500, 1, this.plataforms);
        new Plataform(this, 700, 500, 1, this.plataforms);

        new Player(this, 400, 200, 1.8, this.plataforms);

        this.physics.add.collider(this.player, this.plataforms); 

        this.SpawnStar();
        
    }

    update() {
        this.player.Move();
      }

   
    AddPuntuation()
    {
        this.player.anims.play('turn');

        this.puntuation++;
        this.text.text = "Puntuation : " + this.puntuation;
        if(this.puntuation === 10)
        {
            this.sound.add('win').play();
            this.scene.start('endScene');
        }
        else
            this.sound.add('hit').play();
    }

    Impact()
    {
        this.AddPuntuation();       
        this.SpawnStar();
    }

    SpawnStar()
    {
        //para esto mira el ejemplo de guille de phaser donde hay un rnd pick que coge uno aleatorio
        let m;
        do
        {
            m = Phaser.Math.Between(0, 4);
        }while(m === this.lastStarPos);

        this.lastStarPos = m;

       this.star = new Star(this, this.plataforms.children.entries[m].x, this.plataforms.children.entries[m].y - 50, 1);
    }
}