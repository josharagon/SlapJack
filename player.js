class Player {
  constructor() {
    this.id = Date.now()
    this.wins = 0
    this.hand = []
  }
  playCard(game) {
    game.cards.unshift(this.hand.pop())
    if (game.turn === player1) {
      game.turn = player2
    } else {
      game.turn = player1
    }
  }
}
