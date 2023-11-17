import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import "./style.scss";

function UserBetModalTable() {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "username", label: "	User Name UserBetModal" },
    { id: "Checked", label: "Checked UserBetModal" },
  ];

  const data: any = [
    {
      username: "fuser1",
    },
    {
      username: "fuser2",
    },
    {
      username: "fuser05",
    },
  ];

  return (
    <div className="activeUsers-modal">
      <CustomTable
        // striped
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
        //  enablePdfExcel={true}
      >
        <tr>
          {/* {columns?.map((item, index) => {
            return (
              <td key={index} className=" fw-bold">
                {index === 1 && 173398}
              </td>
            );
          })} */}
        </tr>
        {data?.map((item: any, index: number) => {
          const { sr, username, creditReferance } = item;
          return (
            <tr key={index}>
              <td>{index++}</td>
              <td>{username}</td>
              <td>
                <Form>
                  <Form.Check aria-label="option 1" />
                </Form>
              </td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
}

export default UserBetModalTable;
