import { useEffect } from "react";
import HeaderGameLock from "./headerGameLock";
import "./style.scss";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUserHeaderDetail } from "../../store/actions/user/userActions";
import HeaderUserLock from "./headerUserLock";
import HeaderUserDetail from "./headerUserDetail";
import HeaderFancyBook from "./headerFancyBook";
import HeaderGameBook from "./headerGameBook";
const MainHeader = ({ userId }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { childUsersData } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    try {
      if (userId) {
        dispatch(getUserHeaderDetail(userId));
      }
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (
    <>
      <div className="searchTablesTheme">
        <div className="row">
          <div className="col-lg-6">
            <p className="title-20">Game Lock</p>
            <HeaderGameLock
              data={
                childUsersData && childUsersData?.gameLock
                  ? childUsersData?.gameLock
                  : []
              }
            />
          </div>
          <div className="col-lg-6">
            <p className="title-20">User Lock</p>
            <HeaderUserLock
              data={
                childUsersData && childUsersData?.userLock
                  ? childUsersData?.userLock
                  : []
              }
            />
          </div>
          <div className="col-lg-12">
            <p className="title-20">Game Book</p>
            <HeaderGameBook data={[]} />
          </div>
          <div className="col-lg-6">
            <p className="title-20">User Detail</p>
            <HeaderUserDetail
              data={
                childUsersData && childUsersData?.userDetails
                  ? childUsersData?.userDetails
                  : []
              }
            />
          </div>
          <div className="col-lg-6">
            <p className="title-20">Fancy Book</p>
            <HeaderFancyBook
              data={
                childUsersData && childUsersData?.betPlaced
                  ? childUsersData?.betPlaced
                  : []
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
