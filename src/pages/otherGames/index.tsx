import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomBreadcrumb from "../../components/commonComponent/breadcrumb";
import LiveStreamComponent from "../../components/commonComponent/liveStreamComponent";
import SessionFancy from "../../components/game/sessionFancy";
import SessionKhado from "../../components/game/sessionKhado";
import SessionNormal from "../../components/game/sessionNormal";
import SessionOddEven from "../../components/game/sessionOddEven";
import Tournament from "../../components/game/tournament";
import NavComponent from "../../components/otherGames/matchList";
import OtherUserBets from "../../components/otherGames/userBets";
import { matchService, socket, socketService } from "../../socketManager";
import {
  getMarketAnalysis,
  getPlacedBets,
  matchDetailAction,
  updateBalance,
  updateBetsPlaced,
  updateMatchRates,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
  updateTeamRates,
  updateTeamRatesOnDelete,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import {
  ApiConstants,
  liveStreamUrl,
  scoreBoardUrlMain,
} from "../../utils/Constants";
import isMobile from "../../utils/screenDimension";
import { getTvData } from "../../utils/tvUrlGet";

const OtherGamesDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const [marketToShow, setMarketToShow] = useState<any>("");
  const [tvData, setTvData] = useState<any>(null);

  const { breadCrumb } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  const { gameType, id, marketId } = useParams();

  const { matchDetails, success } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );

  let permissions: any = localStorage.getItem("permissions");
  const parsedPermissions = JSON.parse(permissions);

  useEffect(() => {
    if (id) {
      matchService.connect([id]);
    }
    return () => {
      matchService.disconnect();
    };
  }, [id]);

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
        dispatch(updateTeamRatesOnDelete(event));
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(updatePlacedbets(event));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(updateBetsPlaced(event?.jobData));
        }
        dispatch(updateBalance(event));
        dispatch(updateTeamRates(event));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchResultDeclarted = (event: any) => {
    try {
      if (event?.matchId === id && event?.isMatchDeclare) {
        navigate("/admin/market-analysis");
      } else {
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  function formatMarkets(matchDetail: any) {
    const formattedArray = [];

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
          dispatch(matchDetailAction(id));
        }
        if (!parsedPermissions || parsedPermissions?.currentBets) {
          dispatch(getPlacedBets({ id: id, userId: state?.userId }));
        }
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
        socketService.match.joinMatchRoom(id);
        socketService.match.getMatchRates(id, updateMatchDetailToRedux);
        socketService.match.matchDeleteBet(handleDeleteBet);
        // socketService.match.sessionDeleteBet(handleDeleteBet);
        // socketService.match.userSessionBetPlaced(handleSessionBetPlaced);
        socketService.match.userMatchBetPlaced(handleMatchBetPlaced);
        socketService.match.matchResultDeclared(handleMatchResultDeclarted);
        socketService.match.declaredMatchResultAllUser(
          handleMatchResultDeclarted
        );
        // socketService.match.sessionResult(handleSessionResultDeclare);
        // socketService.match.sessionResultUnDeclare(
        //   handleSessionResultUnDeclare
        // );
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
      }
    } catch (e) {
      console.log(e);
    }
  }, [pathname, success, socket, id]);

  useEffect(() => {
    try {
      if (id) {
        return () => {
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
            if (!parsedPermissions || parsedPermissions?.currentBets) {
              dispatch(getPlacedBets({ id: id, userId: state?.userId }));
            }
            socketService.match.joinMatchRoom(id);
            socketService.match.getMatchRates(id, updateMatchDetailToRedux);
          }
        } else if (document.visibilityState === "hidden") {
          socketService.match.getMatchRatesOff(id);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
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

  useEffect(() => {
    try {
      if (state?.userId) {
        dispatch(
          getMarketAnalysis({
            url: `${ApiConstants.MATCH.MARKETANALYSIS}?userId=${state?.userId}&matchId=${state?.matchId}`,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  useEffect(() => {
    if (matchDetails?.eventId) {
      getTvData(
        matchDetails?.eventId,
        setTvData,
        matchDetails?.matchType,
        true,
        true
      );
    }
  }, [matchDetails?.id]);

  return (
    <div className="gamePage">
      <Container fluid>
        <NavComponent
          matchDetail={matchDetails}
          setMarketToShow={setMarketToShow}
          marketToShow={marketToShow}
        />
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {["football", "tennis"]?.includes(matchDetails?.matchType) && (
                <CustomBreadcrumb
                  items={[
                    { name: matchDetails?.title || breadCrumb?.matchName },
                  ]}
                  matchType={matchDetails?.matchType}
                  url={
                    process.env.NODE_ENV == "production"
                      ? tvData?.scoreData?.iframeUrl
                      : `${scoreBoardUrlMain}${matchDetails?.eventId}/${matchDetails?.matchType}`
                  }
                  setTvData={setTvData}
                />
              )}
              {updatedMarket
                ?.filter((item: any) => !item?.dataType)
                ?.filter((item: any) => item?.id === marketToShow)
                ?.map((item: any) => (
                  <Col md={12} key={item?.id}>
                    <Tournament
                      title={item?.name}
                      box={
                        item?.runners?.[0]?.ex?.availableToBack?.length > 2
                          ? 6
                          : 2
                      }
                      data={item}
                      detail={matchDetails}
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
                      item?.type?.toLowerCase() === marketToShow?.toLowerCase()
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
              {matchDetails?.eventId &&
                matchDetails?.matchType !== "politics" && (
                  <LiveStreamComponent
                    url={
                      process.env.NODE_ENV == "production"
                        ? tvData?.tvData?.iframeUrl
                        : `${liveStreamUrl}${matchDetails?.eventId}/${matchDetails?.matchType}`
                    }
                    eventId={matchDetails?.eventId}
                    matchType={matchDetails?.matchType}
                    setTvData={setTvData}
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
