/** @type {import { "../typing/phaser" };} */

import React, { Component } from 'react';
import Phaser from 'phaser';

import { Load } from "./scenes/Load";
import { GameBoard } from "./scenes/GameBoard";


export default class Game extends React.Component{
    componentDidMount(){
        let game=new Phaser.Game({
            type: Phaser.AUTO,
            width: window.innerWidth,
            height:window.innerHeight,
            
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: {
                        y: 500
                    }
                }
            },
            scene: [Load,GameBoard],
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