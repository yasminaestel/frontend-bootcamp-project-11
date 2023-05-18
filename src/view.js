import onChange from 'on-change';
import state from './state.js';

const changeState = onChange(state, () => { });
const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const renderForm = () => {
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger');
  feedback.textContent = '';
  if (!changeState.isValid) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
  } else {
    feedback.classList.add('text-success');
    feedback.textContent = 'RSS успешно загружен';
  }
};

export default renderForm;
