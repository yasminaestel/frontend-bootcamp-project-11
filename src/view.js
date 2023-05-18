import onChange from 'on-change';
import state from './state.js';

const changeState = onChange(state, () => { });
const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const renderForm = () => {
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger', 'text-success');
  feedback.textContent = '';
  if (!changeState.isValid) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
  } else {
    feedback.classList.add('text-success');
  }
  if (changeState.error === '') {
    feedback.textContent = 'RSS успешно загружен';
  } if (changeState.error === 'in-valid') {
    feedback.textContent = 'Ссылка должна быть валидным URL';
  } if (changeState.error === 'clone') {
    feedback.textContent = 'RSS уже существует';
  }
};

export default renderForm;
