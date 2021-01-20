var player1 = new Player('Player 1');
var player2 = new Player('Player 2');

class Game {
  constructor () {
    this.players = [player1, player2];
    this.turn = player1;
    this.cards = ['blue-01', 'blue-02', 'blue-03', 'blue-04', 'blue-05', 'blue-06', 'blue-07', 'blue-08', 'blue-09', 'blue-10', 'blue-jack', 'blue-king', 'blue-queen',
      'gold-01', 'gold-02', 'gold-03', 'gold-04', 'gold-05', 'gold-06', 'gold-07', 'gold-08', 'gold-09', 'gold-10', 'gold-jack', 'gold-king', 'gold-queen',
      'green-01', 'green-02', 'green-03', 'green-04', 'green-05', 'green-06', 'green-07', 'green-08', 'green-09', 'green-10', 'green-jack', 'green-king', 'green-queen',
      'red-01', 'red-02', 'red-03', 'red-04', 'red-05', 'red-06', 'red-07', 'red-08', 'red-09', 'red-10', 'red-jack', 'red-king', 'red-queen'];
  }
  shuffle(array) {
	for (var i = 0; i < 1000; i++) {
		var location1 = Math.floor((Math.random() * array.length));
		var location2 = Math.floor((Math.random() * array.length));
		var tmp = array[location1];
		array[location1] = array[location2];
		array[location2] = tmp;
  };
 };
  dealDeck() {
    var half = Math.ceil(this.cards.length / 2);
    var player1Deck = this.cards.splice(0, half);
    var player2Deck = this.cards.splice(-half);
    this.players[0].hand = player1Deck;
    this.players[1].hand = player2Deck;
  };
  playerSlap(player, opponent, turn, opponentTurn, playerWins) {
    if (gamePlay.turn === opponentTurn && gamePlay.cards[0].includes('jack')) {
      gamePlay.playerWinsGame(player);
      playerWins.innerText = `Wins: ${player.wins}`;
    } else if (gamePlay.cards[0].includes('jack') && opponent.hand.length > 0) {
      playerSlapJack(player, opponent);
    } else if (gamePlay.turn != turn && opponent.hand.length >= 1 && gamePlay.cards.length >= 2 && gamePlay.cards[0].slice(-2) === gamePlay.cards[1].slice(-2)) {
      playerDouble(player, opponent);
    } else if (gamePlay.turn != turn && opponent.hand.length >= 1 && gamePlay.cards.length >= 2 && gamePlay.cards[0].slice(-2) === gamePlay.cards[2].slice(-2)) {
      playerSandwich(player, opponent);
    } else {
      falseSlap(player, opponent);
    };
  };
  playerWinsGame(player) {
    gameUpdate.innerText = `${player.name} Wins!!!`;
    player.wins++;
    document.removeEventListener('keyup', keyPressFunctions)
    player.saveWinsToStorage();
    setTimeout(function(){gamePlay.resetGame()}, 3000);
  };
  resetGame() {
    player1.cards = [];
    player2.cards = [];
    this.cards = ['blue-01', 'blue-02', 'blue-03', 'blue-04', 'blue-05', 'blue-06', 'blue-07', 'blue-08', 'blue-09', 'blue-10', 'blue-jack', 'blue-king', 'blue-queen',
      'gold-01', 'gold-02', 'gold-03', 'gold-04', 'gold-05', 'gold-06', 'gold-07', 'gold-08', 'gold-09', 'gold-10', 'gold-jack', 'gold-king', 'gold-queen',
      'green-01', 'green-02', 'green-03', 'green-04', 'green-05', 'green-06', 'green-07', 'green-08', 'green-09', 'green-10', 'green-jack', 'green-king', 'green-queen',
      'red-01', 'red-02', 'red-03', 'red-04', 'red-05', 'red-06', 'red-07', 'red-08', 'red-09', 'red-10', 'red-jack', 'red-king', 'red-queen'];
    this.turn = player1;
    removeMiddleDeck();
    startGame();
    setTimeout(function(){updateStatus()}, 3000);
  };
};
