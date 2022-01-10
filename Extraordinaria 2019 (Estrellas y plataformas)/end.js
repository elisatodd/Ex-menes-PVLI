export default class EndScene extends Phaser.Scene {
    
    text = '';
   
    constructor(data) {     
      
        super({ key: 'endScene' });       
        {
          
        };
       
    }

   create()
   {
 

    this.add.text(350, 250, "Fin del juego", { font: '16px Courier', fill: '#00ff00' });

   }
   

   
}