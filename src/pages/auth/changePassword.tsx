import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button,Form,} from "react-bootstrap";
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
import "./style.scss";
import { FgLogo } from "../../assets/images";

// interface Values {
//   newPassword: string;
//   confirmPassword: string;
//   transactionPassword: string;
// }

const initialValues: any = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
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
        confirmPassword: values.confirmPassword,
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
    <div >
     
      <Form
            className="auth-main text-center d-flex  justify-content-center"
       onSubmit={handleSubmit}>
      
        <div className="auth-box ">
        <img src={FgLogo} alt="fairGame"/>
        <div className="auth-box-form rounded-2 bg-light">
          <h2 className="auth-title text-center mb-4">Change Password</h2>
      
          <Form.Group  className="mb-3 d-block">
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
           </Form.Group>
      
          <Form.Group className="mb-3 d-block">
            <CustomInput
              id={"newPassword"}
              title={"New Password"}
              placeholder={"New Password"}
              type={"password"}
              customstyle={"mb-3"}
              {...getFieldProps("newPassword")}
              touched={touched.newPassword}
              errors={errors.newPassword}
            />
          </Form.Group>
      
          <Form.Group className="mb-3 d-block">
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
          </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Submit
        </Button>
    </div>
    <p className="text-white mt-3 mb-0 title-14">© MAXXBET7</p>
        </div>
      </Form>
      {showModal && (
        <>
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
