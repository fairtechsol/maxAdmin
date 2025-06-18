import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  accountListModalReset,
  changeAmmountUser,
  getUsers,
  getUsersProfile,
} from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { widthdrawAmountValidations } from "../../../../utils/fieldValidations/addAccount";
import CustomInput from "../../../commonComponent/input";
import Loader from "../../../commonComponent/loader";
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

interface WithdrawProps {
  userData: any;
  setShow: (val: boolean) => void;
  userId: string;
  page: number;
  limit: number;
  userName: string;
  sort: any;
  order: any;
  activeTab: any;
}

const Withdraw = ({
  userData,
  setShow,
  userId,
  page,
  limit,
  userName,
  sort,
  order,
  activeTab,
}: WithdrawProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { modalSuccess, loading } = useSelector(
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
      dispatch(
        getUsers({
          userId: userId,
          page: page,
          limit: limit,
          userName: userName,
          sort: sort,
          order: order,
          activeTab: activeTab,
        })
      );
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
                    customstyle="input-box"
                    bgColor="gray"
                    disabled={true}
                  />
                  <CustomInput
                    name="updatedBalance"
                    id="updatedBalance"
                    value={values.updatedBalance}
                    onChange={handleChange}
                    customstyle="input-box"
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
                    customstyle="input-box"
                    bgColor="gray"
                    disabled={true}
                  />
                  <CustomInput
                    name="userUpdatedBalance"
                    id="userUpdatedBalance"
                    value={values.userUpdatedBalance}
                    onChange={handleChange}
                    customstyle="input-box"
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
                <span>Amount</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  required={true}
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleAmountChange}
                  customstyle="input-box"
                  type="number"
                  min={0}
                  step="any"
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
                  customstyle="input-box"
                  textAlign="left"
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
                  required={true}
                  name="transactionPassword"
                  id="transactionPassword"
                  value={values.transactionPassword}
                  onChange={handleChange}
                  type="password"
                  customstyle="input-box"
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
            disabled={loading}
          />
        </Modal.Footer>
      </form>
    </>
  );
};

export default memo(Withdraw);
