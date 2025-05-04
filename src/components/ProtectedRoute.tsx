// src/components/ProtectedRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ("student" | "teacher" | "admin")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role as any)) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
