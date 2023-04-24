import onChange from 'on-change';
import yup from 'yup';

const form = document.querySelector('#rss-form');
const urlInput = document.querySelector('#url-input');
const feeds = [];

const schema = yup.object().shape({
  url: yup.string().url().required(),
});

const state = {
  isValid: true,
};

const changeState = onChange(urlInput, () => {
  changeState.isValid = true;
  changeState.errorMessage = '';

  schema
    .validate({ url: urlInput.value })
    .then((validatedUrl) => {
      if (feeds.some((feed) => feed.url === validatedUrl)) {
        changeState.isValid = false;
        urlInput.classList.add('is-invalid');
      }
      urlInput.classList.remove('is-invalid');
      changeState.isValid = true;
    })
    .catch((error) => {
      urlInput.classList.add('is-invalid');
      state.isValid = false;
      throw error;
    });
});

const renderFeeds = (feeds) => {
  const feedsList = document.querySelector('#feeds-list');
  feedsList.innerHTML = '';

  feeds.forEach((feed) => {
    const feedItem = document.createElement('li');
    feedItem.classList.add('list-group-item');

    const feedTitle = document.createElement('h3');
    feedTitle.textContent = feed.title;

    const feedDescription = document.createElement('p');
    feedDescription.textContent = feed.description;

    const feedLink = document.createElement('a');
    feedLink.setAttribute('href', feed.link);
    feedLink.textContent = feed.link;

    feedItem.appendChild(feedTitle);
    feedItem.appendChild(feedDescription);
    feedItem.appendChild(feedLink);

    feedsList.appendChild(feedItem);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const url = formData.get('url');
  const feed = { url };
  feeds.push(feed);
  renderFeeds(feeds);
  urlInput.value = '';
  urlInput.focus();
});
