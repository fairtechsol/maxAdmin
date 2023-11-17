import { Form } from "react-bootstrap";

const CustomInput = (props: any) => {
  const { title, customClass, id, ...prop } = props;
  return (
    <Form.Group className={`mb-3 ${customClass ?? ""}`} controlId={id}>
      {title && <Form.Label>{title}</Form.Label>}
      <Form.Control {...prop} />
    </Form.Group>
  );
};

export default CustomInput;
