function getComputerChoice() {
    let x = Math.random() * 3;
    if (x < 1) return "rock";
    else if (x < 2) return "paper";
    else return "scissors";
}

function playRound(computerChoice, humanChoice) {
    if (computerChoice === humanChoice) {
        return { result: "It's a tie!", winner: "none" };
    } else if (
        (computerChoice === "rock" && humanChoice === "scissors") ||
        (computerChoice === "paper" && humanChoice === "rock") ||
        (computerChoice === "scissors" && humanChoice === "paper")
    ) {
        return { result: `You lose! ${computerChoice} beats ${humanChoice}.`, winner: "computer" };
    } else {
        return { result: `You win! ${humanChoice} beats ${computerChoice}.`, winner: "human" };
    }
}

let humanScore = 0;
let computerScore = 0;
let gameOver = false;

const resultsDiv = document.getElementById('results');
const historyDiv = document.getElementById('history');
const resetButton = document.getElementById('reset');

function updateScoreDisplay(message) {
    resultsDiv.innerHTML = `
        <p>${message}</p>
        <p><strong>Score</strong> - You: ${humanScore}, Computer: ${computerScore}</p>
    `;
}

function addHistoryEntry(entry) {
    const p = document.createElement("p");
    p.innerHTML = entry;
    historyDiv.appendChild(p);
}

function handleClick(playerSelection) {
    if (gameOver) return;

    animateButton(playerSelection);

    const computerSelection = getComputerChoice();
    const round = playRound(computerSelection, playerSelection);

    if (round.winner === "human") humanScore++;
    else if (round.winner === "computer") computerScore++;

    let displayMessage = round.result;
    addHistoryEntry(round.result);

    if (humanScore === 5) {
        displayMessage += "<br><strong>🎉 Congratulations! You won the game!</strong>";
        gameOver = true;
    } else if (computerScore === 5) {
        displayMessage += "<br><strong>😞 Sorry! You lost the game.</strong>";
        gameOver = true;
    }

    updateScoreDisplay(displayMessage);
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    resultsDiv.innerHTML = "";
    historyDiv.innerHTML = "";
}

function animateButton(choice) {
    const button = document.getElementById(choice);
    button.classList.add("clicked");
    setTimeout(() => button.classList.remove("clicked"), 150);
}

document.getElementById('rock').addEventListener('click', () => handleClick("rock"));
document.getElementById('paper').addEventListener('click', () => handleClick("paper"));
document.getElementById('scissors').addEventListener('click', () => handleClick("scissors"));
resetButton.addEventListener('click', resetGame);