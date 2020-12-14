// Game variables
const choices = [
    'Rock',
    'Paper',
    'Scissors'
];
let computerScore = 0;
let playerScore = 0;
let roundWinner;
let winner = '';

// DOM variables
const gameDiv = document.querySelector('#game-selection');
const resultDiv = document.querySelector('#result');
const buttons = gameDiv.querySelectorAll('button');
const resetButton = resultDiv.querySelector('button');
const playerDisplay = document.querySelector('#player-display');
const computerDisplay = document.querySelector('#computer-display');


// Return a random choice
function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to compare player and computer inputs to determine a winner
function playRound(playerSelection, computerSelection) {
    let result = '';

    // check if input is a string
    if (typeof playerSelection === 'string') {
        // Capitalize first letter
        let player = playerSelection.toLowerCase().charAt(0).toUpperCase() + playerSelection.slice(1);

        // Tie game
        if (player === computerSelection) {
            result = 'Tie !';
            roundWinner = 'tie';
        // Cases of computer win
        } else if (
            (player === choices[0] && computerSelection === choices[1]) ||
            (player === choices[1] && computerSelection === choices[2]) ||
            (player === choices[2] && computerSelection === choices[0])
            ) {
            result = 'You loose! ' + computerSelection + ' beats ' + player;
            roundWinner = 'computer';

        // Cases of player win
        } else if (
            (computerSelection === choices[0] && player === choices[1]) ||
            (computerSelection === choices[1] && player === choices[2]) ||
            (computerSelection === choices[2] && player === choices[0])
        ) {
            result = 'You win! ' + player + ' beats ' + computerSelection;
            roundWinner = 'player';

        // Wrong input
        } else {
            result = 'Allowed inputs : rock, paper or scissors.';
            roundWinner = '';
        }
    // Input is not a string
    } else {
        result = 'Allowed inputs : rock, paper or scissors.';
        roundWinner = '';
    }

    return result;
}

// Check if one of the players reached 5 points
function checkWinner() {
    if (playerScore === 5) {
        winner = 'player';
    } else if (computerScore === 5) {
        winner =  'computer';
    }
};

// Display the results of the game
function showResults() {
    gameDiv.setAttribute('hidden', 'true');
    resultDiv.removeAttribute('hidden');

    if (winner === 'player') {
        resultDiv.firstElementChild.textContent = 'You win !';
    } else {
        resultDiv.firstElementChild.textContent = 'The computer wins ...';
    }
}

// Reset all scores and displays
function resetGame() {
    winner = 0;
    playerScore = 0;
    computerScore = 0;

    playerDisplay.querySelector('.current-selection').textContent = '';
    playerDisplay.querySelector('.score').textContent = playerScore;
    computerDisplay.querySelector('.current-selection').textContent = '';
    computerDisplay.querySelector('.score').textContent = computerScore;

    resultDiv.setAttribute('hidden', 'true');
    gameDiv.removeAttribute('hidden');
}

// Reset button event
resetButton.addEventListener('click', resetGame);

/**
 * Each time the player clicks a button, it plays a round.
 * The game ends when one of the players reaches 5 points.
 */
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let playerSelection = button.value;
        let computerSelection = computerPlay();

        // Calls the playRound function
        playRound(playerSelection, computerSelection);

        // Increase player or computer score
        if (roundWinner === 'player') {
            playerScore++;
        } else if (roundWinner === 'computer') {
            computerScore++;
        } else if (roundWinner === '') {
            i--;
        }

        // Display the current selection and scores
        playerDisplay.querySelector('.current-selection').textContent = button.textContent;
        playerDisplay.querySelector('.score').textContent = playerScore;
        computerDisplay.querySelector('.current-selection').textContent = computerSelection;
        computerDisplay.querySelector('.score').textContent = computerScore;

        // If there is a winner, display the result
        checkWinner();
        
        if (winner) {
            showResults();
        }
    })
})
