import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cricket5Component from "../../../../components/cardGames/games/cricket5";
import Loader from "../../../../components/commonComponent/loader";
import { socket, socketService } from "../../../../socketManager";
import {
  casinoScoreboardMatchRates,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  resetScoreBoard,
  updateBalanceOnBetPlaceCards,
  updateCricket5MatchRates,
  updateLiveGameResultTop10,
  updateProfitLossCards,
} from "../../../../store/actions/card/cardDetail";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { cardGamesType } from "../../../../utils/Constants";

const Cricket5 = () => {
  const dispatch: AppDispatch = useDispatch();
  const [errorCount, setErrorCount] = useState<number>(0);
  const { loading, dragonTigerDetail } = useSelector(
    (state: RootState) => state.card
  );

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
        dispatch(resetScoreBoard());
      } catch (e) {
        console.log(e);
      }
    };
  }, [dragonTigerDetail?.id]);

  useEffect(() => {
    dispatch(getDragonTigerDetailHorseRacing(cardGamesType.cricketv3));
    return () => {
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
        getScoreBoard(Id[1]);
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [dragonTigerDetail?.videoInfo?.mid, errorCount]);

  return loading ? <Loader /> : <Cricket5Component />;
};

export default Cricket5;
