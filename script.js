// This is JavaScript program for Tic Tac Toe Game.

"use strict";

// Global section for variables and functions:

// Lets create function to show and hide html object.
const displayElement = function (htmlObject, value) {
  htmlObject.style.display = value;
};

// Lets create function to show X or O on game button as per current chance
const displayChanceOnButton = function (htmlButtonIndex, chanceValue) {
  // If the current chance is of player X.
  if (chanceValue === 1) {
    const crossIcon = document.querySelectorAll("#cross-icon")[htmlButtonIndex];
    displayElement(crossIcon, "inline-block");
  } else {
    const zeroIcon = document.querySelectorAll("#zero-icon")[htmlButtonIndex];
    displayElement(zeroIcon, "inline-block");
  }
};

// Lets create function to display which player have current chance
const displayChance = function (currentPlayer) {
  // last player chance
  const lastPlayer = currentPlayer === 1 ? 0 : 1;
  const playersContainer = document.querySelectorAll(".players-container");

  playersContainer[currentPlayer].style.opacity = "1";
  playersContainer[lastPlayer].style.opacity = "0.3";
};

// Lets create function to display winning situation of grid button
const displayWinEvent = function (...buttonPositions) {
  console.log(buttonPositions);
  for (let [i, position] of buttonPositions.entries()) {
    setTimeout(function () {
      document.getElementsByName(position)[0].style.transitionDuration = "0.2s";
      document.getElementsByName(position)[0].style.background = "skyblue";
      document.getElementsByName(position)[0].style.boxShadow =
        "0 1.3rem rgba(0, 0, 0, 0.1), 0 0 1rem 2px rgba(0, 0, 0, 0.25)";
      document.getElementsByName(position)[0].style.transform =
        "translate(0, -1rem) scale(1.05)";
    }, 200 * (i + 1));
  }
};

// Lets create function to take decision on game with respect to condition and return which player win
const checkWinner = function (gameObject, playerValue) {
  if (
    gameObject.leftTop === playerValue &&
    gameObject.midTop === playerValue &&
    gameObject.rightTop === playerValue
  ) {
    displayWinEvent("leftTop", "midTop", "rightTop");
    return playerValue;
  } else if (
    gameObject.leftMid === playerValue &&
    gameObject.midMid === playerValue &&
    gameObject.rightMid === playerValue
  ) {
    displayWinEvent("leftMid", "midMid", "rightMid");
    return playerValue;
  } else if (
    gameObject.leftBottom === playerValue &&
    gameObject.midBottom === playerValue &&
    gameObject.rightBottom === playerValue
  ) {
    displayWinEvent("leftBottom", "midBottom", "rightBottom");
    return playerValue;
  } else if (
    gameObject.leftTop === playerValue &&
    gameObject.leftMid === playerValue &&
    gameObject.leftBottom === playerValue
  ) {
    displayWinEvent("leftTop", "leftMid", "leftBottom");
    return playerValue;
  } else if (
    gameObject.midTop === playerValue &&
    gameObject.midMid === playerValue &&
    gameObject.midBottom === playerValue
  ) {
    displayWinEvent("midTop", "midMid", "midBottom");
    return playerValue;
  } else if (
    gameObject.rightTop === playerValue &&
    gameObject.rightMid === playerValue &&
    gameObject.rightBottom === playerValue
  ) {
    displayWinEvent("rightTop", "rightMid", "rightBottom");
    return playerValue;
  } else if (
    gameObject.leftTop === playerValue &&
    gameObject.midMid === playerValue &&
    gameObject.rightBottom === playerValue
  ) {
    displayWinEvent("leftTop", "midMid", "rightBottom");
    return playerValue;
  } else if (
    gameObject.rightTop === playerValue &&
    gameObject.midMid === playerValue &&
    gameObject.leftBottom === playerValue
  ) {
    displayWinEvent("rightTop", "midMid", "leftBottom");
    return playerValue;
  } else {
    return null;
  }
};

// Lets create function for changing players score
const changeScore = function (winner) {
  if (winner === 0) {
    playersScore.playerO += 1;
    document.getElementById("player-1-score").textContent =
      playersScore.playerO;
  } else {
    playersScore.playerX += 1;
    document.getElementById("player-2-score").textContent =
      playersScore.playerX;
  }
};

// ----------------------------------------------------------------

// Help button and Its container

const helpButton = document.querySelector("#help-btn");
const helpContainer = document.querySelector("#help-container");
const backButton = document.querySelector("#back-btn");

// When we click on help button then please show help container
helpButton.addEventListener("click", function () {
  displayElement(helpContainer, "block");
});

// When we click on back button then please hide help container
backButton.addEventListener("click", function () {
  displayElement(helpContainer, "none");
});

// ---------------------------------------------------------------

// toss window container

console.log(`LET'S TOSS`);

const tossButton = document.querySelector("#toss-btn");
const flipCard = document.querySelector(".flip-card");
const tossWindow = document.querySelector("#toss-window-container");

const randomNumber = Math.trunc(Math.random() * 5) + 5; // Store random which is between 3 to 9

// 1 means chance 'X' and 0 means chance 'O'
let currentChance = randomNumber % 2 === 0 ? 1 : 0; // Store current player chance
let lastChance = currentChance; // Store last chance

console.log(`PLAYER ${currentChance === 0 ? "O" : "X"} WINS TOSS.`);
console.log(`Player ${currentChance === 1 ? "X" : "O"} has chance :)`);

