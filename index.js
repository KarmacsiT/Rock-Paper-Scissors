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
				playRound(button.id);
			},
			{ signal: areaListener.signal }
		);
	});
}

function playRound(playerChoice) {
	let AIchoice;
	let roundOutcome;
	let message;

	roundNumber++;

	AIchoice = generateAIPick();

	roundOutcome = [];

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

	roundOutcome.push(
		roundNumber,
		playerChoice,
		AIchoice,
		message,
		playerScore,
		AIScore
	);

	displayRoundOutcome(roundOutcome);

	if (playerScore === 5 || AIScore === 5) {
		displayGameOver();
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

function displayGameOver() {
	if (playerScore === 5) {
		Swal.fire({
			title: "Game Over!",
			text: "Congratulations! You owned the game! 🔥",
			color: "white",
			background: "linear-gradient(#00e6e6, #009999)",
			buttonStyling: false,
			confirmButtonText: "Play Again!",
			allowOutsideClick: false,
			allowEscapeKey: false,
			customClass: {
				confirmButton: "squishy-button",
				confirmButtonColor: "rgb(77, 220, 193);",
			},
			showClass: {
				popup: "animate__animated animate__fadeInDown",
			},
			hideClass: {
				popup: "animate__animated animate__fadeOutUp",
			},
		}).then(function (IsConfirmed) {
			if (IsConfirmed) {
				location.reload();
			}
		});
	} else if (AIScore === 5) {
		Swal.fire({
			title: "Game Over!",
			text: "You lost the game! May luck be on your side next time! 🫠",
			color: "white",
			background: "linear-gradient(#ffb84d, #ff9900)",
			buttonStyling: false,
			confirmButtonText: "Play Again!",
			allowOutsideClick: false,
			allowEscapeKey: false,
			customClass: {
				confirmButton: "squishy-button",
				confirmButtonColor: "rgb(77, 220, 193);",
			},
			showClass: {
				popup: "animate__animated animate__fadeInDown",
			},
			hideClass: {
				popup: "animate__animated animate__fadeOutUp",
			},
		}).then(function (IsConfirmed) {
			if (IsConfirmed) {
				location.reload();
			}
		});
	}

	areaListener.abort(); //Aborts event listeners
}

function displayRoundOutcome(roundOutcome) {
	displayRoundNumber(roundOutcome);
	displayScores(roundOutcome);
	displayGestureChoices(roundOutcome);
	displayRoundStatus(roundOutcome);
}

function displayRoundNumber(roundOutcome) {
	const roundCounter = document.querySelector(".round-counter");
	roundCounter.innerText = roundOutcome[0];
}

function displayScores(roundOutcome) {
	const container = document.querySelector(".scores");

	const playerScoreCounter =
		container.querySelector(".player-score").firstElementChild;
	playerScoreCounter.innerText = roundOutcome[4];

	const aiScoreCounter = document.querySelector(".ai-score").firstElementChild;
	aiScoreCounter.innerText = roundOutcome[5];
}

function displayGestureChoices(roundOutcome) {
	const playerGesture = document.querySelector(".player-gesture");
	switch (true) {
		case roundOutcome[1].includes("rock"):
			playerGesture.innerText = "👊";
			break;
		case roundOutcome[1].includes("paper"):
			playerGesture.innerText = "✋";
			break;
		case roundOutcome[1].includes("scissors"):
			playerGesture.innerText = "✌️";
			break;
	}

	const aiGesture = document.querySelector(".ai-gesture");
	switch (true) {
		case roundOutcome[2].includes("rock"):
			aiGesture.innerText = "👊";
			break;
		case roundOutcome[2].includes("paper"):
			aiGesture.innerText = "✋";
			break;
		case roundOutcome[2].includes("scissors"):
			aiGesture.innerText = "✌️";
			break;
	}
}

function displayRoundStatus(roundOutcome) {
	const gameLog = document.querySelector(".game-log");

	if (gameLog.querySelector(".round-status")) {
		gameLog.removeChild(gameLog.firstChild);
	}

	const status = document.createElement("p");
	status.classList.add("round-status");
	status.textContent = roundOutcome[3];

	switch (true) {
		case roundOutcome[3].includes("draw"):
			status.style.color = "#ffffff";
			break;
		case roundOutcome[3].includes("Congrats!"):
			status.style.color = "#339966";
			break;

		case roundOutcome[3].includes("lost"):
			status.style.color = "#e27d60";
			break;
	}

	$(function () {
		$(".round-status").textillate({
			in: {
				effect: "fadeIn",
				delayScale: 1.5,
				delay: 60,
				sync: false,
				shuffle: false,
				reverse: false,
			},
			type: "word",
		});
	});

	gameLog.insertBefore(status, gameLog.firstChild);
}
