/**
 * Clase que representa las pombas del juego. Estas se mueven aleatoreamente por el escenario.
 */
export default class Enemy extends Phaser.GameObjects.Sprite {

  
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {Group} group     
     * @param {Number} maxX Posicion máxima en la que puede spawnear en X
     * @param {Number} maxY " " en Y
     * @param {Number} lives Veces que puede ser explotada esta pompa
     */
    constructor(scene, group, maxX, maxY, lives = 3) {
        // Determinar posición:
        let x = Phaser.Math.Between(105, maxX);
        let y = Phaser.Math.Between(105, maxY);
        super(scene, x, y, 'bubble');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        group.add(this);

        let velocity = new Phaser.Math.Vector2();
        Phaser.Math.RandomXY(velocity, 300);
        this.body.setVelocity(velocity.x, velocity.y);

        // Determinar tamaño:
       let rnd = Phaser.Math.Between(0, 2);
        // Posibles tamaños
        // 32 × 32 píxeles.
        // 64 × 64 píxeles.
        // 90 × 90 píxeles.
        let size;
        switch (rnd) {
            case 0:
                size = 32;
                break;
            case 1:
                size = 64;
                break;
            case 2:
                size = 90;
                break;
        }
        this.displayWidth = size;
        this.displayHeight = size;

        this.body.allowGravity = false; // no les afecta la gravedad
        // Y que rebote contra los muros
        this.body.bounce.set(1, 1);
    }

    die(){
        this.scene.currentEnemies--;
        this.scene.sound.add('hit').play();

        this.scene.win();
        
        this.destroy();
    }
}
