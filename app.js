/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, gameCeiling, diceHidden;
var diceTopDOM = document.querySelector('.dice-top');
var diceBottomDOM = document.querySelector('.dice-bottom');
var playerZeroDOM = document.querySelector('.player-0-panel');
var playerOneDOM = document.querySelector('.player-1-panel');

initializeGame();



// or use btn which is a callback function. hence listener calls btn not us
document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if(gamePlaying){
		//1.Random nmber
		var diceOne = Math.floor(Math.random() * 6) + 1;
		var diceTwo = Math.floor(Math.random() * 6) + 1;

		// if(dice === 6 && lastRoll === 6){
		// 	scores[activePlayer] = 0;
		// 	alert('ouch! That\'s gonna hurt...');
		// 	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// 	diceTopDOM.style.display = 'none';
		// 	diceBottomDOM.style.display = 'none';
		// 	diceHidden = true;
		// 	nextPlayer();
		// }else{

			//lastRoll = dice;

			//2. display the result
			
			// var diceTopDOM = document.querySelector('.dice-top');
			// var diceBottomDOM = document.querySelector('.dice-bottom');

			if(diceHidden) {
				diceTopDOM.style.display = 'block'; // to see image
				diceBottomDOM.style.display = 'block'; // to see image
				diceHidden = false;

			}
			diceTopDOM.src = 'dice-' + diceOne + '.png';
			diceBottomDOM.src = 'dice-' + diceTwo + '.png';

			//3. update the round score only if rolled != 1
			if(diceOne !== 1 && diceTwo !== 1){
				//add score
				var diTotal = diceOne + diceTwo;
				roundScore += diTotal;
				//output value to correct score
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
		
			}else{
		
			nextPlayer();	
			}
		//}
	}	

	
});
// this implementation is an anonymous function which can only be used here

document.querySelector('.btn-hold').addEventListener('click', function(){

	if(gamePlaying){
		// add roundScore to active players score
		scores[activePlayer] += roundScore; 
	
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// check if someone won
		if(scores[activePlayer] >= gameCeiling){
			document.querySelector('#current-' + activePlayer).textContent = 0;
			document.querySelector('#name-' + activePlayer).innerHTML = '<em>Winner<em>';
			diceTopDOM.style.display = 'none';
			diceBottomDOM.style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		
			gamePlaying = false;

		}else{
			// change players
			diceTopDOM.style.display = 'none';
			diceBottomDOM.style.display = 'none';
			diceHidden = true;
			nextPlayer();
		}

	}
});


document.querySelector('.btn-new').addEventListener('click', initializeGame);


function nextPlayer(){
		
		document.querySelector('#current-' + activePlayer).textContent = 0;

		roundScore = 0;

		playerZeroDOM.classList.toggle('active');
		playerOneDOM.classList.toggle('active');

		//document.querySelector('.dice').style.display = 'none';

		playerChange(activePlayer);
		
}


function playerChange(player){
	
	player === 0 ? activePlayer = 1 : activePlayer = 0;
}

function initializeGame(){



	diceTopDOM.style.display = 'none';
	diceBottomDOM.style.display = 'none';
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0; // 0 is first player and 1 is player 2
	gamePlaying = true;
	diceHidden = true;
	



	var input = document.querySelector('.final-score').value;

	if(input){
		gameCeiling = Number(input);
	}else{
		gameCeiling == 100;
	}

	//console.log(typeof gameCeiling);
	
	

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'PLAYER 1';
	document.getElementById('name-1').textContent = 'PLAYER 2';

	playerZeroDOM.classList.remove('active');
	playerZeroDOM.classList.remove('winner');
	playerOneDOM.classList.remove('active');
	playerOneDOM.classList.remove('winner');

	playerZeroDOM.classList.add('active');
}


















