import * as Yup from "yup";

export const newPasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string().required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/, "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/, "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/, "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Password is required"),
  // transactionPassword: Yup.string().required(
  //   "Transaction Password is required"
  // ),
});

export const oldPasswordValidationSchema = Yup.object({
  // oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string().required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/, "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/, "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/, "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Password is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
