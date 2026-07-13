import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { actionCreators } from './state/index.js';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ToastContainer from './components/ToastContainer.jsx';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const actions = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    actions.checkAuth();
  }, [dispatch]);


  if (loading) {
    return (
      <div className="loading-state" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder/:projectId"
          element={
            <ProtectedRoute>
              <Navbar />
              <BuilderPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;