import { useState } from "react";
import CustomButton from "../../commonComponent/button";
import CustomModal from "../../commonComponent/modal";
import GameHeaderDropdown from "./dropdown";
import BookMarkerBook from "./modals/bookMarkersBook";
import UserBook from "./modals/userBook";
import ActiveUser from "./modals/activeUsers";
import "./style.scss";
const GameHeader = () => {
  const liveMarketModal = () => {
    alert("asjdh");
  };

  const [userBookShow, setUserBookShow] = useState(false);
  const [userBookmarkerShow, setBookmarkerShow] = useState(false);

  return (
    <>
      <div className="common-header mb-3">
        <div className="common-headerBox d-flex justify-content-end">
          <GameHeaderDropdown
            name="Live Market"
            options={[
              {
                name: "All Deactivate",
                clickHandle: () => {},
              },
              {
                name: "Otherwise 123",
                clickHandle: () => {
                  liveMarketModal();
                },
                children: <ActiveUser />,
              },
            ]}
          />
          <GameHeaderDropdown
            name="Live Market"
            options={[
              {
                name: "All Deactivate",
                clickHandle: () => {},
              },
              {
                name: "Otherwise",
                clickHandle: () => {},
                children: <ActiveUser />,
              },
            ]}
          />
          <CustomButton
            variant="secondary"
            type="submit"
            onClick={() => setUserBookShow(true)}
          >
            User Book
          </CustomButton>
          <CustomButton
            variant="secondary"
            type="submit"
            onClick={() => setBookmarkerShow(true)}
          >
            Bookmarkers Book
          </CustomButton>
          <CustomModal
            customClass="modalFull-90"
            show={userBookShow}
            setShow={setUserBookShow}
            title="View More Bet"
          >
            <UserBook />
          </CustomModal>

          <CustomModal
            customClass="modalFull-90"
            show={userBookmarkerShow}
            setShow={setBookmarkerShow}
            title="View More Bet"
          >
            <BookMarkerBook />
          </CustomModal>
        </div>
      </div>
    </>
  );
};

export default GameHeader;
