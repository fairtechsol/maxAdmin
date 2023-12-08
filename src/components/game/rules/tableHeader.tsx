import "./style.scss";

interface Props {
  teamName: string;
}
const RuleTableheader = ({ teamName }: Props) => {
  return (
    <div className="RuleTableheader p-2">
      <h5 className="text-center title-16 fw-normal">{teamName}</h5>
      <div className="d-flex justify-content-between">
        <span className="title-14">Cards</span>
        <span className="title-14">Value</span>
      </div>
    </div>
  );
};

export default RuleTableheader;
