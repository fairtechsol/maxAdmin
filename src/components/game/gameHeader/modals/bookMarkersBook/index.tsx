import { useEffect, useState } from "react";
import { Column, TableConfig } from "../../../../../models/tableInterface";
import CustomTable from "../../../../commonComponent/table";
const BookMarkerBook = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    // { id: "sr", label: "S. NO" },
    { id: "username", label: "	User Name " },
    // { id: "nation", label: "nation " },
    // { id: "betType", label: "betType " },
    // { id: "amount", label: "amount " },
    // { id: "userRate", label: "userRate " },
    // { id: "placeDate", label: "placeDate " },
    // { id: "matchDate", label: "matchDate " },
    // { id: "ip", label: "ip " },
    // { id: "browserDetail", label: "browserDetail " },
    // { id: "Checked", label: "Checked " },
  ];

  const data: any = [
    {
      // username: "fuser1",
      // nation: "India",
      // betType: "Match1",
      // amount: "1000",
      // userRate: "94.5",
      // placeDate: "17-11-223",
      // matchDate: "17-11-223",
      // ip: "1000",
      // browserDetail: "http:",
    },
  ];
  return (
    <CustomTable
      // striped
      tHeadTheme="bg-primary text-white"
      columns={columns}
      itemCount={10}
      setTableConfig={setTableConfig}
    >
      {data?.map((item: any, index: number) => {
        const {
          username,
          // nation,
          // betType,
          // amount,
          // userRate,
          // placeDate,
          // matchDate,
          // ip,
          // browserDetail,
        } = item;

        return (
          <tr key={index}>
            {/* <td>{index++}</td> */}
            <td>{username}</td>
            {/* <td>{nation}</td>
            <td>{betType}</td>
            <td>{amount}</td>
            <td>{userRate}</td>
            <td>{placeDate}</td>
            <td>{matchDate}</td>
            <td>{ip}</td>
            <td>{browserDetail}</td> */}
            {/* <td>
                <Form>
                  <Form.Check aria-label="option 1" />
                </Form>
              </td> */}
          </tr>
        );
      })}
    </CustomTable>
  );
};

export default BookMarkerBook;
