let maxNumber, answer;

const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');
const guessInput = document.getElementById('guessInput');
const feedback = document.getElementById('feedback');
const displayMax = document.getElementById('displayMax');
const endMessage = document.getElementById('endMessage');

document.getElementById('startBtn').onclick = startGame;
document.getElementById('guessBtn').onclick = makeGuess;
document.getElementById('quitBtn').onclick = quitGame;
document.getElementById('playAgainBtn').onclick = resetGame;

// Pressing Enter in guess field submits guess
guessInput && guessInput.addEventListener('keydown', function(e){
  if(e.key === 'Enter') makeGuess();
});

function startGame() {
  const inputVal = document.getElementById('maxNumber').value.trim();
  const n = Number(inputVal);

  if (!inputVal || isNaN(n) || n < 1) {
    alert('Please enter a valid positive number!');
    return;
  }
  maxNumber = n;
  answer = Math.floor(Math.random() * maxNumber) + 1;

  document.getElementById('maxNumber').disabled = true;
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  displayMax.textContent = maxNumber;
  guessInput.value = '';
  feedback.textContent = '';
  guessInput.focus();
}

function makeGuess() {
  const g = guessInput.value.trim();
  if (!g) return;
  if (g.toLowerCase() === 'quit') {
    quitGame();
    return;
  }
  const guess = Number(g);
  if (isNaN(guess) || guess < 1 || guess > maxNumber) {
    feedback.textContent = `⚠️ Enter a number between 1 and ${maxNumber}`;
    feedback.style.color = '#dc3545';
    guessInput.value = '';
    return;
  }
  if (guess === answer) {
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    endMessage.innerHTML = '<span style="color:#198f4d;">🎉 Congratulations! You got it right! 🎉</span>';
  } else {
    feedback.textContent = '❌ Sorry, please try again!';
    feedback.style.color = '#cf2087';
    guessInput.value = '';
    guessInput.focus();
  }
}

function quitGame() {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  endMessage.innerHTML = '<span style="color:#b72e2e;">Quitting game...<br>Thanks for playing!</span>';
}

function resetGame() {
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  document.getElementById('maxNumber').disabled = false;
  document.getElementById('maxNumber').value = '';
  guessInput.value = '';
  feedback.textContent = '';
  endMessage.innerHTML = '';
}
