import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import {
  getCompetitionDates,
  getCompetitionMatches,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { Link } from "react-router-dom";

interface Props {
  item: any;
  setMenuItemList: any;
  menuItemList: any;
  selectedMatchIndex: any;
}

const MenuItemChild = (props: any) => {
  const { data } = props;
  return (
    <Link to={`${data?.path}`} className="title-12">
      {data?.name}
    </Link>
  );
};

const MenuCollapse = (props: any) => {
  const { data, menuItemList, setMenuItemList, selectedMatchIndex } = props;
  console.log(menuItemList);

  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { competitionDates, competitionMatches } = useSelector(
    (state: RootState) => state.match.sidebarList
  );

  useEffect(() => {
    if (selectedCompetition !== "") {
      const tempList = [...menuItemList];
      const selectedMatchChildren = tempList[selectedMatchIndex].children;
      const competitionIndex = selectedMatchChildren.findIndex(
        (item: any) => item?.id === selectedCompetition
      );
      selectedMatchChildren[competitionIndex].children = competitionDates?.map(
        (item: any) => ({
          name: item?.startdate,
          id: item?.startdate,
          type: "collapse",
          children: [],
        })
      );
      setMenuItemList(tempList);
    }
  }, [competitionDates, selectedCompetition, selectedMatchIndex]);

  useEffect(() => {
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
        }));
      setMenuItemList(tempList);
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
                                  (matches: any, matchIndex: number) => (
                                    <Accordion
                                      key={indexes}
                                      defaultActiveKey={[]}
                                    >
                                      <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                          {matches?.name}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                          {
                                            <MenuItemChild
                                              data={{
                                                path: `/admin/match_detail/${matches?.id}`,
                                                name: "Match Odds",
                                              }}
                                            />
                                          }
                                          {matches?.isTiedMatch && (
                                            <MenuItemChild
                                              data={{
                                                path: `/admin/match_detail/${matches?.id}`,
                                                name: "Tied Match",
                                              }}
                                            />
                                          )}
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  )
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
        />
      )}
    </>
  );
};
