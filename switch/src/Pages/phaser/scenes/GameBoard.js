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



			 this.player=[]
			 this.player.push(player1)
			 this.player.push(player2)
				
		//need user name array
		let userName=['switch','noviah']

		//initalize the data
		this.initCardData(0,405,85,'switch',0)
		this.initCardData(0,730,85,'noviah',0)

		let seat=0;
			
		this.clickedBox(seat,userName)
		   
	}

	//check if the login user is in his round
	checkUserInfo(name,x,y) {
    Auth.currentUserInfo().then((userInfo) => {
			const { username } = userInfo;
      if(name==username){
				this.updateCardData(3,x,y)
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
	handlePlayerCard(card,arrangepostion,seat,data){
		if(seat==0&&data!=53){
		arrangepostion-=10
		card.setX(10+arrangepostion);
		card.setY(70);
		card.setScale(0.1,0.1)
		}else if(seat==1&&data!=53){
		arrangepostion-=10
		card.setX(900+arrangepostion);
		card.setY(70);
		card.setScale(0.1,0.1)
		}
	}

//************************************************ */
//the thing you need
//*********************************************** */

async round(){
	(async () => { 
 
		await client.hydrated();
		//const getUser = await Auth.currentAuthenticatedUser();
						
		var nameWeGot1 = 'switch';
		const result1 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot1
			},
			fetchPolicy: 'network-only',
		});
		console.log(result1.data.getQw.seat)
	  
		
	})();
}

async initCardData(card,x,y,theusername,seat){
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
						seat: seat
					};
 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
}


	
	
	async updateCardData(card,x,y){
		const cardV = card;
		console.log(cardV)
		const xV =x;
		console.log("x : "+xV)
		const yV = y;
		console.log("y : "+yV);
		const getUser = await Auth.currentAuthenticatedUser();
							const name = getUser.username;
							console.log('your name : ' +name);
		const thething = {
					username : name,
					whichCard : cardV,
							x : xV,
							y : yV,
						};
	 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
	}

	
	
	



	//click the card and make it move
	clickedBox(seat,userName){
		
		var arrangepostion=0;
		this.input.on('gameobjectdown', (pointer, gameObject) => {
			for(var i=0;i<36;i++){
				if(this.gameBoard[i] == i ){
					if(gameObject.x==this.player[seat].x||gameObject.y==this.player[seat].y){
						this.checkUserInfo(userName[seat],gameObject.x,gameObject.y,this.player[seat])
						// this.handlePlayerCard(gameObject,arrangepostion,seat,gameObject.data.get('card_number'))
						// arrangepostion+=15
						break;
					}	
				
			}	
	
	}

			
	});

}
	
	update(time, delta) {
		(async () => { 
 
			await client.hydrated();
			//const getUser = await Auth.currentAuthenticatedUser();
							
			var nameWeGot1 = 'switch';
			const result1 = await client.query({
				query: gql(queries.getQw),
				variables: {
					username: nameWeGot1
				},
				fetchPolicy: 'network-only',
			});
			
			if(result1.data.getQw.whichCard==3){
				 this.decideMove(result1.data.getQw.x,result1.data.getQw.y,this.player[0])
				 this.updateCardData(2,result1.data.getQw.x,result1.data.getQw.y)
			}
			
		})();

		
	}
}
