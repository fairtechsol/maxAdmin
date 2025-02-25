import service from "../service";
import { tvUrl } from "./Constants";

export const getTvData = async (eventId: string, setTvData: any,sportType="cricket") => {
  try {
    const response: any = await service.get(
      `${tvUrl}/getIframeUrl/${eventId}?sportType=${sportType}`
    );
    if (response) {
      setTvData(response);
    }
  } catch (e) {
    console.log("Error:", e?.message);
    setTvData(null);
  }
};
