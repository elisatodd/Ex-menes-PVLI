export default class MenuScene extends Phaser.Scene {


    constructor() {
        super({ key: 'pauseScene' });
        {
        };
    }

    create() {
        this.time.addEvent({ delay: 2000, callback: this.unpause, callbackScope: this });
        // this.time.delayedCall(2000, function () {
        //     this.scene.resume('gameScene');
        //     this.scene.stop(); 
        // }, this);
    }
    
    unpause(){  
        console.log('a');
        this.scene.start('gameScene');
        this.scene.stop();
    }
}