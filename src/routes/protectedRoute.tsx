import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permissionKey, permissions, children }: any) => {
  if (!permissions[permissionKey]) {
    return <Navigate to="/admin/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
