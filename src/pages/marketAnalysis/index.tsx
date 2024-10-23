import { useDispatch, useSelector } from "react-redux";
import MarketAnalysisComp from "../../components/marketAnalysis";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getMarketAnalysis } from "../../store/actions/match/matchAction";
import { FaSync } from "react-icons/fa";
import "./style.scss";

const MarketAnalysis = () => {
  const dispatch: AppDispatch = useDispatch();

  const { marketAnalysisDetail, loading } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );

  useEffect(() => {
    dispatch(getMarketAnalysis({}));
  }, []);
  return (
    <>
      <div className="px-3">
        <h3 className="fw-normal title-22">
          Market Analysis{" "}
          <FaSync
            onClick={() => dispatch(getMarketAnalysis({}))}
            size={15}
            cursor={"pointer"}
            className={loading ? "rotate" : ""}
          />
        </h3>
        {marketAnalysisDetail?.map((match: any) => (
          <MarketAnalysisComp match={match} />
        ))}
      </div>
    </>
  );
};

export default MarketAnalysis;
