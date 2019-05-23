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
	
		//console.log(this.cardSet)
	  
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
		
		//display card
		this.decideCard()
			 		
		this.userName=['switch','test3','test5','noviah']
		this.initiRoomInfo()
		this.getuserName()


		//test 4 player mode
		this.initCardData(-1,405,85,this.userName[0])
		this.initCardData(-1,730,85,this.userName[1])
		this.initCardData(-1,405,410,this.userName[2])
		this.initCardData(-1,730,410,this.userName[3])
		this.playername=this.add.text(500,50,this.userName[0]+' turn').setScale(1.5,1.5)	

		
	

		//display player name
		// this.name1=this.add.text(20,70,this.userName[0])
		// this.name2=this.add.text(900,70,this.userName[1])
		// this.name3=this.add.text(20,370,this.userName[2])
		// this.name4=this.add.text(900,370,this.userName[3])
	
	
    this.clickedBox()
//decide poker hands
		this.cardWeGet=[]
		this.numOfEach=[]
		this.spade=[]
		this.club=[]
		this.heart=[]
		this.dia=[]
	
		   
	}
	//
	decideCard(){
	(async () => {
		await client.hydrated();
		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const result = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: name
			},
			fetchPolicy: 'network-only',
		});
		const roomid = result.data.getQw.roomID;
		const result2 = await client.query({
			query: gql(queries.getReadyPageTable),
			variables: {
				roomID: roomid
			},
			fetchPolicy: 'network-only',
		});
		const cardSet = result2.data.getReadyPageTable.cards;
		let card_number=0;
			let x_pos=0;
			let y_pos=0; 
			this.cardSet=[] 
		  for(var i=0;i<6;i++){
			for(var j=0 ;j<6;j++){
			   var generatecard=cardSet[card_number]
				 this.card=new Card(this,405+x_pos,85+y_pos,'cards',generatecard).setOrigin(0, 0).setInteractive().setDataEnabled()
				 this.cardSet.push(this.card)
			   this.card.data.set('card_number', card_number);
				x_pos+=65;
				card_number++;
			 }
			   y_pos+=65;
			   x_pos=0;
			 }
			 //add player chess
			 let player1=new Player(this,405,85,'chess_red',1).setOrigin(0,0)
			let player2=new Player(this,730,85,'chess_blue',2).setOrigin(0,0)
			let player3=new Player(this,405,410,'chess_purple',3).setOrigin(0,0)
			let player4=new Player(this,730,410,'chess_orange',4).setOrigin(0,0)

			this.player=[]
			this.player.push(player1)
			this.player.push(player2)
			this.player.push(player3)
			this.player.push(player4)
	})();

	
}
	

//inital the room information
initiRoomInfo(){
	(async () => {
		await client.hydrated();
		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const result = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: name
			},
			fetchPolicy: 'network-only',
		});
		const roomid = result.data.getQw.roomID;
		const result2 = await client.query({
			query: gql(queries.getReadyPageTable),
			variables: {
				roomID: roomid
			},
			fetchPolicy: 'network-only',
		});
		const cardSet = result2.data.getReadyPageTable.cards;
console.log('inital info'+cardSet)
	
	const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
			roomid : roomid
	}))

	const userName = getPlayersInTheRoom.data.getRoompage.players;
	console.log('initial info'+userName)
	const thething = {
		username : name,
		userList:userName,
		cardGet: cardSet
			};
const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));


	})();


}

	
//check if the round is this user's round
	checkUserInfo(cardNum,name,x,y,seat,cardleft,ifdecrease,ranNums) {
			Auth.currentUserInfo().then((userInfo) => {
				const { username } = userInfo;
				if(name==username){
					this.updateCardData(cardNum,x,y,name)
					if(ifdecrease==0){
						this.cardWeGet.push(ranNums[cardNum])
						console.log('so far we get',this.cardWeGet)
						this.decideSuit(this.cardWeGet)
		        this.checkPH(this.cardWeGet)
		        this.updateRank()
					this.updateRound(seat,cardleft-1)
					}else if(ifdecrease==1){
						this.updateRound(seat,cardleft)
					}
				}else{
					console.log('invalid move')	
				}
			}
			)
		}


getuserName(){
	(async () => {
		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const result = await API.graphql(graphqlOperation(queries.getQw,{
				username : name
		}));
		
		const userName = result.data.getQw.userList;
		console.log('in initial '+userName[0])
		

})();
}


//switch user between different round
async round(x,y,cardNum,ifdecrease){
	(async () => { 
		await client.hydrated();

		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;

		const result = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: name
			},
			fetchPolicy: 'network-only',
		});
		const userName=result.data.getQw.userList
		const ranNums=result.data.getQw.cardGet
		console.log('in round'+userName)
		var nameWeGot1 = this.userName[0];
		const result1 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot1
			},
			fetchPolicy: 'network-only',
		});
		const seat=result1.data.getQw.seat
		const cardleft=result1.data.getQw.cardLeft
		console.log('the recent seat'+seat)
		 if(x==this.player[seat%4].x||y==this.player[seat%4].y){
			this.checkUserInfo(cardNum,this.userName[seat%4],x,y,seat,cardleft,ifdecrease,ranNums)
		 }
	})();
}

// get username list apply to round function

//move to next player
async updateRound(theSeat,theCard){
  // const getUser = await Auth.currentAuthenticatedUser();
	// 	const name = getUser.username;
	// 	const result = await API.graphql(graphqlOperation(queries.getQw,{
	// 			username : name
	// 	}));
	// 	const userName = result.data.getQw.userList

	const thething = {
				username : this.userName[0],
				seat:theSeat+1,
				cardLeft:theCard
					};
 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
}

