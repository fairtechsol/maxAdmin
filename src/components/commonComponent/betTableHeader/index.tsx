import React, { ReactNode, useState } from "react";
import "./style.scss";
import { MatchType } from "../../../utils/enum";
import CustomModal from "../modal";
import ActiveUsers from "../../game/gameHeader/modals/activeUsers";
interface props {
  bgColor?: string;
  title: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  children?: ReactNode;
  type: string;
}

function BetTableHeader({
  title,
  bgColor,
  padding,
  style,
  customClass,
  children,
  type,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showChildren,setShowChildren ] = useState<React.ReactNode>(null);
  const handleButtonClick = () => {
    setShowModal(true); // Show the modal on button click
    setShowChildren(<ActiveUsers type="match" />); // Show ActiveUser content in modal
    console.log("Bet Lock clicked");
  };
  return (
    <>
      <div
        className={`tableHeader text-white d-flex f600 bg-${
          bgColor ? bgColor : "secondaryLight"
        } ${padding ? padding : "px-2"} ${customClass ?? ""}
      `}
        style={{ ...inlineStyle }}
      >
        <span className="title-14  text-white">{title}</span>
        {children}
        {type === "" ? null : type === MatchType.MATCH_ODDS ? (
          <div className="float-right">
            <button
            onClick={handleButtonClick}
              className="btn btn-back"
            >
              Bet Lock
            </button>
            <button
              className="btn btn-back"
              onClick={() => console.log("User Book clicked")}
            >
              User Book
            </button>
            
          </div>
        ) : (
          <button
            className="btn btn-back"
            onClick={handleButtonClick}
          >
            Bet Lock
          </button>
        )}
        <CustomModal show={showModal} setShow={setShowModal} title="Active User">
        {showChildren}
      </CustomModal>
      </div>
    </>
  );
}

export default BetTableHeader;
