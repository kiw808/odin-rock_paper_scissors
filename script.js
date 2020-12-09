const choices = [
    'Rock',
    'Paper',
    'Scissors'
];
let computerScore = 0;
let playerScore = 0;
let roundWinner;

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

// Play a game of 5 rounds against the computer
function game() {
    let winner;

    // Loop for 5 rounds
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt('Choose : rock, paper or scissors ?');
        let computerSelection = computerPlay();
        
        console.log(playRound(playerSelection, computerSelection));

        // Increase player or computer score
        if (roundWinner === 'player') {
            playerScore++;
        } else if (roundWinner === 'computer') {
            computerScore++;
        } else if (roundWinner === '') {
            i--;
        }
    }

    // Determine the winner
    if (computerScore > playerScore) {
        winner = 'Computer wins ! ' + computerScore + ':' + playerScore;
    } else if (computerScore < playerScore) {
        winner = 'You win ! ' + playerScore + ':' + computerScore;
    } else {
        winner = 'Tie game ' + playerScore + ':' + computerScore;
    }

    console.log(winner);
}

game();
