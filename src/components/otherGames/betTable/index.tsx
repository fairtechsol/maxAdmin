import { useSelector } from "react-redux";
import { MatchType } from "../../../utils/enum";
import { formattedMinMax } from "../../../utils/formatMinMax";
// import BetTableHeader from "../../commonComponent/betTableHeader";
import CustomBreadcrumb from "../../commonComponent/breadcrumb";
import BookmakerTable from "./bookMaker";
import MatchOdds from "./matchOdds";
import { RootState } from "../../../store/store";
import OverUnderMarket from "./overUnder";
import SetWinner from "./setWinner";
import HTFTMarketTable from "./htftmarket";
import BetTableHeader from "../../commonComponent/betTableHeader";
import Tournament from "./tournament";

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

  return (
    <>
      <CustomBreadcrumb
        items={[{ name: breadCrumb?.matchName || matchDetails?.title }]}
      />
      <BetTableHeader type={""} customClass="mt-2" title={title} />
      {type === MatchType.BOOKMAKER ? (
        <BookmakerTable
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.MATCH_ODDS ? (
        <MatchOdds
          title={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.TOURNAMENT ? (
        <Tournament
          title={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : type === MatchType.UNDER_OVER ? (
        <OverUnderMarket
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
          title={title}
        />
      ) : type === MatchType.SET_WINNER ? (
        <SetWinner
          minMax={formattedMinMax(data?.minBet, data?.maxBet)}
          data={data}
          backLayCount={backLayCount}
          matchDetails={matchDetails}
        />
      ) : (
        <HTFTMarketTable
        //   data={data}
        //   title={title}
        //   matchDetails={matchDetails}
        />
      )}
    </>
  );
};

export default BetTable;
