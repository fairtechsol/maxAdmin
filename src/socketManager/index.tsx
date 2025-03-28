import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { cardSocketService } from "./cardSocket";
import { matchSocketService } from "./matchSocketService";

export let socket: any = null;
export let thirdParty: any = null;
export let cardSocket: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.socket, {
    transports: [`${Constants.WEBSOCKET}`, `${Constants.POLLING}`],
    auth: {
      token: `${localStorage.getItem("jwtMaxAdmin")}`,
    },
  });
  cardSocket = io(baseUrls.cardSocket, {
    transports: [`${Constants.POLLING}`, `${Constants.WEBSOCKET}`],
  });
};

export const initialiseMatchSocket = (matchId: string[]) => {
  thirdParty = io(baseUrls.thirdParty, {
    transports: [
      process.env.NODE_ENV === "production"
        ? `${Constants.POLLING}`
        : `${Constants.WEBSOCKET}`,
    ],
    auth: {
      token: `${localStorage.getItem("jwtMaxAdmin")}`,
    },
    query: {
      matchIdArray: matchId,
      roleName: "superAdmin",
    },
  });
};

export const socketService = {
  connect: () => {
    try {
      initialiseSocket();
      socket?.connect();
      cardSocket?.connect();
    } catch (e) {
      console.log(e);
    }
  },
  disconnect: () => {
    try {
      socket?.disconnect();
      cardSocket?.disconnect();
    } catch (e) {
      console.log(e);
    }
  },
  auth: { ...authSocketService },
  match: { ...matchSocketService },
  card: { ...cardSocketService },
};

export const matchService = {
  connect: (matchId: string[]) => {
    initialiseMatchSocket(matchId);
    thirdParty?.connect();
  },
  disconnect: () => {
    thirdParty?.disconnect();
  },
};
