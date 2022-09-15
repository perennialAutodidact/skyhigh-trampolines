import {string, number, object, mixed} from 'yup'

export const roomSchema = object().shape({
  name: string().required('Please enter a name.'),
  capacity: number().positive('Capacity must be greater than zero.').required('Please select a capacity.'),
  photo: mixed().required('Please select a photo.')
})