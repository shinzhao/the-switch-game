import Phaser from 'phaser';
import {Blank} from '../objects/Blank';
import {Player} from '../objects/Player';
import {Card} from '../objects/Card';
import { API, graphqlOperation } from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions'
import * as queries from '../../../graphql/queries'

import { ConsoleLogger } from '@aws-amplify/core';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from '../../../aws-exports';
import gql from 'graphql-tag';

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: aws_config.aws_appsync_apiKey,
  }
});

export class GameBoard extends Phaser.Scene {
	constructor() {
		super({
			key: 'GameBoard',
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
			   this.blank=new Blank(this,405+x_pos1,85+y_pos1,'blank').data.set('card_number', 53);
				x_pos1+=65;
			 }
			   y_pos1+=65;
			   x_pos1=0;
			 }
			 

		//    let card_number=0;
		//    let nums=[],
		// 	   ranNums = [];
		//   for(var k=0;k<52;k++){
		//    nums.push(k);
		// 	}
		//    let m = nums.length,
		// 	   n = 0;
	  //  while (m--) {
		//    n = Math.floor(Math.random() * (m+1));
		//    ranNums.push(nums[n]);
		//    nums.splice(n,1);
		//  }
		 
		let card_number=0;
		let ranNums=[3,7,15,33,25,46,8,9,28,53,11,6,34,36,21,23,41,19,16,1,47,29,51,39,2,25,27,40,30,
		              37,10,22,10,20,50,38,26]
	   //display board
			let x_pos=0;
			let y_pos=0; 
			this.cardSet=[] 
		  for(var i=0;i<6;i++){
			for(var j=0 ;j<6;j++){
			   var generatecard=ranNums[card_number]
				 this.card=new Card(this,405+x_pos,85+y_pos,'cards',generatecard).setOrigin(0, 0).setInteractive().setDataEnabled()
				 this.cardSet.push(this.card)
			   this.card.data.set('card_number', card_number);
				x_pos+=65;
				card_number++;
			 }
			   y_pos+=65;
			   x_pos=0;
			 }
			 


			 let player1=new Player(this,405,85,'chess_red',1).setOrigin(0,0)
			 let player2=new Player(this,730,85,'chess_blue',2).setOrigin(0,0)



			 this.player=[]
			 this.player.push(player1)
			 this.player.push(player2)
				
		//need user name array
		this.userName=['switch','noviah']

		//initalize the data
		this.initCardData(-1,405,85,'switch',0)
		this.initCardData(-1,730,85,'noviah',0)
		this.playername=this.add.text(500,50,this.userName[0]+' turn')

		this.Rf1=[0,9,10,11,12]
		this.Rf2=[13,22,23,24,25]
		this.Rf3=[26,35,36,37,38]
		this.Rf4=[39,48,49,50,51]
		this.mygetcard=[0,22,1,17,5,16,26]
		this.ifHasPair(this.mygetcard)
	

		this.CardLeft=36

		this.arrange=0
			
		this.clickedBox(ranNums)
		   
	}

	
		checkUserInfo(cardNum,name,x,y,seat) {
			Auth.currentUserInfo().then((userInfo) => {
				const { username } = userInfo;
				console.log(name)
				if(name==username){
					this.updateCardData(cardNum,x,y,name)
					this.updateRound(seat)
				}else{
					console.log('update')
					
				}
			
			}
			)
		}
	

ifHasAce(the_card_get){
	for(var i=0;i<the_card_get.length;i++){
		if(the_card_get[i]%13==0){
				return true
		}else{
			return false
		}
	}
}

ifHasPair(the_card_get){
	let result=false
	for(var i=0;i<the_card_get.length;i++){
		for(var j=0;j<the_card_get.length;j++){
			if(the_card_get[i]+13==the_card_get[j]||the_card_get[i]+26==the_card_get[j]||the_card_get[i]+39==the_card_get[j]){
				result=true
				break;
			}
		}
	}
	console.log(result)
	return result
}



async round(x,y,cardNum){
	(async () => { 
		await client.hydrated();
		//const getUser = await Auth.currentAuthenticatedUser();
						
		var nameWeGot1 = this.userName[0];
		const result1 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot1
			},
			fetchPolicy: 'network-only',
		});
		const seat=result1.data.getQw.seat
		console.log('the recent seat'+seat)
		 if(x==this.player[seat%2].x||y==this.player[seat%2].y){
			this.checkUserInfo(cardNum,this.userName[seat%2],x,y,seat)
		 }
	})();
}

