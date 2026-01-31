import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, roles = [] }) {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
