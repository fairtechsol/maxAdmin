import * as Yup from "yup";

export const addAccountValidationSchema = Yup.object({
  clientName: Yup.string().required("Client Name is required"),
  userPassword: Yup.string().required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), ""], "Passwords must match")
    .required("Password is required"),
  fullName: Yup.string().required("Full Name is required"),
  city: Yup.string().required("City is required"),
  phoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  accountType: Yup.string().required("Account Type is required"),
  creditReference: Yup.string().required("Credit Reference is required"),
  exposureLimit: Yup.string().required("Exposure Limit is required"),
  minBet: Yup.string()
    .min(100, "Minimum bet amount should be 100 or more")
    .required("Min Bet amount is required"),
  maxBet: Yup.string().required("Max Bet amount is required"),
  delay: Yup.string().required("Delay is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
