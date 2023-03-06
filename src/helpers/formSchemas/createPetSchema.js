import * as Yup from 'yup';

export const createPetValidation = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  name: Yup.string().required('Name is required'),
  tags: Yup.string().required('Tags is required'),
});
