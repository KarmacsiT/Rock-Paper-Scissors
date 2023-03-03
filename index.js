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

	EndGame();
}

function EndGame() {
	areaListener.abort(); //Aborts event listeners
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
	const playerGesture = document.querySelector(".player-gesture");
	switch (true) {
		case roundOutcome[1].includes("Rock"):
			playerGesture.innerText = "👊";
			break;
		case roundOutcome[1].includes("Paper"):
			playerGesture.innerText = "✋";
			break;
		case roundOutcome[1].includes("Scissors"):
			playerGesture.innerText = "✌️";
			break;
	}

	const aiGesture = document.querySelector(".ai-gesture");
	switch (true) {
		case roundOutcome[2].includes("Rock"):
			aiGesture.innerText = "👊";
			break;
		case roundOutcome[2].includes("Paper"):
			aiGesture.innerText = "✋";
			break;
		case roundOutcome[2].includes("Scissors"):
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

	switch (roundOutcome[3]) {
		case "It's a draw! 🫡":
			status.style.color = "#ffffff";
			break;
		case "Congrats! This round is yours to take! 😎":
			status.style.color = "#339966";
			break;

		case "You lost that round, but it's not over yet! Keep it up! 🤕":
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
