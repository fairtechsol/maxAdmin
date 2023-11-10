import { Breadcrumb } from "react-bootstrap";
import "./style.scss";

interface ItemObj {
  name: string;
}

interface Props {
  items: Array<ItemObj>;
}

function CustomBreadcrumb({ items }: Props) {
  return (
    <div className="customBreadcrumb bg-secondary">
      <Breadcrumb bsPrefix="breadcrumb m-0">
        {items?.map((item) => (
          <Breadcrumb.Item linkAs="span" className="title-16 f600 p-0">
            {item?.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

export default CustomBreadcrumb;
