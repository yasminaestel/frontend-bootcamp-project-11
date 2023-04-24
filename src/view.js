const urlInput = document.querySelector('#url-input');

export default (isValid) => {
  if (isValid) {
    urlInput.classList.remove('is-invalid');
  } else {
    urlInput.classList.add('is-invalid');
  }
};
