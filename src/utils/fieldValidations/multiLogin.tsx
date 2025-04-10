import * as Yup from "yup";

export const addMultiLoginAccountValidationSchema: any = (item: any) => {
  return Yup.object({
    userName: Yup.string()
      .required("Client Name is required")
      .test({
        name: "userName",
        message: "Client Name already exists",
        test: async function (value: any) {
          if (value) {
            try {
              return !item;
            } catch (error) {
              console.log(error);
            }
          }
          return true;
        },
      })
      .test({
        name: "noSpace",
        message: "Space is not allowed in Client Name",
        test: function (value: any) {
          return !/\s/.test(value);
        },
      }),
    password: Yup.string().required("Password is required"),
    transactionPassword: Yup.string().required("Transaction Code is required"),
    fullName: Yup.string()
      .required("FullName is required")
      .min(4, "The Full Name field must be at least 4 characters"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), ""],
        "The Confirm Password confirmation does not match"
      )
      .required("Password is required"),
    privileges: Yup.array()
      .of(
        Yup.object({
          id: Yup.string().required(),
          active: Yup.boolean(),
        })
      )
      .test({
        name: "privileges",
        message: "The Privileges field is required",
        test: async function (value: any) {
          return value.some((privilege: any) => privilege.active);
        },
      }),
  });
};
