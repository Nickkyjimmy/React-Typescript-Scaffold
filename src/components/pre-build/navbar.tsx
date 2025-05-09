"use client"
import { useAuth } from "@/hooks/use-auth";
import { use } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button";
import { AuthService } from "@/services/auth_service/auth-service";

export default function Navbar() {
  const {isAuthenticated, setIsAuthenticated, setRoles} = useAuth()
  console.log("IS AUTHENTICATED?", isAuthenticated)
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/home" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/test" className="text-sm font-medium hover:underline">
            Test
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>
          {
           isAuthenticated ? (
            <Button onClick={() => {
              AuthService.logout()
              setIsAuthenticated(false)
              setRoles([])
            
              }} asChild variant="outline" className="text-sm font-medium hover:underline">
              <Link to="/">Logout</Link>
            </Button>
           ) : (
            <Button onClick={() => {}} asChild variant="outline" className="text-sm font-medium hover:underline">
              <Link to="/login">Login</Link>
            </Button>
           )}
        </nav>
      </div>
    </header>
  )
}
