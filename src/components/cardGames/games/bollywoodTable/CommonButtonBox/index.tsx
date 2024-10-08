import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";

const CommonButtonBox = ({ value1, value2, value3, width, lock }: any) => {
  return (
    <div className="commonButtonBoxContainer" style={{ width: width }}>
      <div>
        <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
          {parseFloat(value1 ?? 0).toFixed(2)}
        </span>
      </div>
      <div className={`tiePairbtn-theme back-BackGround ${lock ? "suspended" : ""}`}>
        <span>
          {value2 === "icon1" ? (
            <>
              <ImDiamonds color="#ff0000" />
              <BiSolidHeart color="#ff0000" />
            </>
          ) : value2 === "icon2" ? (
            <>
              <ImClubs color="#000000" />
              <GiSpades color="#000000" />
            </>
          ) : (
            value2
          )}
        </span>
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

export default CommonButtonBox;
