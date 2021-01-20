//QUERYSELECTORS
var gameUpdate = document.querySelector('.game-updates')
var middleDeck = document.querySelector('.top-of-deck')
var underCard = document.querySelector('.under-img')
var player1Card = document.querySelector('.player1-card')
var player2Card = document.querySelector('.player2-card')
var player1Wins = document.querySelector('.player1-wins')
var player2Wins = document.querySelector('.player2-wins')

//EVENTLISTENERS
document.addEventListener('keyup', keyPressFunctions)
window.addEventListener('load', startGame)
window.addEventListener('load', retrieveSaved)

//FUNCTIONS
  function startGame () {
     gamePlay = new Game();
     gamePlay.shuffle();
     gamePlay.dealDeck();
     document.addEventListener('keyup', keyPressFunctions)
     gameUpdate.innerText = `${gamePlay.turn.name}'s Turn!`;
  };

  function keyPressFunctions(e) {
    key = e.keyCode
    if (key === 81 && gamePlay.turn === player1 && player1.hand.length > 0 || key === 81 && gamePlay.turn === 'player2revive') {
      placeCard(player1);
    } else if (key === 80 && gamePlay.turn === player2 && player2.hand.length > 0 || key === 80 && gamePlay.turn === 'player1revive') {
      placeCard(player2);
    } else if (key === 70) {
      gamePlay.playerSlap(player1, player2, 'player1revive', 'player2revive', player1Wins);
    } else if (key === 74) {
      gamePlay.playerSlap(player2, player1, 'player2revive', 'player1revive', player2Wins);
    } else if (player1.hand.length === 0) {
      gamePlay.turn = 'player1revive';
      setTimeout(function(){updateStatus()}, 2000);
    } else if (player2.hand.length === 0) {
      gamePlay.turn = 'player2revive';
      setTimeout(function(){updateStatus()}, 2000);
    } else if (key === 81 && player2.hand.length === 0) {
      player1.playCard(gamePlay);
      updateStatus();
    } else if (key === 80 && player1.hand.length === 0) {
      player2.playCard(gamePlay);
      updateStatus();
    }
  }

  function falseSlap(player, opponent) {
    if (gamePlay.turn === 'player2revive' || gamePlay.turn === 'player1revive') {
      gamePlay.playerWinsGame(opponent);
      player1Wins.innerText = `Wins: ${player1.wins}`;
      player2Wins.innerText = `Wins: ${player2.wins}`;
    } else {
      gameUpdate.innerText = `False Slap! ${player.name} forfeits a card to ${opponent.name}!`;
      opponent.hand.push(player.hand.pop());
      setTimeout(function(){updateStatus()}, 3000);
    };
  };

  function placeCard(player) {
    player.playCard(gamePlay);
    updateStatus();
    updateMiddleDeck();
    showMiddleDeck();
  };

  function playerWinsPile(player) {
    gamePlay.shuffle();
    player.hand = player.hand.concat(gamePlay.cards);
    gamePlay.cards = [];
  };

  function playerSlapJack(player, opponent) {
    gameUpdate.innerText = `SLAPJACK! ${player.name} takes the pile.`;
    playerWinsPile(player);
    gamePlay.turn = opponent;
    setTimeout(function(){updateStatus()}, 3000);
    removeMiddleDeck();
  };

  function playerSandwich(player, opponent) {
    gameUpdate.innerText = `SANDWICH! ${player.name} takes pile.`;
    playerWinsPile(player);
    gamePlay.turn = opponent;
    setTimeout(function(){updateStatus()}, 3000);
    removeMiddleDeck();
  };

  function playerDouble(player, opponent) {
    gameUpdate.innerText = `DOUBLE! ${player.name} takes pile.`
    playerWinsPile(player);
    gamePlay.turn = opponent;
    setTimeout(function(){updateStatus()}, 3000);
    removeMiddleDeck();
  };

  function updateMiddleDeck() {
    middleDeckPic = `./assets/${gamePlay.cards[0]}.png`;
    middleDeck.src = middleDeckPic;
    if (gamePlay.cards.length >= 2) {
      middleDeck.style.position = 'absolute';
      underImagePic = `./assets/${gamePlay.cards[1]}.png`;
      underCard.src = underImagePic;
    };
  };

  function showMiddleDeck() {
    middleDeck.classList.remove('hidden');
    if (gamePlay.cards.length >= 2) {
      underCard.classList.remove('hidden');
      middleDeck.style.position = 'absolute';
      middleDeck.style.transform = 'rotate(3deg)';
    };
  };

  function removeMiddleDeck() {
    middleDeck.classList.add('hidden');
    middleDeck.style.removeProperty('position');
    underCard.classList.add('hidden');
  };

  function updateStatus() {
    if (gamePlay.turn === player1 || gamePlay.turn === player2) {
      gameUpdate.innerText = `${gamePlay.turn.name}'s Turn!`;
    } else if (gamePlay.turn === 'player2revive') {
      gameUpdate.innerText = 'Player 2 must get the next slap to stay alive!';
    } else {
      gameUpdate.innerText = 'Player 1 must get the next slap to stay alive!';
    };
  };


  function retrieveSaved() {
    var parsedP1 = JSON.parse(localStorage.getItem('player1-wins'));
    var parsedP2 = JSON.parse(localStorage.getItem('player2-wins'));
    player1.wins = parsedP1.wins;
    player2.wins = parsedP2.wins;
    player1Wins.innerText = `Wins: ${player1.wins}`;
    player2Wins.innerText = `Wins: ${player2.wins}`;
  };
