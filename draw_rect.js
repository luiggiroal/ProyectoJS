/* Programa que permite dibujar varios cuadrados según el
 * usuario lo indique y el tamaño del Canvas, lo cual da
 * un carácter dinámico al programa.
 * El ancho y el ancho del Canvas se sugiere que sean 600 y
 * 400 para una mejor visualización. Sin embargo, eso
 * queda a elección del usuario.
 * El programa está en inglés por motivos de practica
 * del idioma.*/
let inputWidth = document.querySelector('#width');
let inputHeight = document.querySelector('#height');
let input = document.querySelector('#numRect');
let submitButton = document.querySelector('button');
let clearButton = document.querySelector('.clear');
let canvas = document.querySelector('canvas');
let brush = canvas.getContext('2d');
input.focus();

function drawCanvas() {
  canvas.width = inputWidth.value;
  canvas.height = inputHeight.value;
}

function drawRect(contRectX, contRectY) {
  let positionX = contRectX * 50;
  let positionY = contRectY * 50;
  brush.fillStyle = 'green';
  brush.strokeStyle = 'black';

  brush.fillRect(positionX, positionY, 50, 50);
  brush.strokeRect(positionX, positionY, 50, 50);
}

function clearPattern() {
  brush.clearRect(0, 0, canvas.width, canvas.height);
}

function finalPattern() {
  drawCanvas();
  clearPattern();
  let maxRecsPerRow = canvas.width / 50;
  let numRecs = input.value;
  let recsToPrint = maxRecsPerRow;
  let numRows = numRecs / maxRecsPerRow;
  for (let i = 0; i < numRows; i++) {
    if (numRecs < maxRecsPerRow) {
      recsToPrint = numRecs;
      for (let j = 0; j < recsToPrint; j++) {
        drawRect(j, i);
      }
    } else {
      for (let j = 0; j < recsToPrint; j++) {
        drawRect(j, i);
      }
      numRecs -= maxRecsPerRow;
    }
  }
  input.value = '';
  input.focus();
}

submitButton.onclick = finalPattern;
clearButton.onclick = clearPattern;
