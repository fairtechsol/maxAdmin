import { Button, Form } from "react-bootstrap";
import { MdOutlineLogin } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <Form
      className="auth-main text-center d-flex  justify-content-center"
      onSubmit={handleSubmit}
    >
      <div className="auth-box ">
        <img src="/logo.webp" alt="fairGame" />
        <div className="auth-box-form rounded-2 bg-light@ mt-3">
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
          <Button className="w-100" variant="primary" type="submit">
            Login <MdOutlineLogin />
          </Button>
        </div>
        <p className="text-white mt-3 mb-0 title-14">© MAXXBET7</p>
      </div>
    </Form>
  );
};

export default Login;
