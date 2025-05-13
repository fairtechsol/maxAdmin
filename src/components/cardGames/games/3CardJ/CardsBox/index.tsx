import { useEffect, useState } from "react";
import CommonCardImg from "../CommonCardImg";

const CardBox = ({ title, odds, data, cards, cardClass, remark }: any) => {
  const [nat, setNat] = useState("");

  const arCards = cards?.ar?.split(",");
  const brCards = cards?.br?.split(",");

  const handlock = () => {
    if (odds?.gstatus === "0") {
      if (nat !== "") {
        setNat("");
      }

      return "suspended-box-3";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (odds?.gstatus === "0") {
      setNat("");
    }
  }, [odds?.gstatus === "0"]);

  return (
    <div>
      <div className={`abjcardContainer ${cardClass}`}>
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #000",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: "12px",
              display: "flex",
              justifyContent: "center",
            }}
            className={`color-red${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${
                          title === "Yes" ? 1 : 2
                        }_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss
              ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                ]
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                  ]
                : 0
              : 0}
          </span>
        </div>
        <div
          className={`${handlock()} p-3`}
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {odds?.rate ?? 0}
          </div>
          <CommonCardImg
            cardData={[
              "A",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "J",
              "Q",
              "K",
            ]}
            cardInfo={title === "Yes" ? arCards : brCards}
            data={data}
            setNat={setNat}
            nat={nat}
            title={title}
          />
          <div className="d-flex text-end" style={{ fontSize: "12px" }}>
            {remark}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBox;
