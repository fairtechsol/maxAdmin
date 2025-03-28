import { useFormik } from "formik";
import { useEffect, useState } from "react";
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

const Deposit = ({
  userData,
  setShow,
  userId,
  page,
  limit,
  userName,
  sort,
  order,
  activeTab,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [border, setBorder] = useState({
    amount: false,
    remark: false,
    Tpass: false,
  });
  const { userList, modalSuccess, loading } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: depositAmountValidations,
    onSubmit: (values: any) => {
      if (
        values?.amount === "" &&
        values?.remark === "" &&
        values?.transactionPassword === ""
      ) {
        setBorder({
          amount: true,
          remark: true,
          Tpass: true,
        });
        return;
      } else if (values?.amount === "") {
        setBorder((prevState) => ({
          ...prevState,
          amount: true,
        }));
        return;
      } else if (values?.remark === "") {
        setBorder((prevState) => ({
          ...prevState,
          remark: true,
        }));
        return;
      } else if (values?.transactionPassword === "") {
        setBorder((prevState) => ({
          ...prevState,
          Tpass: true,
        }));
        return;
      }
      try {
        let payload = {
          userId: userData?.id,
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          remark: values.remark,
          transactionType: "add",
        };
        dispatch(changeAmmountUser(payload));
      } catch (e) {
        console.log(e);
      }
    },
  });

  const { handleSubmit, getFieldProps, values, touched, errors } = formik;

  const handleAmountChange = (e: any) => {
    const newAmount = e.target.value;
    const initialBalance = parseFloat(formik.values.initialBalance);

    const updatedBalance = +initialBalance - +newAmount;
    const userBalance = parseFloat(formik.values.userBalance) + +newAmount;

    formik.setValues({
      ...formik.values,
      updatedBalance: +updatedBalance,
      userUpdatedBalance: +userBalance,
      amount: +newAmount,
    });
  };

  useEffect(() => {
    if (userList && userDetail) {
      formik.setValues({
        ...formik.values,
        userBalance: userData.balance,
        initialBalance: userDetail?.userBal?.currentBalance,
      });
    }
  }, [userList, userDetail]);

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

  const handleBlur = (val: any, type: string) => {
    setBorder((prevState) => ({
      ...prevState,
      [type]: val?.length === 0,
    }));
  };
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
                    type="number"
                    customstyle="input-box"
                    bgColor="gray"
                    min={0}
                    step="any"
                    disabled={true}
                    id="initialBalance"
                    {...getFieldProps("initialBalance")}
                  />
                  <CustomInput
                    customstyle="input-box"
                    bgColor="gray"
                    type="number"
                    min={0}
                    step="any"
                    disabled={true}
                    id="updatedBalance"
                    {...getFieldProps("updatedBalance")}
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
                    id="userBalance"
                    type="number"
                    customstyle="input-box"
                    bgColor="gray"
                    disabled={true}
                    step="any"
                    {...getFieldProps("userBalance")}
                  />
                  <CustomInput
                    id="userUpdatedBalance"
                    customstyle="input-box"
                    bgColor="gray"
                    type="number"
                    disabled={true}
                    step="any"
                    {...getFieldProps("userUpdatedBalance")}
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
                  customstyle="input-box"
                  type="number"
                  touched={touched.amount}
                  errors={errors.amount}
                  min={0}
                  step="any"
                  placeholder={"Amount"}
                  style={{
                    border: border?.amount ? "1px solid red" : "1px solid #000",
                  }}
                  onBlur={() => handleBlur(values.amount, "amount")}
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
                  id="remark"
                  type="textarea"
                  as="textarea"
                  rows={4}
                  placeholder={"Remark"}
                  customstyle="input-box"
                  touched={touched.remark}
                  errors={errors.remark}
                  {...getFieldProps("remark")}
                  textAlign="left"
                  style={{
                    border: border?.remark ? "1px solid red" : "1px solid #000",
                  }}
                  onBlur={() => handleBlur(values.remark, "remark")}
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
                  id="transactionPassword"
                  type="password"
                  customstyle="input-box"
                  touched={touched.transactionPassword}
                  errors={errors.transactionPassword}
                  {...getFieldProps("transactionPassword")}
                  textAlign="left"
                  style={{
                    border: border?.Tpass ? "1px solid red" : "1px solid #000",
                  }}
                  onBlur={() => handleBlur(values.transactionPassword, "Tpass")}
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

export default Deposit;
