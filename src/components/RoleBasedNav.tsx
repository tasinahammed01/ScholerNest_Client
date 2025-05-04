// src/components/RoleBasedNav.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const RoleBasedNav = () => {
  const { user, role ,loading} = useAuth();


  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        {role === "student" && (
          <li>
            <Link to="/student/dashboard" className="text-white">
              Student Dashboard
            </Link>
          </li>
        )}
        {role === "teacher" && (
          <li>
            <Link to="/teacher/dashboard" className="text-white">
              Teacher Dashboard
            </Link>
          </li>
        )}
        {role === "admin" && (
          <li>
            <Link to="/admin/dashboard" className="text-white">
              Admin Dashboard
            </Link>
          </li>
        )}
        {!loading && (
          <div className="space-x-4">
            {user ? (
              <>
                <span>Welcome, {user.email}</span>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </ul>
    </nav>
  );
};

export default RoleBasedNav;
