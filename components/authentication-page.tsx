"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Shield, Zap, Eye, EyeOff } from "lucide-react"

interface AuthenticationPageProps {
  onAuthenticate: () => void
}

export function AuthenticationPage({ onAuthenticate }: AuthenticationPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // Mock authentication delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    onAuthenticate()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated space background */}
      <div className="absolute inset-0 opacity-30">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-primary/30 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-cyan-400">MISSION CONTROL ACCESS</CardTitle>
          <CardDescription className="text-muted-foreground">
            Secure authentication required for satellite operations
          </CardDescription>

          {/* Security badges */}
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Shield className="h-3 w-3 mr-1" />
              Encrypted
            </Badge>
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
              <Zap className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Mission ID</label>
            <Input
              type="text"
              placeholder="Enter mission identifier"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background/50 border-primary/30 focus:border-primary/60 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Access Code</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter secure access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary/60 focus:ring-primary/20 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading || !username || !password}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-2 transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </div>
            ) : (
              "Access Mission Control"
            )}
          </Button>

          <div className="text-center text-xs text-muted-foreground mt-4">
            Demo credentials: Any username/password combination
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
