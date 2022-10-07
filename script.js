window.onload = () => {

  
};

function setRandomColors(e) {
  const colors = document.querySelectorAll('.random');

  for (let value of colors) {
    const color = generateColor();
    value.style.backgroundColor = `${color}`;
  }
};

function generateColor() {
  const values = '0123456789ABCDEF';
  let color = '#';
  
  for (let index = 0; index < 6; index += 1) {
    color += values[Math.floor(Math.random() * 16)];
  }
  
  return color;
};