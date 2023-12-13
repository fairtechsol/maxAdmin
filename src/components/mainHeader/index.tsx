import HeaderGameLock from "./headerGameLock";
import "./style.scss";
const MainHeader = () => {
  return (
    <>
      <div className="searchTablesTheme">
        <div className="row">
          <div className="col-lg-6">
            <p className="title-20">Game Lock</p>
            <HeaderGameLock />
          </div>
          <div className="col-lg-6">
            <p className="title-20">User Lock</p>
            <HeaderGameLock />
          </div>
          <div className="col-lg-12">
            <p className="title-20">Game Book</p>
            <HeaderGameLock />
          </div>
          <div className="col-lg-6">
            <p className="title-20">User Detail</p>
            <HeaderGameLock />
          </div>
          <div className="col-lg-6">
            <p className="title-20">Fancy Book</p>
            <HeaderGameLock />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
