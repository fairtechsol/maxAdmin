import CustomButton from "../../commonComponent/button";
import GameHeaderDropdown from "./dropdown";
import "./style.scss";

const GameHeader = () => {
  return (
    <>
      <div className="common-header mb-3">
        <div className="common-headerBox d-flex justify-content-end">
          <GameHeaderDropdown
            name="Live Market"
            options={[
              { name: "All Deactivate", clickHandle: () => {} },
              { name: "Otherwise", clickHandle: () => {} },
            ]}
          />
          <GameHeaderDropdown
            name="Live Market"
            options={[
              { name: "All Deactivate", clickHandle: () => {} },
              { name: "Otherwise", clickHandle: () => {} },
            ]}
          />
          <CustomButton variant="secondary" type="submit">
            User Book
          </CustomButton>
          <CustomButton variant="secondary" type="submit">
            Bookmarkers Book
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default GameHeader;
