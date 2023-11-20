import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Column, TableConfig } from "../../../../../models/tableInterface";
import CustomTable from "../../../../commonComponent/table";
import "./style.scss";
function ActiveUser() {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "sr", label: "S. NO" },
    { id: "username", label: "  User Name" },
    { id: "Checked", label: "Checked" },
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
      >
        {data?.map((item: any, index: number) => {
          const { username } = item;
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

export default ActiveUser;
