var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
class Game {
  constructor () {
    this.players = [player1, player2]
    this.turn = player1
    this.cards = ["blue-01", "blue-02", "blue-03", "blue-04", "blue-05", "blue-06", "blue-07", "blue-08", "blue-09", "blue-10", "blue-jack", "blue-king", "blue-queen",
      "gold-01", "gold-02", "gold-03", "gold-04", "gold-05", "gold-06", "gold-07", "gold-08", "gold-09", "gold-10", "gold-jack", "gold-king", "gold-queen",
      "green-01", "green-02", "green-03", "green-04", "green-05", "green-06", "green-07", "green-08", "green-09", "green-10", "green-jack", "green-king", "green-queen",
      "red-01", "red-02", "red-03", "red-04", "red-05", "red-06", "red-07", "red-08", "red-09", "red-10", "red-jack", "red-king", "red-queen"]
  }


  shuffle() {
	for (var i = 0; i < 1000; i++) {
		var location1 = Math.floor((Math.random() * this.cards.length));
		var location2 = Math.floor((Math.random() * this.cards.length));
		var tmp = this.cards[location1];
		this.cards[location1] = this.cards[location2];
		this.cards[location2] = tmp;
	 }
  }

  dealDeck() {
    var half = Math.ceil(this.cards.length / 2);
    var player1Deck = this.cards.splice(0, half)
    var player2Deck = this.cards.splice(-half)
    this.players[0].hand = player1Deck
    this.players[1].hand = player2Deck
  }

  resetGame() {
    player1.cards = []
    player2.cards = []
    this.cards = ["blue-01", "blue-02", "blue-03", "blue-04", "blue-05", "blue-06", "blue-07", "blue-08", "blue-09", "blue-10", "blue-jack", "blue-king", "blue-queen",
      "gold-01", "gold-02", "gold-03", "gold-04", "gold-05", "gold-06", "gold-07", "gold-08", "gold-09", "gold-10", "gold-jack", "gold-king", "gold-queen",
      "green-01", "green-02", "green-03", "green-04", "green-05", "green-06", "green-07", "green-08", "green-09", "green-10", "green-jack", "green-king", "green-queen",
      "red-01", "red-02", "red-03", "red-04", "red-05", "red-06", "red-07", "red-08", "red-09", "red-10", "red-jack", "red-king", "red-queen"]
    this.turn = player1
    removeMiddleDeck();
    startGame();
    setTimeout(function(){updateStatus()}, 3000);
  }

}
