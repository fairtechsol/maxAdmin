import * as Yup from "yup";

export const newPasswordValidationSchema = Yup.object({
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), ""], "Passwords must match")
    .required("Password is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
