import Player from "./Player.js";

const buttons = document.querySelectorAll(".button");           // Declaring variables   
const player1Details = document.querySelector(".p1");
const player2Details = document.querySelector(".p2")
const playAgainButton = document.querySelector(".play-again-button");
const messageBox = document.querySelector(".msg-box");

const nameInput1 = prompt("Player 1: ");                        // Getting a name input from the players.      
const nameInput2 = prompt("Player 2: ");

let player1 = new Player(nameInput1, "X");                      // Creating player objects with parameters name and symbol.
let player2 = new Player(nameInput2, "O");                      // Points and level have a default value so no need to include those parameters.

if (player1.name === null || player1.name === "") player1.name = "Player 1";
if (player2.name === null || player2.name === "") player2.name = "Player 2";

let currentPlayer;                                               // Generating random number,
let random = Math.round(Math.random() > 0.5) ? 1 : 0;            // to determine if player1 or
if (random === 0) currentPlayer = player1;                       // player2 gets to make the first move.
else currentPlayer = player2;

player1Details.innerHTML = `${player1.name}: (${player1.symbol}) <br /> Points: ${player1.points} <br /> Level: ${player1.level}`;  // Formatting player name, player points, and player level.
player2Details.innerHTML = `${player2.name}: (${player2.symbol}) <br /> Points: ${player2.points} <br /> Level: ${player2.level} <br / ><br />`;

if (buttons) {
    buttons.forEach(button => {                                  // Looping through buttons nodelist and adding an eventListener on each button.
        button.addEventListener("click", () => {
            buttons.forEach(button => {
                if (button.innerHTML === "X" || button.innerHTML === "O") {  // Checking if buttons contain player symbols, if so,
                    button.disabled = true;                                  // the button will be disabled to make sure it's not pressed again.
                }
            })
            if (!button.disabled) {
                button.innerHTML = currentPlayer.symbol;
                if (currentPlayer === player1) {                     // After click, checking if current player = player1,
                    currentPlayer = player2;                         // if so, current player will be set to player2.
                } else {
                    currentPlayer = player1;
                }
                updatePoints();
                checkWinner();
            }
        })
    });
}

if (playAgainButton) {
    playAgainButton.addEventListener("click", () => {               // Adding eventlistener to the playagain button, when clicked, resetgame function will be called.
        resetGame();
    })
}

