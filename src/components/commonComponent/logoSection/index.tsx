import { MaxBet07Logo } from "../../../assets";

interface Props {
  height?: string;
  width?: string;
}
function LogoSection(props: Props) {
  return <span><img className="logo-sec" src={MaxBet07Logo} {...props} alt="MAXBET07" /></span>;
}

export default LogoSection;
