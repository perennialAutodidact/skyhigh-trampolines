import { boolean, object, string } from "yup";

export const bookingSchema = object().shape({
  date: string().required("Please select a date."),
});

export const step1Schema = object().shape({
  date: string().optional(), //.required("Please select a date."),
});

export const step2Schema = object().shape({});
export const step3Schema = object().shape({});
export const step4Schema = object().shape({});
export const step5Schema = object().shape({
  waiverSigned: boolean()
    .oneOf([true], "Waiver must be completed to continue.")
    .required(),
});
export const step6Schema = object().shape({});
