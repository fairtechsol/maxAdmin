import { Col, Container, Ratio, Row } from "react-bootstrap";
import RightPanelContainer from "./RightPanelContainer";
import { useState } from "react";
import { liveStreamUrl } from "../../../utils/Constants";

const LiveStreamComponent = ({ eventId, sportId }: any) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  return (
    <>
      <RightPanelContainer title={"Live Stream"} setShowVideo={setShowVideo}>
        {showVideo && (
          <Container className="p-0">
            <Row className="justify-content-md-center">
              <Col md={12}>
                <Ratio aspectRatio="16x9">
                  <iframe
                    src={`${liveStreamUrl}${eventId}&sportid=${sportId}`}
                    title="Live Stream"
                    referrerPolicy={"strict-origin-when-cross-origin"}
                  ></iframe>
                </Ratio>
              </Col>
            </Row>
          </Container>
        )}
      </RightPanelContainer>
    </>
  );
};

export default LiveStreamComponent;
