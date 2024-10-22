import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";
import { oldPasswordValidationSchema } from "../../../../utils/fieldValidations/newPassword";
import Loader from "../../../commonComponent/loader";

const initialValues: any = {
  userid: "any",
  newPassword: "",
  confirmPassword: "",
  createBy: "any",
  transactionPassword: "",
};

const Password = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector(
    (state: RootState) => state.user.userList
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: oldPasswordValidationSchema,
    onSubmit: (values: any) => {
      let payload = {
        userId: userData?.id,
        newPassword: values?.newPassword,
        confirmPassword: values?.confirmPassword,
        transactionPassword: values?.transactionPassword,
      };
      dispatch(changePassword(payload));
      setShow(false);
    },
  });

  const { handleSubmit, touched, errors, getFieldProps } = formik;

  useEffect(() => {
    if (userData) {
      formik.setValues({
        ...formik.values,
        initialBalance: userData?.balance,
      });
    }
  }, [userData]);

  return (
    <>
      {loading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <Stack className="listClientModals" gap={0}>
          <div className="input-container">
            <Row>
              <Col sm={4}>
                <span>New Password</span>
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
                <span>Confirm Password</span>
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
                <span>Transaction Password</span>
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
          <ModalFooter
            clickHandler={() => {
              setShow(false);
            }}
          />
        </Modal.Footer>
      </form>
    </>
  );
};

export default Password;
