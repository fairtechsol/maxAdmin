import React, { useEffect, useState } from "react";
import CustomModal from "../modal";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchClientList,
  setLockUnlockUser,
} from "../../../store/actions/user/userActions";
import { toast } from "react-toastify";

const UserLockModal = ({
  show,
  setShowModal,
}: {
  show: boolean;
  setShowModal: any;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = () => {
    dispatch(
      getSearchClientList({
        userName: searchQuery,
        isUser: true,
      })
    );
  };

  const handleToggle = (userDetail: any, field: any) => {
    try {
      if (transactionPassword) {
        setUsers((prevUsers: any) =>
          prevUsers.map((user: any) =>
            user.id === userDetail?.id
              ? { ...user, [field]: !user[field] }
              : user
          )
        );
        const payload = {
          userId: userDetail?.id,
          betBlock:
            field === "betBlock" ? !userDetail?.betBlock : userDetail?.betBlock,
          userBlock:
            field === "userBlock"
              ? !userDetail?.userBlock
              : userDetail?.userBlock,
          transactionPassword: +transactionPassword,
        };
        dispatch(
          setLockUnlockUser({
            payload: payload,
          })
        );
      } else {
        toast.error("Transaction Code is Required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUsers(searchUserList?.users || []);
  }, [searchUserList]);

  console.log(transactionPassword, "abc");

  return (
    <CustomModal
      //   customClass="modalFull-90 w-50"
      headerStyle="bg-secondary py-2"
      title="User Detail"
      show={show}
      setShow={() => setShowModal(false)}
    >
      <div>
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            placeholder="Search user"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control me-2"
            style={{ width: "300px" }}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Load
          </button>
          <input
            placeholder="Transaction Code"
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)}
            className="form-control me-2"
            style={{ width: "200px" }}
          />
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>User Lock</th>
              <th>Bet Lock</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.userLock}
                    onChange={() => handleToggle(user, "userLock")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.betLock}
                    onChange={() => handleToggle(user, "betLock")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomModal>
  );
};

export default UserLockModal;
