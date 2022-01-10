import Gun from './gun.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.health = 3;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.gunTime=300;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "").setScrollFactor(0);
    this.createKeys();
    this.isShot=false;
    this.isWalking=false;
    this.updateScore();
    this.chargeAnimation();
  }
  chargeAnimation(){
    this.playerAnimation=this.anims.create({
      key: 'playerWalk',
      frames: this.anims.generateFrameNumbers('susAnimation', { frames: [ 0, 1, 2, 3 ] }),
        frameRate: 8 ,
        repeat: -1,
      });

  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  hit() {
    this.health--;
    this.updateScore();
    this.resetPos();
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Vidas restantes: ' + this.health;
  }

  resetPos(){
    this.x=0;
  }

  /**
   * Movimiento del personaje con las animaciones
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if (this.aKey.isDown) {
      this.body.setVelocityX(-this.speed);
      //solo se inicializa la animacion si no estaba ya empezada
      if(!this.isWalking){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=true;
    }
    else if (this.dKey.isDown) {
      this.body.setVelocityX(this.speed);
      
      if(!this.isWalking){
        this.play('playerWalk');
        this.isWalking=true;
      }
      this.flipX=false;
    }
    else {
      this.isWalking=false;
      this.play('playerWalk')
      this.stop();
      this.body.setVelocityX(0);
    }
    if(Phaser.Input.Keyboard.JustDown(this.space)){
      this.scene.shoot();
    }
    
  }

  update(t, dt) {
    
    let timeCounter = parseInt(this.scene.timeLeft / 100);
    this.label.text = 'Vidas restantes: ' + this.health + ' Tiempo de disparo ' + timeCounter + ' segundos';
      
  }
  
  createKeys(){

    this.aKey= this.scene.input.keyboard.addKey('a');
    this.dKey= this.scene.input.keyboard.addKey('d');
    this.space=this.scene. input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
  }
}

