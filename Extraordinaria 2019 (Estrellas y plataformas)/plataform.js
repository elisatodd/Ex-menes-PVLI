export default class Plataform extends Phaser.GameObjects.Sprite {

    /*
     * Constructor de estrella
    */
    constructor(scene, x, y, size, group) {
        super(scene, x, y, 'wall');

        this.scene = scene; // guarda la escena en la que se encuentra
       
        this.scene.add.existing(this);
        //esto lo hace estatico, el true
        this.scene.physics.add.existing(this, true);
        this.body.checkCollision.down = false;
       
        //this.body.setSize(size, size); no se pero no hace falta
        this.setScale(size);


      
        
        group.add(this);
    }

   

  
}
