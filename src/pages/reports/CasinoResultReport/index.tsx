import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomInput from "../../../components/commonComponent/input";
import CustomTable from "../../../components/commonComponent/table";
import { TableConfig } from "../../../models/tableInterface";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getCardReport } from "../../../store/actions/match/matchAction";
import moment from "moment-timezone";
import { ResultComponent } from "../../../components/commonComponent/resultComponent";
import { resultDragonTiger } from "../../../store/actions/card/cardDetail";
import { cardGamesCasinoResult } from "../../../utils/Constants";

interface Column {
  id: string;
  label: string;
}

// Example usage
const columns: Column[] = [
  { id: "roundId", label: "Round Id" },
  { id: "winner", label: "Winner" },
];

const CasinoResultReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const [casinoModalShow, setCasinoModalShow] = useState(false);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [date, setDate] = useState<any>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [type, setType] = useState<any>(null);

  const [typeFromState, setTypeFromState] = useState<any>(null);

  const { casinoResultReport } = useSelector(
    (state: RootState) => state.match.reportList
  );

  const { resultData } = useSelector((state: RootState) => state.card);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      let filter = "";

      if (date) {
        filter += `&DATE(cardResult.createdAt)=${date}`;
      }

      dispatch(
        getCardReport({
          type: type
            ? type.value
            : typeFromState
            ? typeFromState.value
            : "teen20",
          page: tableConfig?.page,
          limit: tableConfig?.rowPerPage,
          searchBy: "cardResult.result ->> 'mid'",
          keyword: tableConfig?.keyword || "",
          filter,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleResult = (id: any) => {
    setCasinoModalShow(true);
    dispatch(resultDragonTiger(id));
  };

  useEffect(() => {
    try {
      if (state?.cardType) {
        let newType = cardGamesCasinoResult.filter((item: any) => {
          if (item?.value === state?.cardType) {
            return {
              value: item?.value,
              label: item?.label,
            };
          }
        });
        setTypeFromState(newType[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  useEffect(() => {
    try {
      if (tableConfig && (type || typeFromState || "teen20")) {
        let filter = "";

        if (date) {
          filter += `&DATE(cardResult.createdAt)=${date}`;
        }

        dispatch(
          getCardReport({
            type: type
              ? type.value
              : typeFromState
              ? typeFromState.value
              : "teen20",
            page: tableConfig?.page,
            limit: tableConfig?.rowPerPage,
            searchBy: "cardResult.result ->> 'mid'",
            keyword: tableConfig?.keyword || "",
            filter,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [tableConfig, typeFromState]);

  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Casino Result Report</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={2}>
            <CustomInput
              placeholder={""}
              customstyle={"mb-3"}
              type="date"
              onChange={(e: any) => {
                setDate(moment(e.target.value).format("YYYY-MM-DD"));
              }}
              value={date}
            />
          </Col>
          <Col md={2}>
            <SelectSearch
              defaultValue="slotGame"
              options={cardGamesCasinoResult}
              onChange={setType}
              value={
                type
                  ? type
                  : typeFromState
                  ? typeFromState
                  : {
                      value: "teen20",
                      label: "20-20 Teen Patti",
                    }
              }
              isOptionDisabled={(option: any) => option.disabled}
            />
          </Col>
          <Col md={2}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        isPagination={true}
        isSort={false}
        isSearch={true}
        itemCount={casinoResultReport ? casinoResultReport?.count : 0}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
        tableConfig={tableConfig}
      >
        {casinoResultReport && casinoResultReport?.count === 0 && (
          <tr>No data available in table </tr>
        )}
        {casinoResultReport &&
          casinoResultReport?.results?.map((item: any, index: number) => {
            const { mid, result } = item;
            return (
              // <tr key={index}>
              //   {columns.map((column) => (
              //     <td key={column.id}>
              //       {item[column.id]}
              //     </td>
              //   ))}
              // </tr>
              <tr key={index}>
                <td>
                  <div onClick={() => handleResult(item?.mid)}>
                    <Link to="">{mid}</Link>
                  </div>
                </td>
                <td>{result}</td>
              </tr>
            );
          })}
      </CustomTable>
      <Modal
        size="lg"
        show={casinoModalShow}
        onHide={() => setCasinoModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body style={{ padding: "1rem" }}>
          <ResultComponent
            data={resultData}
            setfalse={setCasinoModalShow}
            type={resultData?.gameType}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CasinoResultReport;
