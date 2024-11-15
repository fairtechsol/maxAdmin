import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { MdOutlineLogin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/commonComponent/button";
import { authReset, login } from "../../store/actions/auth/authActions";
import { AppDispatch, RootState } from "../../store/store";
import { loginValidationSchema } from "../../utils/fieldValidations/login";
import "./style.scss";
import { MaxBet07Logo } from "../../assets";

const initialValues: any = {
  userName: "",
  password: "",
  loginType: "admin",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: any) => {
      if (loading) {
        return;
      } else {
        dispatch(login(values));
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const { success, forceChangePassword, userRole, loginData } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (success) {
      localStorage.setItem("userRole", userRole);
      if (forceChangePassword) {
        localStorage.setItem(
          "forceChangePassword",
          JSON.stringify(forceChangePassword)
        );
        navigate("/admin/change-password");
      } else {
        if (loginData?.isBetExist) {
          navigate("/admin/market-analysis");
        } else {
          navigate(
            `/admin/active-inactive-user-list/${localStorage.getItem("uid")}`
          );
        }
      }
      dispatch(authReset());
    }
  }, [success]);

  return (
    <Form
      className="auth-main text-center d-flex  justify-content-center"
      onSubmit={handleSubmit}
    >
      <div className="auth-box ">
        <img src={MaxBet07Logo} alt="MAXBET07" />
        <div className="auth-box-form rounded-2 bg-light">
          <h2 className="auth-title text-center mb-4">Sign In</h2>
          <Form.Group className="mb-4 d-block">
            <Form.Control
              type="text"
              placeholder="Username"
              name="userName"
              id="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />

            {touched.userName && errors.userName && (
              <p style={{ color: "#fa1e1e", textAlign: "left" }}>
                {errors.userName as string}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-4 d-block">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {touched.password && errors.password && (
              <p style={{ color: "#fa1e1e", textAlign: "left" }}>
                {errors.password as string}
              </p>
            )}
          </Form.Group>
          <CustomButton className="w-100" variant="primary" type="submit">
            Login <MdOutlineLogin />
          </CustomButton>
        </div>
        <p className="text-white mt-3 mb-0 title-14">© MAXBET07</p>
      </div>
    </Form>
  );
};

export default Login;
