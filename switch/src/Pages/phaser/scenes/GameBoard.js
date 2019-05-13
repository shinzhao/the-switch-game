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
			 let player3=new Player(this,405,410,'chess_purple',3).setOrigin(0,0)
			 let player4=new Player(this,730,410,'chess_orange',4).setOrigin(0,0)

			 this.player=[]
			 this.player.push(player1)
			 this.player.push(player2)
			 this.player.push(player3)
			 this.player.push(player4)
				

		//initalize the data
		this.getuserName()
		
		//this.Rf=[0,9,10,11,12]
		this.mygetcard=[0,16,25,26,1,27,40]
		this.mygetcard.sort()
		this.numOfEach=[]
		for(var m=1;m<=13;m++){
		  this.numOfEach.push(this.ifHas(this.mygetcard,m).length)
		}

		this.arrange=0
			
	
		this.clickedBox(ranNums)
		   
	}
	
	

	
//check if the round is this user's round
	checkUserInfo(cardNum,name,x,y,seat) {
			Auth.currentUserInfo().then((userInfo) => {
				const { username } = userInfo;
				if(name==username){
					this.updateCardData(cardNum,x,y,name)
					this.updateRound(seat)
					this.arrange+=20
				}else{
					console.log('invalid move')	
				}
			}
			)
		}
	
// ifHasPair(the_card_get){
// 	let result=[0]
// 	for(var i=0;i<the_card_get.length;i++){
// 		for(var j=0;j<the_card_get.length;j++){
// 			if(the_card_get[i]%13==the_card_get[j]%13){
// 				result[0]=1
// 				result.push(i)
// 				result.push(j)
// 				break;
// 			}
// 		}
// 	}
// 	console.log(result)
// 	return result
// }

// ifHasThree(the_card_get){
// 	let result=[0]
// 	for(var i=0;i<the_card_get.length;i++){
// 		for(var j=0;j<the_card_get.length;j++){
// 			for(var m=0;m<the_card_get.length;m++){
// 				if(the_card_get[i]%13==the_card_get[j]%13&&the_card_get[i]%13==the_card_get[m]%13){
// 					result[0]=1
// 					result.push(i)
// 					result.push(j)
// 					result.push(m)
// 				}
// 			}
// 		}
// 	}
// 	console.log(result)
// 	return result
// }

getuserName(){
	(async () => {
		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const getRoomID = await API.graphql(graphqlOperation(queries.getQw,{
				username : name
		}));
		
		const result = getRoomID.data.getQw.roomID;
		console.log(result)
		const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
				roomid : result
		}))
		
		const userName = getPlayersInTheRoom.data.getRoompage.players;
		console.log(userName)
		console.log('players you have : '+ userName);
		this.initCardData(-1,405,85,userName[0],0)
		this.initCardData(-1,730,85,userName[1],0)
		this.initCardData(-1,405,410,userName[2],0)
		this.initCardData(-1,730,410,userName[3],0)
		this.playername=this.add.text(500,50,userName[0]+' turn')
})();
}


//switch user between different round
async round(x,y,cardNum){
	(async () => { 
		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const getRoomID = await API.graphql(graphqlOperation(queries.getQw,{
				username : name
		}));
		const result = getRoomID.data.getQw.roomID;
		const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
				roomid : result
		}))
		const userName = getPlayersInTheRoom.data.getRoompage.players;
    await client.hydrated();
		var nameWeGot1 = userName[0];
		const result1 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot1
			},
			fetchPolicy: 'network-only',
		});
		const seat=result1.data.getQw.seat
		console.log('the recent seat'+seat)
		 if(x==this.player[seat%4].x||y==this.player[seat%4].y){
			this.checkUserInfo(cardNum,userName[seat%4],x,y,seat)
		 }
	})();
}

// get username list apply to round function

//move to next player
async updateRound(theSeat){
  const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const getRoomID = await API.graphql(graphqlOperation(queries.getQw,{
				username : name
		}));
		const result = getRoomID.data.getQw.roomID;
		const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
				roomid : result
		}))
		const userName = getPlayersInTheRoom.data.getRoompage.players;

	const thething = {
				username : userName[0],
				seat:theSeat+1
					};
 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
}

//initialize the player's data
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
	
