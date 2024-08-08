import "./style.scss";

const CardBox = ({ data, odds }: any) => {
  return (
    <>
      <div
        className={
          data?.worli?.gstatus == 0
            ? "suspended abjcardContainer"
            : " abjcardContainer"
        }
        style={{ backgroundColor: "#72bbef", border: "0.5px solid #fff" }}
      >
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
            paddingTop: "17px",
            paddingBottom: "17px",
          }}
        >
          <span className="style">{odds === "L1" ? 1 : 6}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style">{odds === "L1" ? 2 : 7}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style">{odds === "L1" ? 3 : 8}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style">{odds === "L1" ? 4 : 9}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style">{odds === "L1" ? 5 : 0}</span>
        </div>
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
            flexDirection: "column",
          }}
        >
          <span className="fs-6 fw-bold ">
            {odds === "L1" ? "Line1" : "Line2"}
          </span>
          {odds === "L1" ? <div>1|2|3|4|5</div> : <div>6|7|8|9|0</div>}
        </div>
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
            flexDirection: "column",
          }}
        >
          <span className="fs-6 fw-bold">{odds === "L1" ? "ODD" : "EVEN"}</span>
          {odds === "L1" ? <div>1|3|5|7|9</div> : <div>2|4|6|8|0</div>}
        </div>
      </div>
    </>
  );
};

export default CardBox;
