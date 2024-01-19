import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

const allFields = document.querySelector('.form');
const btnSubmit = document.querySelector('button[type="submit"]');

function clearForm() {
  allFields.reset();
}

allFields.addEventListener('submit', function (evt) {
  evt.preventDefault();

  btnSubmit.disabled = true;

  const firstDelayValue = Number(document.getElementsByName('delay')[0].value);
  const delayStepValue = Number(document.getElementsByName('step')[0].value);
  const amountValue = Number(document.getElementsByName('amount')[0].value);

  for (let i = 1; i <= amountValue; i++) {
    const delay = firstDelayValue + (i - 1) * delayStepValue;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: `✅ `,
          message: `Fulfilled promise ${position} in ${delay}ms`,
          position: 'center',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: `❌ `,
          message: `Rejected promise ${position} in ${delay}ms`,
          position: 'center',
        });
      });
  }
  setTimeout(() => {
    clearForm();
    btnSubmit.disabled = false;
  }, 10000);
});
