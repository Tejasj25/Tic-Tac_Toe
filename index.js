const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGamebtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Let's create a function to intialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //Remove the X and 0 from Ui also
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //intialize css properties again to remove green colour
        box.classList = `box box${index + 1}`
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkgameOver() {
   let answer = "";
   
   winningPosition.forEach((position) => {
    //We are checking that all the position are empty or either filled with the same value
    if((gameGrid[position[0]] !== "" &&  gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")  
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) 
    {
        //check if winner is X
        if(gameGrid[position[0]] === "X")
        answer = "X";
        else
            answer = "0";

        //disable pointer events
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })

        //Now we know winner so filling the boxes with green colour
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        }
    });

    //we have a Winner and updating in the above gam-info tag
    if(answer!=="") {
        gameInfo.innerText = `Winner Player ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }
     //if Game was tie

     let fillCount = 0;
     gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
     })

     //board is filled and game is tie
     if(fillCount==9){
        gameInfo.innerText = "Game Tied !"
        newGamebtn.classList.add("active");
     }
}


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer= "0"
    }else{
        currentPlayer = "X";
    }
    //UI Update
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Curent Player - ${currentPlayer}`
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText  = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //Turn the Swap from X to 0
        swapTurn();
        //check it if game is over or not
        checkgameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click' , () =>{
        handleClick(index);
    })
}); 

newGamebtn.addEventListener("click", initGame);
    