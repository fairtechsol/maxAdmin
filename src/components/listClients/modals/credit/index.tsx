import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  accountListModalReset,
  getUsers,
  getUsersProfile,
  setCreditRefference,
} from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";
import Loader from "../../../commonComponent/loader";

const initialValues: any = {
  userId: "any",
  amount: "",
  creditRefrence: "",
  transactionPassword: "",
};

const Credit = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { modalSuccess, loading } = useSelector(
    (state: RootState) => state.user.userList
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        userId: userData?.id,
        amount: values.amount,
        transactionPassword: values.transactionPassword,
      };
      dispatch(setCreditRefference(payload));
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  useEffect(() => {
    if (userData) {
      formik.setValues({
        ...formik.values,
        creditRefrence: userData?.creditRefrence,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (modalSuccess) {
      setShow(false);
      dispatch(getUsers());
      dispatch(getUsersProfile());
      dispatch(accountListModalReset());
    }
  }, [modalSuccess]);

  return (
    <>
      {loading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <Stack className="listClientModals" gap={0}>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>Old Credit</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  name="creditRefrence"
                  id="creditRefrence"
                  value={values.creditRefrence}
                  onChange={handleChange}
                  type="text"
                  customstyle="input-box"
                  bgColor="gray"
                  disabled={true}
                // id="oldCreditInput"
                />
              </Col>
            </Row>
          </div>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>New Credit</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  required={true}
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleChange}
                  type="number"
                  customstyle="input-box"
                  // id="newCreditInput"
                  min={0}
                />
              </Col>
            </Row>
          </div>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>Transaction password</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  required={true}
                  name="transactionPassword"
                  id="transactionPassword"
                  autoComplete="new-password"
                  value={values.transactionPassword}
                  onChange={handleChange}
                  type="password"
                  customstyle="input-box"
                  textAlign="left" 
                // id="transactionPasswordInput"
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

export default Credit;
