import { object, string, mixed } from "yup";

export const productSchema = object().shape({
  name: string().min(1, "Please enter a name."),
  description: string().min(1, "Please enter a description."),
  price: string().min(1, "Please enter a price."),
  productType: string().min(1, "Please select a product type."),
  room: string().min(1, "Please select a room."),
  duration: string().min(1, "Please select a duration."),
  photo: mixed().required('Please select a photo.')
});
