import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import LoadingComponent from "../loading/loading";
import { Button } from "../ui/button";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingComponent />;

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>

          {user ? (
            <Button
              onClick={() => {
                logout();
              }}
              className="text-sm font-medium hover:underline"
            >
              <Link to="/" className="text-sm font-medium">
                Logout
              </Link>
            </Button>
          ) : (
            <Button asChild> 
              <Link to="/login" className="text-sm font-medium">
                Login
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
