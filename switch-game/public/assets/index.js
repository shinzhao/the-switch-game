// import { Game } from './phaser.min.js';
import Intro from './scenes/Intro.js';
import Level1 from './scenes/Level1.js';

var config = {
	type: Phaser.AUTO,
	width: 640,
	height: 640,
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
};


var game = new Phaser.Game(config);

function resize() {
	let canvas = document.querySelector('canvas');
	let width = window.innerWidth;
	let height = window.innerHeight;
	let wratio = width / height;
	let ratio = game.config.width / game.config.height;
	if (wratio < ratio) {
		canvas.style.width = width + 'px';
		canvas.style.height = width / ratio + 'px';
	} else {
		canvas.style.width = height * ratio + 'px';
		canvas.style.height = height + 'px';
	}
}

