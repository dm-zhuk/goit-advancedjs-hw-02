import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hrs = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');

let timerInterval = null;

btn.disabled = true;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      iziToast.warning({
        title: 'Caution',
        message: 'please select an upcoming date 📆',
        position: 'topCenter',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
      iziToast.info({
        title: 'Good',
        message: 'now you are good to go 🟢',
        position: 'topCenter',
      });
    }
  },
});

btn.addEventListener('click', () => {
  const currentDate = new Date();
  const selectedDate = new Date(date.value);

  let timeRemaining = selectedDate - currentDate;

  timerInterval = setInterval(() => {
    updateTimer((timeRemaining -= 1000));
  }, 1000);

  btn.disabled = true;
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  if (ms <= 1000) {
    clearInterval(timerInterval);
    btn.disabled = false;
    iziToast.success({
      title: 'OK',
      message: 'Now you are done ✅',
      position: 'topCenter',
    });
  }

  // Update DOM elements
  day.textContent = days;
  hrs.textContent = hours;
  min.textContent = minutes;
  sec.textContent = seconds;
}
