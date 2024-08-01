import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

const HeaderUserLock = ({ data }: any) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "userName", label: "UserName" },
    { id: "AccountType", label: "Account Type" },
    { id: "userActive", label: "userActive" },
    { id: "betActive", label: "betActive" },
  ];

  return (
    <>
      <CustomTable
        CustomTableClass=""
        striped
        tHeadTheme="bg-transparent text-white"
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {data?.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item?.userName} </td>
            <td>{item?.roleName} </td>
            <td>
              <Form>
                <Form.Check
                  aria-label="option 1"
                  checked={!item?.userBlock}
                  disabled={true}
                />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Check
                  aria-label="option 2"
                  checked={!item?.betBlock}
                  disabled={true}
                />
              </Form>
            </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default HeaderUserLock;
