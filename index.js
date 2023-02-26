let roundNumber = 0;
let playerScore = 0;
let AIScore = 0;

window.onload = initializeGame();

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
		message = "Congrats! You won the game!";
		playerScore++;
	} else if (playerChoice === "paper" && AIchoice === "rock") {
		message = "Congrats! You won the game!";
		playerScore++;
	} else if (playerChoice === "scissors" && AIchoice === "paper") {
		message = "Congrats! You won the game!";
		playerScore++;
	} else {
		message = "You lost the game! May luck be on your side next time!";
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

	printRoundInfo(roundInfo);

	if (playerScore === 5 || AIScore === 5) {
		checkGameOver();
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
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.disabled = true;
	});
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
				roundOutcome[1] = `Player's Choice: ${roundOutcome[1]}`;
				break;
			case 2:
				roundOutcome[2] =
					roundOutcome[2].charAt(0).toUpperCase() + roundOutcome[2].slice(1);
				roundOutcome[2] = `AI Choice: ${roundOutcome[2]}`;
				break;
			case 4:
				roundOutcome[4] = `Player's Score: ${roundOutcome[4]}`;
				break;
			case 5:
				roundOutcome[5] = `AI Score: ${roundOutcome[5]}`;
				break;
		}
	}

	return roundOutcome;
}

function printRoundInfo(roundOutcome) {
	let formattedRoundOutcome = formatRoundInfo(roundOutcome);
	alert(formattedRoundOutcome.join("\n"));
}

function initializeGame() {
	const buttons = document.querySelectorAll("button");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			playRound(button.textContent.toLowerCase());
		});
	});
}
