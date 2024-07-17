import { MaxBet07Logo } from "../../../assets";

interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <img src={MaxBet07Logo} {...props} alt="MAXBET07" />;
}

export default LogoSection;
