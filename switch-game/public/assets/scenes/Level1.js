export default class Level1 extends Phaser.Scene {
	constructor() {
		super({
			key: 'Level1'
		});
	}
	preload() {
		this.load.image('boardbg', '/img/boardbg.png');
	}
	create() {
		this.boardbg = this.add.image(171, 21, 'boardbg').setOrigin(0, 0).setScale(2.0,2.0);
	}
	update(time, delta) {}
}
