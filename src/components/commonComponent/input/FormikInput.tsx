import { ErrorMessage, Field } from "formik";
import { Form } from "react-bootstrap";

const FormikInput = (props: any) => {
  const { title, formInline, labelCol, inputCol, id, ...prop } = props;
  return (
    <>
      <Form.Group className={`${props.customstyle} ${formInline ? "row" : ""}`}>
        {title ? (
          <Form.Label
            className={`col-${formInline ? labelCol : ""}`}
            htmlFor={id}
          >
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        <Field
          className={`col-${formInline ? inputCol : ""} form-control`}
          {...prop}
          name={id}
          autoComplete={"off"}
        />
        <ErrorMessage name={id} component="div" className="text-danger" />
      </Form.Group>
    </>
  );
};

export default FormikInput;
