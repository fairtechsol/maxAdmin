import { Form } from "react-bootstrap";
import CustomErrorMessage from "./CustomErrorMessage";
import React from "react";
import { numberInputOnWheelPreventChange } from "../../../helpers";
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
    style,
    disabled,
    ...prop
  } = props;

  const inlineStyle: React.CSSProperties = {
    ...style,
  };
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
          onWheel={numberInputOnWheelPreventChange}
          {...prop}
          style={{ ...inlineStyle }}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default CustomInput;
