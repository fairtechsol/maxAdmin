import { FgLogo } from "../../../assets/images";

interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src={FgLogo} {...props} alt="fairGame" />;
}

export default LogoSection;
