export default class EndScene extends Phaser.Scene {

    text = '';

    constructor(data) {

        super({ key: 'endScene' });
        {

        };

    }

    create(data) {
        this.text = data.text;

        this.add.text(350, 250, this.text, { fill: '#FFFFFF', fontFamily: 'Courier', fontSize: 20 });
        
        this.time.delayedCall(1000, function () {
            this.input.keyboard.on('keydown', () => { this.scene.start('mainMenu'); });
        }, [], this);

    }



}