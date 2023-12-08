import { RuleTableData } from "./index.json";
import "./style.scss";
import RuleTableheader from "./tableHeader";
interface Props {
  teamName: string;
}
const Rules = ({ teamName }: Props) => {
  return (
    <>
      <div className="ruleTable bg-white">
        <RuleTableheader teamName={teamName} />
        <div className="">
          <div className="ruleTable-divider"></div>
          <ul className="ruleTableList p-2 my-0 pb-1">
            {RuleTableData().map((item: any) => {
              return (
                <li className="ruleTableList-box d-flex justify-content-between title-14 mb-1">
                  <div className="ruleTableList-boxCard d-flex align-items-center ">
                    <span className="ruleTableList-boxCard-name title-16 fw-bold d-flex align-items-center justify-content-center">
                      {item?.cardName}
                    </span>
                    <span className="title-14 px-2">X</span>
                    <span className="ruleTableList-boxCard-count title-14 ">
                      {item?.cardCount}
                    </span>
                  </div>
                  <div className="ruleTableList-boxValue">
                    <span className="title-14 text-uppercase">
                      {item?.value}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="ruleTable-divider"></div>
          <p className="title-14 p-2">
            10 over match and maximum 10 wickets, if 2 cards drawn together then
            the cards will be shuffled and drawn again. All bets of Fancy and
            Fancy-1 markets will be valid if match gets drawn/tie, however the
            bets of bookmaker will be voided if match drawn/tie. Odd/even
            results will be given based on the total score by the end of the
            respective over. In case of wrong rate, bets based on that wrong
            rate in that particular event will be deleted(Rest all will remain
            valid)
          </p>
        </div>
      </div>
    </>
  );
};

export default Rules;
