import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import GameHeader from "../../components/game/gameHeader";
import { MatchType } from "../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getPlacedBets,
  matchDetailAction,
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
import isMobile from "../../utils/screenDimension";
import SessionNormal from "../../components/game/sessionNormal";
import SessionFancy from "../../components/game/sessionFancy";
import SessionKhado from "../../components/game/sessionKhado";
import SessionOddEven from "../../components/game/sessionOddEven";

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
        if (gameType === "politics") {
          dispatch(matchDetailAction(id));
        } else {
          dispatch(
            otherMatchDetailAction({ matchId: id, matchType: gameType })
          );
        }
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === id) {
        if (gameType === "politics") {
          dispatch(matchDetailAction(id));
        } else {
          dispatch(
            otherMatchDetailAction({ matchId: id, matchType: gameType })
          );
        }
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        if (gameType === "politics") {
          dispatch(matchDetailAction(id));
        } else {
          dispatch(
            otherMatchDetailAction({ matchId: id, matchType: gameType })
          );
        }
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
        if (gameType === "politics") {
          dispatch(matchDetailAction(id));
        } else {
          dispatch(
            otherMatchDetailAction({ matchId: id, matchType: gameType })
          );
        }
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
        socketService.match.leaveMatchRoom(id);
        socketService.match.getMatchRatesOff(id);
      };
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (marketId) {
      setMarketToShow(marketId);
    }
  }, [marketId]);

  return (
    <div className="gamePage">
      <Container fluid>
        <NavComponent
          matchDetail={matchDetails}
          setMarketToShow={setMarketToShow}
          marketToShow={marketToShow}
        />
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {["football", "tennis", "politics"]?.includes(
                matchDetails?.matchType
              ) && (
                <CustomBreadcrumb
                  items={[
                    { name: matchDetails?.title || breadCrumb?.matchName },
                  ]}
                  matchType={matchDetails?.matchType}
                />
              )}
              {updatedMarket
                ?.filter((item: any) => !item?.dataType)
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

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexWrap: isMobile ? "nowrap" : "wrap",
                  gap: "1%",
                }}
                className={`${isMobile ? "flex-column" : ""}`}
              >
                {[
                  {
                    type: "session",
                    title: "Normal",
                    data: matchDetails?.apiSession?.session,
                    component: SessionNormal,
                  },
                  {
                    type: "overByover",
                    title: "overByover",
                    data: matchDetails?.apiSession?.overByover,
                    component: SessionNormal,
                  },
                  {
                    type: "ballByBall",
                    title: "Ballbyball",
                    data: matchDetails?.apiSession?.ballByBall,
                    component: SessionNormal,
                  },
                  {
                    type: "fancy1",
                    title: "fancy1",
                    data: matchDetails?.apiSession?.fancy1,
                    component: SessionFancy,
                  },
                  {
                    type: "khado",
                    title: "khado",
                    data: matchDetails?.apiSession?.khado,
                    component: SessionKhado,
                  },
                  {
                    type: "meter",
                    title: "meter",
                    data: matchDetails?.apiSession?.meter,
                    component: SessionNormal,
                  },
                  {
                    type: "oddeven",
                    title: "oddeven",
                    data: matchDetails?.apiSession?.oddEven,
                    component: SessionOddEven,
                  },
                ]
                  ?.filter(
                    (item: any) =>
                      item?.type?.toLowerCase() === marketToShow.toLowerCase()
                  )
                  .map(
                    (session, index) =>
                      session.data?.section?.length > 0 && (
                        <div key={index} style={{ width: "100%" }}>
                          <Col md={12}>
                            <session.component
                              title={session.title}
                              mtype={session.type}
                              data={session.data}
                              detail={matchDetails}
                            />
                          </Col>
                        </div>
                      )
                  )}
              </div>
            </Col>
            <Col md={4}>
            {/* <GameHeader /> */}
              {matchDetails?.eventId &&
                matchDetails?.matchType !== "politics" && (
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
