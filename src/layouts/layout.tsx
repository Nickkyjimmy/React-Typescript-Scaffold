import { Outlet } from "react-router-dom"
import Navbar from "@/components/pre-build/navbar"
import Footer from "@/components/pre-build/footer"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
