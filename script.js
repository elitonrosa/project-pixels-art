window.onload = () => {
  recoverColors();
  makeGrid();
  recoverDraw();
};

const colors = document.querySelectorAll('#color-palette .color');
let savedColors = [];
let storage = localStorage;

function storageColors() {
  storage.setItem('colorPalette', JSON.stringify(savedColors));
}

function recoverColors() {
  savedColors = JSON.parse(storage.getItem('colorPalette'));

  if (savedColors === null) {
    savedColors = ['black', 'red', 'green', 'blue'];
  }

  for (let index = 1; index < colors.length; index += 1) {
    let color = savedColors[index];
    colors[index].style.backgroundColor = `${color}`;
  }
}

function setRandomColors() {
  for (let index = 1; index < colors.length; index += 1) {
    const color = generateColor();
    colors[index].style.backgroundColor = `${color}`;
    savedColors[index] = color;
  }

  storageColors();
}

function generateColor() {
  const values = '0123456789ABCDEF';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += values[Math.floor(Math.random() * 16)];
  }

  return color;
}

function paintPixel(color) {
  let pixel = document.querySelectorAll('.pixel');

  pixel.forEach(el => {
    el.addEventListener('click', e => {
      el.style.backgroundColor = color;
      saveDraw();
    })
  })
}

function removeSelectedColor() {
  colors.forEach(e => {
    e.classList.remove('selected');
  });
}

function selectNewColor() {
  let color;

  colors.forEach(el => {
    el.addEventListener('click', e => {
      removeSelectedColor();
      el.classList.add('selected');
      const styles = window.getComputedStyle(el);
      color = styles.backgroundColor;
      paintPixel(color);
    })
  })
}

function resetPixels() {
  let pixel = document.querySelectorAll('.pixel');

  pixel.forEach(e => {
    e.style.backgroundColor = 'white';
    saveDraw();
  })
}

let draw = [];

function saveDraw() {
  draw = [];
  let pixel = document.querySelectorAll('.pixel');


  pixel.forEach(e => {
    const style = window.getComputedStyle(e);
    draw.push(style.backgroundColor);
  })

  storage.setItem('pixelBoard', JSON.stringify(draw));
}

function recoverDraw() {
  draw = JSON.parse(storage.getItem('pixelBoard'));
  let pixel = document.querySelectorAll('.pixel');


  if (draw === null) {
    return
  }

  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = draw[i];
  }
}

const input = document.querySelector('#board-size');
let container = document.querySelector('#pixel-board');

function inputGrid() {
  if (input.value === '') {
    window.alert('Board inválido!');
    return;
  }

  const grid = parseInt(input.value);


  return makeGrid(grid);
}

function makeGrid(grid = 5) {
  const newGrid = (grid) * 45;
  container.style.width = `${newGrid}px`;
  const qtdPixels = grid * grid
  
  deleteGrid();

  for (let i = 0; i < qtdPixels; i += 1) {
    let newDiv = document.createElement('div');
    newDiv.classList.add('pixel');
    container.appendChild(newDiv);
  }
  let pixel = document.querySelectorAll('.pixel');
  paintPixel('black');
  selectNewColor();
}

function deleteGrid() {
  let pixel = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].remove();
  }
}