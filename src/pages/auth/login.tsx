import { Form } from "react-bootstrap";
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/commonComponent/button";
import "./style.scss";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../utils/fieldValidations/login";
import { useDispatch, useSelector } from "react-redux";
import { authReset, login } from "../../store/actions/auth/authActions";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";

const initialValues: any = {
  userName: "",
  password: "",
  loginType: "wallet",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: any) => {
      dispatch(login(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const { success, forceChangePassword, userRole } = useSelector(
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
        navigate("/change_password");
      } else {
        navigate("/admin/market-analysis");
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
        <img src="/logo.png" alt="fairGame" />
        <div className="auth-box-form rounded-2 bg-light">
          <h2 className="auth-title text-center mb-4">Sign In</h2>
          <Form.Group className="mb-3 d-block">
            <Form.Control
              type="text"
              placeholder="Username"
              name="userName"
              id="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {touched.userName && errors.userName && (
              <p style={{ color: "#fa1e1e" }}>{errors.userName as string}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 d-block">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {touched.password && errors.password && (
              <p style={{ color: "#fa1e1e" }}>{errors.password as string}</p>
            )}
          </Form.Group>
          <CustomButton className="w-100" variant="primary" type="submit">
            Login <MdOutlineLogin />
          </CustomButton>
        </div>
        <p className="text-white mt-3 mb-0 title-14">© MAXXBET7</p>
      </div>
    </Form>
  );
};

export default Login;
