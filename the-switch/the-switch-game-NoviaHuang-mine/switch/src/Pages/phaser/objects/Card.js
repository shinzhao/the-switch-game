import Phaser from 'phaser';
export class Card extends Phaser.GameObjects.Image{
    constructor(scene,x,y,key,target,left=36){
        super(scene,x,y,key,target);
        scene.sys.displayList.add(this);
        this.setScale(0.13,0.13)
        this.left=left
    }
    moveCard(){
        this.left-=1
    }
}