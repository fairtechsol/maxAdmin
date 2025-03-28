import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../store/store";
import { MatchType } from "../../../utils/enum";
import { formattedMinMax } from "../../../utils/formatMinMax";
import BetTableHeader from "../../commonComponent/betTableHeader";
import CustomBreadcrumb from "../../commonComponent/breadcrumb";
import ApiSessionMarketTable from "./apiSessionMarket";
import BookmakerTable from "./bookMaker";
import CricketCasinoMarketTable from "./cricketCasinoMarket";
import MatchOdds from "./matchOdds";
import QuickBookmakerTable from "./quickBookmaker";
import SessionMarketTable from "./sessionMarket";

interface BetTableProps {
  title: string;
  type: string;
  data: any;
  backLayCount?: number;
  teamYesNo?: boolean;
  sessionType?: any;
}
const BetTable = ({
  title,
  type,
  data,
  backLayCount,
  teamYesNo,
  sessionType,
}: BetTableProps) => {
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
        <>
          <CustomBreadcrumb
            items={[
              {
                name: breadCrumb?.competition || matchDetails?.competitionName,
              },
              { name: breadCrumb?.matchName || matchDetails?.title },
              {
                name:
                  breadCrumb?.type ||
                  (location.pathname.includes("match_details")
                    ? "tied_match"
                    : "Match Odd"),
              },
              { name: breadCrumb?.date || matchDetails?.startAt },
            ]}
            matchType={matchDetails?.matchType}
          />
          <BetTableHeader type={""} customClass="" title={title} />
        </>
      ) : (
        <>
          <BetTableHeader type={""} customClass="mt-2" title={title} />
        </>
      )}

      {type === MatchType.BOOKMAKER ? (
        <BookmakerTable
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
          teamYesNo={teamYesNo}
        />
      ) : type === MatchType.QUICKBOOKMAKER ? (
        <QuickBookmakerTable
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
          teamYesNo={teamYesNo}
        />
      ) : type === MatchType.MATCH_ODDS ? (
        <MatchOdds
          title={""}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.API_SESSION_MARKET ? (
        <ApiSessionMarketTable
          data={data}
          title={title}
          matchDetails={matchDetails}
          sessionType={sessionType}
        />
      ) : type === MatchType.CRICKET_CASINO_SESSION_MARKET ? (
        <CricketCasinoMarketTable
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
