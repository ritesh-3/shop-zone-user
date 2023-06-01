import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const  AlredyLoggedInProtectRoute = ({ children }) => {

  const { loading, user } = useSelector((state) => state.user);
  if (loading === true) {
    return <Loader />;
  } else {
    if (user) {
      return <Navigate to={`/`} replace />;
    }
    return children;
  }
};

export default AlredyLoggedInProtectRoute;
