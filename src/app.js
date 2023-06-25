import onChange from 'on-change';
import i18next from 'i18next';
import ru from './locales/ru.js';
import validateUrl from './validate.js';
import render from './view.js';
import downloadFeed from './downloadFeed.js';
import checkFeeds from './checkFeeds.js';

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
      const input = document.querySelector('#url-input');
      const form = document.querySelector('.rss-form');

      const state = {
        isValid: true,
        links: [],
        error: '',
        feeds: [],
        items: [],
        readLinks: [],
      };

      const changeState = onChange(state, (path) => render(path, i18nextInstance, changeState));

      const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        const url = formData.get('url');
        changeState.error = '';

        if (changeState.links.some((link) => link.url === url)) {
          changeState.isValid = false;
          changeState.error = 'duplicationUrl';
          input.value = '';
          input.focus();
          return;
        }

        validateUrl(url)
          .then(() => {
            changeState.isValid = true;
            input.value = '';
            input.focus();
          })
          .then(() => downloadFeed(url, changeState))
          .then(() => {
            changeState.error = 'noError';
            changeState.links.push({ url });
            checkFeeds(changeState);
          })
          .catch((error) => {
            changeState.isValid = false;
            changeState.error = error.message.replace(/^Error:\s*/, '');
            input.focus();
          });
      };
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        changeState.error = '';
        handleSubmit(e);
      });
    });
};
