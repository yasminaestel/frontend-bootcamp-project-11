import yupLocale from './yupLocale.js';

export default {
  yup: yupLocale,
  translation: {
    invalidUrl: 'Ссылка должна быть валидным URL',
    validUrl: 'RSS успешно загружен',
    duplicationUrl: 'RSS уже существует',
    downloadError: 'Не удалось загрузить ленту',
    notRss: 'Ресурс не содержит валидный RSS',
  },
};
