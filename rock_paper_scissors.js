let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;

let rps = ["rock", "paper", "scissors"];
const result = document.createElement('div');
document.body.appendChild(result);

document.getElementById('playAgain').style.display = 'none';

let scoreBoard = document.createElement('p');
document.body.appendChild(scoreBoard);

document.getElementsByClassName('rock')[0].addEventListener('click', (event) => {
    event.currentTarget.classList.add('button-clicked');  
    playRound('rock', getComputerChoice())});
document.getElementsByClassName('paper')[0].addEventListener('click', (event) => {
    event.currentTarget.classList.add('button-clicked'); 
    playRound('paper', getComputerChoice())});
document.getElementsByClassName('scissors')[0].addEventListener('click', (event) => {
    event.currentTarget.classList.add('button-clicked'); 
    playRound('scissors', getComputerChoice())});
document.getElementById('playAgain').addEventListener('click', resetGame);

const button_state = Array.from(document.querySelectorAll('.rock, .paper, .scissors'));
button_state.forEach(state => state.addEventListener('transitionend', removeTransition));

tippy.setDefaultProps({delay: 300});

tippy('.rock', {
    content: 'A common mantra is “Rock is for Rookies” because males tend to lead with Rock. Rock is perceived as “strong” and forceful”, so guys tend to fall back on it',
    sticky: true,
})

tippy('.paper', {
    content: 'In competition play, scissors is thrown the least often. It gets delivered 29.6% of the time, so it slightly under-indexes against the expected average of 33.33%',
    sticky: true,
})

tippy('.scissors', {
    content: 'Play scissors as your opening move against experienced players. Rock is too obvious, so scissors is your safe move to win against paper or stalemate to itself',
    sticky: true,
})

function removeTransition(e) {
    if (e.propertyName !== 'transform'|| e.target.classList.contains('shake')) return;
    e.target.classList.remove('button-clicked');
    e.target.classList.remove('user-win');
    e.target.classList.remove('computer-win');
}

function updateScoreBoard(){
    scoreBoard.textContent = "Player Score: " + playerScore + "\n" + "Computer Score: " + computerScore;
}

function disableButtons(){
    const buttons = document.querySelectorAll('.rock, .paper, .scissors');
    buttons.forEach(button => button.disabled = true);
}

function getComputerChoice(){
    const randomIndex = Math.floor(Math.random() * rps.length);
    const item = rps[randomIndex];
    return item;
}

function showFloatingPoint(color) {
    const point = document.createElement('div');
    point.textContent = '+1';
    point.classList.add('floating-point');
    point.style.color = color;
    document.body.appendChild(point);
    point.style.top = '75%';
    if (color === 'green') {
        point.style.left = '600px';
    } else if (color === 'red') {
        point.style.left = 'calc(100% - 600px - ' + point.offsetWidth + 'px)';
    }
  
    setTimeout(() => {
      document.body.removeChild(point);
    }, 2000);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreBoard();
    const buttons = document.querySelectorAll('.rock, .paper, .scissors');
    buttons.forEach(button => button.disabled = false);
    document.getElementById('playAgain').style.display = 'none';
    result.textContent = '';
}

function playRound(playerSelection, computerSelection) {
    computerSelection=getComputerChoice();
    const buttons = document.querySelectorAll('.rock, .paper, .scissors');

    const playerButton = document.querySelector('.' + playerSelection);
    buttons.forEach((button) => {
        button.classList.remove('user-win');
        button.classList.remove('computer-win');
    });

    if (playerSelection === computerSelection){
        result.textContent = "It's a tie! Both players chose " + playerSelection + ".";
        buttons.forEach(button=>button.classList.add('shake'));
        setTimeout(() => {
            buttons.forEach((button) => {
              button.classList.remove('shake');
              button.classList.remove('button-clicked');
            });
        }, 500);
    }
    else if(playerSelection == 'rock'){
        if(computerSelection == 'paper'){
            computerScore++;
            result.textContent = 'The computer won this round!';
            showFloatingPoint('red');
            playerButton.classList.add('computer-win');

        }else{
            playerScore++;
            result.textContent = 'You won this round!';
            showFloatingPoint('green');
            playerButton.classList.add('user-win');
        }
    }
    else if(playerSelection == 'paper'){
        if(computerSelection == 'scissors'){
            computerScore++;
            result.textContent = 'The computer won this round!';
            showFloatingPoint('red');
            playerButton.classList.add('computer-win');

        }else{
            playerScore++;
            result.textContent = 'You won this round!';
            showFloatingPoint('green');
            playerButton.classList.add('user-win');
        }
    }
    else if(playerSelection == 'scissors'){
        if(computerSelection == 'rock'){
            computerScore++;
            result.textContent = 'The computer won this round!';
            showFloatingPoint('red');
            playerButton.classList.add('computer-win');

        }else{
            playerScore++;
            result.textContent = 'You won this round!';
            showFloatingPoint('green');
            playerButton.classList.add('user-win');
        }
    }

    updateScoreBoard();

    if (playerScore===5 || computerScore===5){
        result.textContent += ' Game over!';
        disableButtons();
        document.getElementById('playAgain').style.display = 'block';
    }
}