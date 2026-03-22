"use client"

import { useState } from "react"
import { MissionControlDashboard } from "@/components/mission-control-dashboard"
import { AuthenticationPage } from "@/components/authentication-page"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AuthenticationPage onAuthenticate={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <MissionControlDashboard />
    </div>
  )
}
