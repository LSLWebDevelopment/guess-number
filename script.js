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
  if (guessNumber === userGuess) {
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

const updateInterface = (userGuess, bcgColor, numElWidth) => {
  if (guessNumber === userGuess) {
    bodyEl.style.backgroundColor = bcgColor;
    secretNumberEl.style.width = numElWidth;
    secretNumberEl.textContent = guessNumber;
  }

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
  document.querySelector('.guess').value = '';
  updateScore(false);
  updateInterface(0, '#222', '15rem');
});
