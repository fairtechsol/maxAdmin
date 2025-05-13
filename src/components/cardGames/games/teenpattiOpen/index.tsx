import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tprules } from "../../../../assets";
import { handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import { HandleCards } from "../../../commonComponent/cardsComponent";
import RulesModal from "../../../commonComponent/rulesModal";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import OddsRateBox from "./oddsRateBox";
import "./style.scss";
import TeenOpenResult from "./teenCard";
const TeenPattiOpenComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const rules = [
    { label: "Pair (Double)", value: "1 To 1" },
    { label: "Flush (Color)", value: "1 To 4" },
    { label: "Straight (Rown)", value: "1 To 6" },
    { label: "Trio (Teen)", value: "1 To 35" },
    { label: "Straight Flush (Pakki Rown)", value: "1 To 45" },
  ];

  const extractCardAndPlayerInfo = (cardsString: any) => {
    let cardsPart = cardsString;
    let playersPart = "";

    if (cardsString?.includes("#")) {
      [cardsPart, playersPart] = cardsString.split("#");
    }

    const cardsArray = cardsPart?.split(",");

    const playersArray = playersPart
      ? playersPart?.match(/\d+/g)?.map(Number)
      : [];

    return {
      cardsArray,
      playersArray,
    };
  };

  const { cardsArray: cardsArray1 } = extractCardAndPlayerInfo(
    dragonTigerDetail?.videoInfo?.cards
  );

  const players = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
    "Player 6",
    "Player 7",
    "Player 8",
  ];

  const cardArray = dragonTigerDetail?.videoInfo?.cards?.split(",");

  interface CardSection {
    number: number;
    cards: string[];
  }

  const groupedCards: CardSection[] = [];
  let sectionNumber = 1;

  if (cardArray?.length > 0) {
    for (let i = 0; i < 8; i++) {
      groupedCards.push({ number: sectionNumber++, cards: [] });

      groupedCards[groupedCards.length - 1]?.cards.push(cardArray?.[i]);

      if (cardArray[i + 9] !== undefined) {
        groupedCards[groupedCards.length - 1]?.cards.push(cardArray?.[i + 9]);
      }

      if (cardArray[i + 18] !== undefined) {
        groupedCards[groupedCards.length - 1]?.cards.push(cardArray?.[i + 18]);
      }
    }
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={{ margin: "5px" }}>
            <div>
              <div className="horseRacingTabHeader">
                <div>
                  <span style={{ fontSize: "16px", fontWeight: "600" }}>
                    OPEN TEENPATTI
                  </span>
                </div>
                <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}`
                    : ""}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#000",
                }}
              >
                <VideoFrame
                  data={dragonTigerDetail}
                  time={dragonTigerDetail?.videoInfo?.autotime}
                  result={<TeenOpenResult data={cardsArray1} />}
                  id={`${cardUrl}${cardGamesId.teenOpen}`}
                />
              </div>
            </div>
            <div>
              <div
                className="teenPatti-table-container"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="teenpattiopen casino-open-card-box">
                  {groupedCards?.map((section) => (
                    <div key={section.number}>
                      <div>
                        <b>{section.number}</b>
                      </div>
                      <div>
                        {section?.cards?.map(
                          (cardSrc: string, index: number) => (
                            <span key={index}>
                              <HandleCards card={cardSrc} />
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="teentestother">
                  <div className="casino-box-header">
                    <div className="casino-nation-name no-border"></div>

                    {players.map((player, index) => (
                      <div className="casino-bl-box" key={index}>
                        <span
                          className=" casino-bl-box-item"
                          style={{ fontSize: "12px" }}
                        >
                          {player}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="casino-box-row mb-4">
                    <div className="casino-nation-name casino-nation-name-bg">
                      <b>Odds</b>
                    </div>
                    {dragonTigerDetail?.players &&
                      Object?.keys(dragonTigerDetail.players)?.map(
                        (key, index) => {
                          const section = dragonTigerDetail.players[key];
                          return (
                            <OddsRateBox
                              key={index}
                              status={section?.gstatus}
                              rate={section?.rate}
                              profitLoss={
                                dragonTigerDetail?.profitLoss?.[
                                  `${section?.mid}_${section?.section}_card`
                                ]
                              }
                            />
                          );
                        }
                      )}
                  </div>
                  <div className="casino-box-row mb-4">
                    <div className="casino-nation-name casino-nation-name-bg">
                      <b>Pair Plus</b>
                    </div>
                    {dragonTigerDetail?.pairsPlus &&
                      Object?.keys(dragonTigerDetail.pairsPlus)?.map(
                        (key, index) => {
                          const section = dragonTigerDetail.pairsPlus[key];
                          return (
                            <OddsRateBox
                              key={index}
                              status={section?.gstatus}
                              rate={section?.rate}
                              profitLoss={
                                dragonTigerDetail?.profitLoss?.[
                                  `${section?.mid}_${section?.section}_card`
                                ]
                              }
                            />
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <CardResultBox
                  data={dragonTigerDetail}
                  name={["R", "R", "R"]}
                  type={cardGamesType.teenOpen}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} className="ps-0">
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
              <Col>
                <div className="casino-title" style={{ position: "relative" }}>
                  <span>Rules</span>
                </div>
                <div className="table-responsive rules-table">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th colSpan={2} className="box-10 text-center">
                          Pair Plus
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules.map((item, index) => (
                        <tr key={index}>
                          <td className="box-7">{item.label}</td>
                          <td className="box-3">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <RulesModal show={show} setShow={setShow} rule={tprules} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default TeenPattiOpenComponent;
