import React from "react";
import "./style.scss";
import BetStatusOverlay from "../commonComponent/betStatusOverlay";

interface props {
  bgColor?: string;
  rate: any;
  percent?: number | string;
  customClass?: string;
  overlay?: boolean;
  onClick?: any;
  style?: React.CSSProperties;
  active?: boolean;
}
function BackLayBox({
  customClass,
  bgColor,
  rate,
  percent,
  overlay,
  onClick,
  style,
  active,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div
      className={`backLay ${overlay ? "overlay" : ""}  ${
        customClass ? customClass : ""
      } bg-${bgColor}`}
      style={{ ...inlineStyle }}
    >
      <BetStatusOverlay>
        <div
          className={`backLayBox text-center d-flex flex-column cursor-pointer`}
        >
          <h5 className="backLay-rate f600 title-16 m-0">
            {parseInt(rate || 0) <= 0 || active ? "-" : rate}
          </h5>
          {percent && (
            <span className="backLay-percent title-10">{percent}</span>
          )}
        </div>
      </BetStatusOverlay>
    </div>
  );
}

export default BackLayBox;
