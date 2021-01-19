var gameUpdate = document.querySelector('.game-updates')
var middleDeck = document.querySelector('.top-of-deck')
var underCard = document.querySelector('.under-img')
var player1Card = document.querySelector('.player1-card')
var player2Card = document.querySelector('.player2-card')
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
      placeCard(player1);
    } else if (key === 80 && gamePlay.turn === player2 && player2.hand.length > 0 || key === 80 && gamePlay.turn === 'player1revive') {
      placeCard(player2);
    } else if (key === 70) {
      player1Slap();
    } else if (key === 74) {
      player2Slap();
    } else if (player1.hand.length === 0) {
      gamePlay.turn = 'player1revive';
      setTimeout(function(){updateStatus()}, 2000);
    } else if (player2.hand.length === 0) {
      gamePlay.turn = 'player2revive';
      setTimeout(function(){updateStatus()}, 2000);
    } else if (key === 81 && player2.hand.length === 0) {
      player1.playCard(gamePlay)
      updateStatus()
    } else if (key === 80 && player1.hand.length === 0) {
      player2.playCard(gamePlay)
      updateStatus()
    }
  }


  function player1Slap() {
    if (gamePlay.turn === 'player2revive' && gamePlay.cards[0].includes('jack')) {
      playerWinsGame(player1);
      gameUpdate.innerText = 'Player 1 Wins!!!';
      player1Wins.innerText = `Wins: ${player1.wins}`;
    } else if (gamePlay.cards[0].includes('jack')) {
      playerSlapJack(player1, player2);
    } else if (player2.hand.length >= 1 && gamePlay.cards.length > 2 && gamePlay.cards[0].slice(-2) === gamePlay.cards[1].slice(-2)) {
        playerDouble(player1, player2);
    } else if (player1.hand.length >= 1 && gamePlay.cards.length > 2 && gamePlay.cards[0].slice(-2) === gamePlay.cards[2].slice(-2)) {
        playerSandwich(player1, player2)
    } else {
        falseSlap(player1, player2)
    }
  }

  function player2Slap() {
    if (gamePlay.turn === 'player1revive' && gamePlay.cards[0].includes('jack')) {
      playerWinsGame(player2);
      gameUpdate.innerText = 'Player 2 Wins!!!';
      player2Wins.innerText = `Wins: ${player2.wins}`;
    } else if (gamePlay.cards[0].includes('jack') && player1.hand.length > 0) {
      playerSlapJack(player2, player1);
    } else if (player1.hand.length >= 1 && gamePlay.cards.length > 2 && gamePlay.cards[0].slice(-2) === gamePlay.cards[1].slice(-2)) {
      playerDouble(player2, player1);
    } else if (player1.hand.length >= 1 && gamePlay.cards.length > 2 && gamePlay.cards[0].slice(-2) === gamePlay.cards[2].slice(-2)) {
      playerSandwich(player2, player1);
    } else {
      falseSlap(player2, player1)
    }
  }

  function falseSlap(player, opponent) {
    if (gamePlay.turn === 'player2revive' || gamePlay.turn === 'player1revive') {
      gameUpdate.innerText = `False Slap! ${player.name} loses the game!`
      playerWinsGame(opponent);
      player1Wins.innerText = `Wins: ${player1.wins}`;
      player2Wins.innerText = `Wins: ${player2.wins}`;
    } else {
      gameUpdate.innerText = `False Slap! ${player.name} forfeits a card to ${opponent.name}!`
      opponent.hand.push(player.hand.pop())
      setTimeout(function(){updateStatus()}, 3000);
    }
  }

  function placeCard(player) {
    player.playCard(gamePlay);
    updateStatus();
    updateMiddleDeck();
    showMiddleDeck();
  };

  function playerWinsPile(player) {
    gamePlay.shuffle()
    player.hand = player.hand.concat(gamePlay.cards)
    gamePlay.cards = []
  }

  function playerSlapJack(player, opponent) {
    gameUpdate.innerText = `SLAPJACK! ${player.name} takes the pile.`
    playerWinsPile(player);
    gamePlay.turn = opponent
    setTimeout(function(){updateStatus()}, 3000);
    removeMiddleDeck();
  }

  function playerSandwich(player, opponent) {
    gameUpdate.innerText = `SANDWICH! ${player.name} takes pile.`;
    playerWinsPile(player);
    gamePlay.turn = opponent;
    setTimeout(function(){updateStatus()}, 3000);
    removeMiddleDeck();
  }

  function playerDouble(player, opponent) {
    gameUpdate.innerText = `DOUBLE! ${player.name} takes pile.`
    playerWinsPile(player);
    gamePlay.turn = opponent
    setTimeout(function(){updateStatus()}, 3000);
    removeMiddleDeck();
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

  function playerWinsGame(player) {
    player.wins++
    player.saveWinsToStorage();
    setTimeout(function(){gamePlay.resetGame()}, 3000);
  }

  function retrieveSaved() {
    var parsedP1 = JSON.parse(localStorage.getItem('player1-wins'))
    var parsedP2 = JSON.parse(localStorage.getItem('player2-wins'))
    player1.wins = parsedP1.wins
    player2.wins = parsedP2.wins
    player1Wins.innerText = `Wins: ${player1.wins}`
    player2Wins.innerText = `Wins: ${player2.wins}`
  }
