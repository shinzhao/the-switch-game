import React, { Component } from 'react';
import GameBoard from 'GameBoard'

class Game extends Component{
    let game={
        type: Phaser.AUTO,
	width: 640,
	height: 320,
	scale: {
		scale: 'SHOW_ALL',
		orientation: 'LANDSCAPE'
	},
	resolution: window.devicePixelRatio,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				y: 500
			}
		}
	},
	scene: [Level1]
    }
    render(){
        return
           <GameBoard/>
    }

    
}
