import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setExposureLimit } from "../../../../store/actions/user/userActions";
import { AppDispatch } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";
import { widthdrawAmountValidations } from "../../../../utils/fieldValidations/addAccount";


const initialValues: any = {
  userId: "",
  amount: "",
  createBy: "",
  transactionPassword: "",
};

const ExposureLimit = ({ setShow, userData }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: widthdrawAmountValidations,
    onSubmit: (values: any) => {
      try {
      let payload = {
        userId: userData?.id,
        amount: values.amount,
        transactionPassword: values.transactionPassword,
      };
      dispatch(setExposureLimit(payload));
      setShow(false);
      console.log(values, "exposerLimit");
      // setShow(false);
    } catch (e) {
      console.log(e);
    }
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
                  name="transactionPassword"
                  id="transactionPassword"
                  autoComplete="new-password"
                  value={values.transactionPassword}
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
