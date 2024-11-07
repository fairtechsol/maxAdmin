import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GameHeader from "../../components/game/gameHeader";
import { MatchType } from "../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getPlacedBets,
  otherMatchDetailAction,
  updateMatchRates,
  updatePlacedbetsDeleteReason,
} from "../../store/actions/match/matchAction";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { socket, socketService } from "../../socketManager";
import NavComponent from "../../components/otherGames/matchList";
import OtherUserBets from "../../components/otherGames/userBets";
import BetTable from "../../components/otherGames/betTable";
import LiveStreamComponent from "../../components/commonComponent/liveStreamComponent";
import { liveStreamUrl } from "../../utils/Constants";
import CustomBreadcrumb from "../../components/commonComponent/breadcrumb";

const OtherGamesDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [marketToShow, setMarketToShow] = useState<any>("");
  const { breadCrumb } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  const { gameType, id, marketId } = useParams();

  const { matchDetails, success } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );

  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (id === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteBet = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(otherMatchDetailAction({ matchId: id, matchType: gameType }));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === id) {
        dispatch(otherMatchDetailAction({ matchId: id, matchType: gameType }));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        dispatch(otherMatchDetailAction({ matchId: id, matchType: gameType }));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchResultDeclarted = (event: any) => {
    try {
      if (event?.matchId === id && event?.isMatchDeclare) {
        navigate("/admin/market-analysis");
      } else dispatch(getPlacedBets(id));
    } catch (e) {
      console.log(e);
    }
  };
  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        // dispatch(removeRunAmount(event));
        dispatch(getPlacedBets(id));
        // dispatch(amountupdate(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        // dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(getPlacedBets(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  function formatMarkets(matchDetail: any) {
    const formattedArray = [];

    // Iterate through each type of market
    for (const marketType in matchDetail) {
      const marketValue: any = matchDetail[marketType];
      if (typeof marketValue === "object" && marketValue !== null) {
        if (Array.isArray(marketValue)) {
          formattedArray.push(...marketValue.map((market: any) => market));
        } else {
          if (marketValue?.id) {
            formattedArray.push(marketValue);
          }
        }
      }
    }

    return formattedArray;
  }
  const updatedMarket: any = formatMarkets(matchDetails);

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (event?.matchId === id) {
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        dispatch(otherMatchDetailAction({ matchId: id, matchType: gameType }));
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    try {
      if (success && socket) {
        socketService.match.getMatchRatesOff(id);
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.updateDeleteReasonOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.joinMatchRoom(id, "superAdmin");
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);
        socketService.match.matchDeleteBet(handleDeleteBet);
        socketService.match.sessionDeleteBet(handleDeleteBet);
        socketService.match.userSessionBetPlaced(handleSessionBetPlaced);
        socketService.match.userMatchBetPlaced(handleMatchBetPlaced);
        socketService.match.matchResultDeclared(handleMatchResultDeclarted);
        socketService.match.declaredMatchResultAllUser(
          handleMatchResultDeclarted
        );
        socketService.match.sessionResult(handleSessionResultDeclare);
        socketService.match.sessionResultUnDeclare(
          handleSessionResultUnDeclare
        );
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (e) {
      console.log(e);
    }
  }, [location?.pathname, success, socket, id]);

  useEffect(() => {
    try {
      if (id) {
        return () => {
          socketService.match.leaveMatchRoom(id);
          socketService.match.getMatchRatesOff(id);
          socketService.match.userSessionBetPlacedOff();
          socketService.match.userMatchBetPlacedOff();
          socketService.match.matchResultDeclaredOff();
          socketService.match.declaredMatchResultAllUserOff();
          socketService.match.matchDeleteBetOff();
          socketService.match.sessionDeleteBetOff();
          socketService.match.sessionResultOff();
          socketService.match.sessionResultUnDeclareOff();
          socketService.match.updateDeleteReasonOff();
          // dispatch(resetUserProfitLoss());
          // dispatch(resetBetSessionProfitLossGraph());
        };
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          if (id) {
            // dispatch(
            //   otherMatchDetailAction({ matchId: id, matchType: "football" })
            // );
            dispatch(getPlacedBets(id));
            socketService.match.joinMatchRoom(id, "superAdmin");
            socketService.match.getMatchRates(id, updateMatchDetailToRedux);
          }
        } else if (document.visibilityState === "hidden") {
          socketService.match.leaveMatchRoom(id);
          socketService.match.getMatchRatesOff(id);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setMarketToShow(marketId);
  }, [marketId]);

  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
        <NavComponent
          matchDetail={matchDetails}
          setMarketToShow={setMarketToShow}
          marketToShow={marketToShow}
        />
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {["football", "tennis"]?.includes(matchDetails?.matchType) && (
                <CustomBreadcrumb
                  items={[
                    { name: matchDetails?.title || breadCrumb?.matchName },
                  ]}
                />
              )}
              {updatedMarket
                ?.filter((item: any) => item?.id === marketToShow)
                ?.map((item: any) => (
                  <Col md={12} key={item?.id}>
                    <BetTable
                      title={item?.name}
                      type={
                        ["other", "tournament"]?.includes(item.type)
                          ? MatchType.OTHER
                          : [
                              "quickbookmaker1",
                              "quickbookmaker2",
                              "quickbookmaker3",
                            ]?.includes(item.type)
                          ? MatchType.BOOKMAKER
                          : MatchType.MATCH_ODDS
                      }
                      data={item}
                    />
                  </Col>
                ))}
            </Col>
            <Col md={4}>
              {matchDetails?.eventId && (
                <LiveStreamComponent
                  url={`${liveStreamUrl}${matchDetails?.eventId}&sportid=${
                    matchDetails?.matchType === "football" ? 1 : 2
                  }`}
                />
              )}
              <OtherUserBets matchId={id} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(OtherGamesDetail);
