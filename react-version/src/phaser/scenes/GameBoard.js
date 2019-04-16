import Phaser from 'phaser';

export class GameBoard extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameBoard'
		});
	}
	create() {
		this.gameBoard = [0,1,2,3,4,5,6,7,8,9,10,
			11,12,13,14,15,16,17,18,19,20,21,22,
			23,24,25,26,27,28,29,30,31,32,33,34,35,36];
		 
        //display board
		let boardbg = this.add.image(400, 80, 'boardbg');
		boardbg.setOrigin(0, 0).setScale(2.8,2.8);
		let x_pos1=0;
		let y_pos1=0;
		for(var i=0;i<6;i++){
			for(var j=0 ;j<6;j++){
			   this.blank=this.add.image(405+x_pos1,85+y_pos1,'blank').setScale(1,1.5).setOrigin(0, 0).setInteractive().setDataEnabled().data.set('blank', 53);
				x_pos1+=65;
			 }
			   y_pos1+=65;
			   x_pos1=0;
		   }
		   let card_number=0;
		   let nums=[],
			   ranNums = [];
		  for(var k=0;k<52;k++){
		   nums.push(k);
			}
		   let m = nums.length,
			   n = 0;
	   while (m--) {
		   n = Math.floor(Math.random() * (m+1));
		   ranNums.push(nums[n]);
		   nums.splice(n,1);
	   }
	   //display board
			let x_pos=0;
			let y_pos=0;  
		   for(var i=0;i<6;i++){
			for(var j=0 ;j<6;j++){
			   var generatecard=ranNums[card_number]
			   this.card=this.add.sprite(405+x_pos,85+y_pos,'cards',generatecard)
			   this.card.setScale(0.13,0.13).setOrigin(0, 0).setInteractive().setDataEnabled().data.set('card_number', card_number);
				x_pos+=65;
				card_number++;
			 }
			   y_pos+=65;
			   x_pos=0;
		   }
		   this.chess=this.add.image(405,85,'chess_red').setOrigin(0, 0).setScale(0.02,0.02);
		   this.clickedBox(ranNums);
		   

	}

	clickedBox(ranNums){
		var arrangepostion=0;
		this.input.on('gameobjectdown', (pointer, gameObject) => {
		for(var i=0;i<36;i++){
			if(this.gameBoard[i] == i && gameObject.data.get('card_number') == i) {
				if(gameObject.x==this.chess.x||gameObject.y==this.chess.y){
				this.chess.setX(gameObject.x)
			    this.chess.setY(gameObject.y)
				gameObject.setX(6+arrangepostion);
				gameObject.setY(40);
				gameObject.setScale(0.08,0.08)	
				arrangepostion+=20;	
				//find card index 
				console.log(ranNums[i])
				}
				
		}
		if(this.gameBoard[i] == i && gameObject.data.get('blank') == 53) {
			if(gameObject.x==this.chess.x||gameObject.y==this.chess.y){
			this.chess.setX(gameObject.x)
			this.chess.setY(gameObject.y)
			}
		}	
		
	}	
			
	});
}
	
	update(time, delta) {}
}