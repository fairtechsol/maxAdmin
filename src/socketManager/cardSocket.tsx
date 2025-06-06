import { cardSocket, socket } from ".";

export const cardSocketService = {
  joinMatchRoom: (matchType: any) => {
    cardSocket?.emit("initLiveData", {
      liveGameTypeId: matchType,
    });
  },
  getCardRates: (gameTypeId: any, callback: any) => {
    cardSocket?.on(`liveGameData${gameTypeId}`, callback);
  },
  leaveMatchRoom: (gameTypeId: any) => {
    cardSocket?.emit("disconnectLiveGame", {
      liveGameTypeId: gameTypeId,
    });
  },
  leaveAllRooms: () => {
    cardSocket?.emit("leaveAll");
  },
  getCardRatesOff: (gameTypeId: any) => {
    cardSocket?.off(`liveGameData${gameTypeId}`);
  },
  userCardBetPlaced: (callback: any) => {
    socket?.on("userCardBetPlaced", callback);
  },
  getLiveGameResultTop10: (matchType: any, callback: any) => {
    cardSocket?.on(`liveGameResultTop10${matchType}`, callback);
  },
  getLiveGameResultTop10Off: (matchType: any) => {
    cardSocket?.on(`liveGameResultTop10${matchType}`);
  },
  cardResult: (callback: any) => {
    socket?.on("matchResult", callback);
  },
  matchResultDeclareAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  matchResultDeclareAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  userCardBetPlacedOff: () => {
    socket?.off("userCardBetPlaced");
  },
  cardResultOff: () => {
    socket?.off("matchResult");
  },
};
