import Phaser from 'phaser';

export class Load extends Phaser.Scene{
    constructor(){
        super({
            key: 'Load'
        });
    }
    init(){
        
    }

    preload(){
        this.load.image('boardbg', './img/boardbg.png');
		this.load.image('blank','./img/blank.jpg')
		this.load.image('chess_red', './img/chess_1.png');
		this.load.image('chess_purple', './img/chess_2.png');
		this.load.image('chess_blue', './img/chess_3.png');
		this.load.image('chess_orange', './img/chess_4.png');
		this.load.spritesheet('cards', './img/cards.png',
		{frameWidth:334,
		frameHeight:440,
		});

    }
}