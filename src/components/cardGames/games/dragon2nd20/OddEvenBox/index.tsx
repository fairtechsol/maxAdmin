import { useEffect, useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { formatNumber } from "../../../../../helpers";
import { dragonTigerCards } from "../../../../../utils/Constants";

const OddEven = ({ name, data, odds, cards }: any) => {
  const min = odds?.[0]?.min;
  const max = odds?.[0]?.max;
  const [openDivIds, setOpenDivIds] = useState<string[]>([]);
  const [cardImg, setCardImg] = useState(dragonTigerCards);

  useEffect(() => {
    const mergedArray = cards?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
      };
    });
    setCardImg(mergedArray);
  }, [cards]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
  };

  return (
    <>
      <div className="dt20oddEvenContainer">
        <div className="w-100 position-relative d-flex justify-content-between align-items-center g-back">
          <span
            className="title-14 f-bold p-1"
            style={{ color: name === "Dragon" ? "#fc4242" : "#ef910f" }}
          >
            {name}
          </span>
          <div
            onClick={() => toggleDiv("demo0")}
            className="range-icon d-inline-block me-1"
          >
            <i className="fas fa-info-circle float-right"></i>{" "}
            <div
              id="demo0"
              className={`icon-range-dt20 collapse ${
                openDivIds.includes("demo0") ? "show" : ""
              }`}
            >
              R:<span>{parseFloat(min)}</span>-<span>{formatNumber(max)}</span>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-around align-items-center">
          <span className="title-14 f-bold">{odds?.[0]?.rate}</span>
          <span className="title-14 f-bold">{odds?.[1]?.rate}</span>
          <span className="title-14 f-bold">{odds?.[3]?.rate}</span>
          <span className="title-14 f-bold">{odds?.[2]?.rate}</span>
        </div>
        <div className="w-100 d-flex justify-content-around align-items-center">
          <div className="dt20OEbox">
            {odds?.[0]?.gstatus === "0" && <div className="dt20bLock"></div>}
            <span className="title-15 f-bold">Even</span>
          </div>
          <div className="dt20OEbox">
            {odds?.[1]?.gstatus === "0" && <div className="dt20bLock"></div>}
            <span className="title-15 f-bold">Odd</span>
          </div>
          <div className="dt20OEbox">
            {odds?.[3]?.gstatus === "0" && <div className="dt20bLock"></div>}
            <ImClubs color="#000000" size={23} />
            <GiSpades color="#000000" size={23} />
          </div>
          <div className="dt20OEbox">
            {odds?.[2]?.gstatus === "0" && <div className="dt20bLock"></div>}
            <ImDiamonds color="#ff0000" size={23} />
            <BiSolidHeart color="#ff0000" size={23} />
          </div>
        </div>
        <div className="w-100 d-flex justify-content-around align-items-center text-red">
          <span className="title-14 f-bold">
            {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                ]
              : 0}
          </span>
          <span className="title-14 f-bold">
            {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                ]
              : 0}
          </span>
          <span className="title-14 f-bold">
            {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`
                ]
              : 0}
          </span>
          <span className="title-14 f-bold">
            {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`]
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`
                ]
              : 0}
          </span>
        </div>
        <div className="w-100 position-relative d-flex flex-row align-items-center g-back">
          <div className="w-50 text-end title-14 f-bold">
            {parseFloat(cards?.[0]?.rate)}
          </div>
          <div
            onClick={() => toggleDiv("demo1")}
            className="w-50 text-end range-icon d-inline-block me-1"
          >
            <i className="fas fa-info-circle float-right"></i>{" "}
            <div
              id="demo1"
              className={`icon-range-dt20 collapse ${
                openDivIds.includes("demo1") ? "show" : ""
              }`}
            >
              R:<span>{parseFloat(cards?.[0]?.min)}</span>-
              <span>{formatNumber(cards?.[0]?.max)}</span>
            </div>
          </div>
        </div>

        <div
          className="w-100 d-flex flex-row justify-content-center align-items-center mt-2 flex-wrap"
          style={{ gap: "40px" }}
        >
          {cardImg?.map((item: any) => (
            <div
              className="d-flex flex-column justify-content-around align-items-center"
              key={item?.code}
            >
              <div
                className={item?.gstatus === "0" ? "suspended" : ""}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <img src={item?.imgSrc} width={"48px"} />
              </div>
              <span
                style={{
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "3px",
                  fontWeight: "bold",
                }}
                className={`text-red ${
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
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OddEven;
