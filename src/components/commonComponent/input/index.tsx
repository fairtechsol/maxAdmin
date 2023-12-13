import { Form } from "react-bootstrap";
import CustomErrorMessage from "./CustomErrorMessage";

const CustomInput = (props: any) => {
  const {
    title,
    formInline,
    labelCol,
    inputCol,
    bgColor,
    errors,
    id,
    touched,
    disabled,
    ...prop
  } = props;
  return (
    <>
      <Form.Group className={`${props.customstyle} ${formInline ? "row" : ""}`}>
        {title ? (
          <Form.Label className={`col-${formInline ? labelCol : ""}`}>
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        <Form.Control
          disabled={disabled}
          className={`col-${formInline ? inputCol : ""} bg-${bgColor}`}
          name={id}
          {...prop}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default CustomInput;
