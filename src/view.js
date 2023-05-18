import state from './state.js';

const input = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');

const renderForm = (i18next) => {
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger', 'text-success');
  feedback.textContent = '';
  if (!state.isValid) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
  } else {
    feedback.classList.add('text-success');
  }

  if (state.error === 'noError') {
    feedback.textContent = i18next.t('validUrl');
  } if (state.error === 'in-valid') {
    feedback.textContent = i18next.t('invalidUrl');
  } if (state.error === 'clone') {
    feedback.textContent = i18next.t('cloneUrl');
  }
};

export default renderForm;
