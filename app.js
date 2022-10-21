// Grab elements
let space = document.querySelectorAll('.space')
const modal = document.querySelector('.modal')
const modalText = modal.querySelector('p')
const closeModal = document.querySelector('.close')
const pOneScore = document.querySelector('#pOneScore')
const pTwoScore = document.querySelector('#pTwoScore')
const startButton = document.querySelector('#startButton')
const restartButton = document.querySelector('#restartButton')
const pOneTurn = document.querySelector('#pOne .checkTurn')
const pTwoTurn = document.querySelector('#pTwo .checkTurn')
const editPlayerOneImg = document.querySelector('#editPlayerOne')
const editPlayerTwoImg = document.querySelector('#editPlayerTwo')
const editPlayerOneBlock = document.querySelector('#editOneBlock')
const oneNameTextInput = document.querySelector('#oneName')
const pOneName = document.querySelector('#pOneName')
const editPlayerTwoBlock = document.querySelector('#editTwoBlock')
const twoNameTextInput = document.querySelector('#twoName')
const pTwoName = document.querySelector('#pTwoName')

// Create Players
let playerOne = {
    name: 'Player One',
    marker: 'X',
    placed: [],
    row: 0,
    wins: 0
}

let playerTwo = {
    name: 'Player Two',
    marker: 'O',
    placed: [],
    row: 0,
    wins: 0
}

let marker = ''
let turn = true
const winningCombo = [
    [0, 1, 2],
    [3, 4, 6],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Edit player names

editPlayerOneImg.addEventListener('click', () => {
    editPlayerOneBlock.style.display = 'block'
})

oneNameTextInput.addEventListener('input', (e) => {
    playerOne.name = e.target.value
    pOneName.textContent = playerOne.name
    if (turn) {
        pOneTurn.textContent = `${playerOne.name} Turn!`
    }  
})

oneNameTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        editPlayerOneBlock.style.display = "none"
    }
    
})

editPlayerTwoImg.addEventListener('click', () => {
    editPlayerTwoBlock.style.display = 'block'
})

twoNameTextInput.addEventListener('input', (e) => {
    playerTwo.name = e.target.value
    pTwoName.textContent = playerTwo.name
    if (!turn) {
        pTwoTurn.textContent = `${playerTwo.name} Turn!`
    }
    
})

twoNameTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        editPlayerTwoBlock.style.display = "none"
    }
    
})

//Start button, Clear board, Clear running data, Keep Score
startButton.addEventListener('click', () => {
    for (let i = 0; i < space.length; i++) {
        if(space[i].classList.contains('placed')) {
            space[i].classList.remove('placed')
            space[i].textContent = ''
        }
    }

    playerOne.row = 0
    playerTwo.row = 0
    playerOne.placed = []
    playerTwo.placed = []
    pOneTurn.style.display = 'block'
    pTwoTurn.style.display = 'block'
})

startButton.addEventListener('mouseover', () => {
    startButton.textContent = 'Keep Score, Clear Board'
    startButton.style.height = '30%'

})

startButton.addEventListener('mouseout', () => {
    startButton.textContent = 'Start'
    startButton.style.height = '20%'
})

// Restart button
restartButton.addEventListener('click', () => {
    for (let i = 0; i < space.length; i++) {
        if(space[i].classList.contains('placed')) {
            space[i].classList.remove('placed')
            space[i].textContent = ''
        }
    }

    playerOne.row = 0
    playerTwo.row = 0
    playerOne.placed = []
    playerTwo.placed = []
    playerOne.wins = 0
    playerTwo.wins = 0
    pOneScore.textContent = `Wins: ${playerOne.wins}`
    pTwoScore.textContent = `Wins: ${playerTwo.wins}`
    pOneTurn.style.display = 'block'
    pTwoTurn.style.display = 'block'

})

restartButton.addEventListener('mouseover', () => {
    restartButton.textContent = 'Reset Score, Clear Board'
    restartButton.style.height = '30%'

})

restartButton.addEventListener('mouseout', () => {
    restartButton.textContent = 'Restart'
    restartButton.style.height = '20%'
})

//display result

function displayResult(playerWon) {
    modalText.textContent = `${playerWon.name} has won the game!`
    modal.style.display = 'block';
    pOneTurn.style.display = 'none'
    pTwoTurn.style.display = 'none'
}

//close modal
closeModal.addEventListener('click', () => modal.style.display = 'none')

// Determine turn and check for winning conditions
function play(turn, playObj) {
    if (turn === true) {
        pTwoTurn.textContent = ''
        marker = playerOne.marker
        pOneTurn.textContent = `${playerOne.name} Turn!`
    } else {
        pOneTurn.textContent = ''
        marker = playerTwo.marker
        pTwoTurn.textContent = `${playerTwo.name} Turn!`
    }
    if (playObj && playObj.placed.length >= 3) {
        for (let i = 0; i < winningCombo.length; i++) {
            for (let j = 0; j < playObj.placed.length; j++) {
                if (winningCombo[i].includes(playObj.placed[j])) {
                    playObj.row++
                }
            }
            if (playObj.row === 3) {
                break
            } else {
                playObj.row = 0
            }
        }
        // 3 in a row, Win
        if (playerOne.row === 3) {
            playerOne.wins++
            pOneScore.textContent = `Wins: ${playerOne.wins}`
            displayResult(playerOne)
        } else if (playerTwo.row === 3) {
            playerTwo.wins++
            pTwoScore.textContent = `Wins: ${playerTwo.wins}`
            displayResult(playerTwo)
        } else if(playerOne.placed.length + playerTwo.placed.length === 9) { // Tie
            modalText.textContent = `The game ends in a Tie!`
            modal.style.display = 'block';
        }
    }


}



// Game interactivity 
for (let i = 0; i < space.length; i++) {
    space[i].addEventListener('click', (e) => {
        if (!e.target.classList.contains('placed')) {
            e.target.textContent = marker
            e.target.classList.add('placed')

            for (let i = 0; i < space.length; i++) {
                if (e.target === space[i]) {
                    if (turn === true) {
                        playerOne.placed.push(i)
                    } else {
                        playerTwo.placed.push(i)
                    }
                }
            }

            if (turn === true) {
                turn = false
                play(turn, playerOne)
            } else {
                turn = true
                play(turn, playerTwo)
            }
        }


    })

    space[i].addEventListener('mouseover', (e) => {
        if (!e.target.classList.contains('placed')) {
            e.target.textContent = marker
        }
    })

    space[i].addEventListener('mouseout', (e) => {
        if (!e.target.classList.contains('placed')) {
            e.target.textContent = ''
        }
    })
}

play(turn)