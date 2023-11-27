import BetTableHeader from "../../commonComponent/betTableHeader";
import RuleTable from "./table";
import RuleTableheader from "./tableHeader";

const Rules = () => {
  return (
    <div>
      <BetTableHeader customClass="my-2" title="Rules" />
      <RuleTableheader />
      <RuleTable />
    </div>
  );
};

export default Rules;
