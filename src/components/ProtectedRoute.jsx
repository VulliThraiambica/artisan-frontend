import { Navigate } from "react-router-dom";

import { useAuth } from "../store/authStore";

function ProtectedRoute({ children }) {

  const { user } = useAuth();


  // not logged in
  if (!user) {

    return <Navigate to="/login" />;

  }


  return children;

}

export default ProtectedRoute;