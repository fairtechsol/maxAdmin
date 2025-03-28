import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavigateModal from "../../components/commonComponent/customModal";
import CustomInput from "../../components/commonComponent/input";
import { logout } from "../../store/actions/auth/authActions";
import {
  changePassword,
  changePasswordReset,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { oldPasswordValidationSchema } from "../../utils/fieldValidations/newPassword";

const initialValues: any = {
  newPassword: "",
  confirmPassword: "",
  transactionPassword: "",
};

const ChangePassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { transactionPassword, success } = useSelector(
    (state: RootState) => state.user.userList
  );
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: oldPasswordValidationSchema,
    onSubmit: (values: any) => {
      const payload = {
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        transactionPassword: values.transactionPassword,
      };
      dispatch(changePassword(payload));
    },
  });

  const { handleSubmit, getFieldProps, touched, errors } = formik;

  useEffect(() => {
    if (success) {
      dispatch(changePasswordReset());
      setShowModal(true);
    }
  }, [success]);
  return (
    <div className="px-3">
      <h5>Change Password</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <CustomInput
              required={true}
              id={"newPassword"}
              title={"New Password"}
              placeholder={""}
              type={"password"}
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
              required={true}
              id={"confirmPassword"}
              title={"Confirm Password"}
              placeholder={""}
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
              required={true}
              id={"transactionPassword"}
              title={"Transaction Password"}
              placeholder={""}
              type={"password"}
              customstyle={"mb-3"}
              {...getFieldProps("transactionPassword")}
              touched={touched.transactionPassword}
              errors={errors.transactionPassword}
            />
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {showModal && (
        <>
          <h3>Navigate to login</h3>
          <NavigateModal
            show={showModal}
            setShowModal={setShowModal}
            modalTitle="Your password has been changed sucessfully"
            functionDispatch={() => {
              dispatch(logout());
            }}
            buttonMessage={"Navigate To Login"}
            navigateTo={"/admin/login"}
            transactionMessage={transactionPassword?.transactionPassword}
          />
        </>
      )}
    </div>
  );
};

export default ChangePassword;
