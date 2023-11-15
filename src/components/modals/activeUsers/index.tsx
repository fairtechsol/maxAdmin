import { Form, Table } from "react-bootstrap";
import "./style.scss";
function ActiveUser() {
  return (
    <div className="activeUsers-modal">
      <Table striped>
        <thead>
          <tr>
            <th>S. No</th>
            <th>User Name</th>
            <th>Checked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>fuser1</td>
            <td>
              <Form>
                <Form.Check aria-label="option 1" />
              </Form>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>fuser3</td>
            <td>
              <Form>
                <Form.Check aria-label="option 2" />
              </Form>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>fuser05</td>
            <td>
              <Form>
                <Form.Check aria-label="option 3" />
              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ActiveUser;
