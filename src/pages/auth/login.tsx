import { Button, Form } from "react-bootstrap";
import { MdOutlineLogin } from "react-icons/md";
import "./style.css";

const Login = () => {
  return (
    <Form className="login-main text-center d-flex  justify-content-center">
      <div className="login-box ">
        <img src="/logo.webp" alt="fairGame" />
        <div className="p-5 rounded-2 bg-white">
          <Form.Group className="mb-3 d-block">
            <Form.Control type="email" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3 d-block">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="w-100" variant="success" type="submit">
            Login <MdOutlineLogin />
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Login;
