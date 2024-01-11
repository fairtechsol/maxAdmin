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
import { useLocation } from "react-router-dom";

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
  const { breadCrumb } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  const location = useLocation();
  return (
    <>
      {type === MatchType.MATCH_ODDS ? (
        <CustomBreadcrumb
          items={[
            { name: breadCrumb?.competition || matchDetails?.competitionName },
            { name: breadCrumb?.matchName || matchDetails?.title },
            {
              name:
                breadCrumb?.type ||
                (location.pathname.includes("match_details")
                  ? "Tied_Match"
                  : "Match_Odds"),
            },
            { name: breadCrumb?.date || matchDetails?.startAt },
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
          title={"Runners"}
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
