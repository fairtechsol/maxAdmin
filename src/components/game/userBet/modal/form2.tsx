import { Form } from "react-bootstrap";
// import SelectSearch from "../../../commonComponent/SelectSearch";
import CustomInput from "../../../commonComponent/input";
import { useEffect, useState } from "react";
// import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
// import { searchList } from "../../../../store/actions/user/userActions";
import {
  getMorePlacedBets,
  getMorePlacedBetsReset,
} from "../../../../store/actions/match/matchAction";
import CustomButton from "../../../commonComponent/button";
import UserBetModalTable from ".";

const UserBetModalForm2 = ({ customClass, matchId, morePlacedBets }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);
  const [betType, setBetType] = useState("all");
  const [matchBetType, setMatchBetType] = useState("matched");
  const [inputFields, setInputFields] = useState({
    minAmount: "",
    maxAmount: "",
    ipAddress: "",
    userName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputFields((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      let filter = "";
      if (inputFields?.minAmount && inputFields?.maxAmount) {
        filter += `&amount=between${inputFields?.minAmount}|${inputFields?.maxAmount}`;
      } else if (inputFields?.minAmount) {
        filter += `&amount=gte${inputFields?.minAmount}`;
      } else if (inputFields?.maxAmount) {
        filter += `&amount=lte${inputFields?.maxAmount}`;
      }

      if (inputFields?.ipAddress != "" && inputFields?.ipAddress) {
        filter += `&ipAddress=eq${inputFields?.ipAddress}`;
      }
      if (inputFields?.userName) {
        filter += `&searchBy=user.userName&keyword=${inputFields?.userName}`;
      }

      dispatch(
        getMorePlacedBets({
          filter,
          matchId: matchId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange = (type: any) => {
    setBetType(type);
  };

  // const handleDelete = (type: any) => {
  //   if (type === "delete") {
  //     const filtered = morePlacedBets?.filter(
  //       (item: any) => item?.deleteReason != null
  //     );
  //     setFilteredItems(filtered);
  //     setSelectedUser(false);
  //   } else {
  //     const filtered = morePlacedBets?.filter(
  //       (item: any) => item?.deleteReason === null
  //     );
  //     setFilteredItems(filtered);
  //     setSelectedUser(true);
  //   }
  // };

  useEffect(() => {
    if (matchBetType === "matched") {
      let filteredMatchedBet = morePlacedBets?.filter(
        (item: any) => item?.deleteReason === null
      );
      if (betType === "all") {
        setFilteredItems(filteredMatchedBet);
      } else if (betType === "back") {
        const filtered = filteredMatchedBet?.filter((item: any) =>
          ["BACK", "YES", "back", "yes"].includes(item?.betType)
        );
        setFilteredItems(filtered);
      } else if (betType === "lay") {
        const filtered = filteredMatchedBet?.filter((item: any) =>
          ["LAY", "NO", "lay", "no"].includes(item?.betType)
        );
        setFilteredItems(filtered);
      }
    } else if (matchBetType === "deleted") {
      let filteredDeletedBet = morePlacedBets?.filter(
        (item: any) => item?.deleteReason !== null
      );
      if (betType === "all") {
        setFilteredItems(filteredDeletedBet);
      } else if (betType === "back") {
        const filtered = filteredDeletedBet?.filter((item: any) =>
          ["BACK", "YES", "back", "yes"].includes(item?.betType)
        );
        setFilteredItems(filtered);
      } else if (betType === "lay") {
        const filtered = filteredDeletedBet?.filter((item: any) =>
          ["LAY", "NO", "lay", "no"].includes(item?.betType)
        );
        setFilteredItems(filtered);
      }
    }
  }, [matchBetType, betType, morePlacedBets.length]);

  // useEffect(() => {
  //   const filtered = morePlacedBets?.filter(
  //     (item: any) => item?.deleteReason === null
  //   );
  //   setFilteredItems(filtered);
  // }, [morePlacedBets.length]);

  useEffect(() => {
    try {
      let filter = "";
      if (inputFields?.minAmount && inputFields?.maxAmount) {
        filter += `&amount=between${inputFields?.minAmount}|${inputFields?.maxAmount}`;
      } else if (inputFields?.minAmount) {
        filter += `&amount=gte${inputFields?.minAmount}`;
      } else if (inputFields?.maxAmount) {
        filter += `&amount=lte${inputFields?.maxAmount}`;
      }

      if (inputFields?.ipAddress) {
        filter += `&betPlaced.ipAddress=${inputFields?.ipAddress}`;
      }

      dispatch(
        getMorePlacedBets({
          filter,
          matchId: matchId,
        })
      );
      return () => {
        dispatch(getMorePlacedBetsReset());
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <form
      className={`UserBetModalForm ${customClass} `}
      onSubmit={handleSubmit}
    >
      <div
        className="d-flex flex-row w-100 align-items-start p-2"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <button
          style={{
            fontSize: "14px",
            padding: "6px",
            backgroundColor: matchBetType === "matched" ? "#556ee6" : "#eee",
            border: 0,
            color: matchBetType === "matched" ? "#fff" : "#333",
            borderRadius: "5px",
          }}
          onClick={() => setMatchBetType("matched")}
        >
          Matched Bets
        </button>
        <button
          style={{
            fontSize: "14px",
            padding: "6px",
            backgroundColor: matchBetType === "deleted" ? "#556ee6" : "#eee",
            border: 0,
            color: matchBetType === "deleted" ? "#fff" : "#333",
            borderRadius: "5px",
          }}
          onClick={() => setMatchBetType("deleted")}
        >
          Deleted Bets
        </button>
      </div>
      <div
        className="d-flex flex-column p-1"
        style={{ border: "1px solid #b6b4b4" }}
      >
        <div className="row">
          <div className="d-flex flex-row">
            <div className="flex-column d-flex align-items-start">
              <div className="">
                <Form.Label>Usename</Form.Label>
              </div>
              <div className="">
                <CustomInput
                  placeholder="Search Username"
                  type="text"
                  name="userName"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex-column d-flex align-items-start me-2 ms-2">
              <div className="">
                <Form.Label>IP Address</Form.Label>
              </div>
              <div className="">
                <CustomInput
                  placeholder="Enter IP Address"
                  type="text"
                  name="ipAddress"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex-column d-flex align-items-start">
              <div className="">
                <Form.Label>Amount From</Form.Label>
              </div>
              <div className="">
                <div className="d-flex">
                  <div className="me-2">
                    <CustomInput
                      // customstyle=" w-50"
                      type="number"
                      name="minAmount"
                      placeholder="Amount From"
                      value={inputFields.minAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-column d-flex align-items-start">
              <div className="">
                <Form.Label>Amount To</Form.Label>
              </div>
              <div className="">
                <div className="d-flex">
                  <div className="me-2">
                    <CustomInput
                      // customstyle="w-50"
                      type="number"
                      name="maxAmount"
                      placeholder="Amount To"
                      value={inputFields.maxAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-end">
              <CustomButton type="submit">Submit</CustomButton>
            </div>
            <div className="d-flex align-items-end ms-1">
              <CustomButton type="reset">Reset</CustomButton>
            </div>
          </div>

          <div className="col-lg-12">
            {/* <div className="flex-column d-flex align-items-start">
            <div className="col-md-3">
              <Form.Label>Amount</Form.Label>
            </div>
            <div className="col-md-8">
              <div className="d-flex">
                <div className="me-2">
                  <CustomInput
                    customstyle=" w-50"
                    type="number"
                    name="minAmount"
                    placeholder="Amount From"
                    value={inputFields.minAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <CustomInput
                  customstyle="w-50"
                  type="number"
                  name="maxAmount"
                  placeholder="Amount To"
                  value={inputFields.maxAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div> */}

            {/* <div className="col-md-3">
              <Form.Group>Bet Type</Form.Group>
            </div>
            <div className="col-md-3">
              <SelectSearch
                defaultValue={options[0]}
                options={options}
                placeholder="All"
                isMultiOption={false}
                name="betType"
                value={selectedOption}
                onChange={handleChange}
              />
            </div> */}
            <div className="d-flex flex-row justify-content-between w-100 mt-5">
              <div className="d-flex flex-row justify-content-around align-items-center w-20">
                <div className="d-flex flex-row justify-content-around align-items-center w-25">
                  <input
                    type="radio"
                    name="betType"
                    id={betType}
                    onChange={() => handleRadioChange("all")}
                    defaultChecked
                  />
                  <span>All</span>
                </div>

                <div className="d-flex flex-row justify-content-around align-items-center w-25">
                  <input
                    type="radio"
                    name="betType"
                    id={betType}
                    onChange={() => handleRadioChange("back")}
                  />
                  <span>Back</span>
                </div>
                <div className="d-flex flex-row justify-content-around align-items-center w-25">
                  <input
                    type="radio"
                    name="betType"
                    id={betType}
                    onChange={() => handleRadioChange("lay")}
                  />
                  <span>Lay</span>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-around align-items-center w-20">
                {/* <span>Total SODA: 1</span>
                <span>Total Amount : 100.00</span> */}
              </div>
            </div>
          </div>
        </div>
        <UserBetModalTable list={filteredItems} />
      </div>
    </form>
  );
};

export default UserBetModalForm2;
