import yupLocale from './locales/yupLocale.js';
import { i18nextInstance, handleSubmit } from './validate.js';

export default () => {
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru: {
        yup: yupLocale,
        translation: {
          invalidUrl: 'Ссылка должна быть валидным URL',
          validUrl: 'RSS успешно загружен',
          duplicationUrl: 'RSS уже существует',
        },
      },
    },
  })
    .then(() => {
      const form = document.querySelector('.rss-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit(e);
      });
    });
};
