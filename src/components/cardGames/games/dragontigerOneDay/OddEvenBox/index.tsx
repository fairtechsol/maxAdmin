import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { formatNumber } from "../../../../../helpers";

const OddEven = ({ name, odds, data }: any) => {
  return (
    <div className="dt20oddEvenContainer">
      <div className="w-100 position-relative d-flex justify-content-between align-items-center g-back">
        <span
          className="title-14 f-bold p-1"
          style={{ color: name === "Dragon" ? "#fc4242" : "#ef910f" }}
        >
          {name}
        </span>
      </div>
      <div className="w-100 d-flex justify-content-around align-items-center">
        <span className="title-14 f-bold">{odds?.[0]?.b1}</span>
        <span className="title-14 f-bold">{odds?.[1]?.b1}</span>
        <span className="title-14 f-bold">{odds?.[3]?.b1}</span>
        <span className="title-14 f-bold">{odds?.[2]?.b1}</span>
      </div>
      <div className="w-100 d-flex justify-content-around align-items-center">
        <div className="dt20OEbox">
          {(odds?.[0]?.gstatus === "CLOSED" ||
            odds?.[0]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <span className="title-15 f-bold">Even</span>
        </div>
        <div className="dt20OEbox">
          {(odds?.[1]?.gstatus === "CLOSED" ||
            odds?.[1]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <span className="title-15 f-bold">Odd</span>
        </div>
        <div className="dt20OEbox">
          {(odds?.[3]?.gstatus === "CLOSED" ||
            odds?.[3]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <ImClubs color="#000000" size={23} />
          <GiSpades color="#000000" size={23} />
        </div>
        <div className="dt20OEbox">
          {(odds?.[2]?.gstatus === "CLOSED" ||
            odds?.[2]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <ImDiamonds color="#ff0000" size={23} />
          <BiSolidHeart color="#ff0000" size={23} />
        </div>
      </div>
      <div className="w-100 d-flex justify-content-around align-items-center text-red">
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`]
            : 0}
        </span>
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`]
            : 0}
        </span>
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[3]?.sid}_card`]
            : 0}
        </span>
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[2]?.sid}_card`]
            : 0}
        </span>
      </div>
      <div className="w-100 text-end title-12">
        R-{parseFloat(odds?.[0]?.min)}-{formatNumber(odds?.[0]?.max)}
      </div>

      <div className="w-100 d-flex justify-content-around align-items-center mt-4">
        <GiSpades color="#000000" size={23} />
        <BiSolidHeart color="#ff0000" size={23} />
        <ImClubs color="#000000" size={23} />
        <ImDiamonds color="#ff0000" size={23} />
      </div>
      <div className="w-100 d-flex justify-content-around align-items-center mt-2">
        <div className="dt20OEbox">
          {(odds?.[4]?.gstatus === "CLOSED" ||
            odds?.[4]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <span className="title-15 f-bold">{odds?.[4]?.b1}</span>
        </div>
        <div className="dt20OEbox">
          {(odds?.[5]?.gstatus === "CLOSED" ||
            odds?.[5]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <span className="title-15 f-bold">{odds?.[5]?.b1}</span>
        </div>
        <div className="dt20OEbox">
          {(odds?.[7]?.gstatus === "CLOSED" ||
            odds?.[7]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <span className="title-15 f-bold">{odds?.[7]?.b1}</span>
        </div>
        <div className="dt20OEbox">
          {(odds?.[6]?.gstatus === "CLOSED" ||
            odds?.[6]?.gstatus === "SUSPENDED") && (
            <div className="dt20bLock"></div>
          )}
          <span className="title-15 f-bold">{odds?.[6]?.b1}</span>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-around align-items-center text-red">
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[4]?.sid}_card`]
            : 0}
        </span>
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[5]?.sid}_card`]
            : 0}
        </span>
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[7]?.sid}_card`]
            : 0}
        </span>
        <span className="title-14 f-bold">
          {data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${odds?.[6]?.sid}_card`]
            : 0}
        </span>
      </div>
      <div className="w-100 text-end title-12">
        R-{parseFloat(odds?.[4]?.min)}-{formatNumber(odds?.[4]?.max)}
      </div>
    </div>
  );
};

export default OddEven;
