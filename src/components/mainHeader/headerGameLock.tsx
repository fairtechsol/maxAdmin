import { memo, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

const HeaderGameLock = ({
  data,
  userDetail,
}: {
  data: any;
  userDetail: any;
}) => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "eventName", label: "EventName" },
    { id: "username", label: "UserName" },
    { id: "userActive", label: "UserActive" },
    { id: "betActive", label: "BetActive" },
    { id: "fancyActive", label: "FancyActive" },
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
            <td>{item?.match[0]?.title}</td>
            <td>{item?.blockByUser[0]?.userName}</td>
            <td>
              <Form>
                <Form.Check
                  aria-label="option 1"
                  checked={!userDetail[0]?.userBlock}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Check
                  aria-label="option 2"
                  checked={item?.matchLock}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Check
                  aria-label="option 3"
                  checked={item?.sessionLock}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form>
            </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default memo(HeaderGameLock);
