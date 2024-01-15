const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

// variable to save the interval id
let intervalId = null;

// func to gen a random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// func initiating bg-color change using inline style
function startColorSwitch() {
  startButton.disabled = true;
  intervalId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// func stopping bg-color change
function stopColorSwitch() {
  startButton.disabled = false;
  clearInterval(intervalId);
}

// evt listeners for start/stop btns
startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);
