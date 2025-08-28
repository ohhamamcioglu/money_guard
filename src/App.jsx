import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUser } from './redux/slices/authSlice';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/StatisticsPage';
import CurrencyPage from './pages/CurrencyPage';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    if (token && !isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, isLoggedIn]);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          } 
        />

        {/* Private Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="currency" element={<CurrencyPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
