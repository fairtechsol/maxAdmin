import io from "socket.io-client";
import { Constants, baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";
import { matchSocketService } from "./matchSocketService";

export let socket: any = null;
export let thirdParty: any = null;

export const initialiseSocket = () => {
  socket = io(baseUrls.socket, {
    transports: [`${Constants.WEBSOCKET}`],
    auth: {
      token: `${localStorage.getItem("userToken")}`,
    },
  });
  thirdParty = io(baseUrls.thirdParty, {
    transports: [
      process.env.NODE_ENV === "production"
        ? `${Constants.POLLING}`
        : `${Constants.WEBSOCKET}`,
    ],
    auth: {
      token: `${localStorage.getItem("userToken")}`,
    },
  });
};

export const socketService = {
  connect: () => {
    try {
      initialiseSocket();
      // Connect to the socket server
      socket.connect();
      thirdParty.connect();
    } catch (e) {
      console.log(e);
    }
  },
  disconnect: () => {
    try {
      socket.disconnect();
      thirdParty.disconnect();
    } catch (e) {
      console.log(e);
    }
    // Disconnect from the socket server
  },
  auth: { ...authSocketService },
  match: { ...matchSocketService },
};
