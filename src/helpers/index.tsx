import service from "../service";
import { ApiConstants } from "../utils/Constants";

export const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const handleRoundId = (id: any) => {
  if (typeof id !== "string" || !id.includes(".")) {
    return 0;
  }
  const Id = id.split(".");
  return Id[1];
};

export const getChannelId = async (eventId: number) => {
  try {
    const res: any = await service.get(
      `${ApiConstants.LIVESTREAM.GET_CHANNEL_ID}?Cno=${eventId}`
    );
    if (res) {
      return res?.result;
    }
  } catch (error) {
    console.log(error);
  }
};


export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
  return formatter.format(amount || 0);
};
export const formatNumber = (num: any) => {
  if (num >= 1000 && num < 100000) {
    return (num / 1000)?.toFixed(1)?.replace(/\.0$/, "") + "K";
  } else if (num >= 100000) {
    return (num / 100000)?.toFixed(1)?.replace(/\.0$/, "") + "L";
  }
  return num?.toString();
};