import { memo } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./tooltipCustom.scss";

function TooltipCustom({ children, title }: any) {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="custom-tooltip">
      {title}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      trigger={["hover", "click"]}
      delay={{ show: 250, hide: 1000 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
}

export default memo(TooltipCustom);
