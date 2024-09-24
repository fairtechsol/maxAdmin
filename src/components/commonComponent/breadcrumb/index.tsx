import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment-timezone";
interface ItemObj {
  name: string;
}

interface Props {
  items: Array<ItemObj>;
  style?: React.CSSProperties;
}

function CustomBreadcrumb({ items, style }: Props) {
  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <div className="customBreadcrumb bg-secondary d-flex justify-content-between align-items-center text-white" style={{ ...inlineStyle }}>
      <Breadcrumb bsPrefix="breadcrumb m-0 d-flex align-items-center text-white">
        {items?.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            linkAs="span"
            className="title-16 f600 p-0"
          >
            {item?.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div className="title-16 f500">
        {moment(matchDetails?.startAt).format(
          "YYYY-MM-DD hh:mm:ss"
        )}
      </div>
    </div>
  );
}

export default CustomBreadcrumb;
