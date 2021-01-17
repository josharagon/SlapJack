class Player {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Date.now())
    this.wins = 0
    this.hand = []
  }
  playCard(game) {
    game.cards.unshift(this.hand.pop())
    if (game.turn === player1) {
      game.turn = player2
    } else if(game.turn === player2) {
      game.turn = player1
    }
  }

  saveWinsToStorage() {
    var stringifiedP1 = JSON.stringify(player1);
    var stringifiedP2 = JSON.stringify(player2);
    localStorage.setItem('player1-wins', stringifiedP1);
    localStorage.setItem('player2-wins', stringifiedP2);
  }

}
