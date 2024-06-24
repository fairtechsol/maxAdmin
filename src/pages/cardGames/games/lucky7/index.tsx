import { useDispatch, useSelector } from "react-redux";
import Lucky7Component from "../../../../components/cardGames/games/lucky7";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";
import { useEffect } from "react";
import { socket, socketService } from "../../../../socketManager";
import {
  getDragonTigerDetailHorseRacing,
  update7CardMatchRates,
  updateBalanceOnBetPlaceCards,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import { getPlacedBets } from "../../../../store/actions/match/matchAction";
import Loader from "../../../../components/commonComponent/loader";

const Lucky7 = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      if (cardGamesType.lucky7 === event?.data?.data?.data?.t1[0]?.gtype) {
        dispatch(update7CardMatchRates(event?.data?.data?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.lucky7) {
      dispatch(getPlacedBets(dragonTigerDetail?.id));
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
      // dispatch(getProfileInMatchDetail());
    }
  };

  useEffect(() => {
    try {
      // dispatch(getButtonValue());
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.lucky7));
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
        socketService.card.getCardRatesOff(cardGamesType.lucky7);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.lucky7);
        socketService.card.getCardRates(
          cardGamesType.lucky7,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.lucky7,
          handleLiveGameResultTop10
        );
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    return () => {
      socketService.card.leaveMatchRoom(cardGamesType.lucky7);
      socketService.card.getCardRatesOff(cardGamesType.lucky7);
      socketService.card.userCardBetPlacedOff();
      socketService.card.cardResultOff();
    };
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <Lucky7Component />;
};

export default Lucky7;
