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
  getMatchRates: (matchId: string, callback: any) => {
    thirdParty.on(`liveData${matchId}`, callback);
  },
};
