import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <BrowserRouter>
        {!isAdminRoute && <Header />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        {!isAdminRoute && <Footer />}
        <WhatsAppButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
