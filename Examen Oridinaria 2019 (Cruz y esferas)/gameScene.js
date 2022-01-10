import Player from './player.js';
import Enemy from './enemy.js';
import Border from './border.js';

export default class GameScene extends Phaser.Scene {

    player;
    enemies; // Grupo de enemigos
    borders;
    label;
    staticTween;
    timeEvent;

    constructor() {
        super({ key: 'gameScene' });
        {

        };

    }

    preload() {
        this.load.image('border', './assets/border.png');
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/enemy.png');

        this.load.audio('whoosh', './assets/whoosh.wav');
        this.load.audio('hit', './assets/hit.wav');
    }

    create() {
        this.gameTime = 30000; // tiempo de juego en milisegundos (30 segundos)
        this.collisionsLeft = 15; // colisiones que le quedan al jugador por hacer
        this.enemySize = 0.15; // escala de la primera esfera. El resto se van reduciendo a la mitad

        this.player = new Player(this, 500, 400);
        this.player.setScale(0.25);
    
        
        this.borders = this.physics.add.staticGroup();
        new Border(this, 0, 0, 1600, 100, this.player, this.borders);
        new Border(this, 0, this.cameras.main.height - 5, 1600, 100, this.player, this.borders);
        new Border(this, this.cameras.main.width - 5, 0, 100, 1600, this.player, this.borders);
        new Border(this, 0, 0, 100, 1600, this.player, this.borders);

        this.enemies = this.add.group();
        new Enemy(this, 200, 200, this.enemySize, this.enemies, this.player);

        //this.physics.add.collider(this.enemies, this.player); // esto no sirve ahora pero puede venir bien para colisiones entre jugador y grupo
        this.physics.add.overlap(this.player, this.enemies, (p, g) => { this.collide(g) });
        this.physics.add.collider(this.player, this.borders);
        this.physics.add.collider(this.enemies, this.borders);

        this.label = this.add.text(10, 10, "");
        this.updateUI();

        this.doStaticTween(); // comienza estando estático

        this.timeEvent = this.time.addEvent({ delay: this.gameTime, callback: this.endGame, callbackScope: this }); // args: [this.hammer] -> si le quisieramos pasar parámetros
    }

    /**
     * Actualiza el texto que aparece en la UI con la info de la partida.
     */
    updateUI() {
        this.label.text = "Quedan " + this.collisionsLeft + " colisiones y " + this.timeLeft + " segundos";
    }


    update() {
        // Controlar tiempo
        this.timeLeft = parseInt(this.timeEvent.getRemainingSeconds());
        this.updateUI();
    }

    /**
     * Qué ocurre cuando el player choque con una de las esferas
     */
    collide(enemy) {
        enemy.die();

        this.collisionsLeft--;
        this.updateUI();

        if (this.collisionsLeft === 0) {
            this.timeEvent.remove(true); // quito el timer -> al pasarle true hace su callback y se cancela después
            // si le paso false se cancela sin hacer nada
        }
        console.log("Esfera destruída.");
    }

    /**
     * Crea un tween sobre el personaje
     */
    movingTween() {
        // hacemos que pause el tween anterior
        this.staticTween.pause();

        let angle = this.player.angle;
        //Animación para el personaje moviéndose. Usaré tweens.
        // Se verá la imagen rotando
        let tween = this.tweens.add({
            targets: [this.player],
            duration: 50,
            angle: angle + 45
        });
    }

    /**
     * Crea el tween del jugador estático
     */
    doStaticTween() {
        let x = this.player.scaleX;
        let y = this.player.scaleY;

        //Animación para el personaje cuando no se mueve. Usaré tweens.
        // Se verá la imagen encogiendo y agrandándose
        this.staticTween = this.tweens.add({
            targets: [this.player],
            duration: 500,
            scaleX: x + 0.01,
            scaleY: y + 0.01,
            repeat: -1, // si ponemos -1 lo repite -1 veces -> phaser lo interpreta como infinito ¯\_(ツ)_/¯
            yoyo: true,
            ease: 'Linear'
        });

    }

    

    /**
     * Termina la partida
     */
    endGame() {
        console.log("Fin de la partida");

        this.player.stopMoving();
        this.staticTween.pause();

        this.enemies.children.each(function (enemy) {
            enemy.stopMoving();
        }, this);
        

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