// game.js - All spel-logik

const GRID_SIZE = 10;
let selectedCells = [];
let selectionStart = null;
let foundWords = new Set();
let timerInterval = null;
let seconds = 0;
let paused = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function updateTimer() {
  if (!paused) {
    seconds++;
    document.getElementById('timer').textContent = `${pad(Math.floor(seconds/60))}:${pad(seconds%60)}`;
  }
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  document.getElementById('timer').textContent = '00:00';
}

function pauseTimer() {
  paused = !paused;
  document.getElementById('pauseBtn').textContent = paused ? 'Fortsätt' : 'Pausa';
}

function pickWords(count) {
  return shuffle([...WORDS]).slice(0, count);
}

function createGrid(words) {
  // Skapa tomt rutnät
  let grid = Array.from({length: GRID_SIZE}, () => Array(GRID_SIZE).fill(''));
  // Placera ord
  for (let word of words) {
    placeWord(grid, word);
  }
  // Fyll tomma celler med slumpmässiga bokstäver
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
  return grid;
}

function placeWord(grid, word) {
  // Försök placera ordet på slumpmässig plats och riktning
  const directions = [
    [0,1], [1,0], [1,1], [-1,1], [0,-1], [-1,0], [-1,-1], [1,-1]
  ];
  let placed = false;
  for (let tries = 0; tries < 100 && !placed; tries++) {
    const dir = directions[Math.floor(Math.random()*directions.length)];
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    if (canPlace(grid, word, row, col, dir)) {
      for (let i = 0; i < word.length; i++) {
        grid[row + i*dir[0]][col + i*dir[1]] = word[i];
      }
      placed = true;
    }
  }
}

function canPlace(grid, word, row, col, dir) {
  for (let i = 0; i < word.length; i++) {
    let r = row + i*dir[0];
    let c = col + i*dir[1];
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return false;
    if (grid[r][c] && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function renderGrid(grid) {
  const table = document.getElementById('letterGrid');
  table.innerHTML = '';
  for (let r = 0; r < GRID_SIZE; r++) {
    const row = document.createElement('tr');
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement('td');
      cell.textContent = grid[r][c];
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('mousedown', handleCellDown);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function renderWordList(words) {
  const ul = document.getElementById('wordList');
  ul.innerHTML = '';
  for (let word of words) {
    const li = document.createElement('li');
    li.textContent = word;
    li.id = `word-${word}`;
    ul.appendChild(li);
  }
}


function handleCellDown(e) {
  if (paused) return;
  const r = +this.dataset.row;
  const c = +this.dataset.col;
  // Om ingen cell är vald, börja ny markering
  if (selectedCells.length === 0) {
    clearSelection();
    selectedCells = [[r, c]];
    this.classList.add('selected');
    return;
  }
  // Kontrollera att den nya cellen är granne med senaste valda
  const [lastR, lastC] = selectedCells[selectedCells.length - 1];
  if (Math.abs(r - lastR) <= 1 && Math.abs(c - lastC) <= 1 && !(r === lastR && c === lastC)) {
    // Kolla att cellen inte redan är vald
    if (!selectedCells.some(([row, col]) => row === r && col === c)) {
      selectedCells.push([r, c]);
      this.classList.add('selected');
      // Om användaren klickar på sista bokstaven, kontrollera ordet
      const word = selectedCells.map(([rr,cc]) => document.querySelector(`td[data-row='${rr}'][data-col='${cc}']`).textContent).join('');
      checkWord(word, selectedCells);
      // Om ordet är rätt eller för långt, nollställ
      if (word.length >= Math.max(...wordsToFind.map(w => w.length))) {
        setTimeout(clearSelection, 200);
        selectedCells = [];
      }
    }
  } else {
    // Klick utanför tillåtet område nollställer markeringen
    clearSelection();
    selectedCells = [];
  }
}


function handleCellEnter(e) {
  // Ingen dragmarkering längre
}


function handleCellUp(e) {
  // Ej i bruk längre
}

function clearSelection() {
  document.querySelectorAll('#letterGrid td.selected').forEach(td => td.classList.remove('selected'));
}

function checkWord(word, cells) {
  if (wordsToFind.includes(word) && !foundWords.has(word)) {
    foundWords.add(word);
    document.getElementById(`word-${word}`).classList.add('found');
    for (let [r, c] of cells) {
      document.querySelector(`td[data-row='${r}'][data-col='${c}']`).classList.add('found');
    }
    if (foundWords.size === wordsToFind.length) {
      document.getElementById('congrats').classList.add('visible');
    }
  }
}

function restartGame() {
  foundWords.clear();
  document.getElementById('congrats').classList.remove('visible');
  wordsToFind = pickWords(8);
  renderWordList(wordsToFind);
  grid = createGrid(wordsToFind);
  renderGrid(grid);
  resetTimer();
  startTimer();
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  document.getElementById('themeBtn').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

function toggleSound() {
  // Placeholder för ljudhantering
  const btn = document.getElementById('soundBtn');
  btn.textContent = btn.textContent === '🔊' ? '🔇' : '🔊';
}

function quitGame() {
  if (confirm('Vill du avsluta spelet?')) {
    window.location.reload();
  }
}

// Init
let wordsToFind = pickWords(8);
let grid = createGrid(wordsToFind);
document.addEventListener('DOMContentLoaded', () => {
  renderWordList(wordsToFind);
  renderGrid(grid);
  startTimer();
  document.getElementById('restartBtn').onclick = restartGame;
  document.getElementById('pauseBtn').onclick = pauseTimer;
  document.getElementById('themeBtn').onclick = toggleTheme;
  document.getElementById('soundBtn').onclick = toggleSound;
  document.getElementById('quitBtn').onclick = quitGame;
});
