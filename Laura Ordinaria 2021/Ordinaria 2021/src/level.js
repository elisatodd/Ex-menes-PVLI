import Ball from './balls.js';
import Platform from './platform.js';
import Player from './player.js';
import Gun from './gun.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });{
      
    }
  }
  init(data){
    this.balls=data.balls;
  }
  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    //Dimensiones del nivel
    const width= this.scale.width;
    const height=this.scale.height;
    const totalWidth=width*2;
    //wallpaper
    this.add.image(0, this.scale.height, 'wallpaper')
        .setOrigin(0, 1)
        .setScrollFactor(1);
    this.player = new Player(this, 200, 500);

    this.physics.world.setBounds(0, 0, totalWidth, height);
    this.cameras.main.setBounds(0, 0, totalWidth, height);
    this.cameras.main.startFollow(this.player);
    this.isShot=false;
    this.platform=new Platform(this,totalWidth,0,-60)
    this.physics.add.collider(this.platform,this.ballsGroup);
    this.ballsGroup = this.add.group();
    this.createBalls();

    this.timeLeft=0;
    this.gunTime=300;
    this.balls;
    this.ballsLeft=this.balls;
    
  }

  //Crea cada bola con tamaño y posición aleatoria, y las mete en el grupo balls

  createBalls(){
    for(let i=0; i<this.balls;i++){
      this.randX =(Phaser.Math.Between(0,2000));
      this.randY =(Phaser.Math.Between(0,500));
      this.randomScale =(Phaser.Math.Between(1, 3));

      new Ball(this,this.randX,this.randY,this.randomScale,this.ballsGroup )
    }
  }

  /*Cuando una pelota golpea al jugador vuelve a inicializar la escena
  * Borra todas las bolas y las vuelve a crear
  * resetea las variables
  * si no quedan vidas salta a la pantalla de game over
  */
  resetLevel(){
    //control de las vidas del jugaddor
    if(this.player.health>0){

      this.ballsGroup.clear(true,true);
      this.ballsLeft=this.balls;
      this.player.hit();
      if(this.isShot){
        this.gun.destroy();
      }
      this.isShot=false;
      this.createBalls();
      this.timeLeft=0;
    }
    else{
      this.scene.start('lose');
    }
  }


  updateTime() {
    this.timeLeft++;
  }


  update(t, dt) {
    if(this.ballsLeft>0){

      this.timeTimer();
      this.player.update();
      if(this.isShot){
        this.timeGunTimer();
      }
      if(this.gunTime <= 0){
        this.gun.destroy();
        this.isShot=false;
      }
    }
    else{
      this.scene.start('win');
    }
  }


  updateGunTime(){
    this.gunTime--;
  }

  //llama cada cierto tiempo a la funcion que resta tiempo al contador
  timeTimer() {
    let timer = this.time.addEvent({
      delay:1000,
      callback: this.updateTime,
      callbackScope: this
    });
  }

  /**
   * se encarga de crear el arma en la pos del jugador e inicializar su contador
   */
  shoot(){
    if(this.timeLeft>200){

      this.timeLeft = 0;
      this.isShot=true;
      this.gun=new Gun(this,this.player.x,700,1);
      this.gunTime=300;
     }
  }
  
  updateGunTime(){
    this.gunTime--;
  }
  
  timeGunTimer() {
    let guntimer = this.time.addEvent({
      delay:1000,
      callback: this.updateGunTime,
      callbackScope: this
    });
  }
}


