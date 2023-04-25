import onChange from 'on-change';
import state from './state.js';

const changeState = onChange(state, () => { });
const input = document.querySelector('#url-input');

const renderForm = () => {
  if (!changeState.isValid) {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
  }
};

export default renderForm;
