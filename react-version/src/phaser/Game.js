/** @type {import { "../typing/phaser" };} */
import React, { Component } from 'react';
import Phaser from 'phaser';


import  {GameBoard}  from "./scenes/GameBoard";

export default class Game extends Component{
    componentDidMount(){
    let game=new Phaser.Game({
    type: Phaser.AUTO,
	width: 640,
	height: 320,
	scale: {
		scale: 'SHOW_ALL',
		orientation: 'LANDSCAPE'
	},
	
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				y: 500
			}
		}
	},
    scene: [GameBoard],
    render:{
        pixelArt: true,
    }
    });
}
shouldComponentUpdate(){
    return false;
}

render(){
    return <div id='phaser-game' />
}
      
}
