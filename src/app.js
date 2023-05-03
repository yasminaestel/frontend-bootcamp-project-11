import i18next from 'i18next';
import * as yup from 'yup';
import state from './state.js';
import validateUrl from './validate.js';
import renderForm from './view.js';
import ru from './locales/ru.json';
import en from './locales/en.json';

export default () => {
  i18next.use().init({
    lng: 'en',
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });

  yup.setLocale({
    string: {
      url: i18next.t('invalidUrl'),
    },
    mixed: {
      required: i18next.t('requiredUrl'),
    },
  });

  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const url = formData.get('url');

    // Проверяем, что URL-адрес не дублируется
    if (state.feeds.some((feed) => feed.url === url)) {
      state.isValid = false;
      renderForm();
      input.value = '';
      input.focus();
      return;
    }

    // Валидируем URL-адрес с помощью yup
    validateUrl(url)
      .then(() => {
        state.isValid = true;
        // Добавляем фид в список
        const feed = { url };
        state.feeds.push(feed);
        renderForm();
        input.value = '';
        input.focus();
      })
      .catch(() => {
        state.isValid = false;
        renderForm();
        input.value = '';
        input.focus();
      });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(e);
  });
};
