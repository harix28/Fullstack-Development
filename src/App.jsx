import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import LandingPage from './pages/public/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="services" element={<div className="p-8">Services Page (Coming Soon)</div>} />
          <Route path="about" element={<div className="p-8">About Page (Coming Soon)</div>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="schemes" element={<div className="p-8">Schemes (Coming Soon)</div>} />
          <Route path="jobs" element={<div className="p-8">Jobs (Coming Soon)</div>} />
          <Route path="documents" element={<div className="p-8">Documents (Coming Soon)</div>} />
          <Route path="grievances" element={<div className="p-8">Grievances (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
