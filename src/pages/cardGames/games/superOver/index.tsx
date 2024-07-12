import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import { cardGamesType } from "../../../../utils/Constants";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import {
  casinoScoreboardMatchRates,
  getDragonTigerDetailHorseRacing,
  updateBalanceOnBetPlaceCards,
  updateCardSuperoverRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import { AppDispatch, RootState } from "../../../../store/store";
import SuperoverComponent from "../../../../components/cardGames/games/superOver";

const Superover = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );
  useEffect(() => {
    const scoreBoard = () => {
      if (dragonTigerDetail?.videoInfo?.mid) {
        const Id = dragonTigerDetail.videoInfo?.mid.split(".");
        dispatch(
          casinoScoreboardMatchRates({
            id: Id[1],
            type: cardGamesType.cricketv3,
          })
        );
      }
    };
    const intervalId = setInterval(scoreBoard, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, dragonTigerDetail]);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateCardSuperoverRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };
  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.superover) {
      dispatch(updateBetsPlaced(event?.jobData?.newBet));
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

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.superover));
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
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.cardResult(handleCardResult);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id]);

  useEffect(() => {
    try {
      if (dragonTigerDetail?.id) {
        return () => {
          socketService.card.leaveMatchRoom(cardGamesType.superover);
          socketService.card.getCardRatesOff(cardGamesType.superover);
          socketService.card.userCardBetPlacedOff();
          socketService.card.cardResultOff();
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <SuperoverComponent />;
};

export default Superover;
