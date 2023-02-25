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

function getPlayerChoice() {
	return prompt("Rock, Paper or scissors? The choice is yours!").toLowerCase();
}

function playRound(roundNumber) {
	let AIchoice;
	let playerChoice;
	let roundInfo;

	for (let i = 0; i < roundNumber; i++) {
		AIchoice = generateAIPick();
		playerChoice = getPlayerChoice();
		roundInfo = [i, playerChoice, AIchoice];

		if (
			playerChoice !== "rock" &&
			playerChoice !== "paper" &&
			playerChoice !== "scissors"
		) {
			alert(
				`As clarification you can only pick Rock, Paper or Scissors!\nYou picked ${playerChoice}, which is an invalid pick!`
			);
			continue;
		}

		if (playerChoice === AIchoice) {
			roundInfo[3] = "It's a draw!";
			printRoundInfo(roundInfo);
			continue;
		} else if (playerChoice === "rock" && AIchoice === "scissors") {
			roundInfo[3] = "Congrats! You won the game!";
			printRoundInfo(roundInfo);
			continue;
		} else if (playerChoice === "paper" && AIchoice === "rock") {
			roundInfo[3] = "Congrats! You won the game!";
			printRoundInfo(roundInfo);
			continue;
		} else if (playerChoice === "scissors" && AIchoice === "paper") {
			roundInfo[3] = "Congrats! You won the game!";
			printRoundInfo(roundInfo);
			continue;
		} else {
			roundInfo[3] = "You lost the game! May luck be on your side next time!";
			printRoundInfo(roundInfo);
			continue;
		}
	}
}

function formatRoundInfo(roundOutcome) {
	for (let i = 0; i < roundOutcome.length; i++) {
		switch (i) {
			case 0:
				roundOutcome[0] = `Round ${roundOutcome[0] + 1}`;
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
		}
	}

	return roundOutcome;
}

function printRoundInfo(roundOutcome) {
	let formattedRoundOutcome = formatRoundInfo(roundOutcome);
	alert(formattedRoundOutcome.join("\n"));
}

function playGame() {
	let roundNumber = Math.floor(Number(getRoundNumber()));

	if (!isNaN(roundNumber) && isFinite(roundNumber) && roundNumber > 0) {
		playRound(roundNumber);
	} else {
		alert(
			"Your input is not valid!\nIt has to be a positive integer and greater than zero!"
		);
	}
}

function getRoundNumber() {
	return prompt(
		"Welcome to my Rock-Paper-Scissors Game!\nHow many rounds do you want to play?"
	);
}
