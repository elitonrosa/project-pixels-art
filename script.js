window.onload = () => {
  recoverColors();
  paintPixel('black');
  selectNewColor();
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
  const selectedPixel = document.querySelectorAll('.pixel');

  selectedPixel.forEach(el => {
    el.addEventListener('click', e => {
      el.style.backgroundColor = color;
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