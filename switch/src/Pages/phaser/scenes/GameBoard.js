import Phaser from 'phaser';
import {Blank} from '../objects/Blank';
import {Player} from '../objects/Player';
import {Card} from '../objects/Card';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions'
import * as queries from '../../../graphql/queries'

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
			   this.blank=new Blank(this,405+x_pos1,85+y_pos1,'blank').data.set('blank', 53);
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
			   this.card=new Card(this,405+x_pos,85+y_pos,'cards',generatecard).setOrigin(0, 0).setInteractive().setDataEnabled()
			   this.card.data.set('card_number', card_number);
				x_pos+=65;
				card_number++;
			 }
			   y_pos+=65;
			   x_pos=0;
		   }
			 let player1=new Player(this,405,85,'chess_red',1).setOrigin(0,0)
			 let player2=new Player(this,730,85,'chess_blue',2).setOrigin(0,0)

			 let player=[]
			 player.push(player1)
			 player.push(player2)
			 
			 let gameState='playing'
			 let id=0
			 this.clickedBox(ranNums,player,id);
		   
	}

	decideMove(x,y,player){
		player.setX(x)
		player.setY(y)
	}

	handlePlayer1Card(card,arrangepostion){
		card.setX(10+arrangepostion);
		card.setY(40);
		card.setScale(0.1,0.1)
	}

	handlePlaye2Card(){
		
	}

	handlePlayer3Card(){
		
	}
	async updateCardData(card,x,y){
		const cardV = card;
		console.log(cardV)
		const xV =x;
		console.log("x : "+xV)
		const yV = y;
		console.log("y : "+yV)
		const thething = {
					whichCard : cardV,
							x : xV,
							y : yV
						};
	 const newThing = await API.graphql(graphqlOperation(mutations.createTest1, {input: thething}));
	}

	async updateblanck(card,x,y){
		const cardV = card;
		console.log(cardV)
		const xV =x;
		console.log("x : "+xV)
		const yV = y;
		console.log("y : "+yV)
		const thething = {
					whichCard : cardV,
							x : xV,
							y : yV
						};
	 const newThing = await API.graphql(graphqlOperation(mutations.createTest1, {input: thething}));
	}

	
	clickedBox(ranNums,player,id){
		var arrangepostion=0;
		var seat=0
		this.input.on('gameobjectdown', (pointer, gameObject) => {
			for(var i=0;i<36;i++){
				if(this.gameBoard[i] == i ){
					if(gameObject.x==player[seat].x||gameObject.y==player[seat].y){
						this.decideMove(gameObject.x,gameObject.y,player[seat])
						if(gameObject.data.get('card_number') == i){
							this.handlePlayer1Card(gameObject,arrangepostion)
							arrangepostion += 20
							this.updateCardData(ranNums[i],player[seat].x,player[seat].y)
						}else if(gameObject.data.get('blank')){
							this.updateblanck(-1,player[seat].x,player[seat].y)
							break;
							
						}
						// if(seat==0){
						// 	seat=1
						// }else{
						// 	seat=0
						// }
					}	
				
			}
	

		
	
	}

			
	});

	
	
}
	
	update(time, delta) {
		
		
	}
}