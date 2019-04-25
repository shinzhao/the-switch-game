import Phaser from 'phaser';
export class Blank extends Phaser.GameObjects.Image{
    constructor(scene,x,y,textureName){
        super(scene,x,y,textureName);
        this.setScale(1,1.5).setOrigin(0, 0).setInteractive().setDataEnabled()
    }
}
