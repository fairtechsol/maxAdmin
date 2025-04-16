import moment from "moment-timezone";
import React, { memo, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { getTvData } from "../../../utils/tvUrlGet";
import "./style.scss";
interface ItemObj {
  name: string;
}

interface CustomBreadcrumbProps {
  items: Array<ItemObj>;
  style?: React.CSSProperties;
  matchType?: string;
  url?: string;
  setTvData?: any;
}

function CustomBreadcrumb({
  items,
  style,
  matchType,
  url,
  setTvData,
}: CustomBreadcrumbProps) {
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const { matchDetails } = useSelector(
    (state: RootState) => state.match.matchListSlice
  );
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <>
      <div
        className="customBreadcrumb bg-secondary d-flex justify-content-between align-items-center text-white"
        style={{ ...inlineStyle }}
        onClick={() => {
          if (matchType !== "politics") {
            if (!showScoreBoard) {
              getTvData(
                matchDetails?.eventId,
                setTvData,
                matchType,
                false,
                true
              );
            } else {
              setTvData((prev: any) => {
                return {
                  ...prev,
                  scoreData: null,
                };
              });
            }
            setShowScoreBoard((prev: boolean) => !prev);
          }
        }}
      >
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
          {moment(matchDetails?.startAt).format("YYYY-MM-DD hh:mm:ss")}
        </div>
      </div>
      {matchType !== "politics" && showScoreBoard && (
        <div
          style={{
            height: "250px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
            width: "calc(100%-8px)",
          }}
        >
          <iframe
            style={{
              height: "100%",
              position: "absolute",
              width: "100%",
              left: 0,
              top: 0,
            }}
            src={url}
            title="Live Stream"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
    </>
  );
}

export default memo(CustomBreadcrumb);
