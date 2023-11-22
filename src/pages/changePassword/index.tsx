import { useFormik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/commonComponent/input";
import { newPasswordValidationSchema } from "../../utils/fieldValidations/newPassword";

interface Values {
  newPassword: string;
  confirmPassword: string;
  transactionPassword: string;
}

const initialValues = {
  newPassword: "",
  confirmPassword: "",
  transactionPassword: "",
};

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: newPasswordValidationSchema,
    onSubmit: (values: Values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  return (
    <>
      <h5>Change Password</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <CustomInput
              id={"newPassword"}
              title={"New Password"}
              placeholder={"New Password"}
              type={"text"}
              customstyle={"mb-3"}
              {...getFieldProps("newPassword")}
              touched={touched.newPassword}
              errors={errors.newPassword}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <CustomInput
              id={"confirmPassword"}
              title={"Confirm Password"}
              placeholder={"Confirm Password"}
              type={"password"}
              customstyle={"mb-3"}
              {...getFieldProps("confirmPassword")}
              touched={touched.confirmPassword}
              errors={errors.confirmPassword}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <CustomInput
              id={"transactionPassword"}
              title={"Transaction Password:"}
              placeholder={"Transaction Password"}
              type={"password"}
              customstyle={"mb-3"}
              {...getFieldProps("transactionPassword")}
              touched={touched.transactionPassword}
              errors={errors.transactionPassword}
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Load
        </Button>
      </Form>
    </>
  );
};

export default ChangePassword;
