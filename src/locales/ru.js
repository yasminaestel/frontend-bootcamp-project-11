import yupLocale from './yupLocale.js';

export default {
  yup: yupLocale,
  translation: {
    invalidUrl: 'Ссылка должна быть валидным URL',
    validUrl: 'RSS успешно загружен',
    duplicationUrl: 'RSS уже существует',
    downloadError: '404: невозможно найти данные',
    notRss: 'Ресурс не содержит валидный RSS',
    networkError: 'Ошибка сети',
    emptyRequest: 'Не должно быть пустым',
  },
};
