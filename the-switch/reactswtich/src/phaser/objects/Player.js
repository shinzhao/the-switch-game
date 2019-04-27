import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Image{
    constructor(scene,x,y,key,id=0){
        super(scene,x,y,key);
        scene.sys.displayList.add(this);
        this.setScale(0.02,0.02);
        this.id=id
       
    }
    nextPlayer(){
        if(this.id<4){
        this.id+=1
        }else{
            this.id=1
        }
        
    }
    
   
  
}