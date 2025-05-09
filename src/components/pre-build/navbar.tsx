import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={isAuthenticated ? "/" : "/login"} className="text-xl font-bold">
          MyApp
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/home" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>

          {isAuthenticated ? (
            <button
              onClick={ logout}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
