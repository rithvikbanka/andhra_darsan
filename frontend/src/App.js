import React, { lazy, Suspense, useEffect } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { initializeExperiences } from './utils/localStorage';
import { DEMO_EXPERIENCES } from './demoData';

// Lazy load all page components for better performance
const Home = lazy(() => import('./pages/Home'));
const Experiences = lazy(() => import('./pages/Experiences'));
const ExperienceDetail = lazy(() => import('./pages/ExperienceDetail'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageExperiences = lazy(() => import('./pages/admin/ManageExperiences'));
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

  // Initialize localStorage with demo data on first visit
  useEffect(() => {
    initializeExperiences(DEMO_EXPERIENCES);
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Toaster position="top-right" />
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experience/:slug" element={<ExperienceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Admin Routes - No authentication required for demo */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/experiences" element={<ManageExperiences />} />
        
        {/* 404 Fallback - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      <WhatsAppButton />
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
