import React, { useEffect, useState } from "react";
import { back, club, diamond, heart, spade } from "../../../../../assets";

interface PlayingCardProps {
  number: string;
  type: string;
  lock?: boolean;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({
  number,
  type,
  lock,
}) => {
  return (
    <div
      style={{
        borderRadius: "2px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "100%",
        WebkitBackgroundSize: "cover",
        background: "white",
        height: "28px",
        width: "30px",
        padding: "0px",
      }}
    >
      {!lock ? (
        <>
          <span
            style={{
              color: type === "heart" || type === "diamond" ? "red" : "black",
              fontWeight: "800",
              lineHeight: "1.2",
              fontSize: "18px",
            }}
          >
            {number}
          </span>
          <Icons type={type} />
        </>
      ) : (
        <>
          <img src={back} width={30} height={40} />
        </>
      )}
    </div>
  );
};

interface IconsProps {
  type: string;
}

export const Icons: React.FC<IconsProps> = ({ type }) => {
  const renderImage = (src: string) => {
    return <img width={"15"} alt={type} src={src} />;
  };

  switch (type) {
    case "heart":
      return renderImage(heart);
    case "spade":
      return renderImage(spade);
    case "diamond":
      return renderImage(diamond);
    case "club":
      return renderImage(club);
    default:
      return null;
  }
};

interface HandleCardsProps {
  card: string;
}

export const HandleGameCards: React.FC<HandleCardsProps> = ({ card }) => {
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    setNumber(card?.substring(0, card.length - 2) || "");
    setType(card?.substring(card.length - 2, card.length) || "");
  }, [card]);

  if (card === "1") {
    return <PlayingCard number="0" type="" lock={true} />;
  }
  switch (type) {
    case "DD":
      return <PlayingCard number={number} type="heart" />;
    case "CC":
      return <PlayingCard number={number} type="club" />;
    case "HH":
      return <PlayingCard number={number} type="spade" />;
    case "SS":
      return <PlayingCard number={number} type="diamond" />;
    default:
      return null;
  }
};
