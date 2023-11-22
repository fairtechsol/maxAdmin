import { Form } from "react-bootstrap";

const CustomInput = (props: any) => {
  const {
    title,
    formInline,
    labelCol,
    inputCol,
    bgColor,
    errors,
    id,
    ...prop
  } = props;
  console.log(prop);
  return (
    <>
      <Form.Group
        className={`${props.customStyle} ${formInline ? "row" : ""}`}
        controlId="cityName w-100"
      >
        {title ? (
          <Form.Label className={`col-${formInline ? labelCol : ""}`}>
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        <Form.Control
          className={`col-${formInline ? inputCol : ""} bg-${bgColor}`}
          name={id}
          {...prop}
        />
      </Form.Group>
    </>
  );
};

export default CustomInput;
