import { Outlet } from "react-router-dom";

const OtherLayout = () => {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};
export default OtherLayout;
