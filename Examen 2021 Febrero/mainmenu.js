export default class MenuScene extends Phaser.Scene {


    constructor() {
        super({ key: 'mainMenu' });
        {

        };

    }

    preload() {
        
    }

    create() {
        this.add.text(250, 50, 'Selecciona un nivel:', { fill: '#FFFFFF', fontFamily: 'Courier', fontSize: 25 });
        this.add.text(150, 125, 'Fácil', { fill: '#FFFFFF', fontFamily: 'Courier', fontSize: 20 });
        this.add.text(375, 125, 'Medio', { fill: '#FFFFFF', fontFamily: 'Courier', fontSize: 20 });
        this.add.text(600, 125, 'Difícil', { fill: '#FFFFFF', fontFamily: 'Courier', fontSize: 20 });

        this.addButton(175, 250, 3);
        this.addButton(400, 250, 6);
        this.addButton(625, 250, 9);
    }


    /**
     * Método alternativo igual a addButton.
     * Es lo mismo que addButton pero el listener se declara distinto.
     * @param {*} posX 
     * @param {*} posY 
     * @param {*} num 
     */
    createButton(posX, posY, num) {
        let b = this.add.image(posX, posY, 'button');
        b.setScale(0.1);
        b.setInteractive();
        b.on('pointerdown', () => { this.scene.start('gameScene', { lives: 3, enemies: num }) });
    }


    /**
     * crea un botón que da paso al nivel de juego.
     * pasa una información a la escena
     * @param {number} posX posicion en X del boton
     * @param {number} posY posicion en Y " " "
     * @param {number} nEnemies Nº de enemigos que tiene la dificultad correspondiente a este botón
     */
    addButton(posX, posY, n) {
        let button = this.add.image(posX, posY, 'button');
        button.setScale(0.2);
        button.setInteractive();
        button.on('pointerdown', function (event) { this.scene.start('gameScene', { lives: 3, nEnemies: n }) }, this);
    }
}