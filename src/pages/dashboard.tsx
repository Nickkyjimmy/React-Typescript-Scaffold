"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { getUserData } from "../services/user-service"
import type { User } from "../types/user"
import { useAuth } from "../hooks/use-auth"

export default function DashboardPage() {
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const data = await getUserData(user.id)
          setUserData(data)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      {userData ? (
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </CardContent>
        </Card>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  )
}
