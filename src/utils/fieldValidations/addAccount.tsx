import * as Yup from "yup";

export const addAccountValidationSchema = Yup.object({
  clientName: Yup.string().required("Client Name is required"),
  userPassword: Yup.string().required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), ""], "Passwords must match")
    .required("Password is required"),
  city: Yup.string().required("City Name is required"),
  // accountType: Yup.object().shape({
  //   value: Yup.string().required("Account Type is required"),
  //   label: Yup.string().required("Account Type is required"),
  // }),
  creditReference: Yup.number().positive('Credit Reference must be a positive number')
  .min(0, 'Credit Reference must be greater than or equal to 0')
  .required("Credit Reference is required"),
  exposureLimit: Yup.number()
  .min(0, 'Credit Reference must be greater than or equal to 0')
  .positive('Exposure Limit must be a positive number').required("Exposure Limit is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});

export const depositAmountValidations = Yup.object({
  amount: Yup.string().required("Amount is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
export const widthdrawAmountValidations = Yup.object({
  amount: Yup.string().required("Amount is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
