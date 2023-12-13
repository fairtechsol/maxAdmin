import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Column, TableConfig } from "../../models/tableInterface";
import CustomTable from "../commonComponent/table";

import { useDispatch } from "react-redux";
import { getUsers } from "../../store/actions/user/userActions";
import { AppDispatch } from "../../store/store";
import { ListClientData } from "./index.json";

const HeaderGameLock = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    { id: "eventName", label: "EventName" },
    { id: "username", label: "  UserName" },
    { id: "userActive", label: "  UserActive" },
    { id: "betActive", label: "  BetActive" },
    { id: "fancyActive", label: "  FancyActive" },
    // { id: "Checked", label: "Checked" },
  ];

  //   const { userList } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <CustomTable
        CustomTableClass=""
        striped
        tHeadTheme="bg-transparent text-white"
        columns={columns}
        itemCount={10}
        setTableConfig={setTableConfig}
      >
        {ListClientData()?.map((item: any, index: number) => (
          //   const { item,   } = item;
          <tr key={index}>
            {/* <td>{index++}</td> */}
            <td>{item?.eventName} </td>
            <td>{item?.userName} </td>
            {/* <td>{item?.userAcive} </td>
            <td>{item?.betActive} </td>
            <td>{item?.fancyActive} </td> */}
            <td>
              <Form>
                <Form.Check aria-label="option 1" />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Check aria-label="option 2" />
              </Form>
            </td>
            <td>
              <Form>
                <Form.Check aria-label="option 3" />
              </Form>
            </td>
          </tr>
        ))}
      </CustomTable>
    </>
  );
};

export default HeaderGameLock;
