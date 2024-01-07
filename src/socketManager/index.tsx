import io from "socket.io-client";
import { baseUrls } from "../utils/Constants";
import { authSocketService } from "./authSocket";

export const socket = io(baseUrls.socket, {
  transports: ["websocket"],
  auth: {
    token: `${sessionStorage.getItem("userToken")}`,
  },
});

export const thirdParty = io(baseUrls.thirdParty, {
  transports: ["websocket"],
  auth: {
    token: `${sessionStorage.getItem("userToken")}`,
  },
});

export const socketService = {
  connect: () => {
    // Connect to the socket server
    socket.connect();
    thirdParty.connect();
  },
  disconnect: () => {
    // Disconnect from the socket server
    socket.disconnect();
    thirdParty.disconnect();
  },
  auth: { ...authSocketService },
};
