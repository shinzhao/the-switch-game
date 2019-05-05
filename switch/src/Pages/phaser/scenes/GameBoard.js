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

		(async () => {
			this.appsync();
		})();
	
		


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

			 let player=[]
			 player.push(player1)
			 player.push(player2)
				
			 let gameState='gaming';
		//need user name array
		let userName=['switch','noviah']

		let seat=0;
			
		this.clickedBox(player,seat,userName)
		   
	}

	//check if the login user is in his round
	checkUserInfo(name,x,y,player) {
    Auth.currentUserInfo().then((userInfo) => {
			const { username } = userInfo;
      if(name==username){
				this.decideMove(x,y,player)
			}else{
				console.log('update')
				
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


	async appsync (){
		
					
// 			const result = await API.graphql(graphqlOperation(queries.listRoompages));
// 			const number = result.data.listRoompages.item[0].roomid;
// 			console.log(number);
// var dbx = await API.graphql(graphqlOperation(queries.listQws,{username:''}));
// 		console.log('appsync test' + dbx.data.listQws.item[0].username);

		(async () => { 

			//result1  show the list
			//result2  show only username = 'test5' 
			await client.hydrated();
			const nameWeGot = 'test5';
			const result1 = await client.query({
				query: gql(queries.listQws),
				fetchPolicy: 'cache-only',
			});
			const result2 = await client.query({
				query: gql(queries.getQw),
				variables: {
					username: nameWeGot
				},
				fetchPolicy: 'cache-first',
			});
			console.log(result1.data.listQws.items);
			console.log(result2.data.getQw.x)
		})();

// 		const thething = {
// 			username : 'test5',
// 			whichCard : '3',
// 					x : '333',
// 					y : '333'
// 				};
// const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
	//const dbx = appsynchelp.getX('test5');
// 	try {
// 		const dbx = await API.graphql(graphqlOperation(queries.listQws,{username : 'test5'}));
// 		console.log('hello');
// 		console.log('please');
// 		console.log('appsync test' +dbx);
// } catch(e) {
// 		console.log('please');
// 		console.log('haha');
// 		console.log(e);
// }
	//const dbx = await API.graphql(graphqlOperation(queries.getQw));
	
	
		

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
							y : yV
						};
	 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
	}
	
	



	//click the card and make it move
	clickedBox(player,seat,userName){
		
		var arrangepostion=0;
		this.input.on('gameobjectdown', (pointer, gameObject) => {
			for(var i=0;i<36;i++){
				if(this.gameBoard[i] == i ){
					if(gameObject.x==player[seat].x||gameObject.y==player[seat].y){
						this.checkUserInfo(userName[seat],gameObject.x,gameObject.y,player[seat])
						this.handlePlayerCard(gameObject,arrangepostion,seat,gameObject.data.get('card_number'))
						arrangepostion+=15
						// if(gameObject.data.get('card_number') == i){
						// 	console.log("move card")
						// 	 //this.handlePlayer1Card(gameObject,arrangepostion,seat)
							 
						// 	//this.updateCardData(3,player[seat].x,player[seat].y)
						// }else if(gameObject.data.get('blank')){
						// 	//this.updateCardData(-1,player[seat].x,player[seat].y)
						// 	break;
						// }
						if(seat<1){
							seat++
						}else{
							seat--
						}
						break;
					}	
				
			}	
	
	}

			
	});

}
	
	update(time, delta) {
		
		
	}
}