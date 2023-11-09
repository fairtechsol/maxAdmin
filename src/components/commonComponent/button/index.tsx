import { Button } from "react-bootstrap";

// interface props {
//     variant: string;
//     type: number;
//     percent: number;
//   }
function CustomButton(props: any) {
  return <Button {...props}> {props?.children} </Button>;
}

export default CustomButton;
