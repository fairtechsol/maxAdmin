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
import { getChannelId } from "../../helpers";

const OtherGamesDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [channelId, setChannelId] = useState<string>("");

  const { id, marketId } = useParams();

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
        dispatch(
          otherMatchDetailAction({ matchId: id, matchType: "football" })
        );
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === id) {
        dispatch(
          otherMatchDetailAction({ matchId: id, matchType: "football" })
        );
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchBetPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === id) {
        dispatch(
          otherMatchDetailAction({ matchId: id, matchType: "football" })
        );
        dispatch(getPlacedBets(id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleMatchResultDeclarted = (event: any) => {
    try {
      if (event?.matchId === id) {
        navigate("/admin/market-analysis");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === id) {
        // dispatch(removeRunAmount(event));
        dispatch(getPlacedBets(`eq${id}`));
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
        dispatch(getPlacedBets(`eq${id}`));
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
        if (Array.isArray(marketValue) && marketType !== "quickBookmaker") {
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
        dispatch(
          otherMatchDetailAction({ matchId: id, matchType: "football" })
        );
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
  }, [location?.pathname, success, socket]);

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
            dispatch(
              otherMatchDetailAction({ matchId: id, matchType: "football" })
            );
            dispatch(getPlacedBets(id));
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
    try {
      if (matchDetails?.eventId) {
        const callApiForLiveStream = async () => {
          let result = await getChannelId(matchDetails?.eventId);
          if (result) {
            setChannelId(result?.channelNo);
          }
        };
        callApiForLiveStream();
      }
    } catch (error) {
      console.log(error);
    }
  }, [matchDetails?.id]);

  return (
    <div className="gamePage">
      <Container fluid>
        <GameHeader />
        <NavComponent matchDetail={matchDetails} />
        {/* table start here */}
        <div className="gamePage-table">
          <Row className="no-gutters">
            <Col md={8}>
              {updatedMarket
                ?.filter((item: any) => item?.id === marketId)
                ?.map((item: any) => (
                  <Col md={12} key={item?.id}>
                    <BetTable
                      title={item?.name}
                      type={
                        ["other", "tournament"]?.includes(item.type)
                          ? MatchType.OTHER
                          : MatchType.MATCH_ODDS
                      }
                      data={item}
                    />
                  </Col>
                ))}
            </Col>
            <Col md={4}>
              {matchDetails?.eventId && (
                <LiveStreamComponent eventId={matchDetails?.eventId} />
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
