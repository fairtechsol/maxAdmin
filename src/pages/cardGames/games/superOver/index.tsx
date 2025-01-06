import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuperoverComponent from "../../../../components/cardGames/games/superOver";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  casinoScoreboardMatchRates,
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  resetScoreBoard,
  updateBalanceOnBetPlaceCards,
  updateCardSuperoverRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";
import { useLocation } from "react-router-dom";
import { getUsersProfile } from "../../../../store/actions/user/userActions";

const Superover = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const [errorCount, setErrorCount] = useState<number>(0);
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardSuperoverRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };
  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.superover) {
      dispatch(updateBetsPlaced(event?.jobData));
      dispatch(updateBalanceOnBetPlaceCards(event?.jobData));
      dispatch(updateProfitLossCards(event?.userRedisObj));
    }
  };

  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
  };
  const handleCardResult = (event: any) => {
    if (event?.matchId === dragonTigerDetail?.id) {
      dispatch(getPlacedBets(dragonTigerDetail?.id));
    }
  };
  const handleMatchResult = () => {
    dispatch(getUsersProfile());
  };
  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        socketService.card.getCardRatesOff(cardGamesType.superover);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.superover);
        socketService.card.getCardRates(
          cardGamesType.superover,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.superover,
          handleLiveGameResultTop10
        );
        if (!state?.userId) {
          socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
          socketService.card.cardResult(handleCardResult);
          socketService.card.matchResultDeclareAllUser(handleCardResult);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id, state]);

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        return () => {
          socketService.card.leaveMatchRoom(cardGamesType.superover);
          socketService.card.getCardRatesOff(cardGamesType.superover);
          socketService.card.getLiveGameResultTop10Off(cardGamesType.superover);
          if (!state?.userId) {
            socketService.card.userCardBetPlacedOff();
            socketService.card.cardResultOff();
            socketService.card.matchResultDeclareAllUserOff();
          }
          dispatch(resetScoreBoard());
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id, state]);

  useEffect(() => {
    if (state?.userId) {
      dispatch(
        getCardDetailInitial(
          `${cardGamesType.superover}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
      dispatch(
        getDragonTigerDetailHorseRacing(
          `${cardGamesType.superover}?userId=${state?.userId}&roleName=${state?.roleName}`
        )
      );
    } else {
      dispatch(getCardDetailInitial(cardGamesType.superover));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.superover));
    }
    return () => {
      socketService.card.cardResult(handleMatchResult);
      dispatch(resetCardDetail());
    };
  }, []);

  const getScoreBoard = async (marketId: string) => {
    try {
      dispatch(
        casinoScoreboardMatchRates({
          id: marketId,
          type: cardGamesType.superover,
        })
      );
      setErrorCount(0);
    } catch (e: any) {
      console.log("Error:", e?.message);
      setErrorCount((prevCount: number) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (dragonTigerDetail?.videoInfo?.mid) {
      const Id = dragonTigerDetail.videoInfo?.mid.split(".");
      let intervalTime = 1000;
      if (errorCount >= 5 && errorCount < 10) {
        intervalTime = 60000;
      } else if (errorCount >= 10) {
        intervalTime = 600000;
      }
      const interval = setInterval(() => {
        getScoreBoard(Id[Id?.length - 1]);
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [dragonTigerDetail?.videoInfo?.mid, errorCount]);

  return loading ? <Loader /> : <SuperoverComponent />;
};

export default Superover;
