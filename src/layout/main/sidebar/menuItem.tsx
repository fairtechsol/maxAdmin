import React from "react";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  item: any;
}
export const MenuItem: React.FC<Props> = ({ item }) => {
  const MenuItemChild = (props: any) => {
    const { data } = props;
    return <Link to={`${data.path}`}>{data?.name}</Link>;
  };

  const MenuCollapse = (props: any) => {
    const { data } = props;
    return (
      <Accordion.Item eventKey="0">
        <Accordion.Header>{data?.name}</Accordion.Header>
        <Accordion.Body>
          {data?.type === "item" ? (
            <MenuItemChild data={data} />
          ) : (
            data?.children?.map((sideBarChild: any) => {
              return (
                <Accordion defaultActiveKey={["0"]}>
                  <MenuCollapse data={sideBarChild} />
                </Accordion>
              );
            })
          )}
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <>
      {item?.type === "item" ? (
        <MenuItemChild data={item} />
      ) : (
        <MenuCollapse data={item} />
      )}
    </>
  );
};
