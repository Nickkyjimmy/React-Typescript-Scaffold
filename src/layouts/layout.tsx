import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/navbar"
import Footer from "@/components/common/footer"
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />

        <Toaster position="bottom-right" />
      </main>
      <Footer />
    </div>
  )
}
