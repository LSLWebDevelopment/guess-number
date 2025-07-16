'use strict';
let checkButton = document.querySelector('.check');
let againButton = document.querySelector('.again');
let guessNumber;
let score = 20;
let highScore = 0;

// grab all elements
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const messageEl = document.querySelector('.message');
const bodyEl = document.querySelector('body');
const secretNumberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');

const generateGuessNumber = () => {
  guessNumber = Math.floor(Math.random() * 20) + 1;
};

const init = () => {
  generateGuessNumber();
};

init();

const checkUserGuess = userGuess => {
  if (score === 1) {
    updateScore(userGuess);
    updateInterface(userGuess, 'red', '30rem');
    updateMessage('💥You lost the game!');
  } else {
    if (!userGuess) {
      updateMessage('⛔No number!');
    } else if (guessNumber === userGuess) {
      updateInterface(userGuess, '#60b347', '30rem');
      updateHighScore();
      updateMessage('🎉correct number!');
    } else if (userGuess > guessNumber) {
      updateScore(userGuess);
      updateMessage('📈too hight');
    } else if (userGuess < guessNumber) {
      updateScore(userGuess);
      updateMessage('📉too low');
    }
  }
};

const updateScore = userGuess => {
  if (!userGuess) {
    score = 21;
  }

  score--;
  scoreEl.textContent = score;
};

const updateHighScore = () => {
  if (score > highScore) {
    highScore = score;
    highScoreEl.textContent = highScore;
  }
};

const updateMessage = message => {
  messageEl.textContent = message;
};

const checkWinner = (bcgColor, numElWidth) => {
  bodyEl.style.backgroundColor = bcgColor;
  secretNumberEl.style.width = numElWidth;
  secretNumberEl.textContent = guessNumber;
};

const checkGameOver = bcgColor => {
  bodyEl.style.backgroundColor = bcgColor;
  secretNumberEl.textContent = guessNumber;
};

const updateInterface = (bcgColor, numElWidth) => {
  bodyEl.style.backgroundColor = bcgColor;
  secretNumberEl.style.width = numElWidth;
  secretNumberEl.textContent = '?';
};

checkButton.addEventListener('click', () => {
  const userGuess = Number(guessEl.value);
  if (userGuess <= 0 || userGuess > 20) {
    alert('You have to enter a number (between 1 and 20)');
  }
  checkUserGuess(userGuess);
});

againButton.addEventListener('click', () => {
  init();
  guessEl.value = '';
  updateMessage('Start guessing...');
  updateScore(false);
  updateInterface('#222', '15rem');
});
