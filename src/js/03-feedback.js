import lodashThrottle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', lodashThrottle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

restoresFormData();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log('Sended:', formData);

  formData = {};
}

function restoresFormData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return;
    }
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const entries = Object.entries(formData);

    entries.forEach(el => {
      const [key, value] = el;
      form[key].value = value;
    });
  } catch (error) {
    console.error(error.stack);
  }
}
