import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  accountListModalReset,
  getUsers,
  getUsersProfile,
  setExposureLimit,
} from "../../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { widthdrawAmountValidations } from "../../../../utils/fieldValidations/addAccount";
import CustomInput from "../../../commonComponent/input";
import Loader from "../../../commonComponent/loader";
import ModalFooter from "../footer";

const initialValues: any = {
  userId: "",
  userData: "",
  amount: "",
  createBy: "",
  transactionPassword: "",
};

const ExposureLimit = ({
  setShow,
  userData,
  userId,
  page,
  limit,
  userName,
  sort,
  order,
  activeTab,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { modalSuccess, loading } = useSelector(
    (state: RootState) => state.user.userList
  );

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
        oldLimit: userData?.exposureLimit,
      });
    }
  }, [userData]);

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
          <div className="input-container mt-3">
            <Row>
              <Col sm={4}>
                <span>Old Limit</span>
              </Col>
              <Col sm={8}>
                <CustomInput
                  type="text"
                  customstyle="input-box"
                  bgColor="gray"
                  disabled={true}
                  id="oldLimitInput"
                  value={values.oldLimit}
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
                  required={true}
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleChange}
                  type="number"
                  customstyle="input-box"
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

export default memo(ExposureLimit);
