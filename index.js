let roundNumber = 0;
let playerScore = 0;
let AIScore = 0;

window.onload = initializeGame();

function initializeGame() {
	const buttonPanel = document.querySelector(".button-panel");

	buttonPanel.childNodes.forEach((button) => {
		button.addEventListener("click", () => {
			playRound(button.textContent.toLowerCase());
		});
	});

	const playAgainButton = document.querySelector(".play-again");
	playAgainButton.addEventListener("click", () => {
		location.reload();
	});

	changePlayAgainButtonVisibility();
}

function playRound(playerChoice) {
	let AIchoice;
	let roundInfo;
	let message;

	roundNumber++;

	AIchoice = generateAIPick();

	roundInfo = [];

	if (playerChoice === AIchoice) {
		message = "It's a draw!";
	} else if (playerChoice === "rock" && AIchoice === "scissors") {
		message = "Congrats! This round is yours to take!";
		playerScore++;
	} else if (playerChoice === "paper" && AIchoice === "rock") {
		message = "Congrats! This round is yours to take!";
		playerScore++;
	} else if (playerChoice === "scissors" && AIchoice === "paper") {
		message = "Congrats! This round is yours to take!";
		playerScore++;
	} else {
		message =
			"You lost that round, but it's not over yet! Get ready for the next one!";
		AIScore++;
	}

	roundInfo.push(
		roundNumber,
		playerChoice,
		AIchoice,
		message,
		playerScore,
		AIScore
	);

	displayRoundInfo(roundInfo);

	if (playerScore === 5 || AIScore === 5) {
		checkGameOver();
	}
}

function generateAIPick() {
	let AIchoice = Math.floor(Math.random() * 3);

	switch (AIchoice) {
		case 0:
			return "rock";

		case 1:
			return "paper";

		case 2:
			return "scissors";
	}
}

function checkGameOver() {
	if (playerScore === 5) {
		alert("Congratulations! You won the game!");
	} else if (AIScore === 5) {
		alert("You lost the game! May luck be on your side next time!");
	}

	EndGame();
}

function EndGame() {
	const buttonPanel = document.querySelector(".button-panel");
	buttonPanel.childNodes.forEach((button) => {
		button.disabled = true;
	});

	changePlayAgainButtonVisibility();
}

function changePlayAgainButtonVisibility() {
	const playAgainButton = document.querySelector(".play-again");
	if (playAgainButton.style.display === "none") {
		playAgainButton.style.display = "block";
		playAgainButton.innerHTML = "Play Again";
	} else {
		playAgainButton.style.display = "none";
	}
}

function displayRoundInfo(roundOutcome) {
	let formattedRoundOutcome = formatRoundInfo(roundOutcome);

	displayRoundNumber(formattedRoundOutcome);
	displayScores(formattedRoundOutcome);
	displayWeaponChoices(formattedRoundOutcome);
	displayRoundStatus(formattedRoundOutcome);
}

function formatRoundInfo(roundOutcome) {
	for (let i = 0; i < roundOutcome.length + 1; i++) {
		switch (i) {
			case 0:
				roundOutcome[0] = `Round ${roundOutcome[0]}`;
				break;

			case 1:
				roundOutcome[1] =
					roundOutcome[1].charAt(0).toUpperCase() + roundOutcome[1].slice(1);
				roundOutcome[1] = `Player Choice: ${roundOutcome[1]}`;
				break;
			case 2:
				roundOutcome[2] =
					roundOutcome[2].charAt(0).toUpperCase() + roundOutcome[2].slice(1);
				roundOutcome[2] = `AI Choice: ${roundOutcome[2]}`;
				break;
			case 4:
				roundOutcome[4] = `Player Score: ${roundOutcome[4]}`;
				break;
			case 5:
				roundOutcome[5] = `AI Score: ${roundOutcome[5]}`;
				break;
		}
	}

	return roundOutcome;
}

function displayRoundNumber(roundOutcome) {
	const roundParagraph = document.querySelector(".round-number");
	roundParagraph.innerText = roundOutcome[0];
}

function displayScores(roundOutcome) {
	const playerScoreParagraph = document.querySelector(".player-score");
	playerScoreParagraph.innerText = roundOutcome[4];
	const aiScoreParagraph = document.querySelector(".ai-score");
	aiScoreParagraph.innerText = roundOutcome[5];
}

function displayWeaponChoices(roundOutcome) {
	const playerChoice = document.querySelector(".player-choice");
	playerChoice.innerText = roundOutcome[1];
	const aiChoice = document.querySelector(".ai-choice");
	aiChoice.innerText = roundOutcome[2];
}

function displayRoundStatus(roundOutcome) {
	const roundStatus = document.querySelector(".round-status");
	roundStatus.innerText = roundOutcome[3];
}
