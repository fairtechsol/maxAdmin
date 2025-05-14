import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import "./assets/common.scss";
import routes from "./routes";
import "./theme/theme.css";

function App() {
  const permissions: any = localStorage.getItem("permissions");
  const parsedPermissions = JSON.parse(permissions);

  if (process.env.NODE_ENV === "production") console.log = () => {};
  return <RouterProvider router={routes(parsedPermissions)} />;
}

export default App;
