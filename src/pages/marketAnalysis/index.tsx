import { useDispatch, useSelector } from "react-redux";
import MarketAnalysisComp from "../../components/marketAnalysis";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getMarketAnalysis } from "../../store/actions/match/matchAction";
import { FaSync } from "react-icons/fa";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { ApiConstants } from "../../utils/Constants";

const MarketAnalysis = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { marketAnalysisDetail, loading } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );

  const [filteredDetail, setFilteredDetail] = useState<any>([]);

  const handleInputchange = (event: any) => {
    const query = event.target.value;
    let filteredVal = marketAnalysisDetail?.filter((item: any) =>
      item?.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDetail(filteredVal);
  };

  useEffect(() => {
    try {
      if (state?.userId) {
        dispatch(
          getMarketAnalysis({
            url: `${ApiConstants.MATCH.MARKETANALYSIS}?userId=${state?.userId}&matchId=${state?.matchId}`,
          })
        );
      } else {
        setTimeout(() => {
          dispatch(
            getMarketAnalysis({ url: ApiConstants.MATCH.MARKETANALYSIS })
          );
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  }, [state, dispatch]);

  return (
    <div className="px-3 lh-1">
      <div className="d-flex justify-content-between">
        <h3 className="fw-normal title-22">
          Market Analysis{" "}
          <FaSync
            onClick={() =>
              dispatch(
                getMarketAnalysis({
                  url: state?.userId
                    ? `${ApiConstants.MATCH.MARKETANALYSIS}?userId=${state?.userId}&matchId=${state?.matchId}`
                    : ApiConstants.MATCH.MARKETANALYSIS,
                })
              )
            }
            size={15}
            cursor={"pointer"}
            className={loading ? "rotate" : ""}
          />
        </h3>
        <input
          placeholder="Search event"
          id="searchEvent"
          name="searchEvent"
          onChange={handleInputchange}
        />
      </div>
      {(filteredDetail?.length > 0
        ? filteredDetail
        : marketAnalysisDetail
      )?.map((match: any) => (
        <MarketAnalysisComp match={match} />
      ))}
    </div>
  );
};

export default MarketAnalysis;
