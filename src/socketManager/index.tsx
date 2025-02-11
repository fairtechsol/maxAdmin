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
    transports: [`${Constants.WEBSOCKET}`,`${Constants.POLLING}`],
    auth: {
      token: `${localStorage.getItem("jwtMaxAdmin")}`,
    },
  });
  // thirdParty = io(baseUrls.thirdParty, {
  //   transports: [
  //     // process.env.NODE_ENV === "production"
  //     //   ? `${Constants.POLLING}`
  //     //   :
  //        `${Constants.WEBSOCKET}`,`${Constants.POLLING}`
  //   ],
  //   auth: {
  //     token: `${localStorage.getItem("jwtMaxAdmin")}`,
  //   },
  // });
  cardSocket = io(baseUrls.cardSocket, {
    transports: [`${Constants.POLLING}`, `${Constants.WEBSOCKET}`,
    ],
  });
};

export const initialiseMatchSocket = () => {
  thirdParty = io(baseUrls.thirdParty, {
    transports: [
      // process.env.NODE_ENV === "production"
      //   ? `${Constants.POLLING}`
      //   :
         `${Constants.WEBSOCKET}`,`${Constants.POLLING}`
    ],
    auth: {
      token: `${localStorage.getItem("jwtMaxAdmin")}`,
    },
  });
};

export const socketService = {
  connect: () => {
    try {
      initialiseSocket();
      // Connect to the socket server
      socket?.connect();
      // thirdParty?.connect();
      cardSocket?.connect();
    } catch (e) {
      console.log(e);
    }
  },
  disconnect: () => {
    try {
      socket?.disconnect();
      // thirdParty?.disconnect();
      cardSocket?.disconnect();
    } catch (e) {
      console.log(e);
    }
    // Disconnect from the socket server
  },
  auth: { ...authSocketService },
  match: { ...matchSocketService },
  card: { ...cardSocketService },
};

export const matchService = {
  connect: () => {
    initialiseMatchSocket();
    thirdParty?.connect();
  },
  disconnect: () => {
    thirdParty?.disconnect();
  },
};
