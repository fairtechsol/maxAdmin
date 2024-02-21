import { thirdParty, socket } from ".";

export const matchSocketService = {
  joinMatchRoom: (matchId: any, roleName: any) => {
    socket.emit("matchRoom", {
      id: matchId,
    });

    thirdParty.emit("initCricketData", {
      matchId: matchId,
      roleName: roleName,
    });
  },
  leaveMatchRoom: (matchId: any) => {
    thirdParty.emit("disconnectCricketData", {
      matchId: matchId,
    });
  },
  leaveAllRooms: () => {
    socket.emit("leaveAll");
  },
  matchAdded: (callback: any) => {
    socket.on("addMatch", callback);
  },
  getMatchRates: (matchId: any, callback: any) => {
    thirdParty.on(`liveData${matchId}`, callback);
  },
  getMatchRatesOff: (matchId: any, callback: any) => {
    thirdParty.on(`liveData${matchId}`, callback);
  },
  userSessionBetPlaced: (callback: any) => {
    socket.on("userSessionBetPlaced", callback);
  },
  matchDeleteBet: (callback: any) => {
    socket.on(`matchDeleteBet`, callback);
  },
  sessionDeleteBet: (callback: any) => {
    socket.on(`sessionDeleteBet`, callback);
  },
  userMatchBetPlaced: (callback: any) => {
    socket.on("userMatchBetPlaced", callback);
  },
  updateUserBalance: (callback: any) => {
    socket.on("updateUserBalance", callback);
  },
};
