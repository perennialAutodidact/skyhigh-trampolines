import { boolean, object, string } from "yup";

export const bookingSchema = object().shape({
  date: string().required("Please select a date."),
});

export const step1Schema = object().shape({
  date: string().required("Please select a date."),
});

export const step2Schema = object().shape({
  productsAdded: boolean().oneOf(
    [true],
    "Please select at least one product."
  ),
});
export const step3Schema = object().shape({});
export const step4Schema = object().shape({});
export const step5Schema = object().shape({
  waiverAgreed: boolean().oneOf([true], "Waiver must be agreed to.").required(),
  signatureImageData: string().required("Waiver must be signed."),
});
export const step6Schema = object().shape({});
