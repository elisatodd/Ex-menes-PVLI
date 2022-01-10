import Level from "./level.js";


 export default class Menu extends Phaser.Scene {

   

    constructor(){
        super({ key: 'menu' });
        {

        };
    }

    /**
     * Crea lo que se ve en el menú: fondo y objetos.
     */
    preload(){

        this.add.image(0, this.scale.height, 'menuWallpaper')
        .setOrigin(0, 1);
        this.easy=this.add.image(this.scale.width/2,this.scale.height/2-100,'easy').setInteractive();
        this.medium=this.add.image(this.scale.width/2,this.scale.height/2,'medium').setInteractive();
        this.hard=this.add.image(this.scale.width/2,this.scale.height/2+100,'hard').setInteractive();
        
    }
    
    create(){
        this.easy.on('pointerdown', function (event) { 
            this.scene.start('level',{balls:3});
          }, this);
        this.medium.on('pointerdown', function (event) { 
            this.scene.start('level',{balls:6});
          }, this);
        this.hard.on('pointerdown', function (event) { 
            this.scene.start('level',{balls:9});
          }, this);
    }


}