async updateRound(theSeat){
	
	const thething = {
				username : this.userName[0],
				seat:theSeat+1
					};
 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
}


async initCardData(card,x,y,theusername,theSeat){
	const cardV = card;
	console.log(cardV)
	const xV =x;
	console.log("x : "+xV)
	const yV = y;
	console.log("y : "+yV);
	const name = theusername;
	console.log('your name : ' +name);
	const thething = {
				username : name,
				whichCard : cardV,
						x : xV,
						y : yV,
						seat: theSeat
					};
 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
}


	
	
	async updateCardData(card,x,y,name){
		const cardV = card;
		//console.log(cardV)
		const xV =x;
		//console.log("x : "+xV)
		const yV = y;
		//console.log("y : "+yV);
		//console.log('your name : ' +name);
		const thething = {
					username : name,
					whichCard : cardV,
							x : xV,
							y : yV,
						};
	 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
	}


	//click the card and make it move
	clickedBox(ranNums){
		this.input.on('gameobjectdown', (pointer, gameObject) => {
			for(var i=0;i<36;i++){
				if(this.gameBoard[i] == i ){
						if(gameObject.data.get('card_number') == i){
							//console.log('another test for seat '+this.seat)
								this.round(gameObject.x,gameObject.y,i)
								this.CardLeft--;
								this.arrange+=20
								break;
						}else if(gameObject.data.get('card_number') == 53){
							this.round(gameObject.x,gameObject.y,-1)
								break;
						}
					}	
			}
		});
	}	
	


async updateScreen(){
	(async () => { 
 
		await client.hydrated();
						
		var nameWeGot1 = this.userName[0];
		const result1 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot1
			},
			fetchPolicy: 'network-only',
		});

		var nameWeGot2 = this.userName[1];
			 const result2 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot2
			},
			fetchPolicy: 'network-only',
		});
		let x1=result1.data.getQw.x
		let y1=result1.data.getQw.y
		let x2=result2.data.getQw.x
		let y2=result2.data.getQw.y
		this.player[0].setX(x1)
		this.player[0].setY(y1)
		this.player[1].setX(x2)
		this.player[1].setY(y2)
		this.playername.text=this.userName[result1.data.getQw.seat%2]+' turn'
	
		// if(result1.data.getQw.seat==1){
		// 	this.updateCardData(-1,result1.data.getQw.x,result1.data.getQw.y,nameWeGot1,0)
		// 	 this.player[0].setX(x1)
		// 	 this.player[0].setY(y1)
			 
			 //console.log('update the player1')
			 
				if(result1.data.getQw.whichCard!=-1){
					this.cardSet[result1.data.getQw.whichCard].setX(20+this.arrange)
					this.cardSet[result1.data.getQw.whichCard].setY(85)
				//	this.updateCardData(-1,result1.data.getQw.x,result1.data.getQw.y,nameWeGot1)
					}
					
			// }

			// if(result2.data.getQw.seat==1){
			// 	this.updateCardData(-1,result2.data.getQw.x,result2.data.getQw.y,nameWeGot2,0)
			// 	this.player[1].setX(x2)
			// 	this.player[1].setY(y2)
				
			// console.log('update the player2')
			// this.seat=0
			if(result2.data.getQw.whichCard!=-1){
				//console.log('move the card')
				this.cardSet[result2.data.getQw.whichCard].setX(900+this.arrange)
				this.cardSet[result2.data.getQw.whichCard].setY(85)
			//	this.updateCardData(-1,result2.data.getQw.x,result2.data.getQw.y,nameWeGot2)
		 }
		 
		//}
	})();
}


	
	update(time, delta) {
		 this.updateScreen()
	
		if(this.CardLeft==0){
			this.newBoard=this.add.image(400, 80, 'boardbg');
			this.newBoard.setOrigin(0, 0).setScale(2.8,2.8);
			this.text=this.add.text(500,200,'game over').setScale(3,3)
		}
		
	}
}
