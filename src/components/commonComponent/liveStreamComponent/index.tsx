import { memo, useState } from "react";
import { Col, Container, Ratio, Row } from "react-bootstrap";
import { getTvData } from "../../../utils/tvUrlGet";
import RightPanelContainer from "./RightPanelContainer";

interface LiveStreamComponentProps {
  url: string;
  eventId: string;
  matchType: string;
  setTvData: (val: any) => void;
}

const LiveStreamComponent = ({
  url,
  eventId,
  matchType,
  setTvData,
}: LiveStreamComponentProps) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  return (
    <RightPanelContainer
      title="Live Stream"
      setShowVideo={(e: any) => {
        if (!showVideo) {
          getTvData(eventId, setTvData, matchType, true);
        } else {
          setTvData((prev: any) => {
            return {
              ...prev,
              tvData: null,
            };
          });
        }
        setShowVideo(e);
      }}
    >
      {showVideo && (
        <Container className="p-0">
          <Row className="justify-content-md-center">
            <Col md={12}>
              <Ratio aspectRatio="16x9">
                <iframe
                  src={url}
                  title="Live Stream"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </Ratio>
            </Col>
          </Row>
        </Container>
      )}
    </RightPanelContainer>
  );
};

export default memo(LiveStreamComponent);