// When we click on toss button then please start flipping card in random count
if (tossButton) {
  tossButton.addEventListener("click", function () {
    flipCard.style.transitionDuration = `${0.3 * randomNumber}s`;
    flipCard.style.transform = `rotateY(${180 * randomNumber}deg)`;
    setTimeout(function () {
      tossWindow.style.top = "-100vh";
      displayChance(currentChance);
    }, 0.3 * randomNumber * 1000 + 1000);
  });
}

// ---------------------------------------------------------------

// Timer Section

const timer = document.querySelector("time");

// 60 seconds timer

let second = 14; // Variable which store second
let hundreth = 100; // Variable which store hundreth
let stopTime = true; // Variable which store condition of stop timer.

// Function for starting timer cycle
function startTimer() {
  if (stopTime == true) {
    stopTime = false;
    timerCycle();
  }
}

// Function for stopping timer cycle
function stopTimer() {
  if (stopTime == false) {
    stopTime = true;
  }
}

// Function for timer cycle
function timerCycle() {
  if (stopTime === false && second >= 0 && hundreth > 0) {
    hundreth = hundreth - 1;

    timer.innerHTML = `0${second}:${hundreth < 10 ? "0" + hundreth : hundreth}`;

    if (second > 0 && hundreth === 0) {
      second = second - 1;
      hundreth = 100;
    }

    setTimeout(timerCycle, 10);
  } else if (stopTime === false && second === 0 && hundreth === 0) {
    console.log("Game Draw");
    setTimeout(function () {
      displayElement(popWindow, "flex");
      resultHeading.textContent = "Game Draw";
    }, 1000);
  }
}

// Function to reset timer
function resetTimer() {
  timer.innerHTML = "15:00";
  stopTime = true;
  second = 14;
  hundreth = 100;
}

// ---------------------------------------------------------------

// Game container

// Creating empty Object for storing player chance with key position
const gameObj = {};

// Count variable to number of times move happen in game
let moveCount = 0;

// Winner variable to store which player win the game.
let winner;

// Player score object
const playersScore = { playerO: 0, playerX: 0 }; // initially both zero

const gridButton = document.querySelectorAll(".grid-btn");
const popWindow = document.querySelector("#pop-window-container");
const resultHeading = document.querySelector("#result");

// Creating loop for button click event

for (const [idx, btn] of gridButton.entries()) {
  btn.addEventListener("click", function () {
    if (!gameObj.hasOwnProperty(btn.name)) {
      // Displaying Player chance icon on button
      btn.style.background =
        "linear-gradient(146.54deg, #70C11F 4.34%, rgba(65, 125, 4, 0.95) 62.62%)";
      displayChanceOnButton(idx, currentChance);

      // Inserting currentChance value to clicked button key.
      gameObj[btn.name] = currentChance;

      // Then, lets change lastChance value with currentChance value
      lastChance = currentChance;

      // Then, change currentChance value alternative to lastChance value
      currentChance = lastChance === 1 ? 0 : 1;

      console.log(`Player ${currentChance === 1 ? "X" : "O"} has chance :)`);
      displayChance(currentChance); // Show which now player have chance

      // increase moveCount by 1
      moveCount++;

      // // Start timer
      if (moveCount === 1) {
        resetTimer();
        startTimer();
      }
    }
    if (moveCount >= 5) {
      winner = checkWinner(gameObj, 1) || checkWinner(gameObj, 0);
      if (winner === 1 || winner === 0) {
        console.log(`Player ${winner === 1 ? "X" : "O"} is winner :)`);

        // Reset timer to its initial state
        stopTimer();
        resetTimer();

        setTimeout(function () {
          displayElement(popWindow, "flex");
          resultHeading.textContent = `Player ${winner === 1 ? "X" : "O"} won`;
          changeScore(winner);
        }, 1500);
      } else if (!winner && moveCount === 9) {
        console.log("Game Draw");

        // Reset timer to its initial state
        stopTimer();
        resetTimer();

        setTimeout(function () {
          displayElement(popWindow, "flex");
          resultHeading.textContent = "Game Draw";
        }, 1000);
      }
    }
  });
}

// ---------------------------------------------------------------------------------------

// Pop Window container

// Resume button
const resumeButton = document.querySelector("#resume-btn");

// When i will click on resume button then, i will again play game along with old scores.
if (resumeButton) {
  resumeButton.addEventListener("click", function () {
    // Clear game object
    for (let key in gameObj) {
      delete gameObj[key];
    }

    // Reset move count to zero, current chance to winner and winner to null;
    moveCount = 0;
    currentChance = winner ?? currentChance;
    winner = null;

    // Reset timer to its initial state
    stopTimer();
    resetTimer();

    console.log(`Player ${currentChance === 1 ? "X" : "O"} has chance :)`);
    displayChance(currentChance); // Show winner player have first chance

    // Reset styling of game buttons
    for (const btn of gridButton) {
      btn.style.background =
        "linear-gradient(146.54deg, rgba(255, 255, 255, 0.7) 4.33%, #70C11F 25.12%, rgba(119, 152, 85, 0.86) 75.26%)";
      btn.style.boxShadow = "0 1.2rem rgba(0, 0, 0, 0.25)";
      btn.style.transform = "translate(0, 0) scale(1)";
    }

    // Remove all players icon from game button
    const playersIcon = document.getElementsByClassName("player-icon");
    for (const icon of playersIcon) {
      displayElement(icon, "none");
    }

    // Close the pop window
    displayElement(popWindow, "none");
  });
}

// When i will click on restart button it will reload game.html page.

// When i will click on exit button it will navigate me to index.html page.

// ----------------------------------------------------------------------------------------
