import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import _ from 'lodash';
import * as yup from 'yup';
import yupLocale from './locales/yupLocale.js';
import ru from './locales/ru.js';
import render from './view.js';
import parseData from './parseData.js';

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
      yup.setLocale(yupLocale);
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

      const downloadFeed = (url) => {
        const newUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`;
        return axios(newUrl)
          .then((response) => {
            const { data } = response;
            return data;
          })
          .catch((err) => {
            if (err.response) {
              throw new Error('downloadError');
            } else {
              throw new Error('networkError');
            }
          });
      };

      const validateUrl = (url) => {
        const schema = yup.object().shape({
          url: yup.string().url().required(),
        });

        return new Promise((resolve, reject) => {
          schema
            .validate({ url })
            .then(() => {
              resolve();
            })
            .catch((err) => {
              if (err.name === 'ValidationError' && err.path === 'url') {
                reject(new Error('invalidUrl'));
              } else {
                reject(err);
              }
            });
        });
      };

      const checkFeeds = () => {
        const feedPromises = changeState.links.map((link) => downloadFeed(link.url)
          .then((data) => parseData(data))
          .then((parsedData) => {
            const newFeed = changeState.feeds.find((feed) => feed.title === parsedData.title
              && feed.description === parsedData.description);
            if (!newFeed) {
              const feedToAdd = {
                id: _.uniqueId(),
                title: parsedData.title,
                description: parsedData.description,
              };
              changeState.feeds.push(feedToAdd);
            }

            const newItems = _.differenceBy(parsedData.parsedItems, changeState.items, 'title');

            const itemsToAdd = newItems.map((newItem) => ({
              id: _.uniqueId(),
              title: newItem.title,
              description: newItem.description,
              link: newItem.link,
              parentsFeed: link.id,
            }));
            changeState.items.push(...itemsToAdd);
          }));

        Promise.all(feedPromises)
          .then(() => {
            setTimeout(checkFeeds, 5000);
          });
      };

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

      const containerItems = document.querySelector('.posts');
      containerItems.addEventListener('click', (event) => {
        const { target } = event;
        const postId = target.getAttribute('data-id');
        const post = state.items.find((it) => it.id === postId);
        state.readLinks.push(post.id);
        const modalTitel = document.querySelector('.modal-title');
        modalTitel.textContent = post.title.replace(/<[^>]*>/g, '');
        const modalBody = document.querySelector('.modal-body');
        modalBody.textContent = post.description.replace(/<[^>]*>/g, '');
        const btnLink = document.querySelector('.btn-primary');
        btnLink.setAttribute('href', post.link);
      });
    });
};
