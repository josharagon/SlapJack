var gameUpdate = document.querySelector('.game-updates')
var middleDeck = document.querySelector('#top-of-deck')
var underCard = document.querySelector('#under-img')
var player1Wins = document.querySelector('.player1-wins')
var player2Wins = document.querySelector('.player2-wins')
document.addEventListener('keyup', keyPressFunctions)

window.addEventListener('load', startGame)
window.addEventListener('load', retrieveSaved)



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
    } else if (key === 70) {
      player1Slap();
    } else if (key === 74) {
      player2Slap();
    } else if (player1.hand.length === 0) {
      gamePlay.turn = 'player1revive';
      setTimeout(function(){updateStatus()}, 3000);
    } else if (player2.hand.length === 0) {
      gamePlay.turn = 'player2revive';
      setTimeout(function(){updateStatus()}, 3000);
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
      player1Wins.innerText = `Wins: ${player1.wins}`
      player1.saveWinsToStorage();
      setTimeout(function(){gamePlay.resetGame()}, 3000);
    } else if (gamePlay.cards[0].includes('jack')) {
      gameUpdate.innerText = 'SLAPJACK! Player 1 takes pile.'
      playerWinsPile(player1);
      gamePlay.turn = player2
      setTimeout(function(){updateStatus()}, 3000);
      removeMiddleDeck();
    } else if (gamePlay.cards[0].slice(-2) === gamePlay.cards[1].slice(-2)) {
      gameUpdate.innerText = 'DOUBLE! Player 1 takes pile.'
      playerWinsPile(player1);
      gamePlay.turn = player2
      setTimeout(function(){updateStatus()}, 3000);
      removeMiddleDeck();
    } else if (gamePlay.cards[0].slice(-2) === gamePlay.cards[2].slice(-2)) {
      gameUpdate.innerText = 'SANDWICH! Player 1 takes pile.';
      playerWinsPile(player1);
      gamePlay.turn = player2;
      setTimeout(function(){updateStatus()}, 3000);
      removeMiddleDeck();
    } else {
      gameUpdate.innerText = 'False Slap! Player 1 forfeits a card to Player 2!'
      player2.hand.push(player1.hand.pop())
      setTimeout(function(){updateStatus()}, 3000);
    }
  }

  function player2Slap() {
    if (gamePlay.turn === 'player1revive') {
      player2.wins++
      gameUpdate.innerText = 'Player 2 Wins!!!'
      player2.saveWinsToStorage();
      player2Wins.innerText = `Wins: ${player2.wins}`
      setTimeout(function(){gamePlay.resetGame()}, 3000);
    } else if (gamePlay.cards[0].includes('jack')) {
      gameUpdate.innerText = 'SLAPJACK! Player 2 takes the pile.'
      playerWinsPile(player2);
      gamePlay.turn = player1
      setTimeout(function(){updateStatus()}, 3000);
      removeMiddleDeck();
    } else if (gamePlay.cards[0].slice(-2) === gamePlay.cards[1].slice(-2)) {
      gameUpdate.innerText = 'DOUBLE! Player 2 takes pile.';
      playerWinsPile(player2);
      gamePlay.turn = player1;
      setTimeout(function(){updateStatus()}, 3000);
      removeMiddleDeck();
    } else if (gamePlay.cards[0].slice(-2) === gamePlay.cards[2].slice(-2)) {
      gameUpdate.innerText = 'SANDWICH! Player 2 takes pile.';
      playerWinsPile(player2);
      gamePlay.turn = player1;
      setTimeout(function(){updateStatus()}, 3000);
      removeMiddleDeck();
    } else {
      gameUpdate.innerText = 'False Slap! Player 2 forfeits a card to Player 1!'
      player1.hand.push(player2.hand.pop())
      setTimeout(function(){updateStatus()}, 3000);
    }
  }


  function playerWinsPile(player) {
    gamePlay.shuffle()
    player.hand = player.hand.concat(gamePlay.cards)
    gamePlay.cards = []
  }

  function updateMiddleDeck() {
    middleDeckPic = `./assets/${gamePlay.cards[0]}.png`;
    middleDeck.src = middleDeckPic;
    if (gamePlay.cards.length >= 2) {
      middleDeck.style.position = 'absolute';
      underImagePic = `./assets/${gamePlay.cards[1]}.png`;
      underCard.src = underImagePic
    }
  }

  function showMiddleDeck() {
    middleDeck.classList.remove('hidden');
    if (gamePlay.cards.length >= 2) {
      underCard.classList.remove('hidden')
      middleDeck.style.position = 'absolute'
      middleDeck.style.transform = 'rotate(3deg)'
    }
  }

  function removeMiddleDeck() {
    middleDeck.classList.add('hidden');
    middleDeck.style.removeProperty('position')
    underCard.classList.add('hidden')
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

  function retrieveSaved() {
    var parsedP1 = JSON.parse(localStorage.getItem('player1-wins'))
    var parsedP2 = JSON.parse(localStorage.getItem('player2-wins'))
    player1.wins = parsedP1.wins
    player2.wins = parsedP2.wins
    player1Wins.innerText = `Wins: ${player1.wins}`
    player2Wins.innerText = `Wins: ${player2.wins}`
  }
