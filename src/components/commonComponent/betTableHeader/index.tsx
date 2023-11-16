import React from "react";
import "./style.scss";
interface props {
  bgColor?: string;
  title: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
}

function BetTableHeader({
  title,
  bgColor,
  padding,
  style,
  customClass,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div
      className={`tableHeader bg-${bgColor ? bgColor : "secondaryLight"} ${
        padding ? padding : "px-2"
      } ${customClass ?? ""}
      `}
      style={{ ...inlineStyle }}
    >
      <span className="title-14 f600 text-black">{title}</span>
    </div>
  );
}

export default BetTableHeader;
