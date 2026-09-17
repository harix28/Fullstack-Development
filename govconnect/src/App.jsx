import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import LandingPage from './pages/public/LandingPage';
import Services from './pages/public/Services';
import About from './pages/public/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';
import Schemes from './pages/dashboard/Schemes';
import SchemeDetails from './pages/dashboard/SchemeDetails';
import Jobs from './pages/dashboard/Jobs';
import Documents from './pages/dashboard/Documents';
import Grievances from './pages/dashboard/Grievances';
import Assistant from './pages/dashboard/Assistant';
import Notifications from './pages/dashboard/Notifications';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="schemes/:id" element={<SchemeDetails />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="documents" element={<Documents />} />
          <Route path="grievances" element={<Grievances />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
