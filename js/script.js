const startBtn = document.getElementById('startButton');
startBtn.addEventListener('click', startTheGame);
const getUsername = document.getElementById('usernameInput');
const introContainer = document.getElementById('usernameContainer');
let playerScore = 0;
let computerScore = 0;
let playerScoreText = document.createElement('h5');
let computerScoreText = document.createElement('h5');
playerScoreText.innerText = `Din poäng 0 / 3`;
computerScoreText.innerText = `Datorns poäng 0 / 3`;

function startTheGame(event) {
    event.preventDefault();
    let username = document.createElement('h1');
    username.id = 'username';
    document.body.append(username);
    username.innerText = `Användarnamn: ${getUsername.value}`;
    introContainer.remove();

    const chooseBetween = document.createElement('p');
    chooseBetween.innerText = 'Välj mellan Rock, Paper, Scissor';
    const rock = document.createElement('img');
    rock.src = './images/rock.jpeg';
    rock.id = 'rock';
    const paper = document.createElement('img');
    paper.src = './images/paperBag.jpeg';
    paper.id = 'paper';
    const scissor = document.createElement('img');
    scissor.src = './images/scissor.jpeg';
    scissor.id = 'scissor';
    const imgContainer = document.createElement('div');
    imgContainer.id = 'imgContainer';
    imgContainer.append(rock, paper, scissor);
    const imgGridContainer = document.createElement('div');
    imgGridContainer.id = 'imgGridContainer';
    imgGridContainer.append(chooseBetween, imgContainer);
    document.body.append(imgGridContainer);

    //Lägg till användarens och datorns poäng till bodyn
    const scoreContainer = document.createElement('div');
    scoreContainer.id = 'scoreContainer';
    scoreContainer.append(playerScoreText, computerScoreText);
    document.body.append(scoreContainer);

    //Deklarera element som ska innehålla spelarens och datorns val
    let printPlayerChoice = document.createElement('h4');
    let printComputerChoice = document.createElement('h4');
    let whoWon = document.createElement('h4');
    const printContainer = document.createElement('div');
    printContainer.id = 'printContainer';
    printContainer.append(printPlayerChoice, printComputerChoice, whoWon);
    const gridContainer = document.createElement('div');
    gridContainer.append(printContainer, scoreContainer);

    imgContainer.addEventListener('click', compareResult);
    function compareResult(event) {
        let playerChoice = event.target.id;
        let computerChoiceRandom = Math.floor(Math.random() * 3);
        let computerChoice = '';
        gridContainer.id = 'gridContainer';
        document.body.append(gridContainer);
        if (computerChoiceRandom == 0) {
            computerChoice = rock.id;
        }
        else if (computerChoiceRandom == 1) {
            computerChoice = paper.id;
        }
        else if (computerChoiceRandom == 2) {
            computerChoice = scissor.id;
        }

        //jämför playerChoice med computerChoice
        if (playerChoice == rock.id && computerChoice == scissor.id || playerChoice == paper.id && computerChoice == rock.id || playerChoice == scissor.id && computerChoice == paper.id) {
            playerScore++;
            whoWon.innerText = 'Du vann och får en poäng!';
            printChoices();
        }
        else if (playerChoice == rock.id && computerChoice == paper.id || playerChoice == paper.id && computerChoice == scissor.id || playerChoice == scissor.id && computerChoice == rock.id) {
            computerScore++;
            whoWon.innerText = 'Datorn vann och får en poäng';
            printChoices();
        }
        else if (playerChoice == computerChoice) {
            whoWon.innerText = 'Det blev lika, ingen får poäng';
            printChoices();
        }

        function printChoices() {
            printPlayerChoice.innerText = `Du valde ${playerChoice}`;
            printComputerChoice.innerText = `Datorn valde ${computerChoice}`;
        }

        playerScoreText.innerText = `Din poäng ${playerScore} / 3`;
        computerScoreText.innerText = `Datorns poäng ${computerScore} / 3`;

        checkResult();
    }
    let resultText = document.createElement('h3');
    function checkResult() {
        if (playerScore == 3 && computerScore < 3) {
            imgGridContainer.remove();
            resultText.innerText = 'Slutresultat: Du vann!';
            restart();
        }
        else if (playerScore < 3 && computerScore == 3) {
            imgGridContainer.remove();
            resultText.innerText = 'Slutresultat: Du förlorade :(';
            restart();
        }
    }
    function restart() {
        document.body.append(resultText);
        const startOver = document.createElement('button');
        startOver.innerText = 'Starta om?';
        const startOverContainer = document.createElement('div');
        startOverContainer.id = 'startOverContainer';
        startOverContainer.append(startOver);
        document.body.appendChild(startOverContainer);
        startOver.addEventListener('click', () => {
            location.reload();
        })
    }
}
