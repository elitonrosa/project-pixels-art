window.onload = () => {
  recoverColors()
};

const colors = document.querySelectorAll('#color-palette .color');
let savedColors = ['black', 'red', 'green', 'blue']
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
};

function generateColor() {
  const values = '0123456789ABCDEF';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += values[Math.floor(Math.random() * 16)];
  }

  return color;
};