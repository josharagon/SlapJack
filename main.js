var gameUpdate = document.querySelector('.game-updates')
var middleDeck = document.querySelector('#mid-deck')

document.addEventListener('keyup', keyPressFunctions)

window.addEventListener('load', startGame)



  function startGame () {
     gamePlay = new Game()
     gamePlay.shuffle()
     gamePlay.dealDeck()
     gameUpdate.innerText = `${gamePlay.turn.name}'s Turn!`
  }




  function keyPressFunctions(e) {
    key = e.keyCode
    if (key === 81 && gamePlay.turn === player1 && player1.hand.length > 0 || key === 81 && gamePlay.turn === 'player2revive') {
      player1.playCard(gamePlay);
      updateStatus();
      updateMiddleDeck();
      showMiddleDeck();
    } else if (key === 80 && gamePlay.turn === player2 && player2.hand.length > 0 || key === 80 && gamePlay.turn === 'player1revive') {
      player2.playCard(gamePlay);
      updateStatus();
      updateMiddleDeck();
      showMiddleDeck();
    } else if (key === 70 && gamePlay.cards[0].includes('jack')) {
      player1Slap();
    } else if (key === 74 && gamePlay.cards[0].includes('jack')) {
      player2Slap();
    } else if (player1.hand.length === 0) {
      gamePlay.turn = 'player1revive';
      setTimeout(function(){ updateStatus(); }, 3000);
    } else if (player2.hand.length === 0) {
      gamePlay.turn = 'player2revive';
      setTimeout(function(){ updateStatus(); }, 3000);
    } else if (key === 81 && player2.hand.length === 0) {
      player1.playCard(gamePlay)
      updateStatus()
    } else if (key === 80 && player1.hand.length === 0) {
      player2.playCard(gamePlay)
      updateStatus()
    }
  }


  function player1Slap() {
    if (gamePlay.turn === 'player2revive') {
      player1.wins++
      gameUpdate.innerText = 'Player 1 Wins!!!'
    } else {
      gameUpdate.innerText = 'Player 1 Slapped!. He receives the center pile.'
      playerWinsPile(player1);
      gamePlay.turn = player2
      setTimeout(function(){ updateStatus(); }, 3000);
      removeMiddleDeck();
    }
  }

  function player2Slap() {
    if (gamePlay.turn === 'player1revive') {
      player2.wins++
      gameUpdate.innerText = 'Player 2 Wins!!!'
    } else {
    gameUpdate.innerText = 'Player 2 Slapped!. He receives the center pile.'
    playerWinsPile(player2);
    gamePlay.turn = player1
    setTimeout(function(){ updateStatus(); }, 3000);
    removeMiddleDeck();
    }
  }


  function playerWinsPile(player) {
    gamePlay.shuffle()
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
    if (gamePlay.turn === player1 || gamePlay.turn === player2) {
      gameUpdate.innerText = `${gamePlay.turn.name}'s Turn!`
    } else if (gamePlay.turn === 'player2revive') {
      gameUpdate.innerText = 'Player 2 must get the next slap to stay alive!'
    } else {
      gameUpdate.innerText = 'Player 1 must get the next slap to stay alive!'
    }
  }
