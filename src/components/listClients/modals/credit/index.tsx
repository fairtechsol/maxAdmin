import { useFormik } from "formik";
import { memo, useEffect } from "react";
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
import Loader from "../../../commonComponent/loader";
import ModalFooter from "../footer";

const initialValues: any = {
  userId: "any",
  amount: "",
  creditRefrence: "",
  transactionPassword: "",
};

interface CreditProps {
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

const Credit = ({
  userData,
  setShow,
  userId,
  page,
  limit,
  userName,
  sort,
  order,
  activeTab,
}: CreditProps) => {
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

export default memo(Credit);
