import BackLayBox from "../backLayBox";
import CustomButton from "../commonComponent/button";
function Sample() {
  return (
    <>
      <CustomButton variant="danger">dsad</CustomButton>
      <h3>Sample </h3>

      <BackLayBox bgColor="blue1" rate={1.94} percent={11} />
      <BackLayBox bgColor="blue2" rate={1.94} percent={11} />
      <BackLayBox bgColor="blue3" rate={1.94} percent={11} />
      <BackLayBox bgColor="red1" rate={1.94} percent={11} />
      <BackLayBox bgColor="red2" rate={1.94} percent={11} />
      <BackLayBox bgColor="red3" rate={1.94} percent={11} />
    </>
  );
}

export default Sample;
