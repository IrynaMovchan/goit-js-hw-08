const throttle = require('lodash.throttle');

const formData = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
};

const STORAGE_KEY = 'feedback-form-state';

formData.form.addEventListener('input', throttle(onInputChange, 500));
formData.form.addEventListener('submit', onFormSubmit);

let message = {};
fillMessage();

function onInputChange(event) {
  message[event.target.name] = event.target.value;

  const messageStringify = JSON.stringify(message);
  localStorage.setItem(STORAGE_KEY, messageStringify);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(message);
  return (message = {});
}

function fillMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    message = JSON.parse(savedMessage);
    if (message.email) {
      formData.email.value = message.email;
    }
    if (message.message) {
      formData.textarea.value = message.message;
    }
  }
}
