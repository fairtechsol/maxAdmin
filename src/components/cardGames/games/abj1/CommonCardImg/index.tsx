import { useEffect, useState } from "react";
import { andarBaharCards } from "../../../../../utils/Constants";
import { back0 } from "../../../../../assets";


const CommonCardImg = ({ cardData, data, cardInfo }: any) => {
  const [cardImg, setCardImg] = useState(andarBaharCards);
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...andarBaharCards[index],
        show: cardInfo?.[index] !== "0",
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  const handlock = (item: any) => {
    if (item?.gstatus === "0" && cardInfo?.[0] === "") {
      return "suspended";
    } else if (item?.gstatus === "0" && cardInfo?.[0] != "") {
      return "stop";
    } else {
      return "";
    }
  };
  return (
    <div className="commonCardImgContainerabj1">
      {cardImg?.map((item: any) => {
        return (
          <div className="casino-card-item mx-3">
            <div
              key={item?.code}
              className={handlock(item)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item?.show ? (
                <img src={item?.imgSrc} width={"48px"} />
              ) : (
                <img src={back0} width={"48px"} />
              )}
            </div>
            <span
              style={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
              }}
              className={`title-18 fbold ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ] > 0
                      ? "color-green"
                      : data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.sid}_card`
                        ] < 0
                      ? "color-red"
                      : "color-red"
                    : "color-red"
                  : "color-red"
              }`}
            >
              {" "}
              {data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ]
                  : 0
                : 0}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
