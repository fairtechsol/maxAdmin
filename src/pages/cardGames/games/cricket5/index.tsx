import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  updateCricket5MatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import Loader from "../../../../components/commonComponent/loader";
import { AppDispatch, RootState } from "../../../../store/store";
import Cricket5Component from "../../../../components/cardGames/games/cricket5";

const Cricket5 = () => {
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
      dispatch(updateCricket5MatchRates(event?.data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.cricketv3) {
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

  useEffect(() => {
    try {
      dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cricketv3));
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
        socketService.card.getCardRatesOff(cardGamesType.cricketv3);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.cricketv3);
        socketService.card.getCardRates(
          cardGamesType.cricketv3,
          setMatchRatesInRedux
        );
        socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
        socketService.card.getLiveGameResultTop10(
          cardGamesType.cricketv3,
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
        socketService.card.leaveMatchRoom(cardGamesType.cricketv3);
        socketService.card.getCardRatesOff(cardGamesType.cricketv3);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
      } catch (e) {
        console.log(e);
      }
    };
  }, [dragonTigerDetail?.id]);

  return loading ? <Loader /> : <Cricket5Component />;
};

export default Cricket5;
