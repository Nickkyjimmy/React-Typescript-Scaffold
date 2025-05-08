"use client"

import { Link } from "react-router-dom"

export default function Navbar() {

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
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  )
}
