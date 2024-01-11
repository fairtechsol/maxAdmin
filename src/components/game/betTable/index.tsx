import { useSelector } from "react-redux";
import { MatchType } from "../../../utils/enum";
import { formattedMinMax } from "../../../utils/formatMinMax";
import BetTableHeader from "../../commonComponent/betTableHeader";
import CustomBreadcrumb from "../../commonComponent/breadcrumb";
import ApiSessionMarketTable from "./apiSessionMarket";
import BookmakerTable from "./bookMaker";
import MatchOdds from "./matchOdds";
import SessionMarketTable from "./sessionMarket";
import { RootState } from "../../../store/store";

interface BetTableProps {
  title: string;
  type: string;
  data: any;
  backLayCount?: number;
}
const BetTable = ({ title, type, data, backLayCount }: BetTableProps) => {
  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );

  console.log(data);
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
        <BookmakerTable
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.MATCH_ODDS ? (
        <MatchOdds
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.API_SESSION_MARKET ? (
        <ApiSessionMarketTable
          data={data}
          title={title}
          matchDetails={matchDetails}
        />
      ) : (
        <SessionMarketTable
          data={data}
          title={title}
          matchDetails={matchDetails}
        />
      )}
    </>
  );
};

export default BetTable;
