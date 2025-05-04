// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Home from '../pages/Home/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import StudentDashboard from '../pages/student/DashBoard';
import TeacherDashboard from '../pages/teacher/Dashboard';
import AdminDashboard from '../pages/admin/DashBoard';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Role-based Routes */}
      <Route 
        path="/student/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/teacher/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
