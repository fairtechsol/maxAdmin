import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import service from "../../../service";
import {
  getSearchClientList,
  resetSearchUserList,
} from "../../../store/actions/user/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
import CustomModal from "../modal";

const UserLockModal = ({
  show,
  setShowModal,
}: {
  show: boolean;
  setShowModal: (val: boolean) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [users, setUsers] = useState([]);

  const permissions: any = localStorage.getItem("permissions");
  const parsedPermissions = JSON.parse(permissions);

  const handleSearch = () => {
    dispatch(
      getSearchClientList({
        userName: searchQuery,
        isUser: true,
      })
    );
  };

  const handleToggle = async (userDetail: any, field: any) => {
    try {
      if (transactionPassword) {
        const payload = {
          userId: userDetail?.id,
          betBlock:
            field === "betBlock" ? !userDetail?.betBlock : userDetail?.betBlock,
          userBlock:
            field === "userBlock"
              ? !userDetail?.userBlock
              : userDetail?.userBlock,
          transactionPassword: transactionPassword,
        };
        const resp: any = await service.post(
          ApiConstants.USER.LOCKUNLOCK,
          payload
        );
        if (resp?.status === "success") {
          setUsers((prevUsers: any) =>
            prevUsers.map((user: any) =>
              user.id === userDetail?.id
                ? { ...user, [field]: !user[field] }
                : user
            )
          );
        }
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

  useEffect(() => {
    if (!show) {
      setSearchQuery("");
      setTransactionPassword("");
      dispatch(resetSearchUserList());
    }
  }, [show]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <CustomModal
      headerStyle="bg-secondary py-2"
      title="User Detail"
      show={show}
      setShow={() => setShowModal(false)}
    >
      <div>
        <div className="d-flex align-items-center mb-3 row gap-2">
          <div className="d-flex">
            <input
              type="text"
              placeholder="Search user"
              onKeyDown={handleKeyDown}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control me-2 mb-2"
              style={{ width: "100%" }}
            />
            <span className="">
              <button onClick={handleSearch} className="btn btn-primary">
                Load
              </button>
            </span>
          </div>
          <div>
            <input
              placeholder="Transaction Code"
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
              className="form-control me-2"
              style={{ width: "200px" }}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              {(!parsedPermissions || parsedPermissions?.userLock) && (
                <th>User Lock</th>
              )}
              {(!parsedPermissions || parsedPermissions?.betLock) && (
                <th>Bet Lock</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.userName}</td>{" "}
                {(!parsedPermissions || parsedPermissions?.userLock) && (
                  <td>
                    <input
                      type="checkbox"
                      checked={user.userBlock}
                      onChange={() => handleToggle(user, "userBlock")}
                    />
                  </td>
                )}
                {(!parsedPermissions || parsedPermissions?.betLock) && (
                  <td>
                    <input
                      type="checkbox"
                      checked={user.betBlock}
                      onChange={() => handleToggle(user, "betBlock")}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomModal>
  );
};

export default memo(UserLockModal);
