import { thirdParty, socket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket?.emit("matchRoom", {
      id: matchId,
    });

    thirdParty?.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
  },
  leaveMatchRoom: (matchId: any) => {
    thirdParty?.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  leaveAllRooms: () => {
    socket?.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    socket?.on("addMatch", callback);
  },
  getMatchRates: (matchId: any, callback: any) => {
    thirdParty?.on(`liveData${matchId}`, callback);
  },
  getMatchRatesOff: (matchId: any) => {
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
    socket?.off("sessionResultUnDeclareOff");
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
