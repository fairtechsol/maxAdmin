import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAmmountUser } from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";

const initialValues: any = {
  initialBalance: "",
  updatedBalance: "",
  userBalance: "",
  userUpdatedBalance: "",
  amount: "",
  remark: "",
  transactionPassword: "",
};

const Deposit = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { userList } = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        userId: userData.userId,
        amount: values.amount,
        transactionPassword: values.transactionPassword,
        remark: values.remark,
        transactionType: "add",
      };
      dispatch(changeAmmountUser(payload));
      setShow(false);
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  const handleAmountChange = (e: any) => {
    const newAmount = parseFloat(e.target.value);
    const initialBalance = parseFloat(formik.values.initialBalance);

    if (!isNaN(newAmount) && !isNaN(initialBalance)) {
      const updatedBalance = initialBalance - newAmount;
      const userBalance = parseFloat(formik.values.userBalance) + newAmount;

      formik.setValues({
        ...formik.values,
        updatedBalance: updatedBalance.toFixed(2),
        userUpdatedBalance: userBalance.toFixed(2),
        amount: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (userList) {
      formik.setValues({
        ...formik.values,
        userBalance: userData.balance,
        initialBalance: userList?.list[0]?.balance,
      });
    }
  }, [userList]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack className="listClientModals" gap={0}>
        <div className="input-container w-100">
          <Row>
            <Col sm={4}>
              <span>fmstr1</span>
            </Col>
            <Col sm={8}>
              <div className="d-flex gap-2 input-inner-container">
                <CustomInput
                  type="number"
                  name="initialBalance"
                  value={values.initialBalance}
                  onChange={handleChange}
                  customStyle="input-box"
                  bgColor="gray"
                  disabled={true}
                  id="initialBalance"
                />
                <CustomInput
                  name="updatedBalance"
                  value={values.updatedBalance}
                  onChange={handleChange}
                  customStyle="input-box"
                  bgColor="gray"
                  type="number"
                  disabled={true}
                  id="updatedBalance"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="input-container mt-3">
          <Row>
            <Col sm={4}>
              <span>Account</span>
            </Col>
            <Col sm={8}>
              <div className="d-flex gap-2 input-inner-container">
                <CustomInput
                  name="userBalance"
                  id="userBalance"
                  value={values.userBalance}
                  onChange={handleChange}
                  type="number"
                  customStyle="input-box"
                  bgColor="gray"
                  disabled={true}
                />
                <CustomInput
                  name="userUpdatedBalance"
                  id="userUpdatedBalance"
                  value={values.userUpdatedBalance}
                  onChange={handleChange}
                  customStyle="input-box"
                  bgColor="gray"
                  type="number"
                  disabled={true}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="input-container mt-3">
          <Row>
            <Col sm={4}>
              <span>Amount</span>
            </Col>
            <Col sm={8}>
              <CustomInput
                name="amount"
                id="amount"
                value={values.amount}
                onChange={handleAmountChange}
                customStyle="input-box"
                type="number"
              />
            </Col>
          </Row>
        </div>
        <div className="input-container mt-3">
          <Row>
            <Col sm={4}>
              <span>Remark</span>
            </Col>
            <Col sm={8}>
              <CustomInput
                name="remark"
                id="remark"
                value={values.remark}
                onChange={handleChange}
                type="textarea"
                as="textarea"
                rows={4}
                customStyle="input-box"
              />
            </Col>
          </Row>
        </div>

        <div className="input-container mt-3">
          <Row>
            <Col sm={4}>
              <span>Transition password</span>
            </Col>
            <Col sm={8}>
              <CustomInput
                name="transactionPassword"
                id="transactionPassword"
                value={values.transactionPassword}
                onChange={handleChange}
                type="password"
                customStyle="input-box"
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

export default Deposit;
