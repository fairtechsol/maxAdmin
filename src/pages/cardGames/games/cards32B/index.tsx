import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../../store/store";
import { socket, socketService } from "../../../../socketManager";
import Loader from "../../../../components/commonComponent/loader";
import { cardGamesType } from "../../../../utils/Constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import {
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateCard32BMatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import Cards32BComponent from "../../../../components/cardGames/games/cards32B";

const Cards32B = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCard32BMatchRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.card32B) {
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
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.card32B));
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
        socketService.card.getCardRatesOff(cardGamesType.card32B);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.card32B);
        socketService.card.getCardRates(
          cardGamesType.card32B,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.card32B,
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
      try {
        socketService.card.leaveMatchRoom(cardGamesType.card32B);
        socketService.card.getCardRatesOff(cardGamesType.card32B);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
      } catch (e) {
        console.log(e);
      }
    };
  }, [dragonTigerDetail?.id]);
  return loading ? <Loader /> : <Cards32BComponent />;
};

export default Cards32B;
