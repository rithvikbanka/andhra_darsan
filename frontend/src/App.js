import React, { lazy, Suspense, useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { initializeExperiences } from './utils/localStorage';
import { DEMO_EXPERIENCES } from './demoData';
import { AuthProvider } from './context/AuthContext';
import { AdminRoute, UserRoute } from './components/ProtectedRoute';

// Lazy load all page components for better performance
const Home = lazy(() => import('./pages/Home'));
const Experiences = lazy(() => import('./pages/Experiences'));
const ExperienceDetail = lazy(() => import('./pages/ExperienceDetail'));
const Login = lazy(() => import('./pages/Login'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ForgotEmail = lazy(() => import('./pages/ForgotEmail'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageExperiences = lazy(() => import('./pages/admin/ManageExperiences'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load layout components
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#FAF7F0]">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B0000]"></div>
      <p className="text-[#8B0000] font-medium">Loading...</p>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthPage = ['/login', '/auth/callback', '/reset-password', '/forgot-email'].includes(location.pathname);

  // Initialize localStorage with demo data on first visit
  useEffect(() => {
    initializeExperiences(DEMO_EXPERIENCES);
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Toaster position="top-right" />
      {!isAdminRoute && !isAuthPage && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experience/:slug" element={<ExperienceDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-email" element={<ForgotEmail />} />

        {/* Protected User Routes */}
        <Route path="/my-account" element={<UserRoute><MyAccount /></UserRoute>} />
        <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />

        {/* Admin Routes — protected by localStorage hardcoded credentials */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/experiences" element={<AdminRoute><ManageExperiences /></AdminRoute>} />

        {/* Old unprotected admin routes (kept for reference)
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/experiences" element={<ManageExperiences />} />
        */}

        {/* 404 Fallback - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && !isAuthPage && <Footer />}
      <WhatsAppButton />
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
