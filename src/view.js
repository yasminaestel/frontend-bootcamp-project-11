import onChange from 'on-change';
import state from './state.js';

const changeState = onChange(state, () => { });
const input = document.querySelector('#url-input');

const renderForm = () => {
  input.classList.remove('is-invalid');
  if (!changeState.isValid) {
    input.classList.add('is-invalid');
  }
};

export default renderForm;
