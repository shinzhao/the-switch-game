import Phaser from 'phaser';
export class Player extends Phaser.GameObjects.Image{
    constructor(scene,x,y,key,id=0){
        super(scene,x,y,key);
        scene.sys.displayList.add(this);
        this.setOrigin(0, 0).setScale(0.02,0.02);
        this.id=id
    }
    nextPlayer(){
        if(id<4){
        this.id=id+1
        }else{
            this.id=1
        }
        
    }
  
}