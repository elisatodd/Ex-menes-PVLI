export default class EndScene extends Phaser.Scene {

    text = '';

    constructor(data) {

        super({ key: 'endScene' });
        {
        };

    }

    create() {
        let text = "fin de juego";
        this.add.text(350, 250, text, { fill: '#FFFFFF', fontFamily: 'Courier', fontSize: 20 });
    }
}