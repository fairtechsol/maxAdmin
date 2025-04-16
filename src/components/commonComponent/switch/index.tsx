import { FC, memo } from "react";
import { Form } from "react-bootstrap";

interface MySwitchProps {
  label: string;
  isChecked: boolean;
  onSwitchChange: (isChecked: boolean) => void;
}

const Switch: FC<MySwitchProps> = ({
  label,
  isChecked,
  onSwitchChange,
  ...props
}) => {
  const handleSwitchChange = () => {
    onSwitchChange(!isChecked);
  };

  return (
    <Form className="">
      <Form.Check
        type="switch"
        id="custom-switch"
        label={label}
        checked={isChecked}
        onChange={handleSwitchChange}
        {...props}
      />
    </Form>
  );
};

export default memo(Switch);
