import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Бібліотека очікує, що її ініціалізують на елементі input[type="text"],тому ми додали до HTML документу поле input#datetime-picker

// JS › Basic example
iziToast.show({
  title: 'Hey',
  message: 'What would you like to add?',
});
