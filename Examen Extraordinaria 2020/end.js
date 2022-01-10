export default class EndScene extends Phaser.Scene {

   
    constructor() {       
        super({ key: 'endScene' });       
        {
          
        };
         
    }

   create()
   {
    this.add.text(350, 250, 'fin del juego', { font: '16px Courier', fill: '#00ff00' });
   }

   
}