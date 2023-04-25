import yup from 'yup';

const validateUrl = (url) => {
  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });
  return schema.validate({ url });
};

export default validateUrl;
