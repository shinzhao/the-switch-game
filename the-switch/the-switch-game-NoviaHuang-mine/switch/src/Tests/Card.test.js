import {Card} from '../Pages/phaser/objects/Card'
import {GameBoard} from '../Pages/phaser/scenes/GameBoard'


test('Testing the Card constructer correctly intializes player',()=>{
    const target = 5;
    const left = 36;
    const card = new Card(new GameBoard(),405,85, "cards",target,left);
    expect(card.target).toBe(target);
    expect(card.left).toBe(left);
});

test('Testing the Card left function',()=>{
    const target = 5;
    const left=36;
    const card = new Card(new GameBoard(),405,85, "cards",target,left);
    card.moveCard();
    expect(card.left).toBe(35);
})