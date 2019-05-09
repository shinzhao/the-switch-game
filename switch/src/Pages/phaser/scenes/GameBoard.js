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

		this.seat=0;
		this.moveCard=false
			
		this.clickedBox(ranNums)
		   
	}

	//check if the login user is in his round
	checkUserInfo(cardNum,name,x,y) {
    Auth.currentUserInfo().then((userInfo) => {
			const { username } = userInfo;
      if(name==username){
				this.updateCardData(cardNum,x,y,name,1)
				//this.updateRound(seat)
			}else{
				console.log('invaild movement')	
			}
		
		}
		)
	}
	
		


	//move card
	decideMove(x,y,player){
		player.setX(x)
		player.setY(y)
	}

	//move the card to the side
	handlePlayerCard(cardNum,card){
		if(cardNum!=53){
			console.log('the card x is'+card.x)
		}
		
	}

//************************************************ */
//the thing you need
//*********************************************** */

// async round(x,y){
// 	(async () => { 
// 		await client.hydrated();
// 		//const getUser = await Auth.currentAuthenticatedUser();
						
// 		var nameWeGot1 = 'switch';
// 		const result1 = await client.query({
// 			query: gql(queries.getQw),
// 			variables: {
// 				username: nameWeGot1
// 			},
// 			fetchPolicy: 'network-only',
// 		});
// 		const seat=result1.data.getQw.seat
// 		console.log('the recent seat'+seat)
// 		 if(x==this.player[seat%2].x||y==this.player[seat%2].y){
// 			this.checkUserInfo(this.userName[seat%2],x,y,seat)
// 		 }
// 	})();
// }

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


	
	
	async updateCardData(card,x,y,name,theSeat){
		const cardV = card;
		console.log(cardV)
		const xV =x;
		console.log("x : "+xV)
		const yV = y;
		console.log("y : "+yV);
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

	// async updateRound(theseat){
	// 	console.log('to update'+theseat);
	// 	const thething = {
	// 				username : 'switch',
	// 				seat: theseat+1,
	// 					};
	//  const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
	// }
	
	
	



	//click the card and make it move
	clickedBox(ranNums){
		//var arrangepostion=0;
		this.input.on('gameobjectdown', (pointer, gameObject) => {
			for(var i=0;i<36;i++){
				if(this.gameBoard[i] == i ){
					if(gameObject.x==this.player[this.seat].x||gameObject.y==this.player[this.seat].y){
							if(gameObject.data.get('card_number') == i){
								this.checkUserInfo(ranNums[i],this.userName[this.seat],gameObject.x,gameObject.y)
						}
					}	
			}	
	
	}

			
	});

}
	
	update(time, delta) {
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
			if(result1.data.getQw.seat==1){
				 this.decideMove(result1.data.getQw.x,result1.data.getQw.y,this.player[0])
			
				 this.updateCardData(2,result1.data.getQw.x,result1.data.getQw.y,nameWeGot1,0)
				 this.seat=1
				 	 if(result1.data.getQw.whichCard!=-1){
						console.log('move the card')
				 		
				 }
			}
			if(result2.data.getQw.seat==1){
				this.decideMove(result2.data.getQw.x,result2.data.getQw.y,this.player[1])
				this.updateCardData(2,result2.data.getQw.x,result2.data.getQw.y,nameWeGot2,0)
				this.seat=0
					if(result2.data.getQw.whichCard!=-1){
					console.log('move the card')
					
			 }
			}
			
			
		})();
		
	}
}
