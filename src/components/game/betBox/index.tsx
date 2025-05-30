import { memo, useEffect, useState } from "react";
import { handlePrice, handleSize } from "../../../helpers";

const BetBox = ({ data, type }: any) => {
  const [tempRate, setTempRate] = useState("0");
  const [isYellow, setIsYellow] = useState(false);

  useEffect(() => {
    if (parseFloat(data?.price) != parseFloat(tempRate)) {
      setTimeout(() => {
        setIsYellow(false);
      }, 700);
      setIsYellow(true);
      setTempRate(data?.price);
    }
  }, [data?.price]);

  const handleBackground = (index: any) => {
    if (type === "back") {
      if (index === 2) {
        return isYellow ? "bg-rateChange1" : "back3Background";
      } else if (index === 1) {
        return isYellow ? "bg-rateChange1" : "back2Background";
      } else {
        return isYellow ? "bg-rateChange1" : "back1Background";
      }
    } else {
      if (index === 2) {
        return isYellow ? "bg-rateChange2" : "lay3Background";
      } else if (index === 1) {
        return isYellow ? "bg-rateChange2" : "lay2Background";
      } else {
        return isYellow ? "bg-rateChange2" : "lay1Background";
      }
    }
  };
  return (
    <div className={`matchOddBackBox ${handleBackground(data?.tno)}`}>
      <span className="rateFont">{handlePrice(data?.price)}</span>
      <span className="sizeFont matchOddRate2Box">
        {
          // formatNumber(
          handleSize(data?.size)
          // )
        }
      </span>
    </div>
  );
};
export default memo(BetBox);
