import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Column, TableConfig } from "../../../../models/tableInterface";
import CustomTable from "../../../commonComponent/table";
import "../style.scss";

const AccountStatementModal = () => {
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  useEffect(() => {}, [tableConfig]);
  const columns: Column[] = [
    // { id: "sr", label: "sr" },
    { id: "DefaultBlue", label: "	DefaultBlue" },
    { id: "UserName", label: "UserName" },
    { id: "Nation", label: "Nation" },
    { id: "UserRate", label: "UserRate" },
    { id: "Amount", label: "Amount" },
    { id: "Winloss", label: "Winloss" },
    { id: "PlaceDate", label: "PlaceDate" },
    { id: "MatchDate", label: "MatchDate" },
    { id: "IP", label: "IP" },
    { id: "BrowseDetail", label: "BrowseDetail" },
  ];

  const data: any = [
    {
      DefaultBlue: "Maccount",
      UserName: "Maccount",
      Nation: "Anthony",
      UserRate: "4.45",
      Amount: "100",
      Winloss: "100",
      PlaceDate: "2023-11-14 15:15:08",
      MatchDate: "2023-11-14 15:15:08",
      IP: "s",
      BrowseDetail: "das",
    },
    {
      DefaultBlue: "Maccount",
      UserName: "Maccount",
      Nation: "Anthony",
      UserRate: "4.45",
      Amount: "100",
      Winloss: "100",
      PlaceDate: "2023-11-14 15:15:08",
      MatchDate: "2023-11-14 15:15:08",
      IP: "s",
      BrowseDetail: "das",
    },
    {
      DefaultBlue: "Maccount",
      UserName: "Maccount",
      Nation: "Anthony",
      UserRate: "4.45",
      Amount: "100",
      Winloss: "100",
      PlaceDate: "2023-11-14 15:15:08",
      MatchDate: "2023-11-14 15:15:08",
      IP: "s",
      BrowseDetail: "das",
    },
  ];

  return (
    <div className="accountStatementModal">
      <Row>
        <Col sm={12}>
          <div className={`d-flex justify-content-between py-2 px-3`}>
            <div className="d-flex align-items-center">
              <Form.Check
                inline
                label="All"
                name="group1"
                type="radio"
                id={`All`}
              />
              <Form.Check
                color="secondary"
                inline
                label="Matched"
                name="group1"
                type="radio"
                id={`Matched`}
              />
              <Form.Check
                color="secondary"
                inline
                label="Delete"
                name="group1"
                type="radio"
                id={`Delete`}
              />
            </div>
          </div>
        </Col>
        <Col sm={12}>
          <CustomTable
            className="commonTable reportTable accountStatement-table"
            bordered={true}
            striped
            columns={columns}
            itemCount={10}
            setTableConfig={setTableConfig}
          >
            {data?.map((item: any, index: number) => {
              const {
                DefaultBlue,
                UserName,
                Nation,
                UserRate,
                Amount,
                Winloss,
                PlaceDate,
                MatchDate,
                IP,
                BrowseDetail,
              } = item;
              return (
                <tr key={index}>
                  <td>{DefaultBlue}</td>
                  <td>{UserName}</td>
                  <td>{Nation}</td>
                  <td>{UserRate}</td>
                  <td>{Amount}</td>
                  <td>{Winloss}</td>
                  <td>{PlaceDate}</td>
                  <td>{MatchDate}</td>
                  <td>{IP}</td>
                  <td>{BrowseDetail}</td>
                </tr>
              );
            })}
          </CustomTable>
        </Col>
      </Row>
    </div>
  );
};

export default AccountStatementModal;
