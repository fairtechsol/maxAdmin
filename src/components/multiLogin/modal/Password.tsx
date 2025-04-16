import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordUserMultiLogin,
  resetMultiLoginSucess,
} from "../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import { oldPasswordValidationSchema } from "../../../utils/fieldValidations/newPassword";
import CustomButton from "../../commonComponent/button";
import CustomInput from "../../commonComponent/input";
import Loader from "../../commonComponent/loader";

const initialValues: any = {
  id: "any",
  newPassword: "",
  confirmPassword: "",
  createBy: "any",
  transactionPassword: "",
};

const Password = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { loading, success } = useSelector(
    (state: RootState) => state.user.multiLogin
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: oldPasswordValidationSchema,
    onSubmit: (values: any) => {
      let payload = {
        id: userData?.id,
        password: values?.confirmPassword,
        confirmPassword: values?.confirmPassword,
        transactionPassword: values?.transactionPassword,
      };
      dispatch(changePasswordUserMultiLogin(payload));
    },
  });

  const { handleSubmit, touched, errors, getFieldProps } = formik;

  useEffect(() => {
    if (success) {
      setShow(false);
      dispatch(resetMultiLoginSucess());
    }
  }, [success]);

  return (
    <>
      {loading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <Stack className="listClientModals" gap={0}>
          <div className="input-container">
            <Row>
              <Col sm={4}>
                <span style={{ fontSize: "0.9rem" }}>Password</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  required={true}
                  id="newPassword"
                  type="password"
                  customstyle="input-box"
                  {...getFieldProps("newPassword")}
                  touched={touched.newPassword}
                  errors={errors.newPassword}
                  textAlign="left"
                />
              </Col>
            </Row>
          </div>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span style={{ fontSize: "0.9rem" }}>Confirm Password</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  required={true}
                  id="confirmPassword"
                  type="password"
                  customstyle="input-box"
                  {...getFieldProps("confirmPassword")}
                  touched={touched.confirmPassword}
                  errors={errors.confirmPassword}
                  textAlign="left"
                />
              </Col>
            </Row>
          </div>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span style={{ fontSize: "0.9rem" }}>Transaction Password</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  required={true}
                  type="password"
                  customstyle="input-box"
                  id="transactionPassword"
                  {...getFieldProps("transactionPassword")}
                  touched={touched.transactionPassword}
                  errors={errors.transactionPassword}
                  textAlign="left"
                />
              </Col>
            </Row>
          </div>
        </Stack>
        <Modal.Footer className="border-0 mt-3">
          <div className="d-flex gap-2">
            <CustomButton
              className="d-flex gap-2 align-items-center"
              type="submit"
              disabled={loading}
            >
              Submit
              <IoMdExit />
            </CustomButton>
          </div>
        </Modal.Footer>
      </form>
    </>
  );
};

export default memo(Password);
