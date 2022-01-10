import Border from './border.js';
import Player from './player.js';
import Enemy from './bubble.js';
import Hook from './hook.js';

export default class GameScene extends Phaser.Scene {


    enemies = 0;
    currentEnemies = 0;
    lives = 0;

    enemiesInMap = [];

    constructor() {

        super({ key: 'gameScene' });
        {

        };
    }

    create(data) {
        this.nEnemies = data.nEnemies;
        this.lives = data.lives;

        this.currentEnemies = this.nEnemies;

        this.canShoot = true;

        this.background = this.add.image(0, 0, "background");

        this.borders = this.physics.add.staticGroup();
        // Bloques que delimitan el escenario
        new Border(this, 800, 625, false, this.borders);
        new Border(this, -25, 300, true, this.borders);
        new Border(this, 1625, 300, true, this.borders);
        new Border(this, 800, -25, false, this.borders);

        //se puede usar esto para limitar al personaje a una distancia definida por ti
        this.cameras.main.setBounds(0, 0, this.cameras.main.width * 2, this.cameras.main.height);
        // console.log(this.cameras.main.height);
        // console.log(this.cameras.main.width);

        this.enemies = this.physics.add.group(); // ¿Es igual a this.add.group()?
        this.spawnEnemies();

        this.player = new Player(this, 400, this.cameras.main.height - 80, 0.2);

        this.physics.add.collider(this.player, this.borders); // Colisionan con el player
        this.physics.add.collider(this.enemies, this.borders); // Y con los enemigos

        this.physics.add.collider(this.player, this.enemies, (p,g) => {this.onCollision()});

        this.cameras.main.startFollow(this.player); // Para que la cámara te siga

        this.text = this.add.text(25, 25, "Lives : " + this.lives, { fontFamily: 'Courier', fill: '#000000', fontSize: 40 }).setScrollFactor(0);
    }

    /**
    *   Cuando un enemigo y el jugador chocan.
    */
    onCollision() {
        if (this.lives > 0)
            this.scene.restart({ lives: this.lives - 1, nEnemies: this.nEnemies });
        
        else{
            this.scene.start('endScene', {text: 'You lost.'});
        }
    }

    /**
     * Cuando se destruyen todas las pompas.
     */
    win(){
        if (this.currentEnemies <= 0) {
            this.scene.start('endScene', {text: 'You won'}); // == this.scene.start('endScene', 'Has ganado')
        }
    }
    
    /**
     * Spawnea la cantidad de enemigos iniciales necesaria
     */
    spawnEnemies() {
        for (let i = 0; i < this.nEnemies; ++i) {
            new Enemy(this, this.enemies, this.cameras.main.width - 100, this.cameras.main.height - 100);
        }
    }

}
