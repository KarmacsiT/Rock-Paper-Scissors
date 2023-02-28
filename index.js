let roundNumber = 0;
let playerScore = 0;
let AIScore = 0;

const areaListener = new AbortController();

window.onload = initializeGame();

function initializeGame() {
	const buttonPanel = document.querySelector(".button-panel");

	buttonPanel.childNodes.forEach((button) => {
		button.addEventListener(
			"click",
			() => {
				playRound(button.className.toLowerCase());
			},
			{ signal: areaListener.signal }
		);
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
		message = "It's a draw! 🫡";
	} else if (playerChoice === "rock" && AIchoice === "scissors") {
		message = "Congrats! This round is yours to take! 😎";
		playerScore++;
	} else if (playerChoice === "paper" && AIchoice === "rock") {
		message = "Congrats! This round is yours to take! 😎";
		playerScore++;
	} else if (playerChoice === "scissors" && AIchoice === "paper") {
		message = "Congrats! This round is yours to take! 😎";
		playerScore++;
	} else {
		message = "You lost that round, but it's not over yet! Keep it up! 🤕";
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
		alert("Congratulations! You owned the game! 🔥");
	} else if (AIScore === 5) {
		alert("You lost the game! May luck be on your side next time! 🫠");
	}

	EndGame();
}

function EndGame() {
	areaListener.abort(); //Aborts event listeners

	changePlayAgainButtonVisibility();
}

function changePlayAgainButtonVisibility() {
	const playAgainButton = document.querySelector(".play-again");
	if (playAgainButton.style.display === "none") {
		playAgainButton.style.display = "flex";
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
			case 1:
				roundOutcome[1] =
					roundOutcome[1].charAt(0).toUpperCase() + roundOutcome[1].slice(1);
				roundOutcome[1] = `🧑 Choice: ${roundOutcome[1]}`;
				break;
			case 2:
				roundOutcome[2] =
					roundOutcome[2].charAt(0).toUpperCase() + roundOutcome[2].slice(1);
				roundOutcome[2] = `🤖 Choice: ${roundOutcome[2]}`;
				break;
		}
	}

	return roundOutcome;
}

function displayRoundNumber(roundOutcome) {
	const roundCounter = document.querySelector(".round-counter");
	roundCounter.style.color = "#c38d9e";
	roundCounter.innerText = roundOutcome[0];
}

function displayScores(roundOutcome) {
	const container = document.querySelector(".scores");

	const playerScoreCounter =
		container.querySelector(".player-score").firstElementChild;
	playerScoreCounter.style.color = "#c38d9e";
	playerScoreCounter.innerText = roundOutcome[4];
	const aiScoreCounter = document.querySelector(".ai-score").firstElementChild;
	aiScoreCounter.style.color = "#c38d9e";
	aiScoreCounter.innerText = roundOutcome[5];
}

function displayWeaponChoices(roundOutcome) {
	const playerChoice = document.querySelector(".player-choice");
	switch (roundOutcome[1]) {
		case "🧑 Choice: Rock":
			playerChoice.innerText = "🧑 Choice: 👊";
			break;
		case "🧑 Choice: Paper":
			playerChoice.innerText = "🧑 Choice: ✋";
			break;
		case "🧑 Choice: Scissors":
			playerChoice.innerText = "🧑 Choice: ✌️";
			break;
	}

	const aiChoice = document.querySelector(".ai-choice");
	switch (roundOutcome[2]) {
		case "🤖 Choice: Rock":
			aiChoice.innerText = "🤖 Choice: 👊";
			break;
		case "🤖 Choice: Paper":
			aiChoice.innerText = "🤖 Choice: ✋";
			break;
		case "🤖 Choice: Scissors":
			aiChoice.innerText = "🤖 Choice: ✌️";
			break;
	}
}

function displayRoundStatus(roundOutcome) {
	const roundStatus = document.querySelector(".round-status");
	roundStatus.innerText = roundOutcome[3];

	switch (roundOutcome[3]) {
		case "It's a draw! 🫡":
			roundStatus.style.color = "#e8a87c";
			break;
		case "Congrats! This round is yours to take! 😎":
			roundStatus.style.color = "#41b3a3";
			break;

		case "You lost that round, but it's not over yet! Keep it up! 🤕":
			roundStatus.style.color = "#e27d60";
			break;
	}
}
