import { NavLink, useParams } from "react-router-dom";
import "./index.scss";
import { Col, Row } from "react-bootstrap";
import { card3 } from "../../../utils/Constants";

type Card3Keys = keyof typeof card3;

const typeToTitle: { [key: string]: string } = {
  dragonTiger: "DRAGON TIGER",
  teenPatti: "LIVE TEENPATTI",
  lucky7: "LUCKY7",
  cards32: "CARDS32",
  abj: "ANDAR BAHAR",
  sportCasino: "SPORTS CASINO",
  poker: "LIVE POKER",
  bollywoodCasino: "BOLLYWOOD CASINO",
  worli: "WORLI",
  "3cardj": "3 CARD Judgement",
  baccarat: "BACCARAT",
};

const CardsList = () => {
  const { listType } = useParams<{ listType: string }>();

  if (!listType || !(listType in card3)) {
    return <div>Invalid game</div>;
  }

  const title = typeToTitle[listType] || "";

  return (
    <>
      <p className="cardList-title">{title}</p>
      <Row>
        {card3[listType as Card3Keys]?.map((item: any) => (
          <Col key={item?.id} xs={12} sm={6} md={4} className="mb-4">
            <div className={"d-flex card-List"}>
              {item?.url?.includes("contact-admin") ? (
                <img src={item.imgSrc} className="img-fluid" alt={item.name} />
              ) : (
                <NavLink to={item?.url}>
                  <img
                    src={item.imgSrc}
                    className="img-fluid"
                    alt={item.name}
                    style={{ width: "600px", height: "250px" }}
                  />
                </NavLink>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CardsList;
