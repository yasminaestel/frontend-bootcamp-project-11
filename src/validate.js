import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import yupLocale from './locales/yupLocale.js';
import state from './state.js';
import renderForm from './view.js';

yup.setLocale(yupLocale);

const validateUrl = (url) => {
  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });
  return schema.validate({ url });
};

const i18nextInstance = i18next.createInstance();

const changeState = onChange(state, () => renderForm(i18nextInstance));
const input = document.querySelector('#url-input');

const handleSubmit = (event) => {
  const formData = new FormData(event.target);
  const url = formData.get('url');
  changeState.error = '';

  if (changeState.feeds.some((feed) => feed.url === url)) {
    changeState.isValid = false;
    changeState.error = 'duplicationUrl';
    renderForm(i18nextInstance);
    input.value = '';
    input.focus();
    return;
  }

  validateUrl(url)
    .then(() => {
      changeState.isValid = true;
      const feed = { url };
      changeState.error = 'noError';
      changeState.feeds.push(feed);
      renderForm(i18nextInstance);
      input.value = '';
      input.focus();
    })
    .catch(() => {
      changeState.isValid = false;
      changeState.error = 'in-valid';
      renderForm(i18nextInstance);
      input.value = '';
      input.focus();
    });
};

export {
  i18nextInstance,
  handleSubmit,
};
