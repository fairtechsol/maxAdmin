import { MatchType } from "../../../utils/enum";
import BetTableHeader from "../../commonComponent/betTableHeader";
import CustomBreadcrumb from "../../commonComponent/breadcrumb";
import BookmakerTable from "./bookMaker";
import MatchOdds from "./matchOdds";
import SessionMarketTable from "./sessionMarket";

interface BetTableProps {
  title: string;
  type: string;
  data: any;
}
const BetTable = ({ title, type, data }: BetTableProps) => {
  return (
    <>
      {type === MatchType.MATCH_ODDS ? (
        <CustomBreadcrumb
          items={[
            { name: "ICC Cricket World Cup" },
            { name: "ICC Cricket World Cup" },
            { name: "TOURNAMENT_WINNER  " },
            { name: "10/5/2023 2:00:00 PM" },
          ]}
        />
      ) : (
        <BetTableHeader customClass="my-2" title={title} />
      )}
      {type === MatchType.BOOKMAKER ? (
        <BookmakerTable data={data} />
      ) : type === MatchType.MATCH_ODDS ? (
        <MatchOdds data={data} />
      ) : (
        <SessionMarketTable data={data} />
      )}
    </>
  );
};

export default BetTable;
