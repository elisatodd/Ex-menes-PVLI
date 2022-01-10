export default class Menu extends Phaser.Scene {

   
    constructor() {       
        super({ key: 'menu' });       
        {
          
        };
         
    }

    preload()
    {
        this.load.image('boton', './assets/block.png');
    }

   create()
   {
        this.add.text(350, 250, 'Comenzar el juego', { font: '16px Courier', fill: '#00ff00' });

        this.boton = this.add.image(200, 200, 'boton');
        this.boton.setInteractive().on('pointerdown', this.queempiece);   
    }

    queempiece()
    {
       this.scene.scene.start('gameScene');
       console.log("hola");
    }
   

   
}