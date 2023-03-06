import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  username: Yup.string().required('Username field is required'),
  password: Yup.string().required('Password field is required'),
});
