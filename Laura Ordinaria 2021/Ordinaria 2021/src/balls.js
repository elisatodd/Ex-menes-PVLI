
export default class Ball extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y,scale,ballsGroup) {
      super(scene, x, y, 'ball');
      this.setScale(scale);
      this.scene.add.existing(this);
  
      //Le mete físicas al objeto
      this.scene.physics.add.existing(this);
      
      ballsGroup.add(this);

      this.body.setCollideWorldBounds(true).setBounce(1);
      this.speedX = 200;
      this.speedY = 200;
      this.setDirection();
      this.body.velocity.set(this.speedX*this.direction1, this.speedY*this.direction2);
      this.setSound();
      
    }
    setSound(){
      this.dieSound=this.scene.sound.add("ballSound");
    }
    //direcciones aleatorias de las bolas
    setDirection(){

      //Establezco direcciones para que cada pelota vaya hacia un lugar
      this.direction2 =(Phaser.Math.Between(-10, 10));
      this.direction1 =(Phaser.Math.Between(-10, 10));
      //Me aseguro de que ninguna pelota se quede parada
      while(this.direction1===0 && this.direction2===0){
        this.direction2 =(Phaser.Math.Between(-10, 10));
        this.direction1 =(Phaser.Math.Between(-10, 10));
      }
      //al hacer esto creo más direcciones ya que realmente va de -1 a 1
      this.direction1/=10;
      this.direction2/=10;
    }

    preUpdate(t,dt) {
      super.preUpdate(t,dt);
       if (this.scene.physics.overlap(this.scene.player, this)) {
         
         this.scene.resetLevel();
         this.destroy();
        }else if(this.scene.isShot && this.scene.physics.overlap(this.scene.gun, this))
        {
          this.scene.gun.destroy();
          this.scene.isShot=false;
          this.scene.ballsLeft--;
          this.dieSound.play();
          this.destroy();
        }
    }

  }