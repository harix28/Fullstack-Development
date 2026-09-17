import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/components/ui/Toast';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Public pages
import LandingPage from '@/pages/public/LandingPage';
import AboutPage from '@/pages/public/AboutPage';
import ServicesPage from '@/pages/public/ServicesPage';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Dashboard pages
import DashboardOverview from '@/pages/dashboard/DashboardOverview';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import SchemesPage from '@/pages/dashboard/SchemesPage';
import SchemeDetailPage from '@/pages/dashboard/SchemeDetailPage';
import JobsPage from '@/pages/dashboard/JobsPage';
import JobDetailPage from '@/pages/dashboard/JobDetailPage';
import DocumentsPage from '@/pages/dashboard/DocumentsPage';
import GrievancesPage from '@/pages/dashboard/GrievancesPage';
import NewGrievancePage from '@/pages/dashboard/NewGrievancePage';
import GrievanceDetailPage from '@/pages/dashboard/GrievanceDetailPage';
import AssistantPage from '@/pages/dashboard/AssistantPage';
import NotificationsPage from '@/pages/dashboard/NotificationsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-[#1a2f8a] border-t-transparent rounded-full animate-spin" />
      <p className="text-[#64748b] text-sm font-medium">Loading GovConnect...</p>
    </div>
  </div>
);

// Protected route wrapper
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// Public-only route wrapper (redirects authenticated users to dashboard)
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />

      {/* ── Auth Routes ── */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* ── Protected Dashboard Routes ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />

          {/* Schemes */}
          <Route path="/dashboard/schemes" element={<SchemesPage />} />
          <Route path="/dashboard/schemes/recommended" element={<SchemesPage />} />
          <Route path="/dashboard/schemes/explore" element={<SchemesPage />} />
          <Route path="/dashboard/schemes/:id" element={<SchemeDetailPage />} />

          {/* Jobs */}
          <Route path="/dashboard/jobs" element={<JobsPage />} />
          <Route path="/dashboard/jobs/recommended" element={<JobsPage />} />
          <Route path="/dashboard/jobs/:id" element={<JobDetailPage />} />

          {/* Documents */}
          <Route path="/dashboard/documents" element={<DocumentsPage />} />

          {/* Grievances */}
          <Route path="/dashboard/grievances" element={<GrievancesPage />} />
          <Route path="/dashboard/grievances/new" element={<NewGrievancePage />} />
          <Route path="/dashboard/grievances/:id" element={<GrievanceDetailPage />} />

          {/* AI Assistant */}
          <Route path="/dashboard/assistant" element={<AssistantPage />} />

          {/* Notifications */}
          <Route path="/dashboard/notifications" element={<NotificationsPage />} />

          {/* Settings */}
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* ── Fallback 404 ── */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc]">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-[#0f1740] mb-4">404</h1>
              <p className="text-[#64748b] text-lg mb-6">Page not found</p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-[#1a2f8a] text-white rounded-lg font-medium hover:bg-[#0f1740] transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ToastProvider>
            <Suspense fallback={<PageLoader />}>
              <AppRoutes />
            </Suspense>
          </ToastProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
