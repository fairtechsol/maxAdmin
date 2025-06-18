import { memo } from "react";
import { cardGamesTypeNames } from "../../../utils/Constants";
import "./style.scss";

const ProfitLossEventType = ({
  totalProLoss,
  customClass,
}: {
  totalProLoss: any;
  customClass: string;
}) => {
  let dataArray = [];

  for (let key in totalProLoss) {
    let obj: any = {};
    obj.name = key;
    obj.amount = totalProLoss[key];
    dataArray.push(obj);
  }

  return (
    <div className={`profitLossEventType ${customClass}`}>
      <h5 className="f400">Profit & Loss for Event type</h5>
      <div className="d-flex" style={{ gap: "12px", flexWrap: "wrap" }}>
        {dataArray?.map((item: any, index: number) => (
          <div
            key={index}
            className={`profitLossEventType-box d-flex ${
              +item?.amount
                ? +item?.amount >= 0
                  ? "bg-green"
                  : "bg-pdf"
                : "bg-green"
            } `}
          >
            <label className="text-white title-12">
              {cardGamesTypeNames[item?.name]
                ? cardGamesTypeNames[item?.name]
                : item?.name}
              :
            </label>
            <span className="text-white title-12">
              {parseFloat(item?.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ProfitLossEventType);
