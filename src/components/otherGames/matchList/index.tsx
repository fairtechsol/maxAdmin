import { NavLink, useParams } from "react-router-dom";
import "./style.scss";

const NavComponent = ({ matchDetail }: any) => {
  const { marketId } = useParams();
  function formatMarkets(matchDetail: any) {
    const formattedArray = [];

    // Iterate through each type of market
    for (const marketType in matchDetail) {
      const marketValue: any = matchDetail[marketType];
      if (typeof marketValue === "object" && marketValue !== null) {
        if (Array.isArray(marketValue) && marketType !== "quickBookmaker") {
          formattedArray.push(
            ...marketValue.map((market: any) => ({
              type: market?.type,
              id: market.id,
              name: market.name,
            }))
          );
        } else {
          if (marketValue?.id) {
            formattedArray.push({
              type: marketValue?.type,
              id: marketValue?.id,
              name: marketValue?.name,
            });
          }
        }
      }
    }

    return formattedArray;
  }

  const navItems: any = formatMarkets(matchDetail);

  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="nav mb-3">
          {navItems.map((item: any) => (
            <li key={item.id} className="nav-items">
              <NavLink
                to={`/admin/other_match_detail/${matchDetail?.id}/${item?.id}`}
                className={`market-tab-link ${
                  item?.id === marketId ? "active" : ""
                }`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavComponent;
