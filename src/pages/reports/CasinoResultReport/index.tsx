import moment from "moment-timezone";
import { memo, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SelectSearch from "../../../components/commonComponent/SelectSearch";
import CustomInput from "../../../components/commonComponent/input";
import ResultComponent from "../../../components/commonComponent/resultComponent";
import CustomTable from "../../../components/commonComponent/table";
import SearchBox from "../../../components/commonComponent/table/tableUtils/search";
import { TableConfig } from "../../../models/tableInterface";
import { resultDragonTiger } from "../../../store/actions/card/cardDetail";
import { getCardReport } from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { cardGamesCasinoResult } from "../../../utils/Constants";

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  { id: "roundId", label: "Market Id" },
  { id: "winner", label: "Winner" },
];

const CasinoResultReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const [casinoModalShow, setCasinoModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [date, setDate] = useState<any>(new Date().toISOString().split("T")[0]);

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
      setCurrentPage(1);
      dispatch(
        getCardReport({
          type: type
            ? type.value
            : typeFromState
            ? typeFromState.value
            : "teen20",
          page: 1,
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

  const [cross, setCross] = useState("");

  const clearDate = () => {
    setCross("");
  };
  const handleSearch = (keyword: string) => {
    setTableConfig((prev: any) => {
      return { ...prev, keyword: keyword };
    });
  };
  return (
    <div className="p-2 pt-0">
      <h5 className="title-22 fw-normal">Casino Result Report</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={2}>
            <div className="position-relative">
              <CustomInput
                placeholder={""}
                type="date"
                onChange={(e: any) => {
                  setDate(moment(e.target.value).format("YYYY-MM-DD"));
                  setCross("");
                }}
                value={date}
                onClick={() => setCross("cross")}
              />

              {cross && (
                <button
                  type="button"
                  onClick={clearDate}
                  className="btn btn-link position-absolute"
                  style={{
                    top: "46%",
                    right: "2px",
                    transform: "translateY(-50%)",
                    background: "#fff",
                    height: "30px",
                  }}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </Col>
          <Col className="lh-lg px-0" md={2}>
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
        <Row>
          <div className="w-75"></div>
          <div className="w-25">
            {tableConfig?.keyword !== undefined ? (
              <SearchBox
                value={tableConfig.keyword}
                onSearch={handleSearch}
                load={false}
              />
            ) : (
              <SearchBox value="" onSearch={handleSearch} load={false} />
            )}
          </div>
        </Row>
      </Form>
      <CustomTable
        customClass="commonTable reportTable"
        striped
        columns={columns}
        isPagination={true}
        isSort={false}
        itemCount={casinoResultReport ? casinoResultReport?.count : 0}
        setTableConfig={setTableConfig}
        enablePdfExcel={false}
        tableConfig={tableConfig}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        {casinoResultReport && casinoResultReport?.count === 0 && (
          <tr>No data available in table </tr>
        )}
        {casinoResultReport &&
          casinoResultReport?.results?.map((item: any, index: number) => {
            const { mid, result } = item;
            return (
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
        <Modal.Body style={{ padding: 0 }}>
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

export default memo(CasinoResultReport);
