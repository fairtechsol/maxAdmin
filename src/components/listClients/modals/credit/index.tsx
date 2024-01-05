import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCreditRefference } from "../../../../store/actions/user/userActions";
import { AppDispatch } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";

const initialValues: any = {
  userid: "any",
  amount: "",
  creditRefrence: "",
};

const Credit = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        userid: userData?.id,
        amount: values.amount,
      };
      dispatch(setCreditRefference(payload));
      setShow(false);
      console.log(values, "Credit REfer");
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

  return (
    <>
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
                  customStyle="input-box"
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
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleChange}
                  type="number"
                  customStyle="input-box"
                  // id="newCreditInput"
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
