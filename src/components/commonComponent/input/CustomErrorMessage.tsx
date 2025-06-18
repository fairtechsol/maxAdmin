import { memo } from "react";

interface CustomErrorMessageProps {
  touched: any;
  errors: any;
}

const CustomErrorMessage = ({ touched, errors }: CustomErrorMessageProps) => {
  return (
    <>
      {touched && errors ? <div className="text-danger">{errors}</div> : null}
    </>
  );
};

export default memo(CustomErrorMessage);
