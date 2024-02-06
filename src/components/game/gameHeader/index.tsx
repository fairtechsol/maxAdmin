import React, { useEffect, useState } from "react";
import CustomButton from "../../commonComponent/button";
import CustomModal from "../../commonComponent/modal";
import GameHeaderDropdown from "./dropdown";
import ActiveUser from "./modals/activeUsers";
import BookMarkerBook from "./modals/bookMarkersBook";
import UserBook from "./modals/userBook";
import "./style.scss";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMatchLockAllChild,
  updateUserMatchLock,
  getUserDetailsOfLock,
} from "../../../store/actions/match/matchAction";

const GameHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userDetail } = useSelector((state: RootState) => state.user.profile);
  const { childStatus } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const { id } = useParams();
  const liveMarketModal = () => {
    dispatch(getMatchLockAllChild(id));
  };

  const [userBookShow, setUserBookShow] = useState(false);
  const [userBookmarkerShow, setBookmarkerShow] = useState(false);
  const [nameOption, setNameOption] = useState(false);

  useEffect(() => {
    try {
      dispatch(getUserDetailsOfLock(id));
    } catch (error) {
      console.warn(error);
    }
  }, [nameOption]);

  return (
    <>
      <div className="common-header mb-3">
        <div className="common-headerBox d-flex justify-content-end">
          <GameHeaderDropdown
            name="Bet Lock"
            options={[
              {
                name: childStatus?.allChildMatchDeactive
                  ? "All Deactive"
                  : "All Active",
                clickHandle: () => {
                  dispatch(
                    updateUserMatchLock({
                      userId: userDetail?.id,
                      matchId: id,
                      type: "match",
                      block: !childStatus?.allChildMatchDeactive,
                      operationToAll: true,
                    })
                  );
                  setTimeout(() => {
                    setNameOption(!nameOption);
                  }, 500);
                },
              },
              {
                name: "Userwise",
                clickHandle: () => {
                  liveMarketModal();
                },
                children: <ActiveUser type={"match"} />,
              },
            ]}
          />
          <GameHeaderDropdown
            name="Fancy Lock"
            options={[
              {
                name: childStatus?.allChildSessionDeactive
                  ? "All Deactive"
                  : "All Active",
                clickHandle: () => {
                  dispatch(
                    updateUserMatchLock({
                      userId: userDetail?.id,
                      matchId: id,
                      type: "session",
                      block: !childStatus?.allChildSessionDeactive,
                      operationToAll: true,
                    })
                  );
                  setTimeout(() => {
                    setNameOption(!nameOption);
                  }, 500);
                },
              },
              {
                name: "Userwise",
                type: "session",
                clickHandle: () => {
                  liveMarketModal();
                },
                children: <ActiveUser type={"session"} />,
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

export default React.memo(GameHeader);
