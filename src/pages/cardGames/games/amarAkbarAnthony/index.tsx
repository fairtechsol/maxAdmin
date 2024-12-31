import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AmarAkbarAnthonyComponent from "../../../../components/cardGames/games/amarAkbarAnthony";
import { socket, socketService } from "../../../../socketManager";
import {
  getCardDetailInitial,
  getDragonTigerDetailHorseRacing,
  resetCardDetail,
  updateAmarAkbarAnthonyCardMatchRates,
  updateBalanceOnBetPlaceCards,
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

const AmarAkbarAnthony = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);

  const setMatchRatesInRedux = (event: any) => {
    try {
      dispatch(updateAmarAkbarAnthonyCardMatchRates(event?.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleBetPlacedOnDT20 = (event: any) => {
    if (event?.jobData?.matchType === cardGamesType.amarAkbarAnthony) {
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
      if (socket && dragonTigerDetail?.id) {
        dispatch(getPlacedBets(dragonTigerDetail?.id));
        socketService.card.getCardRatesOff(cardGamesType.amarAkbarAnthony);
        socketService.card.userCardBetPlacedOff();
        socketService.card.cardResultOff();
        socketService.card.joinMatchRoom(cardGamesType.amarAkbarAnthony);
        socketService.card.getCardRates(
          cardGamesType.amarAkbarAnthony,
          setMatchRatesInRedux
        );
        socketService.card.getLiveGameResultTop10(
          cardGamesType.amarAkbarAnthony,
          handleLiveGameResultTop10
        );
        if (!state?.userId) {
          socketService.card.userCardBetPlaced(handleBetPlacedOnDT20);
          socketService.card.cardResult(handleCardResult);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, dragonTigerDetail?.id, state]);

  useEffect(() => {
    try {
      if (state?.userId) {
        dispatch(
          getCardDetailInitial(
            `${cardGamesType.amarAkbarAnthony}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
        dispatch(
          getDragonTigerDetailHorseRacing(
            `${cardGamesType.amarAkbarAnthony}?userId=${state?.userId}&roleName=${state?.roleName}`
          )
        );
      } else {
        dispatch(getCardDetailInitial(cardGamesType.amarAkbarAnthony));
        dispatch(
          getDragonTigerDetailHorseRacing(cardGamesType.amarAkbarAnthony)
        );
      }
      return () => {
        socketService.card.leaveMatchRoom(cardGamesType.amarAkbarAnthony);
        socketService.card.getCardRatesOff(cardGamesType.amarAkbarAnthony);
        if (!state?.userId) {
          socketService.card.userCardBetPlacedOff();
          socketService.card.getLiveGameResultTop10Off(
            cardGamesType.amarAkbarAnthony
          );
          socketService.card.cardResultOff();
        }
        socketService.card.cardResult(handleMatchResult);
        dispatch(resetCardDetail());
      };
    } catch (e) {
      console.log(e);
    }
  }, [state]);

  return <AmarAkbarAnthonyComponent />;
};

export default AmarAkbarAnthony;
