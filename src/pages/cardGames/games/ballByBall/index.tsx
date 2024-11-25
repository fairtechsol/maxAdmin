import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import {
  ballbyballMatchRates,
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";

import { cardGamesType } from "../../../../utils/Constants";

import BallbyballComponentList from "../../../../components/cardGames/games/ballbyball";
import { AppDispatch, RootState } from "../../../../store/store";
import { socket, socketService } from "../../../../socketManager";

const BallByBall = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(ballbyballMatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.ballbyball) {
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
    dispatch(getPlacedBets(dragonTigerDetail?.id));
  };
  useEffect(() => {
    try {
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
        socketService.card.getCardRatesOff(cardGamesType.ballbyball);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.ballbyball);
        socketService.card.getCardRates(
          cardGamesType.ballbyball,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.ballbyball,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      dispatch(getCardDetailInitial(cardGamesType.ballbyball));
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.ballbyball));
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.ballbyball);
        socketService.card.getCardRatesOff(cardGamesType.ballbyball);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        dispatch(resetCardDetail());
        socketService.card.cardResult(handleMatchResult);
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <BallbyballComponentList />;
};

export default BallByBall;
