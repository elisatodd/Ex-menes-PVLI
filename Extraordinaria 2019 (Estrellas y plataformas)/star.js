

export default class Star extends Phaser.GameObjects.Sprite {

    /*
     * Constructor de estrella
    */
    constructor(scene, x, y, size) {
        super(scene, x, y, 'star');

        this.scene = scene; // guarda la escena en la que se encuentra
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);

        scene.star = this;

      

        //this.body.setSize(size, size); no se pero no hace falta
        this.setScale(size);


   
       
        //haciendo esta funcion anonima el this pasa de ser la funcion a la escena
        scene.physics.add.collider(this, scene.player, (o1, o2) => {o1.ColStar()});
    }

 

    ColStar()
    {         
        this.scene.Impact();       
        this.destroy();   
    }

  
}
