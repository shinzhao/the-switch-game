import {Player} from '../phaser/objects/Player'
import {GameBoard} from '../phaser/scenes/GameBoard'


test('Testing the Player constructer correctly intializes player',()=>{
    const id = "111";
    const player = new Player(new GameBoard(),405,85, "chess_red",id);
    expect(player.id).toBe(id);
});