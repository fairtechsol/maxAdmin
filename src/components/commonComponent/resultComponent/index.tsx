import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
// import CloseButton from 'react-bootstrap/CloseButton';
// import { RxCross2 } from "react-icons/rx";
// import moment from "moment";
import isMobile from "../../../utils/screenDimension";
import { handleRoundId } from "../../../helpers";
import { cardGamesType, cardGamesTypeNames } from "../../../utils/Constants";
import Dragon20ResultComponent from "../../cardGames/games/dt2020/resultModalComponent";
import AbjResultComponent from "../../cardGames/games/abj2/resultModalComponent";
import Teen20ResultComponent from "../../cardGames/games/teenpatti2020/resultModalComponent";
import Card32ResultComponent from "../../cardGames/games/card32A/resultModalComponent";
import Lucky7ResultComponent from "../../cardGames/games/lucky7/resultModalComponent";
import Lucky7BResultComponent from "../../cardGames/games/lucky7B/resultModalComponent";
import Dragon202ResultComponent from "../../cardGames/games/dragon2nd20/resultModalComponent";
import DragonTigerLionResultComponent from "../../cardGames/games/dragonTigerLion/resultModalComponent";
import DragonTigerOneDayResultComponent from "../../cardGames/games/dragontigerOneDay/resultModalComponent";
import Teen1DResultComponent from "../../cardGames/games/teenpatti1D/resultModalComponent";
import TeenOpenResultComponent from "../../cardGames/games/teenpattiOpen/resultModalComponent";
import Abj1ResultComponent from "../../cardGames/games/abj1/resultModalComponent";
import Race20ResultComponent from "../../cardGames/games/race20/resultModalComponent";
import Cricket5ResultComponent from "../../cardGames/games/cricket5/resultModalComponent";
import SuperOverResultComponent from "../../cardGames/games/superOver/resultModalComponent";
import Card32BResultComponent from "../../cardGames/games/cards32B/resultModalComponent";
import CasinoWarResultComponent from "../../cardGames/games/casinoWar/resultModalComponent";
import Poker1DayResultComponent from "../../cardGames/games/poker1Day/resultModalComponent";
import Poker6ResultComponent from "../../cardGames/games/poker6/resultModalComponent";
import Poker20ResultComponent from "../../cardGames/games/poker20/resultModalComponent";
import TeenTestResultComponent from "../../cardGames/games/teenPattiTest/resultModalComponent";
import CricketMatch20ResultComponent from "../../cardGames/games/cricketMatch_20/resultModalComponent";
import AmarAkbarAnthonyResultComponent from "../../cardGames/games/amarAkbarAnthony/resultModalComponent";
import BollywoodTableResultComponent from "../../cardGames/games/bollywoodTable/resultModalComponent";
import WorliResultComponent from "../../cardGames/games/worli/resultModalComponent";
import Bacarrat1ResultComponent from "../../cardGames/games/baccarat1/resultModalComponent";
import Bacarrat2ResultComponent from "../../cardGames/games/baccarat2/resultModalComponent";
import CardJResultComponent from "../../cardGames/games/3CardJ/resultModalComponent";
import CasinoMeterResultComponent from "../../cardGames/games/casinoMeter/resultModalComponent";
import QueenResultComponent from "../../cardGames/games/casinoQueen/resultModalComponent";
import moment from "moment-timezone";

interface ResultComponentProps {
  data: any;
  setfalse: any;
  type: keyof typeof cardGamesTypeNames;
}

