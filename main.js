const status = document.getElementById('status');
const pOne = document.getElementById('player-one');
const pTwo = document.getElementById('player-two');
pOne.style.color = "green";
pOne.innerHTML="=>Player one"
pTwo.innerHTML="Player two"
pTwo.style.color = "red";


let active = true;
let playerOne = "X";
let current = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const winner = () => `Player ${playerOne} is a winner.`;
const draw = () => "Game is draw!";

const handleBlockPlayed = (clickedBlock, blockIndex) => {
    current[blockIndex] = playerOne;
    clickedBlock.innerHTML = playerOne;
}
const handlePlayerChange = () => {
    playerOne = playerOne === "X" ? "O" : "X";
    
    if( playerOne=== "X"){
        pOne.style.color = "green";
        pOne.innerHTML="=>Player one"
        pTwo.innerHTML="Player two"
        pTwo.style.color = "red";
    }else if(playerOne === "O"){
        pOne.style.color = "red";
        pTwo.style.color = "green";
        pTwo.innerHTML="=>Player two"
        pOne.innerHTML="Player one"
    }


}
const handleResultValidation = () => {
    let gameWon = false
    for (let i = 0; i < 7; i++) {
        const winCondition = winningConditions[i];
        let x = current[winCondition[0]];
        let y = current[winCondition[1]];
        let z = current[winCondition[2]];
        if (x === '' || y === '' || z === '') {
            continue;
        }
        if (x === y && y === z) {
            gameWon = true;
            
            
            break
        }
    }
    if (gameWon) {
        status.innerHTML = winner();
        active = false; 
       return;
    }
    let gameDraw = !current.includes("");
    if (gameDraw) {
        status.innerHTML = draw();
        active = false;
        
        return;
    }
    handlePlayerChange();
}
const handleBlockClick = (blockEvent) => {
    const clickedBlock = blockEvent.target;
    // console.log(clickedBlock);
    const blockIndex = parseInt(clickedBlock.getAttribute('index'));
    // console.log(blockIndex);
    if (current[blockIndex] !== "" || !active) {
        return;
    }
    handleBlockPlayed(clickedBlock, blockIndex)
    handleResultValidation()
}
const handleRestart = () => {
    active = true;
    playerOne = "X";
    current = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".block").forEach(block => block.innerHTML = "");
    document.getElementById("zero").style.color="black";
    document.getElementById("one").style.color="black";
    document.getElementById("two").style.color="black";
  

}

document.querySelectorAll(".block").forEach(block => block.addEventListener('click', handleBlockClick));
document.querySelector('.restart').addEventListener('click', handleRestart);