import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import "./style.scss";

function UserBetModalTable() {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "username", label: "	User Name " },
    { id: "nation", label: "Nation " },
    { id: "betType", label: "BetType " },
    { id: "amount", label: "Amount " },
    { id: "userRate", label: "UserRate " },
    { id: "placeDate", label: "PlaceDate " },
    { id: "matchDate", label: "MatchDate " },
    { id: "ip", label: "IP " },
    { id: "browserDetail", label: "BrowserDetail " },
    // { id: "Checked", label: "Checked " },
  ];

  const data: any = [
    {
      username: "fuser1",
      nation: "India",
      betType: "Match1",
      amount: "1000",
      userRate: "94.5",
      placeDate: "17-11-223",
      matchDate: "17-11-223",
      ip: "1000",
      browserDetail: "http:",
    },
    {
      username: "fuser1",
      nation: "India",
      betType: "Match1",
      amount: "1000",
      userRate: "94.5",
      placeDate: "17-11-223",
      matchDate: "17-11-223",
      ip: "1000",
      browserDetail: "http:",
    },
    {
      username: "fuser1",
      nation: "India",
      betType: "Match1",
      amount: "1000",
      userRate: "94.5",
      placeDate: "17-11-223",
      matchDate: "17-11-223",
      ip: "1000",
      browserDetail: "http:",
    },
  ];

  return (
    <div className="activeUsers-modal">
      <CustomTable
        // striped
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
      >
        {data?.map((item: any, index: number) => {
          const {
            username,
            nation,
            betType,
            amount,
            userRate,
            placeDate,
            matchDate,
            ip,
            browserDetail,
          } = item;

          return (
            <tr key={index}>
              <td>{index++}</td>
              <td>{username}</td>
              <td>{nation}</td>
              <td>{betType}</td>
              <td>{amount}</td>
              <td>{userRate}</td>
              <td>{placeDate}</td>
              <td>{matchDate}</td>
              <td>{ip}</td>
              <td>{browserDetail}</td>
              {/* <td>
                <Form>
                  <Form.Check aria-label="option 1" />
                </Form>
              </td> */}
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
}

export default UserBetModalTable;
