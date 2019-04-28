import Phaser from 'phaser';
export class Card extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,key,target,left=36){
        super(scene,x,y,key,target);
        scene.sys.displayList.add(this);
        this.setScale(0.13,0.13).setInteractive().setDataEnabled()
        this.left=left
    }
    moveCard(){
        this.lefe-=1
    }
}