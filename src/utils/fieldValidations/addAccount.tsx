import * as Yup from "yup";

export const addAccountValidationSchema: any = (item: any) => {
  return Yup.object({
    clientName: Yup.string()
      .required("Client Name is required")
      .test({
        name: "clientName",
        message: "Client Name already exists",
        test: async function (value: any) {
          if (value) {
            try {
              return !item;
            } catch (error: any) {
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
    userPassword: Yup.string().required("Password is required"),
    fullName: Yup.string().required("FullName is required"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("userPassword"), ""], "Passwords must match")
      .required("Password is required"),
    city: Yup.string().matches(
      /^[A-Za-z]+$/,
      "City Name must only contain letters"
    ),
    accountType: Yup.object().shape({
      value: Yup.string().required("Account Type is required"),
      label: Yup.string().required("Account Type is required"),
    }),
    // commissionDownPartnership: Yup.number()
    //   .min(0, 'Downline commission must be zero or greater')
    //   .required('Downline commission is required'),

    // ourCommissionPartnership: Yup.number()
    //   .min(0, 'Our commission must be zero or greater')
    //   .required('Our commission is required'),
    creditReference: Yup.number()
      .positive("Credit Reference must be a positive number")
      .min(0, "Credit Reference must be greater than or equal to 0")
      .required("Credit Reference is required"),
    // exposureLimit: Yup.number()
    //   .min(0, 'Credit Reference must be greater than or equal to 0')
    //   .positive('Exposure Limit must be a positive number').required("Exposure Limit is required"),
    minBet: Yup.number()
      .positive("Must be a positive number")
      .moreThan(0, "Must be greater than or equal to 0"),
    maxBet: Yup.number()
      .positive("Must be a positive number")
      ?.moreThan(0, "Must be greater than or equal to 0")
      ?.test(
        "maxBet",
        "Maximum bet must be greater than minimum bet",
        function (maxBet: any) {
          const { minBet } = this.parent;
          if (minBet !== undefined && minBet !== null) {
            return maxBet > minBet;
          }
          return true; // If minBet is not provided, the test passes
        }
      ),
    transactionPassword: Yup.string().required(
      "Transaction Password is required"
    ),
  });
};

export const depositAmountValidations = Yup.object({
  amount: Yup.string()
    .required("Amount is required")
    .min(0, "Amount must be zero or a positive number"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
export const widthdrawAmountValidations = Yup.object({
  amount: Yup.string()
    .required("Amount is required")
    .min(0, "Amount must be zero or a positive number"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
