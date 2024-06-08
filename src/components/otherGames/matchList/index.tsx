import { NavLink, useParams } from "react-router-dom";
import "./style.scss";

const NavComponent = ({ matchDetail }: any) => {
  const { marketId } = useParams();
  function formatMarkets(matchDetail: any) {
    const formattedArray = [];

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
          if (marketValue?.id && marketType !== "bookmaker") {
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

  const handleSort = (a: any, b: any) => {
    const extractParts = (type: any) => {
      const match = type.match(/^([a-zA-Z]+)(\d*\.\d+|\d+)?$/);
      const textPart = match ? match[1] : type;
      const numberPart = match && match[2] ? parseFloat(match[2]) : null;
      return { textPart, numberPart };
    };

    const aParts = extractParts(a.type);
    const bParts = extractParts(b.type);

    if (aParts.textPart < bParts.textPart) return -1;
    if (aParts.textPart > bParts.textPart) return 1;

    if (aParts.numberPart === null && bParts.numberPart === null) return 0;
    if (aParts.numberPart === null) return -1;
    if (bParts.numberPart === null) return 1;
    return aParts.numberPart - bParts.numberPart;
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="nav mb-3">
          {navItems
            ?.slice()
            ?.sort(handleSort)
            ?.map((item: any) => (
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
