import { Form } from "react-bootstrap";
import { MdOutlineLogin } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/commonComponent/button";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/admin/market-analysis");
  };

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
            <Form.Control type="email" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3 d-block">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {/* <Link className="btn btn-primary" to="/game">
            Login <MdOutlineLogin />
          </Link> */}
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
