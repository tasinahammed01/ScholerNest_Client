import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

const RoleBasedNav = () => {
  const { user, role, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "night" : false;
  });

  useEffect(() => {
    // Update the HTML data-theme attribute based on isDark
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "night" : "autumn"
    );
    // Save theme to localStorage
    localStorage.setItem("theme", isDark ? "night" : "autumn");
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-[#1D2A35] text-black dark:text-white py-4 px-10 shadow-md">
      {/* Logo */}
      <div className="w-40">
        <img
          src="https://i.ibb.co.com/BKq63QrT/Screenshot-493-removebg-preview.png"
          alt="Logo"
          className="h-15 w-auto object-contain"
        />
      </div>

      {/* Navigation and Controls */}
      <div className="flex-1 flex flex-col md:flex-row justify-end items-center gap-6">
        {/* Links */}
        <ul className="flex flex-col md:flex-row items-center gap-4">
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

        {/* Auth Controls */}
        <div className="flex items-center gap-3 text-sm">
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
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            checked={isDark}
          />

          {/* sun icon */}
          <svg
            className="swap-on h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </nav>
  );
};

export default RoleBasedNav;

