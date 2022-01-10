export default class Player extends Phaser.GameObjects.Sprite {

    /*
     * Constructor de estrella
    */
    constructor(scene, x, y, size) {
        super(scene, x, y, 'dude');

      

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.add.existing(this);
        scene.physics.add.existing(this);

      

        scene.player = this;

        //this.body.setSize(size, size); no se pero no hace falta
        this.setScale(size);

     

        this.body.setCollideWorldBounds();
        this.Animations(scene);

        this.anims.play('turn');

       
    }

    //los sprites tiene preupdate y no update por alguna razon, llama los cambios en el preupdate
    preUpdate(t,dt) {
        this.Move();
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate(t , dt);
        // animación moverse

     
    }

    
  

  Animations(scene)
  {
    scene.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    scene.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 6 }),
        frameRate: 10,
        repeat: 1
    });
  }

   Move()
   {
    if(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown)
    {
        if (this.cursors.left.isDown)
        {
            this.body.setVelocityX(-160);

            if(this.body.onFloor())
            {
                this.anims.play('left', true);
            }
               
        }
        else if (this.cursors.right.isDown)
        {
            this.body.setVelocityX(160);

            if(this.body.onFloor())
            {
                this.anims.play('right', true);
            }
                
        }

        //si por ejemplo quieres saber si el player esta tocando una paltaforma por abajo haces que cuando colllision player plataforma if "this.player.body.touching.up"
        //y sabes que al estar dando por arriba es que esta colisionando a la platafoema desde abajo

        //ponemos onFloor en ve de touching pq en el suelo, no pasa por los limites del mundo pero no hay colision como tals
        if(this.cursors.up.isDown && this.body.onFloor())
        {
          //si accedemos al body.height sacamos la altura del collider por si el sprite esta escalado
          this.body.setVelocityY(-this.body.height*5);

          this.anims.play('up', true);
            
        }
    }
    
    
    else if(this.body.onFloor())
    {
    this.body.setVelocityX(0);
    this.anims.play('turn');
    }
   }
  
}
