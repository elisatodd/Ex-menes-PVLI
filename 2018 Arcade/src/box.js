export default class Box extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y) {

        super(scene, x, y, 'box');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setBounce(1);
        // Queremos que no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.rand=Phaser.Math.Between(100,400);
        this.speed=this.rand;
        this.dirX=Phaser.Math.FloatBetween(-1,1);
        this.dirY=Phaser.Math.FloatBetween(-1,1);
        this.body.setVelocity(this.speed*this.dirX, this.speed*this.dirY);
        this.body.allowGravity=false;
        this.setTint(0x0000ff);
        this.seleccionada=false;
        //this.scene.physics.add.collider(this, this.scene.boxGroup);
        //this.delete = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.girar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

       
        this.evento=this.setInteractive();
        this.evento.on("pointerdown", () => {

            for(let i=0; i<this.scene.boxGroup.getLength(); i++)
            {
                if(this.scene.boxGroup.getChildren()[i].seleccionada)  this.scene.boxGroup.getChildren()[i].seleccionada=false;
            }
            this.seleccionada=true;
        });
        
    }
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);

        if(this.seleccionada){
            this.setTint(0xff0000);
        }
        else{this.setTint(0x0000ff);}
        /** 
        if(this.delete.isDown && this.seleccionada){
            this.seleccionada=false;
            //this.setVisible(false);
            //this.setActive(false);
            this.scene.boxGroup.killAndHide(this);
            if(this.scene.boxGroup.getLength()>0){
                
               this.scene.seleccionarc();
            }
        }
        */
        if(this.girar.isDown && this.seleccionada){
            var tween = this.scene.tweens.add({
                targets: this,
                angle: 360.0,
                duration: 200,
                repeat: 0
            });
        }
        if(this.left.isDown && this.seleccionada) this.body.setVelocityX(-this.speed);
        else if(this.right.isDown && this.seleccionada) this.body.setVelocityX(this.speed);
        else if (this.up.isDown && this.seleccionada) this.body.setVelocityY(-this.speed);
        else if (this.down.isDown && this.seleccionada) this.body.setVelocityY(this.speed);

        if(this.scene.physics.collide(this, this.scene.boxGroup))
        {
            this.rotation+=10;
            this.speed=-this.speed;
            this.body.setVelocity(this.speed);
        }
    }
    seleccionar(){
        this.seleccionada=true;
    }
}