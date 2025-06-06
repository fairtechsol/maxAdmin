import { useParams } from "react-router-dom";
import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { updateUserMarketLock } from "../../../../store/actions/match/matchAction";
import "./style.scss";
const UserLockMarketWise = ({
    index,
    userName,
    userId,
    lock,
    data,
    setCheck,
    onCheckChange,
  }: any) => {
    const [userLock, setUserLock] = useState<boolean>(lock);
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
  //   session: "session",
  // overByOver: "overByover",
  // ballByBall: "ballByBall",
  // oddEven: "oddEven",
  // cricketCasino: "cricketCasino",
  // fancy1: "fancy1",
  // khado: "khado",
  // meter: "meter",
  
    const handleChange = () => {
      try {
        dispatch(
          updateUserMarketLock({
            userId: userId,
            matchId: id,
            betId: data.id,
            blockType: 0, //for session 1
            isLock: true,
            // sessionType: 
            // operationToAll: 
          })
        );
  
        setTimeout(() => {
          setCheck((prev: boolean) => !prev);
        }, 300);
      } catch (e) {
        console.error(e);
      }
    };
    return (
      <tr key={index}>
        <td>
          <div
            className={`custom-checkbox custom-control ${userLock ? "checked" : ""}`}
            onClick={() => {
              const newLockState = !userLock;
              onCheckChange(newLockState); 
              handleChange();
            }}
          >
            <input
              className="custom-control-input d-none"
              type="checkbox"
              id={`custom-checkbox-${index}`}
              checked={userLock}
              onChange={(e) => {setUserLock(e.target.checked);}}
            />
            <label className="custom-control-label" htmlFor={`custom-checkbox-${index}`}></label>
          </div>
        </td>
        <td>{userName}</td>
      </tr>
    );
  };
  
  export default React.memo(UserLockMarketWise);
