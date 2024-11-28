import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../../store/store";
import { updateUserMarketLock } from "../../../../store/actions/match/matchAction";

const UserLockMarketWise = ({ index, userName, userId, lock, data, setCheck }: any) => {
  const [userLock, setUserLock] = useState<boolean>(false);

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { statusSuccess, userMatchLock } = useSelector(
    (state: RootState) => state.match.placeBets
  );


  const handleChange = () => {
    try {
      dispatch(
        updateUserMarketLock({
          userId: userId,
          matchId: id,
          betId: data.id,
          blockType: 0,
        })
      );

      setTimeout(() => {
        setCheck((prev: boolean) => !prev);
      }, 300);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (statusSuccess && userMatchLock?.userId === userId) {
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

export default React.memo(UserLockMarketWise);
