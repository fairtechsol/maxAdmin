import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAmmountUser } from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CustomInput from "../../../commonComponent/input";
import ModalFooter from "../footer";
import { depositAmountValidations } from "../../../../utils/fieldValidations/addAccount";

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

  const { userList } = useSelector((state: RootState) => state.user.userList);
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: depositAmountValidations,
    onSubmit: (values: any) => {
      try {
        let payload = {
          userId: userData?.id,
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          remark: values.remark,
          transactionType: "add",
        };
        dispatch(changeAmmountUser(payload));
        setShow(false);
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

  return (
    <>
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
                    customStyle="input-box"
                    bgColor="gray"
                    min={0}
                    disabled={true}
                    id="initialBalance"
                    {...getFieldProps("initialBalance")}
                  />
                  <CustomInput
                    customStyle="input-box"
                    bgColor="gray"
                    type="number"
                    min={0}
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
                    customStyle="input-box"
                    bgColor="gray"
                    disabled={true}
                    {...getFieldProps("userBalance")}
                  />
                  <CustomInput
                    id="userUpdatedBalance"
                    customStyle="input-box"
                    bgColor="gray"
                    type="number"
                    disabled={true}
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
                  customStyle="input-box"
                  type="number"
                  touched={touched.amount}
                  errors={errors.amount}
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
                  id="remark"
                  type="textarea"
                  as="textarea"
                  rows={4}
                  customStyle="input-box"
                  touched={touched.remark}
                  errors={errors.remark}
                  {...getFieldProps("remark")}
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
                  id="transactionPassword"
                  type="password"
                  customStyle="input-box"
                  touched={touched.transactionPassword}
                  errors={errors.transactionPassword}
                  {...getFieldProps("transactionPassword")}
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

export default Deposit;
