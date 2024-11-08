import React from "react";
import { Container } from "react-bootstrap";
import "./style.scss";
import ResultBetList from "../../../../commonComponent/resultBetList";
interface Props {
  data: {
    C1: string;
    C2: string;
  };
}

const BallByBallResultComponent: React.FC<Props> = ({ data }: any) => {
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="flex-row justify-content-around"
        style={{ display: "flex", marginBottom: "10px", marginTop: "10px" }}
      >
        {data?.result?.win && (
          <div className=" cricket20ballresult cricket20ballpopup d-sm-flex flex-row justify-content-center align-items-center">
              <img src="https://versionobj.ecoassetsservice.com/v17/static/front/img/balls/ball-blank.png"></img>
            <span>{data?.result?.desc}</span>
          </div>
        )}
      </div>
      {data?.bets?.count > 0 && (
        <div className="w-100 m-2">
          <ResultBetList
            bets={data?.bets?.rows ?? 12}
            total={data?.bets?.count}
          />
        </div>
      )}
    </Container>
  );
};

export default BallByBallResultComponent;
