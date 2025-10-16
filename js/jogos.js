// jogos.js — script base para a área infantil (ex.: memória)
// Este script é um ponto de partida. Adapte conforme o jogo que implementar.

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startGame();
    });
  }
});

function startGame() {
  const board = document.getElementById('gameBoard');
  if (!board) return;

  board.innerHTML = ''; // limpa

  // exemplo: gerar 8 cartas (pares => 16)
  const icons = ['🍎','🍌','🍇','🍓','🍍','🍉','🍒','🥝'];
  const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);

  cards.forEach((c, idx) => {
    const el = document.createElement('button');
    el.className = 'card';
    el.dataset.value = c;
    el.textContent = '?';
    el.style.fontSize = '1.6rem';
    el.style.padding = '18px';
    el.style.borderRadius = '10px';
    el.style.border = 'none';
    el.style.background = '#fff';
    el.addEventListener('click', onCardClick);
    board.appendChild(el);
  });
}

let firstCard = null;
let lock = false;

function onCardClick(e) {
  if (lock) return;
  const el = e.currentTarget;
  el.textContent = el.dataset.value;

  if (!firstCard) {
    firstCard = el;
    el.disabled = true;
    return;
  }

  // segunda carta
  if (el === firstCard) return;
  lock = true;

  if (el.dataset.value === firstCard.dataset.value) {
    // par encontrado
    el.disabled = true;
    firstCard = null;
    lock = false;
  } else {
    // não é par: vira de volta depois
    setTimeout(() => {
      el.textContent = '?';
      firstCard.textContent = '?';
      firstCard.disabled = false;
      firstCard = null;
      lock = false;
    }, 800);
  }
}