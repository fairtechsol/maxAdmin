import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setExposureLimit } from "../../../../store/actions/user/userActions";
import { AppDispatch } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";

const initialValues: any = {
  userid: "",
  amount: "",
  createBy: "",
  transPassword: "",
};

const ExposureLimit = ({ setShow, userData }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        userid: userData.userId,
        amount: values.amount,
        transPassword: values.transPassword,
      };
      dispatch(setExposureLimit(payload));
      setShow(false);
      console.log(values, "exposerLimit");
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
    <>
      <form onSubmit={handleSubmit}>
        <Stack className="listClientModals" gap={0}>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>Old Limit</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  type="text"
                  customStyle="input-box"
                  bgColor="gray"
                  disabled={true}
                  id="oldLimitInput"
                />
              </Col>
            </Row>
          </div>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>New Limit</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleChange}
                  type="number"
                  customStyle="input-box"
                  // id="newLimitInput"
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
                  name="transPassword"
                  id="transPassword"
                  autoComplete="new-password"
                  value={values.transPassword}
                  onChange={handleChange}
                  type="password"
                  customStyle="input-box"
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

export default ExposureLimit;
