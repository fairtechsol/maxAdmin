import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCompetitionDates,
  getCompetitionMatches,
  setBreadCrumb,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import moment from "moment-timezone";

interface Props {
  item: any;
  setMenuItemList: any;
  menuItemList: any;
  selectedMatchIndex: any;
  onClickMenuItem: any;
}

const MenuItemChild = (props: any) => {
  // const [toggle, setToggle] = useState<Boolean>(false);

  // const handleDrawer = () => {
  //   setToggle(!toggle);
  // };

  const { data } = props;
  return (
    <Link to={`${data?.path}`} className="title-12">
      {data?.name}
    </Link>
  );
};

const MenuCollapse = (props: any) => {
  const {
    data,
    menuItemList,
    setMenuItemList,
    selectedMatchIndex,
    onClickMenuItem,
  } = props;

  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedCompetitionName, setSelectedCompetitionName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { competitionDates, competitionMatches } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  useEffect(() => {
    try {
      if (selectedCompetition !== "") {
        const tempList = [...menuItemList];
        const selectedMatchChildren = tempList[selectedMatchIndex].children;
        const competitionIndex = selectedMatchChildren.findIndex(
          (item: any) => item?.id === selectedCompetition
        );
        selectedMatchChildren[competitionIndex].children =
          competitionDates &&
          competitionDates?.map((item: any) => ({
            name: moment(item?.startdate).format("YYYY/MM/DD"),
            id: item?.startdate,
            type: "collapse",
            children: [],
          }));
        setMenuItemList(tempList);
      }
    } catch (e) {
      console.log(e);
    }
  }, [competitionDates, selectedCompetition, selectedMatchIndex]);

  useEffect(() => {
    try {
      if (selectedDate !== "") {
        const tempList = [...menuItemList];
        const selectedMatchChildren = tempList[selectedMatchIndex].children;
        const competitionIndex = selectedMatchChildren.findIndex(
          (item: any) => item?.id === selectedCompetition
        );
        const dateIndex = selectedMatchChildren[
          competitionIndex
        ].children.findIndex((item: any) => item?.id === selectedDate);
        selectedMatchChildren[competitionIndex].children[dateIndex].children =
          competitionMatches?.map((item: any) => ({
            name: item?.title,
            id: item?.id,
            type: "collapse",
            matchBetting: item?.matchBetting || [],
          }));
        setMenuItemList(tempList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    competitionMatches,
    selectedDate,
    selectedCompetition,
    selectedMatchIndex,
  ]);

  return (
    <>
      {data?.type === "item" ? (
        <MenuItemChild data={data} />
      ) : (
        <Accordion.Item eventKey="0">
          <Accordion.Header>{data?.name}</Accordion.Header>
          <Accordion.Body>
            {data?.children?.map((sideBarChild: any, index: number) => {
              return (
                <Accordion
                  onSelect={(e: any) => {
                    if (e == 0) {
                      setSelectedCompetition(sideBarChild?.id);
                      dispatch(getCompetitionDates(sideBarChild?.id));
                    }
                  }}
                  key={index}
                  defaultActiveKey={[]}
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{sideBarChild?.name}</Accordion.Header>
                    <Accordion.Body>
                      {sideBarChild?.children?.map(
                        (menuItemChild: any, indexes: number) => (
                          <Accordion
                            onSelect={(e: any) => {
                              if (e == 0) {
                                setSelectedDate(menuItemChild?.id);
                                setSelectedCompetition(sideBarChild?.id);
                                setSelectedCompetitionName(sideBarChild?.name);
                                dispatch(
                                  getCompetitionMatches({
                                    date: menuItemChild?.id,
                                    id: sideBarChild?.id,
                                  })
                                );
                              }
                            }}
                            key={indexes}
                            defaultActiveKey={[]}
                          >
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                {menuItemChild?.name}
                              </Accordion.Header>
                              <Accordion.Body>
                                {menuItemChild?.children?.map(
                                  (matches: any) => {
                                    return (
                                      <Accordion
                                        key={indexes}
                                        defaultActiveKey={[]}
                                      >
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>
                                            {matches?.name}
                                          </Accordion.Header>
                                          {matches.matchBetting?.map(
                                            (item: any) => {
                                              return (
                                                <Accordion.Body
                                                  onClick={() => {
                                                    onClickMenuItem();
                                                    if (
                                                      data?.id === "cricket"
                                                    ) {
                                                      dispatch(
                                                        setBreadCrumb({
                                                          competition:
                                                            selectedCompetitionName,
                                                          matchName:
                                                            matches?.name,
                                                          type: item?.name,
                                                          date: selectedDate,
                                                        })
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <Accordion
                                                    key={indexes}
                                                    defaultActiveKey={[]}
                                                  >
                                                    <Accordion.Item eventKey="0">
                                                      <MenuItemChild
                                                        data={{
                                                          path:
                                                            data?.id ===
                                                            "cricket"
                                                              ? `/admin/match_detail/${matches?.id}`
                                                              : `/admin/other_match_detail/${matches?.id}`,
                                                          name: item?.name,
                                                        }}
                                                      />
                                                    </Accordion.Item>
                                                  </Accordion>
                                                </Accordion.Body>
                                              );
                                            }
                                          )}
                                        </Accordion.Item>
                                      </Accordion>
                                    );
                                  }
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        )
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </>
  );
};

export const MenuItem: React.FC<Props> = ({
  item,
  setMenuItemList,
  menuItemList,
  selectedMatchIndex,
  onClickMenuItem,
}) => {
  return (
    <>
      {item?.type === "item" ? (
        <MenuItemChild data={item} />
      ) : (
        <MenuCollapse
          data={item}
          setMenuItemList={setMenuItemList}
          menuItemList={menuItemList}
          selectedMatchIndex={selectedMatchIndex}
          onClickMenuItem={onClickMenuItem}
        />
      )}
    </>
  );
};
