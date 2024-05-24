let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".btn");
let newGb = document.querySelector(".bmsg");
let winnerMsg = document.querySelector(".w-msg");
let msg = document.querySelector(".pmsg");

let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    winnerMsg.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "X";
            box.classList.add("x-player");
            box.classList.remove("o-player");
            turn0 = false;
        } else {
            box.innerText = "O";
            box.classList.add("o-player");
            box.classList.remove("x-player");
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true; // Added return true to stop further checking after a winner is found
            }
        }
    }
    return false; // Added return false if no winner is found
}

const gameDraw = () => {
    msg.innerText = `Game is Draw`;
    winnerMsg.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-player", "o-player"); // Remove both classes on reset
    }
}

const showWinner = (Winner) => {
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    winnerMsg.classList.remove("hide");
    disableBoxes();
}

newGb.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
