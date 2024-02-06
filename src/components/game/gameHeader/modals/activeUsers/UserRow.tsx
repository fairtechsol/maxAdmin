import { useParams } from "react-router-dom";
import { updateUserMatchLock } from "../../../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../../../store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const UserRow = ({ index, userName, userId, lock, type, setCheck }: any) => {
  const [userLock, setUserLock] = useState<boolean>(false);

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { statusSuccess, userMatchLock } = useSelector(
    (state: RootState) => state.match.placeBets
  );
  const handleChange = () => {
    try {
      dispatch(
        updateUserMatchLock({
          userId: userId,
          matchId: id,
          type: type,
          block: !lock,
          operationToAll: false,
        })
      );

      setTimeout(() => {
        setCheck((prev: boolean) => !prev);
      }, 300);
    } catch (e) {
      console.log(e);
    }
  };
  console.log("lock", lock);

  useEffect(() => {
    if (statusSuccess && userMatchLock?.userId == userId) {
      setUserLock((prev) => !prev);
    }
  }, [statusSuccess]);

  useEffect(() => {
    setUserLock(lock);
  }, [lock]);

  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{userName}</td>
      <td>
        <Form>
          <Form.Check
            aria-label="option 1"
            checked={userLock}
            onChange={handleChange}
          />
        </Form>
      </td>
    </tr>
  );
};

export default React.memo(UserRow);
