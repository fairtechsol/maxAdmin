import { Form } from "react-bootstrap";
import SelectSearch from "../../../commonComponent/SelectSearch";
import CustomInput from "../../../commonComponent/input";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { searchList } from "../../../../store/actions/user/userActions";
import { getMorePlacedBets } from "../../../../store/actions/match/matchAction";
import CustomButton from "../../../commonComponent/button";

const UserBetModalForm = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inputFields, setInputFields] = useState({
    minAmount: "",
    maxAmount: "",
    ipAddress: "",
  });

  const options = [
    { value: "all", label: "All" },
    { value: "BACK,YES", label: "BACK" },
    { value: "LAY,NO", label: "LAY" },
  ];
  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  const { searchListData } = useSelector(
    (state: RootState) => state.user.userList
  );

  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        searchList({
          userName: value,
          createdBy: userDetail?.id,
        })
      );
    }, 500);
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputFields((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
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

      if (inputFields?.ipAddress) {
        filter += `&betPlaced.ipAddress=${inputFields?.ipAddress}`;
      }

      if (selectedUser) {
        filter += `&createBy=eq${selectedUser[0]?.value}`;
      }

      if (selectedOption && selectedOption.value !== "all") {
        filter += `&betType=inArr${JSON.stringify(
          selectedOption.value?.split(",")
        )}`;
      }

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
  useEffect(() => {
    if (searchListData) {
      const options = searchListData?.users?.map((user: any) => ({
        value: user.id,
        label: user.userName,
      }));
      setUserOptions(options);
    }
  }, [searchListData]);

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

      if (selectedUser) {
        filter += `&createBy=eq${selectedUser[0]?.value}`;
      }

      if (selectedOption && selectedOption?.value !== "all") {
        filter += `&betType=inArr${JSON.stringify(
          selectedOption?.value?.split(",")
        )}`;
      }

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

  return (
    <form
      className={`UserBetModalForm ${props.customClass}`}
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col-lg-4">
          <div className="row d-flex align-items-center">
            <div className="col-md-3">
              <Form.Label>Enter Code</Form.Label>
            </div>
            <div className="col-md-8">
              <SelectSearch
                defaultValue="- Select Your A/C. Type -"
                placeholder="- Select Your A/C. Type -"
                inputValue={inputValue}
                options={userOptions}
                value={selectedUser}
                onChange={(value: any) => {
                  if (value?.length > 1) {
                    let newValue = value[1];
                    setSelectedUser([newValue]);
                  } else if (value?.length === 0) {
                    setSelectedUser(null);
                  } else {
                    setSelectedUser(value);
                  }
                }}
                isMultiOption={true}
                isSearchable={true}
                onInputChange={(value: any) => {
                  setInputValue(value);
                  debouncedInputValue(value);
                }}
              />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-3">
              <Form.Group>IP Address</Form.Group>
            </div>
            <div className="col-md-8">
              <CustomInput
                placeholder="Enter IP Address"
                type="text"
                name="ipAddress"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6 offset-lg-2">
          <div className="row d-flex align-items-center">
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
                    placeholder="From"
                    value={inputFields.minAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <CustomInput
                  customstyle="w-50"
                  type="number"
                  name="maxAmount"
                  placeholder="To"
                  value={inputFields.maxAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col-md-3">
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
            </div>
            <div className="col-md-4">
              <CustomButton type="submit">Submit</CustomButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserBetModalForm;
