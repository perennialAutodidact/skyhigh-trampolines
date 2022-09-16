import {object, string} from 'yup';

export const addOnSchema = object().shape({
  name: string().required('Please enter a name.'),
  price: string().required('Please enter a price.')
})