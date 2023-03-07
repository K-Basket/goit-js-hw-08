// импорт библиотеки lodash throttle (https://www.npmjs.com/package/lodash.throttle)
import lodashThrottle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', lodashThrottle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

restoresFormData();

function onFormInput(evt) {
  const formData = {};
  // добавляет свойства (ключ и значение) в объект данных формы
  formData[evt.target.name] = evt.target.value;
  // записывает  данные в web-хранилище Local Storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  // отмена дефолтных настроек
  evt.preventDefault();
  // Очистить форму после отправки
  evt.currentTarget.reset();
  // Очистить web-хранилище
  localStorage.removeItem(STORAGE_KEY);
}

function restoresFormData() {
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (formData) {
    // деструктуризация св-в объекта с пустыми дефолтными значениями
    const { email = '', message = '' } = formData;

    input.value = email;
    textarea.value = message;
  }
}
