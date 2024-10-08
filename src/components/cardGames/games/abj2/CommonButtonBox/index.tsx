import "../style.scss";
const CommonButtonBox = ({ name, value1, background, text, lock }: any) => {
  return (
    <div
      className={`commonButtonBoxContainerSbox-ab2 ${lock ? "locked" : ""}`}
      style={{ width: "100%", backgroundColor: background }}
    >
      <div className={``}>
        <span style={{ fontSize: "14px", fontWeight: "bolder", color: text }}>
          {name}
        </span>
      </div>
      <div>
        <span style={{ fontSize: "14px", color: text }}>{value1}</span>
      </div>
    </div>
  );
};

export default CommonButtonBox;
