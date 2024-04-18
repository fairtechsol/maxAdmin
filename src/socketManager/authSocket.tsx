import { socket } from ".";

export const authSocketService = {
  logout: () => {
    socket?.on("logoutUserForce", () => {
      localStorage.clear();
      window.location.replace("/admin/login");
    });
  },
};
