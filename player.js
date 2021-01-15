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

}
