const PlayerButton = ({ value1, value2, value3, value4, width, lock }: any) => {
  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
      <div>
        <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
          {value2 && value2}
        </span>
      </div>

      <div className="teenPatti-table-row" style={{ lineHeight: 1 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "4px",
          }}
        >
          <div
            className={
              lock
                ? "suspended teenPatti-table-item back-BackGround"
                : `teenPatti-table-item back-BackGround`
            }
            style={{ width: "50%" }}
          >
            <span className="f18-b my-2 fw-bold">
              {parseFloat(value1 ?? 0).toFixed(2)}
            </span>
            <span className="f10-b">{}</span>
          </div>
          <div
            className={
              lock
                ? "suspended teenPatti-table-item lay-BackGround"
                : `teenPatti-table-item lay-BackGround`
            }
            style={{ width: "50%" }}
          >
            <span className="f18-b my-2 fw-bold">
              {parseFloat(value4 ?? 0).toFixed(2)}
            </span>
            <span className="f10-b">{}</span>
          </div>
        </div>
      </div>

      <div>
        <span
          style={{ fontSize: "16px" }}
          className={`color-red${
            value3 && value3 > 0
              ? "color-green"
              : value3 < 0
              ? " color-red"
              : ""
          }`}
        >
          {value3 || 0}
        </span>
      </div>
    </div>
  );
};

export default PlayerButton;
