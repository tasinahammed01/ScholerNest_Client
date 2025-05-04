import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const RoleBasedNav = () => {
  const { user, role, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  

  return (
    <nav className="bg-blue-500 dark:bg-blue-900 text-white dark:text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>

          {role === "student" && (
            <li>
              <Link to="/student/dashboard" className="hover:underline">
                Student Dashboard
              </Link>
            </li>
          )}
          {role === "teacher" && (
            <li>
              <Link to="/teacher/dashboard" className="hover:underline">
                Teacher Dashboard
              </Link>
            </li>
          )}
          {role === "admin" && (
            <li>
              <Link to="/admin/dashboard" className="hover:underline">
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {!loading && (
            <>
              {user ? (
                <>
                  <span className="hidden md:inline">
                    Welcome, {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="hover:underline text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline text-sm">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:underline text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}

          
        </div>
      </div>
    </nav>
  );
};

export default RoleBasedNav;
