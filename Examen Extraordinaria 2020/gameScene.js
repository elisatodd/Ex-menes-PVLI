import Player from './player.js';
import Enemy from './enemy.js';
import Border from './border.js';

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene' });
        {
        };
    }

    create() {

        this.playerSize = 64;

        this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background').setOrigin(0)
             .setScrollFactor(0, 1); //this line keeps your background from scrolling outside of camera bounds

        this.backgroundSpeed = 2;

        this.enemies = this.physics.add.group();
        
        this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height - this.playerSize, 64, this.enemies);

        this.blocks = [];
        // PARALLAX
        // this.createAligned(this, 3, 'mountains0', 1);
        // this.createAligned(this, 3, 'mountains1', 2);
        // this.createAligned(this, 3, 'mountains2', 3);

        // this.borders = this.physics.add.staticGroup();
        // new Border(this, 0, 0, 1600, 100, this.player, this.borders);
        // new Border(this, 0, this.cameras.main.height - 5, 1600, 100, this.player, this.borders);
        // new Border(this, this.cameras.main.width - 5, 0, 100, 1600, this.player, this.borders);
        // new Border(this, 0, 0, 100, 1600, this.player, this.borders);

        // this.enemies = this.add.group();
        // new Enemy(this, 200, 200, this.enemySize, this.enemies, this.player);

        // //this.physics.add.collider(this.enemies, this.player); // esto no sirve ahora pero puede venir bien para colisiones entre jugador y grupo
        // this.physics.add.overlap(this.player, this.enemies, (p, g) => { this.collide(g) });
        // this.physics.add.collider(this.player, this.borders);
        // this.physics.add.collider(this.enemies, this.borders);

        this.obstacles = 0;

        this.spawnEnemyTime();
        
    }

    spawnEnemyTime()
    {
        let v = Phaser.Math.Between(2000, 4000); // entre 2 y 4 segundos
        this.invoke = this.time.delayedCall(v, this.spawnEnemy, [], this);
    }

    spawnEnemy(){

        let enemy = new Enemy(this, this.cameras.main.width - 50, this.cameras.main.height - (this.playerSize/2), this.playerSize, this.enemies, this.backgroundSpeed, this.player);

        this.blocks.push(enemy);
      
        this.spawnEnemyTime();
    }

    update(t, dt) {
        this.background.tilePositionX += this.backgroundSpeed;
    }

    /** ESTO ES PARA HACER PARALLAX PERO NO SE USA AHORA
  * Is called to generate the parallax objects
  * @param {*} scene - Scene
  * @param {*} totalWidth - Total Width of the Game
  * @param {*} texture - Image/Sprite to be generated
  * @param {*} scrollFactor - Scroll factor of the image
  */
    createAligned(scene, totalWidth, texture, scrollFactor) {

        const w = scene.textures.get(texture).getSourceImage().width;
        const count = Math.ceil(totalWidth / w) * scrollFactor;

        let x = 0;

        for (let i = 0; i < count; ++i) {
            const b = scene.add.image(x, scene.scale.height, texture)
                .setOrigin(0, 1)
                .setScrollFactor(scrollFactor);

            x += b.width;
        }
    }

    /**
     * Qué ocurre cuando el player choque con una de las cajas/obstáculos
     */
    collide() {
        console.log('pausa');
        this.scene.launch('pauseScene');
        this.scene.pause();
    }

    obstaculoSuperado(){
        this.obstacles++;
        console.log('obstacles: ' + this.obstacles);
        if (this.obstacles === 5){
            this.scene.start('endScene');
            this.scene.stop();
        }
    }

    /**
     * Termina la partida
     */
    endGame() {
        console.log("Fin de la partida");

        this.player.stopMoving();


        let endText, startOver;
        // ha ganado
        if (this.collisionsLeft == 0) { // Textos -> (posX, posY, 'hola buenas', config)
            endText = this.add.text(250, 200, "You win.", { fontSize: 50 });
        } else { // ha perdido 
            endText = this.add.text(250, 200, "You lost.", { fontSize: 50 });
        }
        startOver = this.add.text(100, 350, "Press SPACE to start over.", { fontSize: 40 });

        this.input.keyboard.on('keydown-SPACE', function (event) { this.scene.restart(); }, this);
    }

}