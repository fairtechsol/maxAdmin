import { Form } from "react-bootstrap";

const CustomInput = (props: any) => {
  const { title, customStyle, id, ...prop } = props;
  return (
    <>
      <Form.Group className={`${customStyle ?? ""}`} controlId={id}>
        <Form.Label>{title}</Form.Label>
        <Form.Control {...prop} />
      </Form.Group>
    </>
  );
};

export default CustomInput;
