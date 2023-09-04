const boxes = document.querySelectorAll(".box"); 
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    

    // Clear the board UI
    boxes.forEach(box => box.innerText = '');
    boxes.forEach(box => box.style.default)
}

initGame();

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position)=> {
        if( (gameGrid[position[0] ] !== "" || gameGrid[position[1]] !== ""  || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){

        //check winner is x
        if(gameGrid[position[0]] === "X")
            answer = "X";

            else
                answer="O";

                //disable pointer

                Array.from(boxes).forEach((box) =>{
                    box.style.pointerEvents = "none";
                })


            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
    }

    });


if(answer !== ""){
    gameInfo.innerText =`Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
}

let fillcount =0;
gameGrid.forEach((box) => {
    if (box !== "")
        fillcount++;

} ) 

//board if full

if (fillcount===9){
    gameInfo.innerText="GAME-TIED";
    newGameBtn.classList.add("active");  
}
 
}

function handleClick(index) { 
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    }
}


Array.from(boxes).forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
