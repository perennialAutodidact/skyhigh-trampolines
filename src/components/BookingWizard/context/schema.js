import { boolean, object, string } from "yup";
import { emailRegex } from "../../../constants";

export const bookingSchema = object().shape({
  date: string().required("Please select a date."),
});

export const step1Schema = object().shape({
  date: string().required("Please select a date."),
});

export const step2Schema = object().shape({
  productDataExists: boolean().oneOf(
    [true],
    "Please select a start time and at least one product in the same room."
  ),
});
export const step3Schema = object().shape({
  addOnsDataExists: boolean().oneOf(
    [true],
    "Please select at least one add on."
  ),
});
export const step4Schema = object().shape({
  fullName: string().required("Please enter your full name."),
  email: string()
    .required("Please enter an email address")
    .matches(emailRegex, "Please enter a valid email address."),
  address: string().required("Please enter an address."),
});
export const step5Schema = object().shape({
  waiverAgreed: boolean().oneOf([true], "Waiver must be agreed to.").required(),
  signatureImageData: string().required("Waiver must be signed."),
});
export const step6Schema = object().shape({});
