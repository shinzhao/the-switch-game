export default class Level1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'Level1'
		});
	}
	preload() {
		this.load.image('boardbg', '/img/boardbg.png');
		this.load.image('blank','/img/blank.jpg')
		this.load.image('chess_red', '/img/chess_1.png');
		this.load.image('chess_purple', '/img/chess_2.png');
		this.load.image('chess_blue', '/img/chess_3.png');
		this.load.image('chess_orange', '/img/chess_4.png');
		this.load.spritesheet('cards', '/img/cards.png',
		{frameWidth:334,
		frameHeight:440,
		});
	}
	create() {
		this.gameBoard = [0,1,2,3,4,5,6,7,8,9,10,
			11,12,13,14,15,16,17,18,19,20,21,22,
			23,24,25,26,27,28,29,30,31,32,33,34,35,36];
		 
        //display board
		this.boardbg = this.add.image(171, 21, 'boardbg').setOrigin(0, 0).setScale(2.0,2.0);

		let x_pos1=0;
		let y_pos1=0;
		for(var i=0;i<6;i++){
			for(var j=0 ;j<6;j++){
			   this.blank=this.add.image(177+x_pos1,27+y_pos1,'blank')
			   this.blank.setScale(0.07,0.1).setOrigin(0, 0);
				x_pos1+=45;
			 }
			   y_pos1+=45;
			   x_pos1=0;
		   }
		 
		//unique random number
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
			this.card=this.add.sprite(177+x_pos,27+y_pos,'cards',generatecard)
			this.card.setScale(0.1,0.1).setOrigin(0, 0).setInteractive().setDataEnabled().data.set('card_number', card_number);
			 x_pos+=45;
			 card_number++;
		  }
			y_pos+=45;
			x_pos=0;
		}
		//add chess
		this.chess=this.add.image(175,25,'chess_red').setOrigin(0, 0).setScale(0.012,0.012);

		

		
		//click method
		this.clickedBox(ranNums);
	}
	clickedBox(ranNums){
		var arrangepostion=0;
		this.input.on('gameobjectdown', (pointer, gameObject) => {
		for(var i=0;i<36;i++){
			if(this.gameBoard[i] == i && gameObject.data.get('card_number') == i) {
				this.chess.setX(gameObject.x)
			    this.chess.setY(gameObject.y)
				gameObject.setX(6+arrangepostion);
				gameObject.setY(40);
				gameObject.setScale(0.05,0.05)	
				arrangepostion+=15;	
				//find card index 
				console.log(ranNums[i])
				
		}		
		
	}	
			
	});
}	
	update(time, delta) {}
}
