
export default class Player extends Phaser.GameObjects.Sprite {
    
  constructor(scene, x, y, player1, dir){
     
    
    
    if(player1)
    {
      super(scene.matter.world, x, y, 'player', './assets/sprites/sus.png');
      scene.add.existing(this);
      this.setPosition(x, y);
      this.setTexture(key);
      this.setFrame(frame);
    }
    else
    {
      super(scene, x, y, 'player2');
    }

           

  }

 

 
  addKeys(left, right, up)
  {

  }
}