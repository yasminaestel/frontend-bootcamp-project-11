const renderForm = (i18next, state) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');
  input.classList.remove('is-invalid');
  feedback.classList.remove('text-danger', 'text-success');
  feedback.textContent = '';

  if (!state.isValid) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
  } else {
    feedback.classList.add('text-success');
  }

  if (state.error === 'noError') {
    feedback.textContent = i18next.t('validUrl');
  } else if (state.error === 'in-valid') {
    feedback.textContent = i18next.t('invalidUrl');
  } else if (state.error === 'duplicationUrl') {
    feedback.textContent = i18next.t('duplicationUrl');
  } else if (state.error === 'downloadError') {
    feedback.textContent = i18next.t('downloadError');
  } else if (state.error === 'notRss') {
    feedback.textContent = i18next.t('notRss');
  } else if (state.error === 'networkError') {
    feedback.textContent = i18next.t('networkError');
  }
};

const renderFeeds = (feeds) => {
  const containerFeeds = document.querySelector('.feeds');
  containerFeeds.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  containerFeeds.append(card);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardBody.append(cardTitle);
  cardTitle.textContent = 'Фиды';
  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(listGroup);

  feeds.forEach((feed) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
    listGroup.append(listGroupItem);
    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    listGroupItem.append(title);
    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    listGroupItem.append(description);
    title.textContent = feed.title;
    description.textContent = feed.description;
  });
};

const renderItems = (items) => {
  const containerItems = document.querySelector('.posts');
  containerItems.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  containerItems.append(card);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardBody.append(cardTitle);
  cardTitle.textContent = 'Посты';
  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  card.append(listGroup);

  items.forEach((array) => {
    array.forEach((item) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      listGroup.append(listGroupItem);
      const link = document.createElement('a');
      link.setAttribute('href', item.link);
      link.classList.add('fw-bold');
      link.setAttribute('data-id', item.parentsFeed);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      listGroupItem.append(link);
      link.textContent = item.link;
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('data-id', item.parentsFeed);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      listGroupItem.append(button);
      button.textContent = 'Просмотр';
    });
  });
};

const render = (path, i18next, state) => {
  if (path === 'error') {
    renderForm(i18next, state);
  } if (path === 'feeds') {
    renderFeeds(state.feeds);
  } if (path === 'items') {
    renderItems(state.items);
  }
};

export default render;
