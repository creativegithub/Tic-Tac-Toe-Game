let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; //player-x or player-y
let count = 0;//to track draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

boxes.forEach ((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            //turn O
            box.innerText = "O";
            box.style.color = '#4a4e69';
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = '#b0413e';
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

// checking winner
const checkWinner = () => {
    for(let pattern of winPatterns){
        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

        if(post1Val != "" || post2Val != "" || post3Val != ""){
            if(post1Val === post2Val && post2Val === post3Val){
                showWinner(post1Val);
                return true;
            }
        }
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

// reset or start new game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);

// Game draw
const gameDraw = () => {
    msg.innerText = `Game was a draw`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}