import * as yup from 'yup';
import yupLocale from './locales/yupLocale.js';

yup.setLocale(yupLocale);

const validateUrl = (url) => {
  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });
  return schema.validate({ url }).catch(() => { throw new Error('in-valid'); });
};

export default validateUrl;
