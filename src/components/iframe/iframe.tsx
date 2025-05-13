import { memo } from "react";
import "./style.scss";

const Iframe = ({ data, width }: any) => {
  return (
    <div className="m-scorecard" style={{ width: width }}>
      <div className="row">
        <div className="col-12 ">
          <p className="team-1 row" style={{ fontSize: "12px" }}>
            <span className=" col-2">{data?.spnnation1}</span>
            <span className=" col-5 text-end">{data?.score1}</span>
            {data?.spnrunrate1 && (
              <div className="col-5 d-flex justify-content-start">
                <span className="me-2">CRR {data?.spnrunrate1}</span>
                {data?.spnreqrate1 && (
                  <span className="d-inline ms-2">RR {data?.spnreqrate1}</span>
                )}
              </div>
            )}
          </p>
          <p className="team-1 row mt-2" style={{ fontSize: "12px" }}>
            <span className="team-name col-2">{data?.spnnation2}</span>
            <span className="score col-5 text-end">{data?.score2}</span>
            {data?.spnrunrate2 && (
              <div className="col-5 d-flex justify-content-start">
                <span className="d-inline">CRR {data?.spnrunrate2}</span>
                {data?.spnreqrate2 && (
                  <span className="d-inline ms-2">RR {data?.spnreqrate2}</span>
                )}
              </div>
            )}
          </p>

          <div className="col-12 d-flex align-items-center justify-content-xl-start">
            <div className="row">
              <div className="col-12">
                {data?.spnmessage && (
                  <div
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {data?.dayno} {data?.dayno ? "|" : ""} {data?.spnmessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 ">
        <div className="row">
          <div className="col-12">
            <p className="text-xl-end ball-by-ball mt-2 mb-0">
              {data?.balls?.map((ball: any, index: any) => {
                return ball == "" ? (
                  ""
                ) : (
                  <span
                    key={index}
                    className={`ball-runs ${
                      ball === "4" || ball === "6" ? "four" : ""
                    }`}
                    style={{
                      backgroundColor:
                        ball === "ww"
                          ? "#FF0000"
                          : ball === "4"
                          ? "#087F23"
                          : ball === "6"
                          ? "#883997"
                          : "#08c",
                      fontSize: "12px",
                    }}
                  >
                    {ball}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Iframe);
