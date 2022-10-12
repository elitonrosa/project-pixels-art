const colors = document.querySelectorAll('#color-palette .color');
let savedColors = [];
const storage = localStorage;

function storageColors() {
  storage.setItem('colorPalette', JSON.stringify(savedColors));
}

function recoverColors() {
  savedColors = JSON.parse(storage.getItem('colorPalette'));
  if (savedColors === null) {
    savedColors = ['black', 'red', 'green', 'blue'];
  }
  for (let index = 1; index < colors.length; index += 1) {
    const color = savedColors[index];
    colors[index].style.backgroundColor = `${color}`;
  }
}
function generateColor() {
  const values = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += values[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomColors() {
  for (let index = 1; index < colors.length; index += 1) {
    const color = generateColor();
    colors[index].style.backgroundColor = `${color}`;
    savedColors[index] = color;
  }
  storageColors();
}

function saveDraw() {
  const draw = [];
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((e) => {
    const style = window.getComputedStyle(e);
    draw.push(style.backgroundColor);
  });
  storage.setItem('pixelBoard', JSON.stringify(draw));
}

function paintPixel(color) {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((el) => {
    el.addEventListener('click', () => {
      el.style.backgroundColor = color; 
      saveDraw();
    });
  });
}

function removeSelectedColor() {
  colors.forEach((e) => {
    e.classList.remove('selected');
  });
}

function selectNewColor() {
  let color;
  colors.forEach((el) => {
    el.addEventListener('click', () => {
      removeSelectedColor();
      el.classList.add('selected');
      const styles = window.getComputedStyle(el);
      color = styles.backgroundColor;
      paintPixel(color);
    });
  });
}

function resetPixels() {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((e) => {
    e.style.backgroundColor = 'white';
    saveDraw();
  });
}

function makeGrid(grid = 5) {
  const newGrid = (grid) * 45;
  container.style.width = `${newGrid}px`;
  const qtdPixels = grid * grid;
  deleteGrid();
  for (let i = 0; i < qtdPixels; i += 1) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('pixel');
    container.appendChild(newDiv);
  }
  // const pixel = document.querySelectorAll('.pixel');
  paintPixel('black');
  selectNewColor();
}

function recoverDraw() {
  const grid = Number(storage.getItem('boardSize'));
  if (storage.getItem('boardSize') === null) {
    makeGrid(5);
  } else {
    makeGrid(grid);
  }
  const draw = JSON.parse(storage.getItem('pixelBoard'));
  const pixel = document.querySelectorAll('.pixel');
  if (draw === null) {
    return;
  }
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = draw[i];
  }
}

const input = document.querySelector('#board-size');
const container = document.querySelector('#pixel-board');

function inputGrid() {
  if (input.value === '') {
    window.alert('Board inválido!');
    return;
  }
  let grid = Number(input.value);
  if (grid < 5) {
    grid = 5;
  }
  if (grid > 50) {
    grid = 50;
  }
  storage.setItem('boardSize', `${grid}`);
  resetPixels();
  return makeGrid(grid);
}

function deleteGrid() {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].remove();
  }
}

window.onload = () => {
  recoverColors();
  recoverDraw();
};
