import { Form } from "react-bootstrap";
// import SelectSearch from "../../../commonComponent/SelectSearch";
import CustomInput from "../../../commonComponent/input";
import { useEffect, useState } from "react";
// import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
// import { searchList } from "../../../../store/actions/user/userActions";
import { getMorePlacedBets, getMorePlacedBetsReset } from "../../../../store/actions/match/matchAction";
import CustomButton from "../../../commonComponent/button";
import UserBetModalTable from ".";

const UserBetModalForm = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValue, setInputValue] = useState("all");
  // const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(true);
  const [inputFields, setInputFields] = useState({
    minAmount: "",
    maxAmount: "",
    ipAddress: "",
    userName: "",
  });
  // const { props.morePlacedBets } = useSelector(
  //   (state: RootState) => state.match.placeBets
  // );
  // const options = [
  //   { value: "all", label: "All" },
  //   { value: "BACK,YES", label: "BACK" },
  //   { value: "LAY,NO", label: "LAY" },
  // ];
  // const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  // const { searchListData } = useSelector(
  //   (state: RootState) => state.user.userList
  // );

  // const { userDetail } = useSelector((state: RootState) => state.user.profile);

  // const debouncedInputValue = useMemo(() => {
  //   return debounce((value) => {
  //     dispatch(
  //       searchList({
  //         userName: value,
  //         createdBy: userDetail?.id,
  //       })
  //     );
  //   }, 500);
  // }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputFields((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // const handleChange = (selectedOption: any) => {
  //   setSelectedOption(selectedOption);
  // };

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
      // if (selectedUser) {
      //   filter += `&createBy=eq${selectedUser[0]?.value}`;
      // }

      // if (selectedOption && selectedOption.value !== "all") {
      //   filter += `&betType=inArr${JSON.stringify(
      //     selectedOption.value?.split(",")
      //   )}`;
      // }

      dispatch(
        getMorePlacedBets({
          filter,
          matchId: props?.matchId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (searchListData) {
  //     const options = searchListData?.users?.map((user: any) => ({
  //       value: user.id,
  //       label: user.userName,
  //     }));
  //     setUserOptions(options);
  //   }
  // }, [searchListData]);
  useEffect(() => {
    const filtered = props?.morePlacedBets?.filter(
      (item: any) => item?.deleteReason === null
    );
    setFilteredItems(filtered);
    return () => {
      dispatch(getMorePlacedBetsReset());
    };
  }, []);
  
  

  const handleDelete = (type: any) => {
    if (type === "delete") {
      const filtered = props?.morePlacedBets?.filter(
        (item: any) => item?.deleteReason != null
      );
      setFilteredItems(filtered);
      setSelectedUser(false);
    } else {
      const filtered = props?.morePlacedBets?.filter(
        (item: any) => item?.deleteReason === null
      );
      setFilteredItems(filtered);
      setSelectedUser(true);
    }
  };

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

      // if (selectedUser) {
      //   filter += `&createBy=eq${selectedUser[0]?.value}`;
      // }

      // if (selectedOption && selectedOption?.value !== "all") {
      //   filter += `&betType=inArr${JSON.stringify(
      //     selectedOption?.value?.split(",")
      //   )}`;
      // }

      dispatch(
        getMorePlacedBets({
          filter,
          matchId: props?.matchId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRadioChange = (type: any) => {
    setInputValue(type);
    if (type === "back") {
      const filtered = props?.morePlacedBets?.filter(
        (item: any) => item?.betType === "BACK" || item?.betType === "back"
      );
      setFilteredItems(filtered);
    } else if (type === "lay") {
      const filtered = props?.morePlacedBets?.filter(
        (item: any) => item?.betType === "LAY" || item?.betType === "lay"
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(props.morePlacedBets);
    }
  };

  return (
    <form
      className={`UserBetModalForm ${props.customClass} `}
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
            backgroundColor: selectedUser ? "#556ee6" : "#eee",
            border: 0,
            color: selectedUser ? "#fff" : "#333",
            borderRadius: "5px",
          }}
          onClick={() => handleDelete("match")}
        >
          Matched Bets
        </button>
        <button
          style={{
            fontSize: "14px",
            padding: "6px",
            backgroundColor: selectedUser ? "#eee" : "#556ee6",
            border: 0,
            color: selectedUser ? "#333" : "#fff",
            borderRadius: "5px",
          }}
          onClick={() => handleDelete("delete")}
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
              <div className="col-md-12">
                <Form.Label>Usename</Form.Label>
              </div>
              <div className="col-md-12">
                <CustomInput
                  placeholder="Search Username"
                  type="text"
                  name="userName"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex-column d-flex align-items-start me-2 ms-2">
              <div className="col-md-12">
                <Form.Label>IP Address</Form.Label>
              </div>
              <div className="col-md-12">
                <CustomInput
                  placeholder="Enter IP Address"
                  type="text"
                  name="ipAddress"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex-column d-flex align-items-start">
              <div className="col-md-12">
                <Form.Label>Amount From</Form.Label>
              </div>
              <div className="col-md-12">
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
              <div className="col-md-12">
                <Form.Label>Amount To</Form.Label>
              </div>
              <div className="col-md-12">
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
            <div className="d-flex flex-row justify-content-between w-100 mt-2">
              <div className="d-flex flex-row justify-content-around align-items-center w-20">
                <div className="d-flex flex-row justify-content-around align-items-center w-25">
                  <input
                    type="radio"
                    name="betType"
                    id={inputValue}
                    onChange={() => handleRadioChange("all")}
                    defaultChecked
                  />
                  <span>All</span>
                </div>

                <div className="d-flex flex-row justify-content-around align-items-center w-25">
                  <input
                    type="radio"
                    name="betType"
                    id={inputValue}
                    onChange={() => handleRadioChange("back")}
                  />
                  <span>Back</span>
                </div>
                <div className="d-flex flex-row justify-content-around align-items-center w-25">
                  <input
                    type="radio"
                    name="betType"
                    id={inputValue}
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

export default UserBetModalForm;
