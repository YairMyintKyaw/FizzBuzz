//buttons

//four buttons in play area
const fizzBtn = document.querySelector('.fizzBtn')
const buzzBtn = document.querySelector('.BuzzBtn')
const fizzBuzzBtn = document.querySelector('.fizzBuzzBtn')
const numberBtn=document.querySelector('.numberButton')

//left and right Div Of Number button
const leftDivOfNumber=document.querySelector('.leftDivOfNumber')
const rightDivOfNumber=document.querySelector('.rightDivOfNumber')




const startBtnInRuleArea = document.querySelector('.startBtnInRuleArea')
const singlePlayerBtn=document.querySelector('.singlePlayerBtn')
const multiPlayerBtn=document.querySelector('.multiPlayerBtn')
const startBtnInchoosingPlayer=document.querySelector('.startBtnInchoosingPlayer')
const optionBtn = document.querySelectorAll('option')
//mainAreas
const gameArea = document.querySelector('.gameArea')
const ruleArea = document.querySelector('.ruleArea')
const choosingNumberOfPlayer=document.querySelector('.choosingNumberOfPlayer')


//Rule area
startBtnInRuleArea.addEventListener('click',()=>{
    ruleArea.style.display='none';
    choosingNumberOfPlayer.style.display='flex';
})

//Loser Area
const loserDeclarationDiv=document.querySelector('.loserDeclarationDiv')
loserDeclarationDiv.style.top=`-${loserDeclarationDiv.offsetHeight}px`

//winner area
const winnerDeclaration=document.querySelector('.winnerDeclaration') //multiplayer mode
const highesetScoreDeclaration=document.querySelector('.highesetScoreDeclaration') //single player


let typeOfGame = null;
let numberOfPlayer=1;
let playerList=[]
let highestScore= localStorage.getItem('highestScore') || 0

//multiplayerButton
for(let i=0; i<4;i++){
    if(i==0){
        optionBtn[i].addEventListener('click',()=>{
            multiPlayerBtn.style.border='none'
        })
    }else{
        optionBtn[i].addEventListener('change',(event)=>{
            multiPlayerBtn.style.border='3px solid #0f7173'
            singlePlayerBtn.style.border='none'
            typeOfGame='MultiPlayer'
            numberOfPlayer=+event.target.value
        })
    }
}
    
//single player button
singlePlayerBtn.addEventListener('click',()=>{
    typeOfGame='SinglePlayer'
    singlePlayerBtn.style.border='3px solid #0f7173'
    multiPlayerBtn.style.border='none'
})

// #f05d5e

//start btn to start the game and display which type of game according to the user choice
startBtnInchoosingPlayer.addEventListener('click',()=>{
    if(typeOfGame==='SinglePlayer'){
        //display highest score in in single player mode
        //<div class='highestScore margin'>Highest score:0</div>
        highestScoreDiv = document.createElement('div')
        highestScoreDiv.classList.add('highestScore')
        highestScoreDiv.append(`Current Highest Score: ${highestScore}`)
        gameArea.insertBefore(highestScoreDiv,currentNumber)

        //display the game area
        displayGameArea()

        //center the number button
        settingWidthOfLeftAndRightDiv()
    }else if(typeOfGame==='MultiPlayer'){
        //display current player in multiplayer mode
        //<div class='currentPlayer'>Your turn: Player 1</div>
        currentPlayerDiv=document.createElement('div')
        currentPlayerDiv.classList.add('currentPlayerDiv')
        currentPlayerDiv.append(`Your turn: Player 1`)
        gameArea.insertBefore(currentPlayerDiv,currentNumber)

        //making the list of players
        for(let i=0;i<numberOfPlayer;i++){
            playerList.push(i+1)
        }
        //display the game area
        displayGameArea()

        //center the number button
        settingWidthOfLeftAndRightDiv();

    }

})

//to make the number div center
function settingWidthOfLeftAndRightDiv(){
    leftDivOfNumber.style.width=`${fizzBtn.offsetWidth}px`
    rightDivOfNumber.style.width=`${buzzBtn.offsetWidth}px`
}


