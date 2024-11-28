let high, scoreSpan;
window.onload = function () {
  const verde = document.getElementById("verde");
  const rojo = document.getElementById("rojo");
  const azul = document.getElementById("azul");
  const amarillo = document.getElementById("amarillo");
  const simon = document.getElementById("simon");

  high = document.getElementById("high");
  scoreSpan = document.getElementById("score");
};

// Variables
let secuencia = [];
let started = false;
let clickable = false;
let score = 0;
let highestScore = 0;

function colorClick(color) {
  if (clickable) {
    if (started) {
      playGame(color);
    }
  }
}

// Generar color aleatorio
function genColor() {
  let colors = ["verde", "rojo", "azul", "amarillo"];
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Actualizar la puntuación
function actualizarScore(puntos) {
  if (puntos === 0) {
    score = 0;
    scoreSpan.innerText = 0;
    return;
  }

  score += puntos;

  if(score > highestScore) {
    high.innerText = score;
  }

  scoreSpan.innerText = score;
}

// Empezar juego
function start() {
  if (!started) {
    started = true;
    nextLevel();
  }
}

function restart() {
  actualizarScore(0);
  turn = 0;
  secuencia = [];
  start();
}

// Juego
let turn = 0;
function playGame(inputColor) {
  if (inputColor === secuencia[turn]) {
    turn++;
    if (turn === secuencia.length) {
      actualizarScore(1);
      setTimeout(nextLevel, 500);
    }
  } else {
    console.log("PERDISTE");
  }
}

// cada vez que se completa, se debe de pasar al siguiente nivel
function nextLevel() {
  turn = 0;
  // el score es proporcional a la cantidad de colores que hay en el array
  secuencia.push(genColor());
  showColors();
}

// El programa muestra los colores al jugador que debe replicar
function showColors() {
  clickable = false; // Para que el usuario no pueda interactuar mientras se muestra la secuencia
  console.log("Secuencia: ", secuencia);
  for (let a = 0; a < secuencia.length; a++) {
    setTimeout(() => {
      switch (secuencia[a]) {
        case "verde":
          verde.style.backgroundColor = "greenyellow";
          break;
        case "rojo":
          rojo.style.backgroundColor = "red";
          break;
        case "azul":
          azul.style.backgroundColor = "rgb(45, 94, 255)";
          break;
        case "amarillo":
          amarillo.style.backgroundColor = "yellow";
          break;
      }
      setTimeout(resetColors, 500);
    }, a * 1000); // Retraso para cada color
  }
  clickable = true;
}

function resetColors() {
  verde.style.backgroundColor = "green";
  rojo.style.backgroundColor = "rgb(134, 10, 10)";
  azul.style.backgroundColor = "rgb(35, 35, 153)";
  amarillo.style.backgroundColor = "goldenrod";
}

function simon() {
  if (score > 0) {
    showColors();
    actualizarScore(-1);
    return;
  } //si no ha empezado el juego, quiero un reto dificil.
}
