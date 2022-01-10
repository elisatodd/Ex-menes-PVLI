import Data from './data.js'

export default class Box extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, boxes){
        super(scene, x, y, 'box');

        this.setTexture(Phaser.Math.RND.pick(Data.sprites));        

        //Lo añadimos al motor de físicas y al grupo
        scene.add.existing(this);
        scene.matter.add.gameObject(this);
        boxes.push(this);
        this.collideWorldBounds = true;

        this.setVelocity(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));
        this.selected = false;

        this.s = scene.input.keyboard.addKey('s');

        //Escalamos el objeto después de haberlo hecho físico y configurado con matter
        this.scaleNumber = 90;
        this.setSize(this.scaleNumber, this.scaleNumber);        
        this.setDisplaySize(this.scaleNumber, this.scaleNumber);
    }

    select(){
        this.selected = true;
        this.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    }

    preUpdate(){
        if(this.s.isDown && this.selected){
            this.rotation += 0.05;
        }
    }
}