import i18next from 'i18next';
import onChange from 'on-change';
import state from './state.js';
import validateUrl from './validate.js';
import renderForm from './view.js';
import ru from './locales/ru.js';

export default () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  })
    .then(() => {
      const changeState = onChange(state, () => renderForm(i18nextInstance));
      const form = document.querySelector('.rss-form');
      const input = document.querySelector('#url-input');

      const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        const url = formData.get('url');
        changeState.error = '';

        // Проверяем, что URL-адрес не дублируется
        if (changeState.feeds.some((feed) => feed.url === url)) {
          changeState.isValid = false;
          changeState.error = 'clone';
          renderForm(i18nextInstance);
          input.value = '';
          input.focus();
          return;
        }

        // Валидируем URL-адрес с помощью yup
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
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit(e);
      });
    });
};
