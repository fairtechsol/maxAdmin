import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import CustomInput from "../../components/commonComponent/input";
import {
  changePassword,
  changePasswordReset,
} from "../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { newPasswordValidationSchema } from "../../utils/fieldValidations/newPassword";
import { logout } from "../../store/actions/auth/authActions";
import NavigateModal from "../../components/commonComponent/customModal";


// interface Values {
//   newPassword: string;
//   confirmPassword: string;
//   transactionPassword: string;
// }

const initialValues: any = {
  oldPassword: "",
  newPassword: "",
  // confirmPassword: "",
  // transactionPassword: "",
};

const ChangePassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  // const navigate = useNavigate();
  const { transactionPassword, success } = useSelector((state: RootState) => state.user.userList);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: newPasswordValidationSchema,
    onSubmit: (values: any) => {
      const payload = {
        newPassword: values.newPassword,
        confirmPassword: values.newPassword,
        oldPassword: values.oldPassword,
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
      <h5>Change Password </h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <CustomInput
              id={"oldPassword"}
              title={"Old Password"}
              placeholder={"Old Password"}
              type={"password"}
              customstyle={"mb-3"}
              {...getFieldProps("oldPassword")}
              touched={touched.oldPassword}
              errors={errors.oldPassword}

            />
          </Col>
        </Row>
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
            functionDispatch={() => dispatch(logout())}
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
