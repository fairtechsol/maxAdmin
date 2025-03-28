import { socket, thirdParty } from ".";
let currSocket: any = [];

export const matchSocketService = {
  joinMatchRoom: (matchId: any) => {
    socket?.emit("matchRoom", {
      id: matchId,
    });
  },
  leaveMatchRoom: (matchId: any) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    thirdParty?.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  leaveAllRooms: () => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    socket?.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    socket?.on("addMatch", callback);
  },
  getMatchRates: (matchId: any, callback: any) => {
    thirdParty?.on(`liveData${matchId}`, callback);
  },
  getMatchRatesOff: (matchId: any) => {
    for (let item of currSocket) {
      clearInterval(item);
    }
    currSocket = [];
    thirdParty?.off(`liveData${matchId}`);
  },
  userSessionBetPlaced: (callback: any) => {
    socket?.on("userSessionBetPlaced", callback);
  },
  matchResultDeclared: (callback: any) => {
    socket?.on("matchResult", callback);
  },
  declaredMatchResultAllUser: (callback: any) => {
    socket?.on("matchResultDeclareAllUser", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket?.on(`matchDeleteBet`, callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket?.on(`sessionDeleteBet`, callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket?.on("userMatchBetPlaced", callback);
  },
  updateUserBalance: (callback: any) => {
    socket?.on("updateUserBalance", callback);
  },
  sessionResult: (callback: any) => {
    socket?.on("sessionResult", callback);
  },
  sessionResultUnDeclare: (callback: any) => {
    socket?.on("sessionResultUnDeclare", callback);
  },
  updateDeleteReason: (callback: any) => {
    socket?.on("updateDeleteReason", callback);
  },
  sessionResultUnDeclareOff: () => {
    socket?.off("sessionResultUnDeclare");
  },
  sessionResultOff: () => {
    socket?.off("sessionResult");
  },
  matchResultDeclaredOff: () => {
    socket?.off("matchResult");
  },
  declaredMatchResultAllUserOff: () => {
    socket?.off("matchResultDeclareAllUser");
  },
  userSessionBetPlacedOff: () => {
    socket?.off("userSessionBetPlaced");
  },
  userMatchBetPlacedOff: () => {
    socket?.off("userMatchBetPlaced");
  },
  matchDeleteBetOff: () => {
    socket?.off("matchDeleteBet");
  },
  sessionDeleteBetOff: () => {
    socket?.off("sessionDeleteBet");
  },
  updateDeleteReasonOff: () => {
    socket?.off("updateDeleteReason");
  },
};