//to display game area
function displayGameArea(){
    choosingNumberOfPlayer.style.display='none';
    gameArea.style.display='flex'
}


//The Game Begin

//for current number
let highestScoreDiv;
let currentNumber = document.querySelector('.currentNumber');
let number=1;
let currentPlayerDiv;
let currentPlayer=0;
fizzBtn.addEventListener('click',()=>{

    if(number%3 != 0){
        //you lose
        declareLoserAndRemoveFromTheList(`Player ${playerList[currentPlayer]}`)
    }else if(number%5==0){
        //you lose
        declareLoserAndRemoveFromTheList(`Player ${playerList[currentPlayer]}`)
    }
    number++;
    innerFunctionOFFizzAndBuzz()
})

buzzBtn.addEventListener('click',()=>{

    if(number%5 != 0){
        //you lose
        declareLoserAndRemoveFromTheList(`Player ${playerList[currentPlayer]}`)
    }else if(number%3==0){
        //you lose
        declareLoserAndRemoveFromTheList(`Player ${playerList[currentPlayer]}`)
    }
    number++;
    innerFunctionOFFizzAndBuzz()
    
})

fizzBuzzBtn.addEventListener('click',()=>{
    if( number%3 != 0 || number%5!=0) {
        //you lose
        declareLoserAndRemoveFromTheList(`Player ${ playerList[currentPlayer]}`)
    }
    number++;
    innerFunctionOFFizzAndBuzz()
})

numberBtn.addEventListener('click',()=>{
    if( number%3 == 0 || number%5==0) {
        //you lose
        declareLoserAndRemoveFromTheList(`Player ${playerList[currentPlayer]}`)
    }
    number++;
    innerFunctionOFFizzAndBuzz()
})

const playAgain = document.querySelectorAll('.playAgain')
playAgain.forEach((items)=>{
    items.addEventListener('click',()=>{
        winnerDeclaration.style.display='none'
        highesetScoreDeclaration.style.display='none'
        ruleArea.style.display='inline-block'
        currentPlayer=0;
        number=1;
        numberBtn.textContent=number
        currentNumber.innerHTML=`Current Number ${number}`
        playerList=[]
        typeOfGame == 'SinglePlayer'? highestScoreDiv.remove() : currentPlayerDiv.remove()
    })
})

//innerFunctionOfFizzAndBuzz
function innerFunctionOFFizzAndBuzz(){
    currentNumber.innerHTML=`Current Number ${number}`
    numberBtn.textContent=number
    if(typeOfGame=='MultiPlayer'){
        currentPlayer++;
        if(currentPlayer==playerList.length) currentPlayer=0
        currentPlayerDiv.innerHTML=`Your turn: Player ${playerList[currentPlayer]}`;

        // to declare the winner in multiplayer game
        if (playerList.length==1) {
            winnerDeclaration.firstChild.textContent=`Mr. Player ${playerList[currentPlayer]}`
            winnerDeclaration.style.display='flex';
            gameArea.style.display='none'
        }
    }

}

//declareLoserAndRemoveFromTheList or show the highest score
let currentScore=document.querySelector('.currentScore')
let highesetScoreDisplay= document.querySelector('.highesetScoreDisplay')
function declareLoserAndRemoveFromTheList(nameOfLoser='Mr. Loser'){
    
    if(typeOfGame=='MultiPlayer'){
        playerList.splice(currentPlayer,1)
        currentPlayer--;
        loserDeclarationDiv.innerHTML=`<strong>Mr.${nameOfLoser},</strong> you lose`
        loserDeclarationDiv.style.top='0'
        setTimeout(() => {
            loserDeclarationDiv.style.top=`-${loserDeclarationDiv.offsetHeight}px`
        }, 3000);
    }else{
        highesetScoreDeclaration.style.display='flex'
        gameArea.style.display='none'
        if(number-1>highestScore){
            localStorage.setItem('highestScore',number-1)
            highestScore=localStorage.getItem('highestScore')
        }
        highesetScoreDisplay.textContent=`Highest Score: ${highestScore}`
        currentScore.textContent=`Score: ${number-1}`
    }
}