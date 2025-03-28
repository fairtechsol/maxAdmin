import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { seven } from "../../../../../assets";
import { formatNumber } from "../../../../../helpers";

const TiePairBox = ({ lowHigh, data, odds, cards }: any) => {
  return (
    <div
      className="w-100 d-flex flex-row justify-content-around mt-2"
      style={{ gap: "20px" }}
    >
      <div className="w-50 d-flex flex-column">
        <div className="w-100 d-flex flex-row" style={{ height: "76px" }}>
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{ border: "5px solid #fc4242", backgroundColor: "#434343" }}
          >
            {lowHigh?.[0]?.gstatus === "0" && (
              <div className="lucky7Lock"></div>
            )}
            <span className="title-14 f-bold text-white">
              {parseFloat(lowHigh?.[0]?.rate)}
            </span>
            <span className="title-14 f-bold text-white">
              {lowHigh?.[0]?.nation}
            </span>
          </div>
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{ backgroundColor: "#43434333" }}
          >
            <img
              src={seven}
              width={"42px"}
              height={"60px"}
            />
          </div>
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{ border: "5px solid #03b37f", backgroundColor: "#434343" }}
          >
            {lowHigh?.[1]?.gstatus === "0" && (
              <div className="lucky7Lock"></div>
            )}
            <span className="title-14 f-bold text-white">
              {parseFloat(lowHigh?.[1]?.rate)}
            </span>
            <span className="title-14 f-bold text-white">
              {lowHigh?.[1]?.nation}
            </span>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-between">
          <span
            className="title-16 f-bold text-red"
            style={{ marginLeft: "4rem" }}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[0]?.sid}_card`
                ]
              : 0}
          </span>
          <span
            className="title-16 f-bold text-red"
            style={{ marginRight: "4rem" }}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${lowHigh?.[1]?.sid}_card`
                ]
              : 0}
          </span>
        </div>
        <div className="w-100 text-end">
          <span className="title-12">
            R:{parseFloat(lowHigh?.[0]?.min)}-{formatNumber(lowHigh?.[0]?.max)}
          </span>
        </div>
      </div>

      <div
        className="w-50 d-flex flex-row justify-content-around"
        style={{ gap: "10px" }}
      >
        <div className="w-100 d-flex flex-column">
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
              borderRadius: "6px",
              backgroundColor: "#434343",
              height: "76px",
            }}
          >
            {odds?.[0]?.gstatus === "0" && <div className="lucky7Lock"></div>}
            <span className="title-14 f-bold text-white">
              {parseFloat(odds?.[0]?.rate)}
            </span>
            <span className="title-14 f-bold text-white">
              {odds?.[0]?.nation}
            </span>
          </div>
          <div className="w-100 text-center">
            <span className="title-16 f-bold text-red">
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                  ]
                : 0}
            </span>
          </div>
          <div className="w-100 text-end">
            <span className="title-12">
              R:{parseFloat(odds?.[0]?.min)}-{formatNumber(odds?.[0]?.max)}
            </span>
          </div>
        </div>

        <div className="w-100 d-flex flex-column">
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
              borderRadius: "6px",
              backgroundColor: "#434343",
              height: "76px",
            }}
          >
            {odds?.[1]?.gstatus === "0" && <div className="lucky7Lock"></div>}
            <span className="title-14 f-bold text-white">
              {parseFloat(odds?.[1]?.rate)}
            </span>
            <span className="title-14 f-bold text-white">
              {odds?.[1]?.nation}
            </span>
          </div>
          <div className="w-100 text-center">
            <span className="title-16 f-bold text-red">
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                  ]
                : 0}
            </span>
          </div>
          <div className="w-100 text-end">
            <span className="title-12">
              R:{parseFloat(odds?.[1]?.min)}-{formatNumber(odds?.[1]?.max)}
            </span>
          </div>
        </div>

        <div className="w-100 d-flex flex-column">
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
              borderRadius: "6px",
              backgroundColor: "#434343",
              height: "76px",
            }}
          >
            {cards?.[1]?.gstatus === "0" && <div className="lucky7Lock"></div>}
            <span className="title-14 f-bold text-white">
              {parseFloat(cards?.[1]?.rate)}
            </span>
            <span className="d-flex flex-row">
              <ImClubs color="#000000" />
              <GiSpades color="#000000" />
            </span>
          </div>
          <div className="w-100 text-center">
            <span className="title-16 f-bold text-red">
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${cards?.[1]?.sid}_card`
                  ]
                : 0}
            </span>
          </div>
          <div className="w-100 text-end">
            <span className="title-12">
              R:{parseFloat(cards?.[1]?.min)}-{formatNumber(cards?.[1]?.max)}
            </span>
          </div>
        </div>

        <div className="w-100 d-flex flex-column">
          <div
            className="w-100 d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
              borderRadius: "6px",
              backgroundColor: "#434343",
              height: "76px",
            }}
          >
            {cards?.[0]?.gstatus === "0" && <div className="lucky7Lock"></div>}
            <span className="title-14 f-bold text-white">
              {parseFloat(cards?.[0]?.rate)}
            </span>
            <span className="d-flex flex-row">
              <ImDiamonds color="#ff0000" />
              <BiSolidHeart color="#ff0000" />
            </span>
          </div>
          <div className="w-100 text-center">
            <span className="title-16 f-bold text-red">
              {data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${cards?.[0]?.sid}_card`
                  ]
                : 0}
            </span>
          </div>
          <div className="w-100 text-end">
            <span className="title-12">
              R:{parseFloat(cards?.[0]?.min)}-{formatNumber(cards?.[0]?.max)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiePairBox;
