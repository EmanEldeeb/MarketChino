import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  if (localStorage.getItem("_token")) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}

export default ProtectedRoute;
