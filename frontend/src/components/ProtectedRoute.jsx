import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-amber-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B0000]" />
  </div>
);

/* ─── Old Supabase-based AdminRoute (preserved for reference) ───
export const AdminRoute_Supabase = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};
─── End old Supabase AdminRoute ─── */

export const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

export const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner />;
  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const adminLogout = () => {
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_email');
  localStorage.removeItem('admin_password_override');
};

export default AdminRoute;
