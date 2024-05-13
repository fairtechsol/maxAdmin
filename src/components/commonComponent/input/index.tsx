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
    required,
    customstyle,
    ...prop
  } = props;

  const inlineStyle: React.CSSProperties = {
    ...style,
  };
    return (
    <>
      <Form.Group className={`${customstyle} ${formInline ? "row" : ""}`}>
        {title ? (
          <Form.Label className={`col-${formInline ? labelCol : ""} custom-label`}>
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        <Form.Control
        required={required}
          disabled={disabled}
          autoComplete="new-password"
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
