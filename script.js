const gameContainer = document.getElementById('game-container');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const gameOverText = document.getElementById('game-over');

let cards = [];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchedCards = 0;
let moves = 0;
let timer = 0;
let interval;
 
// Array of card values (pairs)
const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🍍'];

// Double the card values to make pairs
let deck = [...cardValues, ...cardValues];

// Shuffle the deck
deck = shuffle(deck);

// Initialize the game
function initGame() {
    
    deck.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = value;
        console.log(card)
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    });

    // Start the timer
    interval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
}

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Flip card function
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('open');

    if (!hasFlippedCard) {
        // First card
        hasFlippedCard = true;
        firstCard = this;
        console.log(`first card ; ${firstCard}`)
        return;
    }
    
    // Second card
    secondCard = this;
    console.log(`second card ; ${secondCard}`)
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();

    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
}

// Disable cards if they match
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
    matchedCards += 2;

    // Check if the game is won
    if (matchedCards === cards.length) {
        endGame();
    }
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        resetBoard();
    }, 1000);
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function endGame() {
    clearInterval(interval);
    gameOverText.classList.remove('hidden');
    setTimeout(() => {
        playAgain()
    },10000)
}

function playAgain(){
    const contains = document.querySelector('#game-container');
    const cards = contains.querySelectorAll('div.card');
    cards.forEach(card =>
        card.classList.remove('card'));
}

initGame();
