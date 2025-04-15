import React from "react";
import { FiMonitor } from "react-icons/fi";
import BetTableHeader from "../BetTableHeader";
interface RightPanelContainerProps {
  title: string;
  children: React.ReactNode;
  setShowVideo: any;
}
const RightPanelContainer = ({
  title,
  setShowVideo,
  children,
}: RightPanelContainerProps) => {
  return (
    <>
      <BetTableHeader
        customClass="rounded-top-1  rounded-bottom-0 py-2"
        customTextClass="cursor-pointer text-white"
        title={title}
        rightComponent={
          <FiMonitor className="text-white" style={{ cursor: "pointer" }} />
        }
        setShowVideo={setShowVideo}
      />
      <div className="borderTable border rounded-bottom-1">{children}</div>
    </>
  );
};

export default RightPanelContainer;
