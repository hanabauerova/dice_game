"use strict";

//nastavení defaultního stavu
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

//výběr tlačítek hry
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//výběr pro ukládání current score
const current0Score = document.querySelector("#current--0");
const current1Score = document.querySelector("#current--1");

//proměnná pro ukládáí current score
let currentScore = 0;
let activePlayer = 0; //pomocná proměnná pro hlídání aktivního hráče
let totalScore = [0, 0]; // pole pro ukládání score

//výběr elementů pro přepínání pozadí aktivního hráče
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

//nastavení jména hráčů

const name0Player = window.prompt("Zadej jméno prvního hráče");
document.querySelector("#name--0").textContent = name0Player;
const name1Player = window.prompt("Zadej jméno druhého hráče");
document.querySelector("#name--1").textContent = name1Player;

//event listener na roll
btnRoll.addEventListener("click", function () {
  let diceNum = Math.floor(Math.random() * 6) + 1;
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${diceNum}.png`;
  if (diceNum !== 1) {
    currentScore += diceNum;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

//event listener na hold
btnHold.addEventListener("click", function () {
  totalScore[activePlayer] += currentScore;
  //výhra
  if (totalScore[activePlayer] >= 100) {
    activePlayer == 0
      ? player0Element.classList.add("player--winner")
      : player1Element.classList.add("player--winner");
    btnRoll.disabled = true;
    btnHold.disabled = true;
  }
  //přičítání skóre
  activePlayer == 0
    ? (score0Element.textContent = totalScore[activePlayer])
    : (score1Element.textContent = totalScore[activePlayer]);

  switchPlayer();
});

//funkce na přepnutí hráče
function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
}

//event listener click na znovu načtení hry
btnNew.addEventListener("click", function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add("hidden");

  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  currentScore = 0;
  totalScore = [0, 0];
  if (activePlayer !== 0) {
    player1Element.classList.remove("player--active");
    player0Element.classList.add("player--active");
  }
  activePlayer = 0;
});
