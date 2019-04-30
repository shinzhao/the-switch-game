import Phaser from 'phaser';
export class Blank extends Phaser.GameObjects.Image{
    constructor(scene,x,y,key){
        super(scene,x,y,key);
        scene.sys.displayList.add(this);
        this.setScale(0.1,0.15).setOrigin(0,0).setInteractive().setDataEnabled().setVisible(true);
    }
    
}
