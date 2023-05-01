import state from './state.js';
import validateUrl from './validate.js';
import renderForm from './view.js';

export default () => {
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