//when move, update data to database
	async updateCardData(card,x,y,name){
		const cardV = card;
		const xV =x;
		const yV = y;
		
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
								this.round(gameObject.x,gameObject.y,i)
								this.CardLeft--;
								break;
						}else if(gameObject.data.get('card_number') == 53){
							this.round(gameObject.x,gameObject.y,-1)
								break;
						}
					}	
			}
		});
	}	
	

		


//function to get data from db and update the screen

async updateScreen(){
	(async () => { 
 
		await client.hydrated();

		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const getRoomID = await API.graphql(graphqlOperation(queries.getQw,{
				username : name
		}));
		const result = getRoomID.data.getQw.roomID;
		const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
				roomid : result
		}))
		const userName = getPlayersInTheRoom.data.getRoompage.players;
						
		var nameWeGot1 = userName[0];
		const result1 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot1
			},
			fetchPolicy: 'network-only',
		});

		var nameWeGot2 = userName[1];
			 const result2 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot2
			},
			fetchPolicy: 'network-only',
		});

		var nameWeGot3 = userName[2];
			 const result3 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot3
			},
			fetchPolicy: 'network-only',
		});

		var nameWeGot4 = userName[3];
			 const result4 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot4
			},
			fetchPolicy: 'network-only',
		});
		let x1=result1.data.getQw.x
		let y1=result1.data.getQw.y
		let x2=result2.data.getQw.x
		let y2=result2.data.getQw.y
		let x3=result3.data.getQw.x
		let y3=result3.data.getQw.y
		let x4=result4.data.getQw.x
		let y4=result4.data.getQw.y
		this.player[0].setX(x1)
		this.player[0].setY(y1)
		this.player[1].setX(x2)
		this.player[1].setY(y2)
		this.player[2].setX(x3)
		this.player[2].setY(y3)
		this.player[3].setX(x4)
		this.player[3].setY(y4)
		this.playername.text=userName[result1.data.getQw.seat%4]+' turn'
			if(result1.data.getQw.whichCard!=-1){
					this.cardSet[result1.data.getQw.whichCard].setX(20+this.arrange)
					this.cardSet[result1.data.getQw.whichCard].setY(85)
					}
			if(result2.data.getQw.whichCard!=-1){
				this.cardSet[result2.data.getQw.whichCard].setX(900+this.arrange)
				this.cardSet[result2.data.getQw.whichCard].setY(85)
		 }
		 if(result3.data.getQw.whichCard!=-1){
			this.cardSet[result2.data.getQw.whichCard].setX(900+this.arrange)
			this.cardSet[result2.data.getQw.whichCard].setY(200)
	 }
	 if(result4.data.getQw.whichCard!=-1){
		this.cardSet[result2.data.getQw.whichCard].setX(900+this.arrange)
		this.cardSet[result2.data.getQw.whichCard].setY(200)
    }
	})();
}
	

ifHas(the_card_get,num){
	let result=[]
	switch(num){
	case 1:
		result=the_card_get.filter(the_card_get=>the_card_get%13==0)
		break;
	case 2:
		result=the_card_get.filter(the_card_get=>the_card_get%13==1)
		break;
	case 3:
		result=the_card_get.filter(the_card_get=>the_card_get%13==2)
		break;
	case 4:
		result=the_card_get.filter(the_card_get=>the_card_get%13==3)
		break;
	case 5:
		result=the_card_get.filter(the_card_get=>the_card_get%13==4)
		break;
	case 6:
		result=the_card_get.filter(the_card_get=>the_card_get%13==5)
		break;
	case 7:
		result=the_card_get.filter(the_card_get=>the_card_get%13==6)
		break;
	case 8:
		result=the_card_get.filter(the_card_get=>the_card_get%13==7)
		break;
	case 9:
		result=the_card_get.filter(the_card_get=>the_card_get%13==8)
		break;
	case 10:
		result=the_card_get.filter(the_card_get=>the_card_get%13==9)
		break;
	case 11:
		result=the_card_get.filter(the_card_get=>the_card_get%13==10)
		break;
	case 12:
		result=the_card_get.filter(the_card_get=>the_card_get%13==11)
		break;
	case 13:
		result=the_card_get.filter(the_card_get=>the_card_get%13==12)
		break;
	}
	return result
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
