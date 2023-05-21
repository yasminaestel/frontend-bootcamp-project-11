import i18next from 'i18next';

const yupLocale = {
  mixed: {
    default: i18next.t('yup:mixed.default'),
    required: i18next.t('yup:mixed.required'),
  },
  string: {
    email: i18next.t('yup:string.email'),
    url: i18next.t('yup:string.url'),
  },
};

export default yupLocale;
