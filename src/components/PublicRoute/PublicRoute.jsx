import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  
  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
