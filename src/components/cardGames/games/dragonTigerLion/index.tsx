import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoInformationCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import Dragon20Result from "./dragonCard";
import "./style.scss";
import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import {
  A,
  dtrules,
  eight,
  eleven,
  five,
  four,
  nine,
  seven,
  six,
  ten,
  thirteen,
  three,
  twelve,
  two,
} from "../../../../assets";
import { handleRoundId } from "../../../../helpers";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import UserBets from "../../../game/userBet";
import SmoothDropdownModal from "./minMaxModal";

const cardImg = (type: any) => {
  return <img src={type} width={25} />;
};
const cardBlock = (type: any) => {
  return (
    <div>
      <span>{type}</span>{" "}
      {type != "Black" ? (
        <>
          <ImDiamonds color="#ff0000" /> <BiSolidHeart color="#ff0000" />
        </>
      ) : (
        <>
          <ImClubs color="#000000" /> <GiSpades color="#000000" />
        </>
      )}
    </div>
  );
};
const data1 = [
  {
    title: "Winner",
    type: "Winner",
    profitLoss: "0",
  },
  {
    title: cardBlock("Black"),
    type: "Black",
    profitLoss: "0",
  },
  {
    title: cardBlock("Red"),
    type: "Red",
    profitLoss: "0",
  },
  {
    title: "Odd",
    type: "Odd",
    profitLoss: "0",
  },
  {
    title: "Even",
    type: "Even",
    profitLoss: "0",
  },
  {
    title: cardImg(A),
    type: "A",
    profitLoss: "0",
  },
  {
    title: cardImg(two),
    type: "2",
    profitLoss: "0",
  },
  {
    title: cardImg(three),
    type: "3",
    profitLoss: "0",
  },
  {
    title: cardImg(four),
    type: "4",
    profitLoss: "0",
  },
];
const data2 = [
  {
    title: cardImg(five),
    type: "5",
    profitLoss: "0",
  },
  {
    title: cardImg(six),
    type: "6",
    profitLoss: "0",
  },
  {
    title: cardImg(seven),
    type: "7",
    profitLoss: "0",
  },
  {
    title: cardImg(eight),
    type: "8",
    profitLoss: "0",
  },
  {
    title: cardImg(nine),
    type: "9",
    profitLoss: "0",
  },
  {
    title: cardImg(ten),
    type: "10",
    profitLoss: "0",
  },
  {
    title: cardImg(eleven),
    type: "J",
    profitLoss: "0",
  },
  {
    title: cardImg(twelve),
    type: "Q",
    profitLoss: "0",
  },
  {
    title: cardImg(thirteen),
    type: "K",
    profitLoss: "0",
  },
];
const DragonTigerDesktop = () => {
  const [show, setShow] = useState(false);
  const [firstArr, setFirstArr] = useState(data1);
  const [secondArr, setSecondArr] = useState(data2);
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const handleModalOpen = (index: any) => {
    setOpenModalIndex(openModalIndex === index ? null : index);
  };

  useEffect(() => {
    const mergedArray = data1?.map((item1: any) => {
      const matchDragon = dragonTigerDetail?.dragonData?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      const matchTiger = dragonTigerDetail?.tigerData?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      const matchLion = dragonTigerDetail?.lionData?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      if (matchDragon || matchTiger || matchLion) {
        return {
          ...item1,
          dragon: matchDragon,
          tiger: matchTiger,
          lion: matchLion,
        };
      } else {
        return item1;
      }
    });
    const mergedArray2 = data2?.map((item1: any) => {
      const matchDragon = dragonTigerDetail?.dragonData?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      const matchTiger = dragonTigerDetail?.tigerData?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      const matchLion = dragonTigerDetail?.lionData?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      if (matchDragon || matchTiger || matchLion) {
        return {
          ...item1,
          dragon: matchDragon,
          tiger: matchTiger,
          lion: matchLion,
        };
      } else {
        return item1;
      }
    });
    setFirstArr(mergedArray);
    setSecondArr(mergedArray2);
  }, [dragonTigerDetail]);
  return (
    <div>
      <Row>
        <Col md={8}>
          <div style={{ width: "100%", height: "400px", margin: "5px" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
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
              style={{ width: "100%", height: "92%", backgroundColor: "#000" }}
            >
              <VideoFrame
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.dragonTigerLion}`}
              />
            </div>
          </div>
          <div style={{ height: "660px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "50%",
                  marginTop: "5%",
                  display: "flex",
                  flexDirection: "column",
                  border: "0.3px solid #c7c8ca",
                  marginLeft: "5px",
                }}
              >
                <div
                  className="w-100 d-sm-flex flex-row"
                  style={{ height: "30px" }}
                >
                  <div className="dtlTitle"></div>
                  <div className="dtlsubTitle">Dragon</div>
                  <div className="dtlsubTitle">Tiger</div>
                  <div className="dtlsubTitle">Lion</div>
                </div>
                {firstArr?.map((item: any, index: number) => (
                  <div
                    className="w-100 d-sm-flex flex-row"
                    style={{ height: "50px" }}
                    key={index}
                  >
                    <div className="dtlTitle">
                      {item?.title}
                      <div style={{ width: "45%", textAlign: "end" }}>
                        <span className="minmaxi">
                          <IoInformationCircle
                            color="#ffc742"
                            onClick={() => handleModalOpen(index)}
                          />
                          {openModalIndex === index && (
                            <SmoothDropdownModal
                              min={item?.dragon?.min}
                              max={item?.dragon?.max}
                              show={openModalIndex === index}
                              setShow={() => setOpenModalIndex(null)}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`dtlsubTitle ${
                        item?.dragon?.gstatus === "0" ? "suspended" : ""
                      }`}
                    >
                      {item?.dragon?.b1 || 0}
                      <span
                        style={{ fontSize: "12px" }}
                        className={
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                    <div
                      className={`dtlsubTitle ${
                        item?.tiger?.gstatus === "0" ? "suspended" : ""
                      }`}
                    >
                      {item?.tiger?.b1 || 0}
                      <span
                        style={{ fontSize: "12px" }}
                        className={
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                    <div
                      className={`dtlsubTitle ${
                        item?.lion?.gstatus === "0" ? "suspended" : ""
                      }`}
                    >
                      {item?.lion?.b1 || 0}
                      <span
                        style={{ fontSize: "12px" }}
                        className={
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  width: "50%",
                  marginTop: "5%",
                  display: "flex",
                  flexDirection: "column",
                  border: "0.3px solid #c7c8ca",
                }}
              >
                <div
                  className="w-100 d-sm-flex flex-row"
                  style={{ height: "30px" }}
                >
                  <div className="dtlTitle"> </div>
                  <div className="dtlsubTitle">Dragon</div>
                  <div className="dtlsubTitle">Tiger</div>
                  <div className="dtlsubTitle">Lion</div>
                </div>
                {secondArr?.map((item: any, index: any) => (
                  <div
                    className="w-100 d-sm-flex flex-row"
                    style={{ height: "50px" }}
                    key={index}
                  >
                    <div className="dtlTitle">
                      {item?.title}{" "}
                      <div style={{ width: "45%", textAlign: "end" }}>
                        <span className="minmaxi">
                          <IoInformationCircle
                            color="#ffc742"
                            onClick={() => handleModalOpen(index + 9)}
                          />
                          {openModalIndex === index + 9 && (
                            <SmoothDropdownModal
                              min={item?.dragon?.min}
                              max={item?.dragon?.max}
                              show={openModalIndex === index + 9}
                              setShow={() => setOpenModalIndex(null)}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`dtlsubTitle ${
                        item?.dragon?.gstatus === "0" ? "suspended" : ""
                      }`}
                    >
                      {item?.dragon?.b1 || 0}
                      <span
                        style={{ fontSize: "12px" }}
                        className={
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }
                      >
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.dragon?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                    <div
                      className={`dtlsubTitle ${
                        item?.tiger?.gstatus === "0" ? "suspended" : ""
                      }`}
                    >
                      {item?.tiger?.b1 || 0}
                      <span
                        style={{ fontSize: "12px" }}
                        className={
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }
                      >
                        {" "}
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.tiger?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                    <div
                      className={`dtlsubTitle ${
                        item?.lion?.gstatus === "0" ? "suspended" : ""
                      }`}
                    >
                      {item?.lion?.b1 || 0}
                      <span
                        style={{ fontSize: "12px" }}
                        className={
                          dragonTigerDetail?.profitLoss
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                              ]
                              ? dragonTigerDetail?.profitLoss[
                                  `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                                ] > 0
                                ? "color-green"
                                : dragonTigerDetail?.profitLoss[
                                    `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                                  ] < 0
                                ? "color-red"
                                : ""
                              : ""
                            : ""
                        }
                      >
                        {" "}
                        {dragonTigerDetail?.profitLoss
                          ? dragonTigerDetail?.profitLoss[
                              `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                            ]
                            ? dragonTigerDetail?.profitLoss[
                                `${dragonTigerDetail?.videoInfo?.mid}_${item?.lion?.sid}_card`
                              ]
                            : 0
                          : 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: "100%", margin: "5px" }}>
              <CardResultBox
                data={dragonTigerDetail}
                name={["D", "T", "L"]}
                type={cardGamesType.dragonTigerLion}
              />
            </div>
          </div>

          <RulesModal show={show} setShow={setShow} rule={dtrules} />
        </Col>
        <Col md={4}>
          <Container className="p-0" fluid>
            <Row>
              <Col md={12}>
                <UserBets matchId={dragonTigerDetail?.id} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default DragonTigerDesktop;
