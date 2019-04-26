import Phaser from 'phaser';
export class Player extends Phaser.GameObjects.Image{
    constructor(scene,x,y,key){
        super(scene,x,y,key);
        scene.sys.displayList.add(this);
        this.setOrigin(0, 0).setScale(0.02,0.02);
    }
}