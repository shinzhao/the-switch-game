import Phaser from 'phaser';
export class Player extends Phaser.GameObjects.Image{
    constructor(scene,x,y,target){
        super(scene,x,y,target);
        this.setOrigin(0, 0).setScale(0.02,0.02);
    }
}