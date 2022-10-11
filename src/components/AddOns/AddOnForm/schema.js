import { object, string, mixed } from "yup";

export const addOnSchema = object().shape({
  name: string().required("Please enter a name."),
  price: string().required("Please enter a price."),
  photo: mixed().required("Please select a photo."),
});