//initialize the player's data
async initCardData(card,x,y,theusername){
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
						seat: 0,
						cardLeft:36,
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

	//update the user's current rank
	async updateRank(){
		const getUser = await Auth.currentAuthenticatedUser();
		const name = getUser.username;
		const thething = {
					username : name,
					rank: this.rank
						};
	 const newThing = await API.graphql(graphqlOperation(mutations.updateQw, {input: thething}));
	 console.log('rank is',this.rank)
	}



	//click the card and make it move
	clickedBox(){
		this.input.on('gameobjectdown', (pointer, gameObject) => {
			for(var i=0;i<36;i++){
				if(this.gameBoard[i] == i ){
						if(gameObject.data.get('card_number') == i){
								this.round(gameObject.x,gameObject.y,i,0)
								console.log(this.cardWeGet)
								break;
						}else if(gameObject.data.get('card_number') == 53){
							this.round(gameObject.x,gameObject.y,-1,1)
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

		// const getUser = await Auth.currentAuthenticatedUser();
		// const name = getUser.username;
		// const getRoomID = await API.graphql(graphqlOperation(queries.getQw,{
		// 		username : name
		// }));
		// const result = getRoomID.data.getQw.roomID;
		// const getPlayersInTheRoom = await API.graphql(graphqlOperation(queries.getRoompage,{
		// 		roomid : result
		// }))
		// const userName = getPlayersInTheRoom.data.getRoompage.players;
						
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

		var nameWeGot3 = this.userName[2];
			 const result3 = await client.query({
			query: gql(queries.getQw),
			variables: {
				username: nameWeGot3
			},
			fetchPolicy: 'network-only',
		});

		var nameWeGot4 = this.userName[3];
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

		this.playername.text=this.userName[result1.data.getQw.seat%4]+' turn'

		let arrange=result1.data.getQw.seat
		let cardleft=result1.data.getQw.cardLeft

			if(result1.data.getQw.whichCard!=-1){
					this.cardSet[result1.data.getQw.whichCard].setX(20+arrange*10)
					this.cardSet[result1.data.getQw.whichCard].setY(100)
					this.cardSet[result1.data.getQw.whichCard].setScale(0.1,0.1)
					}
			if(result2.data.getQw.whichCard!=-1){
				this.cardSet[result2.data.getQw.whichCard].setX(900+arrange*10)
				this.cardSet[result2.data.getQw.whichCard].setY(100)
				this.cardSet[result2.data.getQw.whichCard].setScale(0.1,0.1)
		 }
		 if(result3.data.getQw.whichCard!=-1){
			this.cardSet[result3.data.getQw.whichCard].setX(20+arrange*10)
			this.cardSet[result3.data.getQw.whichCard].setY(400)
			this.cardSet[result3.data.getQw.whichCard].setScale(0.1,0.1)
	 }
	 if(result4.data.getQw.whichCard!=-1){
		this.cardSet[result4.data.getQw.whichCard].setX(900+arrange*10)
		this.cardSet[result4.data.getQw.whichCard].setY(400)
		this.cardSet[result4.data.getQw.whichCard].setScale(0.1,0.1)
		}
		
		//show the result answer
		if(cardleft<=0){
			this.newBoard=this.add.image(400, 80, 'boardbg');
			this.newBoard.setOrigin(0, 0).setScale(2.8,2.8);
			this.playername.text='Game Over'
			this.rank1=this.add.text(470,120,nameWeGot1+':  rank '+result1.data.getQw.rank)
			this.rank2=this.add.text(470,160,nameWeGot2+':  rank '+result2.data.getQw.rank)
			this.rank3=this.add.text(470,200,nameWeGot3+':  rank '+result3.data.getQw.rank)
			this.rank4=this.add.text(470,240,nameWeGot4+':   rank '+result4.data.getQw.rank)
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

decideSuit(the_card_get){
	for(var i=0;i<the_card_get.length;i++){
		if(the_card_get[i]>=0&&the_card_get[i]<=12){
			this.spade.push(the_card_get[i])
		}else if(the_card_get[i]>=13&&the_card_get[i]<=25){
			this.club.push(the_card_get[i])
		}else if(the_card_get[i]>=26&&the_card_get[i]<=38){
			this.dia.push(the_card_get[i])
		}else{
			this.heart.push(the_card_get[i])
		}
	}
}

checkPH(the_card_get){
	this.rank=6
	for(var m=1;m<=13;m++){
		this.numOfEach.push(this.ifHas(the_card_get,m).length)
	}
	if(!this.numOfEach.includes(3)&&this.numOfEach.includes(2)){
		//console.log('pair')
		this.rank=5
	}
	if(this.numOfEach.includes(3)&&!this.numOfEach.includes(2)){
		//console.log('three of a kind')
		this.rank=4
	}
	if(this.spade.length>=5||this.club.length>=5||this.heart.length>=5||this.dia.length>=5){
		//console.log('Flush')
		this.rank=3
	}
	if(this.numOfEach.includes(3)&&this.numOfEach.includes(2)){
		//console.log('full house')
		this.rank=2
	}
	//console.log(this.numOfEach)
	if(this.numOfEach.includes(4)){
		//console.log('4 of a kind')
		this.rank=1
	}
	console.log(this.rank)
	
}
	update(time, delta) {
		this.updateScreen()
	
		
	}
}
