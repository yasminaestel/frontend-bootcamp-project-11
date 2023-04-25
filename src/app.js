import state from './state.js';
import validateUrl from './validate.js';
import renderForm from './view.js';

const form = document.querySelector('.rss-form');

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const url = formData.get('url');

  // Проверяем, что URL-адрес не дублируется
  if (state.feeds.some((feed) => feed.url === url)) {
    return;
  }

  // Валидируем URL-адрес с помощью yup
  validateUrl(url)
    .then(() => {
      // Добавляем фид в список
      const feed = { url };
      state.feeds.push(feed);

      // Обновляем интерфейс
      renderForm();
    })
    .catch(() => {
      state.isValid = false;
      renderForm();
    });
};

form.addEventListener('submit', handleSubmit);
