import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { useSelector } from "react-redux";
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
import { formatNumber, handleRoundId } from "../../../../helpers";
import { RootState } from "../../../../store/store";
import {
  cardGamesId,
  cardGamesType,
  cardUrl,
} from "../../../../utils/Constants";
import CardResultBox from "../../../commonComponent/cardResultBox";
import RulesModal from "../../../commonComponent/rulesModal";
import VideoFrame from "../../../commonComponent/videoFrame/VideoFrame";
import UserBets from "../../../game/userBet";
import Dragon20Result from "./dragonCard";
import "./style.scss";

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

  const [openDivIds, setOpenDivIds] = useState<string[]>([]);

  const toggleDiv = (id: string) => {
    if (openDivIds.includes(id)) {
      setOpenDivIds(openDivIds.filter((openId) => openId !== id));
    } else {
      setOpenDivIds([...openDivIds, id]);
    }
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
          <div style={{ width: "100%" }}>
            <div className="horseRacingTabHeader">
              <div>
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  {dragonTigerDetail?.name}
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
            <div style={{ width: "100%", backgroundColor: "#000" }}>
              <VideoFrame
                data={dragonTigerDetail}
                time={dragonTigerDetail?.videoInfo?.autotime}
                result={<Dragon20Result data={dragonTigerDetail?.videoInfo} />}
                id={`${cardUrl}${cardGamesId.dragonTigerLion}`}
              />
            </div>
          </div>
          <div>
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
                  <div className="dtlsubTitle-dtl">D</div>
                  <div className="dtlsubTitle-dtl">T</div>
                  <div className="dtlsubTitle-dtl">L</div>
                </div>
                {firstArr?.map((item: any, index: number) => (
                  <div
                    className="w-100 d-sm-flex flex-row mb-4"
                    style={{ height: "50px" }}
                    key={index}
                  >
                    <div className="dtlTitle-dtl ">
                      {item?.title}
                      <div className="w-50 d-flex flex-row justify-content-end align-items-center position-relative">
                        <div
                          onClick={() => toggleDiv(`demo${index}`)}
                          className="range-icon d-inline-block ms-1"
                        >
                          <i className="fas fa-info-circle float-right"></i>{" "}
                          <div
                            id={`demo${index}`}
                            className={`icon-range-dt1day collapse ${
                              openDivIds.includes(`demo${index}`) ? "show" : ""
                            }`}
                          >
                            R:<span>{parseFloat(item?.dragon?.min)}</span>-
                            <span>{formatNumber(item?.dragon?.max)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`dtlsubTitle-dtl me-2 back-BackGround ${
                        item?.dragon?.gstatus === "0" ? "locked" : ""
                      }`}
                    >
                      {item?.dragon?.b1 || 0}
                      <span
                        style={{
                          fontSize: "12px",
                          marginBottom: "-70px",
                          position: "absolute",
                        }}
                        className={`color-red${
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
                        }`}
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
                      className={`dtlsubTitle-dtl me-2 back-BackGround ${
                        item?.tiger?.gstatus === "0" ? "locked" : ""
                      }`}
                    >
                      {item?.tiger?.b1 || 0}
                      <span
                        style={{
                          fontSize: "12px",
                          marginBottom: "-70px",
                          position: "absolute",
                        }}
                        className={`color-red ${
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
                        }`}
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
                      className={`dtlsubTitle-dtl me-2 back-BackGround ${
                        item?.lion?.gstatus === "0" ? "locked" : ""
                      }`}
                    >
                      {item?.lion?.b1 || 0}
                      <span
                        style={{
                          fontSize: "12px",
                          marginBottom: "-70px",
                          position: "absolute",
                        }}
                        className={`color-red  ${
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
                        }`}
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
                  <div className="dtlsubTitle-dtl">D</div>
                  <div className="dtlsubTitle-dtl">T</div>
                  <div className="dtlsubTitle-dtl">L</div>
                </div>
                {secondArr?.map((item: any, index: any) => (
                  <div
                    className="w-100 d-sm-flex flex-row mb-4"
                    style={{ height: "50px" }}
                    key={index}
                  >
                    <div className="dtlTitle-dtl">
                      {item?.title}{" "}
                      <div className="w-50 d-flex flex-row justify-content-end align-items-center position-relative">
                        <div
                          onClick={() => toggleDiv(`${index}`)}
                          className="range-icon d-inline-block ms-1"
                        >
                          <i className="fas fa-info-circle float-right"></i>{" "}
                          <div
                            id={`${index}`}
                            className={`icon-range-dt1day collapse ${
                              openDivIds.includes(`${index}`) ? "show" : ""
                            }`}
                          >
                            R:<span>{parseFloat(item?.dragon?.min)}</span>-
                            <span>{formatNumber(item?.dragon?.max)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`dtlsubTitle-dtl me-2 back-BackGround ${
                        item?.dragon?.gstatus === "0" ? "locked" : ""
                      }`}
                    >
                      {item?.dragon?.b1 || 0}
                      <span
                        style={{
                          fontSize: "12px",
                          marginBottom: "-70px",
                          position: "absolute",
                        }}
                        className={`color-red ${
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
                        }`}
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
                      className={`dtlsubTitle-dtl me-2 back-BackGround ${
                        item?.tiger?.gstatus === "0" ? "locked" : ""
                      }`}
                    >
                      {item?.tiger?.b1 || 0}
                      <span
                        style={{
                          fontSize: "12px",
                          marginBottom: "-70px",
                          position: "absolute",
                        }}
                        className={`color-red${
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
                        }`}
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
                      className={`dtlsubTitle-dtl me-2 back-BackGround ${
                        item?.lion?.gstatus === "0" ? "locked" : ""
                      }`}
                    >
                      {item?.lion?.b1 || 0}
                      <span
                        style={{
                          fontSize: "12px",
                          marginBottom: "-70px",
                          position: "absolute",
                        }}
                        className={`color-red ${
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
                        }`}
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
