function getComputerChoice() {
    let x = Math.random() * 3;
    if (x < 1) return "rock";
    else if (x < 2) return "paper";
    else return "scissors";
}

function getHumanChoice() {
    let choice = prompt("Enter rock, paper or scissors:");
    choice = choice.toLowerCase();
    if (choice === "rock" || choice === "paper" || choice === "scissors") {
        return choice;
    } else {
        alert("Invalid choice, please try again.");
        return getHumanChoice();
    }
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

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        const round = playRound(computerSelection, humanSelection);
        console.log(round.result);

        if (round.winner === "human") humanScore++;
        else if (round.winner === "computer") computerScore++;

        console.log(`Score - You: ${humanScore}, Computer: ${computerScore}`);
    }

    if (humanScore > computerScore) {
        console.log("Congratulations! You won the game!");
    } else if (humanScore < computerScore) {
        console.log("Sorry! You lost the game.");
    } else {
        console.log("The game is a tie!");
    }
}

playGame();