function checkWinner() {
    if ((buttons[0].innerHTML === 'X') && (buttons[1].innerHTML === 'X'         // Checking all possible moves for player "X" symbol.       
    ) && (buttons[2].innerHTML === 'X')) {                                      // if three of them line up, horizontally, vertically or diagonally,                                                                                                                                                                                                                                                                        
        handleWin(player1, buttons[0], buttons[1], buttons[2]);                 // one point will be added to player 1's points total,                 
    } else if ((buttons[0].innerHTML === 'X') && (buttons[3].innerHTML === 'X'  // a winner message will appear on the screen, and all buttons will be disabled,
    ) && (buttons[6].innerHTML === 'X')) {                                      // so no further inputs can be given after the game is over.
        handleWin(player1, buttons[0], buttons[3], buttons[6]);
    } else if ((buttons[6].innerHTML === 'X') && (buttons[7].innerHTML === 'X'
    ) && (buttons[8].innerHTML === 'X')) {
        handleWin(player1, buttons[6], buttons[7], buttons[8]);
    } else if ((buttons[2].innerHTML === 'X') && (buttons[5].innerHTML === 'X'
    ) && (buttons[8].innerHTML === 'X')) {
        handleWin(player1, buttons[2], buttons[5], buttons[8]);
    } else if ((buttons[0].innerHTML === 'X') && (buttons[4].innerHTML === 'X'
    ) && (buttons[8].innerHTML === 'X')) {
        handleWin(player1, buttons[0], buttons[4], buttons[8]);
    } else if ((buttons[2].innerHTML === 'X') && (buttons[4].innerHTML === 'X'
    ) && (buttons[6].innerHTML === 'X')) {
        handleWin(player1, buttons[2], buttons[4], buttons[6]);
    } else if ((buttons[1].innerHTML === 'X') && (buttons[4].innerHTML === 'X'
    ) && (buttons[7].innerHTML === 'X')) {
        handleWin(player1, buttons[1], buttons[4], buttons[7]);
    } else if ((buttons[3].innerHTML === 'X') && (buttons[4].innerHTML === 'X'
    ) && (buttons[5].innerHTML === 'X')) {
        handleWin(player1, buttons[3], buttons[4], buttons[5]);

    } else if ((buttons[0].innerHTML === 'O') && (buttons[1].innerHTML === 'O'      // Checking all possible moves for player symbol "O"
    ) && (buttons[2].innerHTML === 'O')) {                                          // if three of them line up, horizontally, vertically or diagonally,
        handleWin(player2, buttons[0], buttons[1], buttons[2]);
    } else if ((buttons[0].innerHTML === 'O') && (buttons[3].innerHTML === 'O'
    ) && (buttons[6].innerHTML === 'O')) {                                          // to make sure no more buttons can be pressed after the game has ended.
        handleWin(player2, buttons[0], buttons[3], buttons[6]);
    } else if ((buttons[6].innerHTML === 'O') && (buttons[7].innerHTML === 'O'
    ) && (buttons[8].innerHTML === 'O')) {
        handleWin(player2, buttons[6], buttons[7], buttons[8]);
    } else if ((buttons[2].innerHTML === 'O') && (buttons[5].innerHTML === 'O'
    ) && (buttons[8].innerHTML === 'O')) {
        handleWin(player2, buttons[2], buttons[5], buttons[8]);
    } else if ((buttons[0].innerHTML === 'O') && (buttons[4].innerHTML === 'O'
    ) && (buttons[8].innerHTML === 'O')) {
        handleWin(player2, buttons[0], buttons[4], buttons[8]);
    } else if ((buttons[2].innerHTML === 'O') && (buttons[4].innerHTML === 'O'
    ) && (buttons[6].innerHTML === 'O')) {
        handleWin(player2, buttons[2], buttons[4], buttons[6]);
    } else if ((buttons[1].innerHTML === 'O') && (buttons[4].innerHTML === 'O'
    ) && (buttons[7].innerHTML === 'O')) {
        handleWin(player2, buttons[1], buttons[4], buttons[7]);
    } else if ((buttons[3].innerHTML === 'O') && (buttons[4].innerHTML === 'O'
    ) && (buttons[5].innerHTML === 'O')) {
        handleWin(player2, buttons[3], buttons[4], buttons[5]);
    } else if ((buttons[0].innerHTML === 'X' || buttons[0].innerHTML === "O"        // Checking if the game has ended with a tie, 
    ) && (buttons[1].innerHTML === 'X' || buttons[1].innerHTML === "O"              // if so, no points will be granted to either players,
        ) && (buttons[2].innerHTML === 'X' || buttons[2].innerHTML === "O"          // and the game will end.
        ) && (buttons[3].innerHTML === 'X' || buttons[3].innerHTML === "O"
        ) && (buttons[4].innerHTML === 'X' || buttons[4].innerHTML === "O"
        ) && (buttons[5].innerHTML === 'X' || buttons[5].innerHTML === "O"
        ) && (buttons[6].innerHTML === 'X' || buttons[6].innerHTML === "O"
        ) && (buttons[7].innerHTML === 'X' || buttons[7].innerHTML === "O"
        ) && (buttons[8].innerHTML === 'X' || buttons[8].innerHTML === "O"
        )) {
        messageBox.innerHTML = "Tie!"
    }
}

function updatePoints() {
    player1Details.innerHTML = `${player1.name}: (${player1.symbol}) <br /> Points: ${player1.points} <br /> Level: ${player1.level}`;     // Function to update the player name, player points, and player level.
    player2Details.innerHTML = `${player2.name}: (${player2.symbol}) <br /> Points: ${player2.points} <br /> Level: ${player2.level} <br / ><br />`
}

function updateMessageBox() {
    if (currentPlayer === player1) messageBox.textContent = player2.name + " won!";   // Function to update the message box,
    else messageBox.textContent = `${player2.name} won!`;                             // afterwards, calls updatePoints function.

    updatePoints();
}

function resetGame() {                              // Function to reset the game,
    buttons.forEach(button => {                     // all buttons will be enabled, the values will be removed,
        button.disabled = false;                    // and content in the messagebox will be removed.
        button.innerHTML = "&nbsp;";
        button.classList.remove("green");
    })
    messageBox.innerHTML = "&nbsp;";
}

function disableButtons() { buttons.forEach(button => button.disabled = true) };     // Function to disable all buttons. Will be called after a winner has been determined.

function highlightSymbols(button1, button2, button3) {
    button1.classList.add("green");
    button2.classList.add("green");
    button3.classList.add("green");
}

function handleWin(player, button1, button2, button3) {             // handlewin function, makes sure the winning player receives a point, 
    player.addPoint();                                              // the messagebox will be updated, all buttons will be disabled and the winning symbols will be highlighted.
    updateMessageBox();
    disableButtons();

    highlightSymbols(button1, button2, button3);
}