export const ResultComponent: React.FC<ResultComponentProps> = ({
  data,
  setfalse,
  type,
}) => {

  const [date, setDate] = useState<any>();

  useEffect(() => {
    if (!date) {
      setDate(Date.now());
    }
  }, []);
  return (
    <Container style={{ padding: 0 }}>
      <div className="resultModalHeader">
        <span style={{ fontSize: "20px"}}>
          {cardGamesTypeNames[type]} RESULT
        </span>
        {/* <RxCross2 size={25} onClick={() => setfalse(false)} /> */}
        {/* <CloseButton onClick={() => setfalse(false)}   className="close text-white" /> */}
        {/* <Button  >×</Button> */}
        <span className="close" onClick={() => setfalse(false)}  >×</span>
      </div>
      <div
        className="resultModalSubHead"
        style={{ fontSize: isMobile ? "0.8rem" : "1.1rem" }}
      >
        <div>
          <span style={{ fontWeight: "bold" }}>Round Id:</span>
          <span>{type==="cricketv3"? data?.result?.mid:handleRoundId(data?.result?.mid)}</span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Match Time:</span>
          <span>
            {data?.createdAt
              ? moment(data?.createdAt).format("DD/MM/YYYY hh:mm:ss A")
              : moment(date).format("DD/MM/YYYY hh:mm:ss A")}
          </span>
        </div>
      </div>
      {type === cardGamesType?.dragonTiger20 ? (
        <Dragon20ResultComponent data={data} />
      ) : type === cardGamesType?.andarBahar2 ? (
        <AbjResultComponent data={data} />
      ) : type === cardGamesType?.teen20 ? (
        <Teen20ResultComponent data={data} />
      ) : type === cardGamesType?.card32 ? (
        <Card32ResultComponent data={data} />
      ) : type === cardGamesType?.lucky7 ? (
        <Lucky7ResultComponent data={data} />
      ) : type === cardGamesType?.lucky7B ? (
        <Lucky7BResultComponent data={data} />
      ) : type === cardGamesType?.dragonTiger202 ? (
        <Dragon202ResultComponent data={data} />
      ) : type === cardGamesType?.dragonTigerLion ? (
        <DragonTigerLionResultComponent data={data} />
      ) : type === cardGamesType?.teenOneDay ? (
        <Teen1DResultComponent data={data} />
      ) : type === cardGamesType?.dragonTigerOneDay ? (
        <DragonTigerOneDayResultComponent data={data} />
      ) : type === cardGamesType?.teenOpen ? (
        <TeenOpenResultComponent data={data} />
      ) : type === cardGamesType?.andarBahar1 ? (
        <Abj1ResultComponent data={data} />
      ) : type === cardGamesType?.superover ? (
        <SuperOverResultComponent data={data} />
      ) : type === cardGamesType?.race20 ? (
        <Race20ResultComponent data={data} />
      ) : type === cardGamesType?.cricketv3 ? (
        <Cricket5ResultComponent data={data} />
      ) : type === cardGamesType?.card32B ? (
        <Card32BResultComponent data={data} />
      ) : type === cardGamesType?.casinoWar ? (
        <CasinoWarResultComponent data={data} />
      ) : type === cardGamesType?.poker1Day ? (
        <Poker1DayResultComponent data={data} />
      ) : type === cardGamesType?.poker6 ? (
        <Poker6ResultComponent data={data} />
      ) : type === cardGamesType?.poker20 ? (
        <Poker20ResultComponent data={data} />
      ) : type === cardGamesType?.teenTest ? (
        <TeenTestResultComponent data={data} />
      ) : type === cardGamesType?.cmatch20 ? (
        <CricketMatch20ResultComponent data={data} />
      ) : type === cardGamesType?.amarAkbarAnthony ? (
        <AmarAkbarAnthonyResultComponent data={data} />
      ) : type === cardGamesType?.btable ? (
        <BollywoodTableResultComponent data={data} />
      ) : type === cardGamesType?.worli ? (
        <WorliResultComponent data={data} />
      ) : type === cardGamesType?.baccarat ? (
        <Bacarrat1ResultComponent data={data} />
      ) : type === cardGamesType?.baccarat2 ? (
        <Bacarrat2ResultComponent data={data} />
      ) : type === cardGamesType?.cardj ? (
        <CardJResultComponent data={data} />
      ) : type === cardGamesType?.cmeter ? (
        <CasinoMeterResultComponent data={data} />
      ) : type === cardGamesType?.queen ? (
        <QueenResultComponent data={data} />
      ) : (
        <></>
      )}
    </Container>
  );
};
