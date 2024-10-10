import { useEffect, useState } from "react";
import "../style.scss";
import { dragonTigerCards } from "../../../../../utils/Constants";
const CommonCardImg = ({ cardData, data }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  return (
    <div className="commonCardImgContainer" style={{gap:"50px"}}>
      {cardImg?.map((item: any) => (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            className={item?.gstatus === "0" ? "suspended" : ""}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            key={item?.code}
          >
            {" "}
            <img src={item?.imgSrc} width={"48px"} height={"67px"} />
          </div>
          <span
            // style={{ fontSize: "16px" }}
            className={`title-16 text-red f-bold ${
              data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                : 0
              : 0}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommonCardImg;
