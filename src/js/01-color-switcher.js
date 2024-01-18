const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

// variable to save the interval id
let intervalId = null;

btnStop.setAttribute('disabled', '');

// func to gen a random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// add evt listeners on start btn
btnStart.addEventListener('click', element => {
  element.target.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// add evt listeners on stop btn
btnStop.addEventListener('click', element => {
  element.target.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');

  clearInterval(intervalId);
});
