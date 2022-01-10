import Box from './box.js';

export default class Level extends Phaser.Scene
{
    constructor(){
        super({key:'level'});
    }
   /**
   * Creación de los elementos de la escena principal de juego
   */
    create(){
        //DIMENSIONES
        this.width = this.scale.width;
        this.height = this.scale.height;
        //Input
        this.d = this.input.keyboard.addKey('d');
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Grupo de cajas
        this.boxGroup=this.add.group();
        
        this.input.keyboard.on('keydown-SPACE', function (event) {
            const randx= Phaser.Math.Between(10,this.width-10);
            const randy= Phaser.Math.Between(10,this.height-10);
            let w=new Box (this, randx, randy)
            this.boxGroup.add (w);
        }, this);

        this.d.on('down', function () {
            if (this.boxGroup.getLength() > 0){ //Mientras haya cajas
                
                for(let i=0; i<this.boxGroup.getLength(); i++) //Busco la seleccionada
                {
                    if(this.boxGroup.getChildren()[i].seleccionada) this.boxGroup.killAndHide(this.boxGroup.getChildren()[i]); //La elimino
                }
                this.selectNewBox();
            }
        }, this);
        
    }
    selectNewBox()
    {
        this.selectedBox = this.boxGroup.getFirstAlive(); //Busco la primera
        this.selectedBox.seleccionar(); //La selsecciono
    }
   
}