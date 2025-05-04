// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoleBasedNav from "./components/RoleBasedNav";
import AppRoutes from "./routes/Routes";
import { AuthProvider } from "./context/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <RoleBasedNav />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
