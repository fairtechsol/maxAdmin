import * as Yup from "yup";

export const addAccountValidationSchema = Yup.object({
  clientName: Yup.string().required("Client Name is required"),
  userPassword: Yup.string().required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), ""], "Passwords must match")
    .required("Password is required"),
  // accountType: Yup.object().shape({
  //   value: Yup.string().required("Account Type is required"),
  //   label: Yup.string().required("Account Type is required"),
  // }),
  creditReference: Yup.string().required("Credit Reference is required"),
  exposureLimit: Yup.string().required("Exposure Limit is required"),
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
