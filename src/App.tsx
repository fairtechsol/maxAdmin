import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./assets/common.scss";
import routes from "./routes";
import { RootState } from "./store/store";
import "./theme/theme.css";

function App() {
  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  if (process.env.NODE_ENV === "production") console.log = () => {};
  return <RouterProvider router={routes(userDetail)} />;
}

export default App;
