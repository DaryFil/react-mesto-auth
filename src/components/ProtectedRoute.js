import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isAuth, element}) => {
  console.log(isAuth);
  return isAuth ? element : <Navigate to={"/sign-in"} />;
};
 export default ProtectedRoute;