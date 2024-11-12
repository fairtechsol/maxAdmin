import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getCompetitionMatches,
  setBreadCrumb,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";

interface Props {
  item: any;
  setMenuItemList: any;
  menuItemList: any;
  selectedMatchIndex: any;
  onClickMenuItem: any;
  selectedMatch: string;
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
    selectedMatch,
  } = props;

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { competitionMatches } = useSelector(
    (state: RootState) => state.match.sidebarList
  );
  // useEffect(() => {
  //   try {
  //     if (selectedCompetition !== "") {
  //       const tempList = [...menuItemList];
  //       const selectedMatchChildren = tempList[selectedMatchIndex].children;
  //       const competitionIndex = selectedMatchChildren.findIndex(
  //         (item: any) => item?.id === selectedCompetition
  //       );
  //       selectedMatchChildren[competitionIndex].children =
  //         competitionDates &&
  //         competitionDates?.map((item: any) => ({
  //           name: moment(item?.startdate).format("YYYY/MM/DD"),
  //           id: item?.startdate,
  //           type: "collapse",
  //           children: [],
  //         }));
  //       setMenuItemList(tempList);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [competitionDates, selectedCompetition, selectedMatchIndex]);

  useEffect(() => {
    try {
      if (selectedDate !== "") {
        const tempList = [...menuItemList];
        const selectedMatchChildren = tempList[selectedMatchIndex].children;

        const dateIndex = tempList[selectedMatchIndex].children.findIndex(
          (item: any) => item?.id === selectedDate
        );
        selectedMatchChildren[dateIndex].children = competitionMatches?.map(
          (item: any) => ({
            name: item?.title,
            id: item?.id,
            type: "collapse",
            eventType: selectedMatch,
            matchBetting: [
              ...(item?.matchBetting || []),
              ...(item?.tournamentBetting || []),
            ],
          })
        );
        setMenuItemList(tempList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [competitionMatches, selectedDate, selectedMatchIndex]);

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
                      setSelectedDate(sideBarChild?.id);
                      dispatch(
                        getCompetitionMatches({
                          id: menuItemList?.[selectedMatchIndex]?.id,
                          date: sideBarChild?.id,
                        })
                      );
                    }
                  }}
                  key={sideBarChild?.id}
                  defaultActiveKey={[]}
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{sideBarChild?.name}</Accordion.Header>
                    <Accordion.Body>
                      {sideBarChild?.children?.map(
                        (menuItemChild: any, indexes: number) => (
                          <Accordion
                            key={menuItemChild?.id}
                            defaultActiveKey={[]}
                          >
                            <Accordion.Item eventKey="0">
                              <Accordion.Header
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    menuItemChild.matchBetting?.length === 0 &&
                                    data?.id === "politics"
                                  ) {
                                    navigate(
                                      `/admin/other_match_detail/${menuItemChild?.eventType}/${menuItemChild?.id}/session`
                                    );
                                  }
                                }}
                              >
                                {menuItemChild?.name}
                              </Accordion.Header>
                              {menuItemChild.matchBetting?.map((item: any) => {
                                return (
                                  <Accordion.Body
                                    key={item?.id}
                                    onClick={() => {
                                      onClickMenuItem();
                                      if (data?.id === "cricket") {
                                        dispatch(
                                          setBreadCrumb({
                                            competition: data?.id,
                                            matchName: menuItemChild?.name,
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
                                              data?.id === "cricket"
                                                ? item?.name === "tied_match"
                                                  ? `/admin/match_details/${menuItemChild?.id}`
                                                  : `/admin/match_detail/${menuItemChild?.id}`
                                                : `/admin/other_match_detail/${menuItemChild?.eventType}/${menuItemChild?.id}/${item?.id}`,
                                            name: item?.name,
                                          }}
                                        />
                                      </Accordion.Item>
                                    </Accordion>
                                  </Accordion.Body>
                                );
                              })}
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
  selectedMatch,
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
          selectedMatch={selectedMatch}
        />
      )}
    </>
  );
};
