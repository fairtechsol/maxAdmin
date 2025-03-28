import React from "react";
import { Form } from "react-bootstrap";
import { numberInputOnWheelPreventChange } from "../../../helpers";
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
    style,
    disabled,
    required,
    customstyle,
    onClick,
    textAlign,
    ...prop
  } = props;

  const inlineStyle: React.CSSProperties = {
    textAlign: textAlign || "",
    ...style,
  };

  return (
    <>
      <Form.Group className={`${customstyle} ${formInline ? "row" : ""}`}>
        {title ? (
          <Form.Label
            className={`col-${formInline ? labelCol : ""} custom-label`}
          >
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
          onClick={onClick}
          isInvalid={!!errors}
          isValid={!errors}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default CustomInput;
