import React, { Component } from 'react';
import RoomListPage from './RoomListPage';
import './GameRulePage.css';
import { withRouter } from "react-router-dom";
import { withAuthenticator } from 'aws-amplify-react';

class GameRulePage extends React.Component {
    constructor() {
        super();
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick(e) {
        e.preventDefault();
        this.props.history.push('/room-list');
    }

    render() {
        return(
            <div className="game-rule">
                <button className="back-button" onClick={this.handleBackClick}>Back</button>
                <div className="text">
                    <h1 className="title">Switch Game Rule</h1>
                    <h2>--- 4 Players ---</h2>
                    <h3>The Deal:</h3>
                    <p>
                        Each player will draw a card; the player drawing the lowest card is the dealer (ace is the highest).
                    </p>
                    <p>
                        If there is a tie for low, there is another drawing for those who tie.
                    </p>
                    <p>
                        The deal passes to the left after each hand.
                    </p>
                    <p>
                        The deck is then shuffled.
                    </p>
                    <p>
                        36 cards are placed face up on the board in 6 rows by 6 columns.
                    </p>
                    <p>
                        The remainder of the deck is placed aside and is not used during the hand.
                    </p>
                    <p>
                        Each player will have his/her chess piece on the card at the left end of the row nearest him/her.
                    </p>
                    <h3>Moves:</h3>
                    <p>
                        The first move is made by the player to the left of the dealer, and after him/her the turn passes to the left.
                    </p>
                    <p>
                        In his/her turn, a player moves his piece any number of spaces along a row or column (but never diagonally), provided that this move is not made onto or over a space occupied by another player's piece.
                    </p>
                    <p>
                        A player may make his/her move onto or over blank spaces as well as spaces occupied by cards.
                    </p>
                    <p> 
                        If a player ends his turn on a card, he/her receives that card and places it face up in front of him.
                    </p>
                    <p>
                        If a player ends his turn on a blank space, he recieves no card during that turn.
                    </p>
                    <p> 
                        Since a player must move his/her chess piece each turn, he/she may not use his first turn to acquire the card his chess piece is on at the start of a hand.
                    </p>
                    <p> 
                        An exception is made in the rare instance when the dealer finds he cannot move during his/her first turn, since other players have blocked him/her completely.
                    </p>
                    <p> 
                        In this case the card he/she is on becomes part of his/her hand.
                    </p>
                    <h3>Conversation Before Alliances are Formed:</h3>
                    <p>
                        ALLIANCE are usually not formed until after several moves have been made in a hand of play. Although this means there are no partnerships discussing their strategy, the conversation may be even more lively at this point. What is said, of course, depends on the personality of the group, but the following are some suggestions of comments that have proved useful:
                    </p>
                    <p>
                        If one player is acquiring a good hand, point out that he should be stopped from getting other valuable cards. This is especially useful if you are unable or unwilling to stop him yourself. (A player may be blocked temporarily from getting a card if another player moves his piece onto a space between that player’s piece and the card. A player may be stopped permanently from getting a card if another player picks up that card instead.)
                    </p>
                    <p>
                        If another player points out that you yourself are acquiring a good hand, cry poverty. Say, “Me! I’ll only have a lousy straight. Him! He’s the one you should worry about.”
                    </p>
                    <p>
                        An alternative strategy is to call attention to the strength of your position in hopes of finding someone who will want you as a partner.
                    </p>
                    <p>
                        If you do make a move that will block a strong player, state (humbly) what a noble sacrifice you are making for the other two players in wasting your own turn to block the strong player. This is even more effective if you only appear to be blocking the strong player but are actually moving into a position where you can acquire much better cards for yourself.
                    </p>
                    <p> 
                        (In case you consider such deceptions and admonitions to be undignified in a game of skill, it should be noted that game theory concerns itself with conflicts quite similar to these and with the problems involved in shifting alliances.)
                    </p>
                    <h3>Alliances:</h3>
                    <p>
                        A PLAYER may form an alliance during his turn and before he moves his piece for that turn. He forms the alliance simply by stating that he is entering a partnership with a certain other player. He is then allied with that player against the other two players for the duration of that hand. The partner chosen cannot refuse the offer of partnership.
                    </p>
                    <p>
                        For example, suppose the four players are Smith, Jones, Robinson, and Brown. Smith has given up hope of obtaining the best hand, but he thinks Jones is in a good position to win, especially if he gives Jones some help. It is Smith’s turn to move; so he says something to this effect: “I hereby form a partnership with Jones.” Thus Smith and Jones are allied against Robinson and Brown. As indicated, Jones has no say-so as to whether he wants Smith for a partner, nor can Robinson and Brown avoid being allied at this point. During each hand there is only one opportunity for a choice to be made, because when one player chooses a partner, that defines the opposing sides for the rest of the hand.
                    </p>
                    <p> 
                        The existence of partnerships does not change the rules of play. The partners do not combine their hands, but each continues to acquire cards for himself. The only way a player may help his partner is by using his piece to block opponents’ pieces or by picking up cards that might be valuable to the opponents.
                    </p>
                    <p> 
                        The only change that results from the formation of partnerships is in the scoring at the end of the hand. Each player scores differently depending on whether the winner of the hand is the one who chose a partner, whether he is the partner chosen, or whether he is one of their opponents.
                    </p>
                    <h5>
                        HERE ARE THE RULES FOR SCORING:
                    </h5>
                    <p> 
                        The player who chose a partner will score 3 points only if his partner wins the hand. If he himself wins, no one scores anything.
                    </p>
                    <p> 
                        The player who was chosenwill score 7 points only if he himself wins.
                    </p>
                    <p> 
                        If the winner is either one of the players opposing the one who chose and the one chosen, this winner will score 6 points and his partner will score 4.
                    </p>
                    <p>
                        As you can see, the player who does the choosing gives himself a handicap. He can score only if his partner wins, and then he scores only 3 points while his partner scores 7. This player, therefore, will work only for his partner.
                    </p> 
                    <p>
                        The players opposing the one who chose are in a partnership of a different nature. They can score if either one of them wins; however, the winner scores 6 points and his partner 4. This 2-point difference can cause some conflict of interest. Either of these players would be happy to see his partner win, but he may not always help his partner, since he can score more by winning himself. Their alliance is therefore not as tightly knit as the one between the other two players.
                    </p>
                    <p> 
                        These rules will be further clarified by the example of scoring given below.
                    </p>
                    <p> 
                        If no player were to choose a partner during a hand, the winner would score 10 points.
                    </p>
                    <h3>Ending a Hand:</h3>
                    <p>
                        THEORETICALLY the hand ends when all the cards in the array have been picked up or when blocking by one side makes it impossible to acquire any more cards. In practice, though, the players can end the hand when they see that one of them is in an unbeatable position.
                    </p>
                    <p>
                        The winning player is the one who has acquired five cards that make the best poker hand. Even if the winning player doesn’t want to win (as is sometimes the case if he is the one who chose his partner), his best selection of five cards is still used instead of any other of his cards. If there is a tie for best hand, there is no score.
                    </p>
                    <p> 
                        After each player’s score is recorded, all 52 cards are shuffled together, and a new array of cards is then dealt. 
                    </p>
                    <h3>Scoring 16 or More Points:</h3>
                    <p>
                        TO WIN THE GAME a player needs 20 points. However, when a player’s total score nears 20, the others often gang up on him to keep him from winning. Even his partner might want to play against him. To prevent a temporary stalemate from occurring at this point, any player who has a total score of 16 or more points is given a special power. He makes the moves of his partner’s piece as well as his own. This power may be used to help or hinder the partner. A player with 16 or more points may try to achieve a win for his partner, or he may make sure his partner doesn’t win.
                    </p>
                    <p>
                        This may seem like a drastic weapon to give a player who is already ahead, but it is the only means a leading player will have for breaking the coalition that is sure to be formed against him by the other three players.
                    </p>
                    <p>
                        If two players in partnership both have scores of 16 or more points, then this power does not apply, even if one of the players has a higher score than the other. Neither player will be able to move the piece of the other.
                    </p>
                    <h3>Winning the Game:</h3>
                    <p>
                        WHEN A PLAYER’S total score reaches 20 points, he wins the game. However, if two partners both reach 20 in the same hand, the one who then has the highest score wins. (This may serve as a restraint on your choice of partner towards the end of a game.) If there is a tie for highest at this point, additional hands are played until one player (not necessarily one of those tying originally) gets the highest score.
                    </p>
                    <br />
                    <h2>--- 2 Players ---</h2>
                    <p>
                        THE TWO-PLAYER GAME follows the same rules as that for four except that only 25 cards, five rows of five each, are dealt onto the table. The players sit opposite each other, and each places his piece on the card at the left end of the row nearest him. The winner of a hand scores 10 points, and 40 points wins the game.
                    </p>
                    <p>
                        There are, of course, no partnerships in this version, and thus it doesn’t have the same interest as the four-player game, but there are still opportunities for strategy. In fact, a little analysis of the game shows that for every array of cards dealt there must exist a perfect winning strategy for one of the players. An interesting fact is that this strategy is different for each new array dealt. The complete strategy of a hand, though, is usually much too complex to be discovered at the start of the hand. 
                    </p>
                    <br />
                    <h2>--- Poker Hands ---</h2>
                    <p>
                        THE FOLLOWING is the rank of the Poker hands from highest to lowest:
                    </p>
                    <p>
                            Straight flush—five cards of the same suit in numerical sequence
                            Four of a kind—four cards of the same rank
                            Full house—three of a kind plus a pair
                            Flush—any five cards of the same suit
                            Straight—any five cards in numerical sequence
                            Three of a kind—three cards of the same rank
                            Two pair—two cards of one rank plus two cards of another rank
                            Pair—two cards of the same rank
                    </p>
                    <p>
                        THE HIGHER of two straights or two straight flushes is the one which has the highest card. Ace is always high except in the sequence A-2-3-4-5. The higher of two fours of a kind, two threes of a kind, or two pairs is determined by the rank of the cards making up the combination. The higher of two full houses is the one that contains the higher ranking three of a kind. The higher of two flushes (or of two of the two-pair hands) is determined by the rank of the highest card in each. If both high cards are the same, the next highest are compared, and so on. Two hands that are equal in all respects tie. No one suit ranks above another. 
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(withAuthenticator(GameRulePage,true));