import React, { ReactNode, useState } from "react";
import "./style.scss";
import { MatchType } from "../../../utils/enum";
import CustomModal from "../modal";
import LockUser from "../../../components/game/gameHeader/userMarketLock/index";
import UserBookModal from "../../game/gameHeader/modals/userBookModal";
interface props {
  bgColor?: string;
  title: string;
  padding?: string | number;
  style?: React.CSSProperties;
  customClass?: string;
  children?: ReactNode;
  type: string;
  data?: any;
}

function MarketTableHeader({
  title,
  bgColor,
  padding,
  style,
  customClass,
  children,
  type,
  data,
}: props) {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showChildren, setShowChildren] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const handleButtonClick = () => {
    setModalTitle("Bet Lock"); 
    setShowModal(true); // Show the modal on button click
    setShowChildren(<LockUser data={data} type="match" />); 
  };

  const handleUserBookClick = () => {
    setModalTitle("User Book");
    setShowChildren(<UserBookModal data={data} />); 
    setShowModal(true); 
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
        {type === MatchType.MATCH_ODDS ? (
          <div className="float-right">
            <button onClick={handleButtonClick} className="btn btn-back">
              Bet Lock
            </button>
            <button
              className="btn btn-back"
              onClick={handleUserBookClick}
            >
              User Book
            </button>
          </div>
        ) : (
          <div className="float-right">
            <button className="btn btn-back" onClick={handleButtonClick}>
              Bet Lock
            </button>
          </div>
        )}

        <CustomModal show={showModal} setShow={setShowModal} title={modalTitle}>
          {showChildren}
        </CustomModal>
      </div>
    </>
  );
}

export default MarketTableHeader;
