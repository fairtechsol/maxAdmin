import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  accountListModalReset,
  changeAmmountUser,
  getUsers,
  getUsersProfile,
} from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";
import { widthdrawAmountValidations } from "../../../../utils/fieldValidations/addAccount";
import Loader from "../../../commonComponent/loader";

const initialValues: any = {
  initialBalance: "",
  updatedBalance: "",
  userBalance: "",
  userUpdatedBalance: "",
  amount: "",
  remark: "",
  transactionPassword: "",
};

const Withdraw = ({ userData, setShow }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { modalSuccess,loading } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: widthdrawAmountValidations,
    onSubmit: (values: any) => {
      try {
        let payload = {
          userId: userData?.id,
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          remark: values.remark,
          transactionType: "withDraw",
        };
        dispatch(changeAmmountUser(payload));
      } catch (e) {
        console.log(e);
      }
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  const handleAmountChange = (e: any) => {
    const newAmount = e.target.value;
    const initialBalance = parseFloat(formik.values.initialBalance);

    if (!isNaN(newAmount) && !isNaN(initialBalance)) {
      const updatedBalance = +initialBalance + +newAmount;
      const userBalance = parseFloat(formik.values.userBalance) - +newAmount;

      formik.setValues({
        ...formik.values,
        updatedBalance: +updatedBalance,
        userUpdatedBalance: +userBalance,
        amount: +newAmount,
      });
    }
  };

  useEffect(() => {
    if (userData && userDetail) {
      formik.setValues({
        ...formik.values,
        initialBalance: userDetail?.userBal?.currentBalance,
        userBalance: userData?.balance,
      });
    }
  }, [userData, userDetail]);

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
          <div className="input-container w-100">
            <Row>
              <Col sm={4}>
                <span>{userDetail?.userName}</span>
              </Col>
              <Col sm={8}>
                <div className="d-flex gap-2 input-inner-container">
                  <CustomInput
                    name="initialBalance"
                    id="initialBalance"
                    value={values.initialBalance}
                    onChange={handleChange}
                    type="text"
                    customStyle="input-box"
                    bgColor="gray"
                    disabled={true}
                  />
                  <CustomInput
                    name="updatedBalance"
                    id="updatedBalance"
                    value={values.updatedBalance}
                    onChange={handleChange}
                    customStyle="input-box"
                    bgColor="gray"
                    type="text"
                    disabled={true}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>{userData?.userName}</span>
              </Col>
              <Col sm={8}>
                <div className="d-flex gap-2 input-inner-container">
                  <CustomInput
                    name="userBalance"
                    id="userBalance"
                    value={values.userBalance}
                    onChange={handleChange}
                    type="text"
                    customStyle="input-box"
                    bgColor="gray"
                    disabled={true}
                    // value={2}
                    // id="accountInput1"
                  />
                  <CustomInput
                    name="userUpdatedBalance"
                    id="userUpdatedBalance"
                    value={values.userUpdatedBalance}
                    onChange={handleChange}
                    customStyle="input-box"
                    bgColor="gray"
                    type="text"
                    disabled={true}
                    // value={2}
                    // id="accountInput2"
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
                  min={0}
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
    </>
  );
};

export default Withdraw;
