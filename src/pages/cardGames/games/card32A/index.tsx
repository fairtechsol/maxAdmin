import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards32AComponent from "../../../../components/cardGames/games/card32A";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateBalanceOnBetPlaceCards,
  updateCard32MatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const Cards32A = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCard32MatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.card32) {
      dispatch(updateBetsPlaced(event?.jobData));
      dispatch(updateBalanceOnBetPlaceCards(event?.jobData));
      dispatch(updateProfitLossCards(event?.userRedisObj));
    }
  };

  const handleCardResult = (event: any) => {
    if (event?.matchId === dragonTigerDetail?.id) {
      dispatch(getPlacedBets(dragonTigerDetail?.id));
    }
  };
  const handleLiveGameResultTop10 = (event: any) => {
    dispatch(updateLiveGameResultTop10(event?.data));
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
        socketService.card.getCardRatesOff(cardGamesType.card32);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.matchResultDeclareAllUserOff();
        socketService.card.joinMatchRoom(cardGamesType.card32);
        socketService.card.getCardRates(
          cardGamesType.card32,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.card32,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
        socketService.card.matchResultDeclareAllUser(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    return () => {
      socketService.card.leaveMatchRoom(cardGamesType.card32);
      socketService.card.getCardRatesOff(cardGamesType.card32);
      socketService.card.userCardBetPlacedOff();
      socketService.card.cardResultOff();
      socketService.card.matchResultDeclareAllUserOff();
    };
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    dispatch(getDragonTigerDetailHorseRacing(cardGamesType.card32));
    return () => {
      dispatch(resetCardDetail());
    };
  }, []);

  return loading ? <Loader /> : <Cards32AComponent />;
};

export default Cards32A;
