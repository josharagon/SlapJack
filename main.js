var gameUpdate = document.querySelector('.game-updates')
var middleDeck = document.querySelector('#mid-deck')

document.addEventListener('keyup', keyPressFunctions)




  function startGame () {
     gamePlay = new Game()
     gamePlay.shuffle()
     gamePlay.dealDeck()
     gameUpdate.innerText = `${gamePlay.turn.name}'s Turn!`
  }




  function keyPressFunctions(e) {
    key = e.keyCode
    if (key === 81 && gamePlay.turn === player1 && player1.hand.length > 0) {
      player1.playCard(gamePlay);
      updateStatus();
      updateMiddleDeck();
      showMiddleDeck();
    } else if (key === 80 && gamePlay.turn === player2 && player2.hand.length > 0) {
      player2.playCard(gamePlay);
      updateStatus();
      updateMiddleDeck();
      showMiddleDeck();
    } else if (key === 70 && gamePlay.cards[0].includes('jack')) {
      gameUpdate.innerText = 'Player 1 Slapped!. He receives the center pile.'
      playerWinsPile(player1);
      removeMiddleDeck();
    } else if (key === 74 && gamePlay.cards[0].includes('jack')) {
      gameUpdate.innerText = 'Player 2 Slapped!. He receives the center pile.'
      playerWinsPile(player2);
      removeMiddleDeck();
    } else if (player1.hand.length === 0) {
      gameUpdate.innerText = 'Player 1 ran out of cards! One Time Revive!'
    } else if (player1.hand.length === 0) {
      gameUpdate.innerText = 'Player 1 ran out of cards! One Time Revive!'
    } else if (key === 81 && player2.hand.length === 0) {
      gameUpdate.innerText = 'Player 2 must get the next slap to stay alive!'
      player1.playCard(gamePlay)
      gamePlay.turn = player1
    } else if (key === 80 && player1.hand.length === 0) {
      gameUpdate.innerText = 'Player 1 must get the next slap to stay alive!'
      player2.playCard(gamePlay)
      gamePlay.turn = player2
    }
  }


  function playerWinsPile(player) {
    player.hand = player.hand.concat(gamePlay.cards)
    gamePlay.cards = []
  }

  function updateMiddleDeck() {
    middleDeckPic = `./assets/${gamePlay.cards[0]}.png`
    middleDeck.src = middleDeckPic
  }

  function showMiddleDeck() {
    middleDeck.classList.remove('hidden');
  }

  function removeMiddleDeck() {
    middleDeck.classList.add('hidden');
  }

  function updateStatus() {
    gameUpdate.innerText = `${gamePlay.turn.name}'s Turn!`
  }
