import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./style.scss";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import { handleRoundId } from "../../../../helpers";
import RulesModal from "../../../commonComponent/rulesModal";
import { tprules } from "../../../../assets";
import CardResultBox from "../../../commonComponent/cardResultBox";
import UserBets from "../../../game/userBet";
//import TeenPattiTableRow from "./tableRow";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import TeenOpenResult from "./teenCard";
import OddsRateBox from "./oddsRateBox";
import { HandleCards } from "../../../commonComponent/cardsComponent";
//import { formatNumber } from "../../../../helpers";
const TeenPattiOpenComponent = () => {
  const [show, setShow] = useState(false);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  //const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  // const toggleDiv = (id: string) => {
  //   if (openDivIds.includes(id)) {
  //     setOpenDivIds(openDivIds.filter((openId) => openId !== id));
  //   } else {
  //     setOpenDivIds([...openDivIds, id]);
  //   }
  // };
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

  // cardArray?.forEach((card: any, index: any) => {
  //   if (index % 3 === 0) {
  //     groupedCards.push({ number: sectionNumber++, cards: [] });
  //   }

  //   groupedCards[groupedCards.length - 1].cards.push(card);
  // });

  if (cardArray?.length > 0) {
    for (let i = 0; i < 8; i++) {
      groupedCards.push({ number: sectionNumber++, cards: [] });

      groupedCards[groupedCards.length - 1]?.cards.push(cardArray?.[i]); // Index i is safe as long as i < 9

      if (cardArray[i + 9] !== undefined) {
        // Add bounds check
        groupedCards[groupedCards.length - 1]?.cards.push(cardArray?.[i + 9]);
      }

      if (cardArray[i + 18] !== undefined) {
        // Add bounds check
        groupedCards[groupedCards.length - 1]?.cards.push(cardArray?.[i + 18]);
      }
    }
  }

  console.log("dt", dragonTigerDetail);

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
                  <span
                    style={{
                      fontSize: "14px",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    RULES
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
                {/* <div className="teenPatti-table-row" style={{ lineHeight: 2 }}>
                  <div
                    style={{ width: "40%", border: "0.1px solid #fff" }}
                  ></div>
                  <div
                    style={{
                      width: "60%",
                      backgroundColor: "#72bbef",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "50%" }}
                    >
                      BACK(Min:{" "}
                      {
                        dragonTigerDetail?.dragonTigerDetail?.players?.player1
                          ?.min
                      }{" "}
                      Max:{" "}
                      {
                        dragonTigerDetail?.dragonTigerDetail?.players?.player1
                          ?.max
                      }
                      )
                    </div>
                    <div
                      className="teenPatti-table-item f12-b"
                      style={{ width: "50%" }}
                    >
                      (Min: {dragonTigerDetail?.pairsPlus?.pairPlus1?.min} Max:{" "}
                      {dragonTigerDetail?.pairsPlus?.pairPlus1?.max})
                    </div>
                  </div>
                </div> */}

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
                  {/* <div className="casino-box-row mb-4">
                    <div className="casino-nation-name casino-nation-name-bg">
                      <b>Total</b>
                    </div>
                    {dragonTigerDetail?.sections &&
                      dragonTigerDetail?.sections.map(
                        (section: any, index: any) => (
                          <OddsRateBox
                            key={index}
                            status={section?.dstatus}
                            rate={section?.drate}
                            profitLoss={
                              dragonTigerDetail?.profitLoss?.[
                                `${section?.mid}_${section?.dsectionid}_card`
                              ]
                            }
                          />
                        )
                      )}
                  </div> */}
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
