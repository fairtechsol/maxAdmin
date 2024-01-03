import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../store/actions/user/userActions";
import { AppDispatch } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";

const initialValues: any = {
  userid: "any",
  newPassword: "",
  createBy: "any",
  transactionPassword: "",
};

const Password = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    
    onSubmit: (values: any) => {
      let payload = {
        userid: userData.userId,
        newPassword: values?.newPassword,
        confirmPassword: values?.newPassword,
        transactionPassword: values?.transactionPassword,
      };
      dispatch(changePassword(payload));
      setShow(false);
      console.log(values, "change Passw");
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  useEffect(() => {
    if (userData) {
      formik.setValues({
        ...formik.values,
        initialBalance: userData?.balance,
      });
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack className="listClientModals" gap={0}>
        <div className="input-container">
          <Row>
            <Col sm={4}>
              <span>New Password</span>
            </Col>
            <Col sm={8}>
              <CustomInput
                name="newPassword"
                id="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                type="password"
                customStyle="input-box"
                bgColor="gray"
                disabled={true}
                // id="newPasswordInput"
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
                name="newPassword"
                id="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                type="password"
                customStyle="input-box"
                // id="confirmPasswordInput"
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
                type="password"
                customStyle="input-box"
                id="transactionPassword"
                value={values.transactionPassword}
                onChange={handleChange}
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
  );
};

export default Password;
