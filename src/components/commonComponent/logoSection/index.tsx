import { MaxLogo } from "../../../assets/images";

interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src={MaxLogo} {...props} alt="fairGame" />;
}

export default LogoSection;
