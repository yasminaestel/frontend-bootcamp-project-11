import onChange from 'on-change';
import uniqueId from 'lodash/uniqueId.js';
import i18next from 'i18next';
import ru from './locales/ru.js';
import validateUrl from './validate.js';
import state from './state.js';
import render from './view.js';
import downloadFeed from './downloadFeed.js';
import parsedData from './parseData.js';
import checkFeeds from './checkFeed.js';

export default () => {
  const i18nextInstance = i18next.createInstance();
  const changeState = onChange(state, (path) => render(path, i18nextInstance, changeState));
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
          .then((xmlData) => {
            const parserData = parsedData(xmlData, changeState);
            changeState.error = 'noError';
            changeState.links.push({ url });
            const newFeed = {
              id: uniqueId(),
              title: parserData.title,
              description: parserData.description,
            };
            changeState.feeds.push(newFeed);
            const newItem = parserData.parsedItems.map((item) => ({
              id: uniqueId(),
              title: item.title,
              description: item.description,
              link: item.link,
              parentsFeed: newFeed.id,
            }));
            changeState.items.push(...newItem);
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
    })
    .then(() => {
      checkFeeds(changeState);
    });
};
