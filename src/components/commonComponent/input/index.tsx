import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = (props: any) => {
  const { title, ...prop } = props;
  return (
    <>
      <Form.Group className={`${props.customStyle}`} controlId="cityName">
        <Form.Label>{title}</Form.Label>
        <Form.Control {...prop} />
      </Form.Group>
    </>
  );
};

export default CustomInput;
