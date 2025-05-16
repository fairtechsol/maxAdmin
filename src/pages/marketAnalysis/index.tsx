import { memo, useEffect, useState } from "react";
import { FaSync } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MarketAnalysisComp from "../../components/marketAnalysis";
import {
  getMarketAnalysis,
  resetMarketAnalysys,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants } from "../../utils/Constants";
import "./style.scss";

const MarketAnalysis = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { marketAnalysisDetail, loading } = useSelector(
    (state: RootState) => state.match.marketAnalysis
  );

  const permissions: any = localStorage.getItem("permissions");
  const parsedPermissions = JSON.parse(permissions);

  const [filteredDetail, setFilteredDetail] = useState<any>([]);

  const handleInputchange = (event: any) => {
    const query = event.target.value;
    let filteredVal = marketAnalysisDetail?.filter((item: any) =>
      item?.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDetail(filteredVal);
  };

  useEffect(() => {
    if (!parsedPermissions || parsedPermissions?.marketAnalysis) {
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
      return () => {
        dispatch(resetMarketAnalysys());
      };
    } else navigate("/admin/404");
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
            cursor="pointer"
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
        <MarketAnalysisComp key={match?.matchId} match={match} />
      ))}
    </div>
  );
};

export default memo(MarketAnalysis);
