"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import {
  Satellite,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Globe,
  Settings,
  Zap,
  Thermometer,
  Signal,
  Fuel,
  Brain,
  Cpu,
  RefreshCw,
  Power,
  Eye,
  Layers,
  Navigation,
  Orbit,
  Target,
  Calendar,
  Clock,
  Users,
  CheckSquare,
  PlayCircle,
  PauseCircle,
  Plus,
  Rocket,
} from "lucide-react"

const telemetryData = [
  { time: "00:00", power: 98, temperature: 23, signal: 95, fuel: 87 },
  { time: "04:00", power: 97, temperature: 25, signal: 93, fuel: 86 },
  { time: "08:00", power: 99, temperature: 22, signal: 97, fuel: 85 },
  { time: "12:00", power: 96, temperature: 28, signal: 94, fuel: 84 },
  { time: "16:00", power: 98, temperature: 26, signal: 96, fuel: 83 },
  { time: "20:00", power: 97, temperature: 24, signal: 95, fuel: 82 },
]

const missionDistribution = [
  { name: "Earth Observation", value: 35, fill: "#10b981" },
  { name: "Weather Analysis", value: 25, fill: "#3b82f6" },
  { name: "Deep Space Comm", value: 20, fill: "#8b5cf6" },
  { name: "Climate Monitoring", value: 15, fill: "#06b6d4" },
  { name: "Asteroid Tracking", value: 5, fill: "#f59e0b" },
]

const satelliteList = [
  {
    id: "SAT-001",
    name: "Terra Observer",
    status: "Active",
    mission: "Earth Observation",
    health: 98,
    lastContact: "2 min ago",
    position: { lat: 45.2, lng: -122.8, altitude: 705 },
    velocity: 7.66,
    orbit: "LEO",
  },
  {
    id: "SAT-002",
    name: "Weather Eye",
    status: "Active",
    mission: "Weather Monitoring",
    health: 95,
    lastContact: "1 min ago",
    position: { lat: -23.5, lng: 46.6, altitude: 850 },
    velocity: 7.45,
    orbit: "LEO",
  },
  {
    id: "SAT-003",
    name: "Deep Link",
    status: "Standby",
    mission: "Communication",
    health: 87,
    lastContact: "5 min ago",
    position: { lat: 0, lng: 0, altitude: 35786 },
    velocity: 3.07,
    orbit: "GEO",
  },
  {
    id: "SAT-004",
    name: "Storm Watch",
    status: "Active",
    mission: "Weather Monitoring",
    health: 92,
    lastContact: "3 min ago",
    position: { lat: 65.1, lng: -150.2, altitude: 820 },
    velocity: 7.52,
    orbit: "LEO",
  },
  {
    id: "SAT-005",
    name: "Cosmos Relay",
    status: "Maintenance",
    mission: "Deep Space Comm",
    health: 76,
    lastContact: "15 min ago",
    position: { lat: -45.8, lng: 170.3, altitude: 1200 },
    velocity: 7.12,
    orbit: "MEO",
  },
]

const orbitalPaths = [
  {
    id: "SAT-001",
    path: [
      { lat: 45.2, lng: -122.8 },
      { lat: 48.1, lng: -110.2 },
      { lat: 50.5, lng: -95.8 },
      { lat: 52.2, lng: -78.4 },
      { lat: 53.1, lng: -58.9 },
      { lat: 52.8, lng: -38.2 },
    ],
  },
  {
    id: "SAT-002",
    path: [
      { lat: -23.5, lng: 46.6 },
      { lat: -20.1, lng: 58.2 },
      { lat: -15.8, lng: 68.9 },
      { lat: -10.2, lng: 78.1 },
      { lat: -3.9, lng: 86.4 },
      { lat: 3.2, lng: 93.8 },
    ],
  },
  {
    id: "SAT-004",
    path: [
      { lat: 65.1, lng: -150.2 },
      { lat: 67.8, lng: -135.6 },
      { lat: 69.2, lng: -118.4 },
      { lat: 69.8, lng: -98.7 },
      { lat: 69.1, lng: -77.2 },
      { lat: 67.2, lng: -54.8 },
    ],
  },
]

const recentAlerts = [
  { id: 1, type: "warning", message: "SAT-005 temperature above threshold", time: "5 min ago", severity: "Medium" },
  { id: 2, type: "info", message: "SAT-001 completed orbit adjustment", time: "12 min ago", severity: "Low" },
  {
    id: 3,
    type: "warning",
    message: "Communication delay detected on SAT-003",
    time: "18 min ago",
    severity: "Medium",
  },
]

const aiTwinData = {
  primary: {
    id: "AI-PRIME-001",
    status: "Active",
    health: 98,
    uptime: "47d 12h 23m",
    decisions: 1247,
    accuracy: 99.2,
    load: 67,
  },
  backup: {
    id: "AI-BACKUP-001",
    status: "Standby",
    health: 96,
    uptime: "47d 12h 23m",
    decisions: 0,
    accuracy: 99.1,
    load: 12,
  },
}

const aiDecisionHistory = [
  { time: "00:00", primary: 45, backup: 0, autonomous: 12 },
  { time: "04:00", primary: 52, backup: 0, autonomous: 8 },
  { time: "08:00", primary: 38, backup: 0, autonomous: 15 },
  { time: "12:00", primary: 61, backup: 0, autonomous: 9 },
  { time: "16:00", primary: 44, backup: 0, autonomous: 11 },
  { time: "20:00", primary: 49, backup: 0, autonomous: 13 },
]

const autonomousDecisions = [
  {
    id: 1,
    satellite: "SAT-001",
    decision: "Orbit adjustment initiated",
    reason: "Debris avoidance protocol",
    time: "3 min ago",
    confidence: 97,
  },
  {
    id: 2,
    satellite: "SAT-003",
    decision: "Power conservation mode",
    reason: "Battery optimization",
    time: "8 min ago",
    confidence: 94,
  },
  {
    id: 3,
    satellite: "SAT-005",
    decision: "Safe mode activated",
    reason: "Temperature threshold exceeded",
    time: "15 min ago",
    confidence: 99,
  },
]

const safeModeMetrics = [
  { name: "Communication", active: 3, total: 12 },
  { name: "Power Management", active: 12, total: 12 },
  { name: "Navigation", active: 8, total: 12 },
  { name: "Payload", active: 2, total: 12 },
]

const missionSchedule = []

const missionTemplates = [
  {
    id: "earth-observation",
    name: "Earth Observation",
    type: "Observation",
    description: "Capture high-resolution imagery of Earth's surface for environmental monitoring and urban planning.",
    duration: 6,
    color: "border-green-500/50",
  },
  {
    id: "weather-analysis",
    name: "Weather Analysis",
    type: "Analysis",
    description: "Collect atmospheric data to improve weather forecasting and climate models.",
    duration: 4,
    color: "border-blue-500/50",
  },
  {
    id: "deep-space-comm",
    name: "Deep Space Comm",
    type: "Communication",
    description: "Establish communication links with spacecraft beyond Earth's orbit.",
    duration: 8,
    color: "border-purple-500/50",
  },
  {
    id: "climate-monitoring",
    name: "Climate Monitoring",
    type: "Monitoring",
    description: "Monitor climate change indicators such as sea ice extent and greenhouse gas concentrations.",
    duration: 12,
    color: "border-cyan-500/50",
  },
]

const upcomingTasks = [
  {
    id: "UT1",
    mission: "MISS-001",
    task: "System Diagnostics",
    scheduledTime: "08:30",
    priority: "Medium",
  },
  {
    id: "UT2",
    mission: "MISS-002",
    task: "Data Transmission",
    scheduledTime: "09:15",
    priority: "High",
  },
  {
    id: "UT3",
    mission: "MISS-003",
    task: "Orbit Adjustment",
    scheduledTime: "10:00",
    priority: "Low",
  },
]

const teamResources = [
  {
    name: "Ground Team Alpha",
    members: 8,
    availability: 92,
    currentMissions: 2,
  },
  {
    name: "Weather Team Beta",
    members: 6,
    availability: 78,
    currentMissions: 1,
  },
  {
    name: "Comm Team Gamma",
    members: 5,
    availability: 65,
    currentMissions: 1,
  },
  {
    name: "Deep Space Team Delta",
    members: 7,
    availability: 85,
    currentMissions: 0,
  },
]

export function MissionControlDashboard() {
  const [missions, setMissions] = useState(missionSchedule)
  const [newMissionForm, setNewMissionForm] = useState({
    name: "",
    type: "earth-observation",
    priority: "Medium",
    satellite: "SAT-001",
    team: "Ground Team Alpha",
    duration: 4,
  })
  const [showNewMissionDialog, setShowNewMissionDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [aiSwitchover, setAiSwitchover] = useState(false)
  const [selectedSatellite, setSelectedSatellite] = useState<string | null>(null)
  const [mapView, setMapView] = useState<"2d" | "orbital">("2d")
  const [selectedMission, setSelectedMission] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAiSwitchover = () => {
    setAiSwitchover(!aiSwitchover)
  }

  const getSatelliteColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#22c55e"
      case "Standby":
        return "#f59e0b"
      case "Maintenance":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "Completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      case "Maintenance Hold":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "in-progress":
        return <PlayCircle className="h-4 w-4 text-blue-400" />
      case "pending":
        return <PauseCircle className="h-4 w-4 text-gray-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const handleScheduleTask = (taskType: string) => {
    console.log(`[v0] Scheduling ${taskType} task`)
    const newTask = {
      id: `UT${Date.now()}`,
      mission: `MISS-${String(missions.length + 1).padStart(3, "0")}`,
      task: taskType,
      scheduledTime: new Date(Date.now() + Math.random() * 86400000).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
    }

    // Add to upcoming tasks (mock)
    alert(`✅ ${taskType} task scheduled for ${newTask.scheduledTime} - Mission ${newTask.mission}`)
  }

  const handleOptimizeSchedule = () => {
    console.log("[v0] Optimizing mission schedule")
    // Mock optimization results
    const optimizations = [
      "Reduced mission overlap by 23%",
      "Improved resource utilization to 87%",
      "Shortened total mission time by 2.5 hours",
      "Balanced team workload across all units",
    ]
    alert(`🚀 AI Optimization Complete:\n\n${optimizations.join("\n")}`)
  }

  const handleBalanceWorkload = () => {
    console.log("[v0] Balancing team workload")
    alert(
      "⚖️ Workload Rebalanced:\n\n• Ground Team Alpha: 85% → 75%\n• Weather Team Beta: 100% → 85%\n• Deep Space Team Delta: 60% → 70%\n\nOptimal distribution achieved!",
    )
  }

  const handleBrowseTemplates = () => {
    console.log("[v0] Opening mission templates")
    setShowNewMissionDialog(true)
  }

  const handleNewMission = () => {
    console.log("[v0] Creating new mission")
    setShowNewMissionDialog(true)
  }

  const handleCreateMission = () => {
    const newMission = {
      id: `MISS-${String(missions.length + 1).padStart(3, "0")}`,
      name: newMissionForm.name || `New Mission ${missions.length + 1}`,
      satellite: newMissionForm.satellite,
      priority: newMissionForm.priority,
      status: "Scheduled",
      startTime: new Date(Date.now() + 3600000).toISOString(),
      endTime: new Date(Date.now() + newMissionForm.duration * 3600000).toISOString(),
      progress: 0,
      team: newMissionForm.team,
      tasks: [
        { id: "T1", name: "Mission initialization", status: "pending", duration: 30 },
        { id: "T2", name: "System checks", status: "pending", duration: 45 },
        { id: "T3", name: "Primary operations", status: "pending", duration: newMissionForm.duration * 30 },
        { id: "T4", name: "Data processing", status: "pending", duration: 60 },
      ],
    }

    setMissions([...missions, newMission])
    setShowNewMissionDialog(false)
    setNewMissionForm({
      name: "",
      type: "earth-observation",
      priority: "Medium",
      satellite: "SAT-001",
      team: "Ground Team Alpha",
      duration: 4,
    })

    alert(
      `🎯 Mission "${newMission.name}" created successfully!\n\nMission ID: ${newMission.id}\nScheduled for: ${new Date(newMission.startTime).toLocaleString()}`,
    )
  }

  const handleUseTemplate = (template: any) => {
    setNewMissionForm({
      name: template.name,
      type: template.id,
      priority: "Medium",
      satellite: "SAT-001",
      team: "Ground Team Alpha",
      duration: template.duration,
    })
  }

  const handleScheduleView = () => {
    console.log("[v0] Opening schedule view")
    alert("📅 Opening Schedule View (mock)")
  }

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg glow-effect">
                <Satellite className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mission Control</h1>
                <p className="text-sm text-muted-foreground">AI-Enhanced Satellite Operations</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-mono text-primary">{currentTime.toLocaleTimeString()}</p>
                <p className="text-xs text-muted-foreground">Mission Time</p>
              </div>
              <Badge variant="outline" className="text-primary border-primary/50">
                <Activity className="h-3 w-3 mr-1" />
                All Systems Operational
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-twin">AI Twin</TabsTrigger>
            <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
            <TabsTrigger value="satellites">Satellites</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Satellites</CardTitle>
                  <Satellite className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Twin Status</CardTitle>
                  <Shield className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">Active</div>
                  <p className="text-xs text-muted-foreground">Backup systems ready</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mission Success</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">98.7%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">3</div>
                  <p className="text-xs text-muted-foreground">2 low, 1 medium</p>
                </CardContent>
              </Card>
            </div>

            {/* System Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Power Systems</span>
                      <span className="text-green-500">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Communication</span>
                      <span className="text-green-500">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Navigation</span>
                      <span className="text-yellow-500">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payload Systems</span>
                      <span className="text-green-500">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Mission Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={missionDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {missionDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {missionDistribution.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span className="text-xs text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-twin" className="space-y-6">
            {/* AI Twin Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Primary AI System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      {aiTwinData.primary.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-primary font-bold">{aiTwinData.primary.health}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uptime</span>
                    <span className="text-muted-foreground font-mono text-sm">{aiTwinData.primary.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Decisions Today</span>
                    <span className="text-accent font-bold">{aiTwinData.primary.decisions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accuracy</span>
                    <span className="text-green-400 font-bold">{aiTwinData.primary.accuracy}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Load</span>
                      <span>{aiTwinData.primary.load}%</span>
                    </div>
                    <Progress value={aiTwinData.primary.load} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Backup AI System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant="outline" className="text-accent border-accent/50">
                      {aiTwinData.backup.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-primary font-bold">{aiTwinData.backup.health}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sync Status</span>
                    <span className="text-green-400 font-mono text-sm">Real-time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ready State</span>
                    <span className="text-green-400 font-bold">Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Accuracy</span>
                    <span className="text-green-400 font-bold">{aiTwinData.backup.accuracy}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Load</span>
                      <span>{aiTwinData.backup.load}%</span>
                    </div>
                    <Progress value={aiTwinData.backup.load} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Decision Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    AI Decision Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aiDecisionHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="primary" fill="#0891b2" name="Primary AI" />
                        <Bar dataKey="autonomous" fill="#d97706" name="Autonomous" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Safe Mode Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {safeModeMetrics.map((system) => (
                      <div key={system.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{system.name}</span>
                          <span className="text-muted-foreground">
                            {system.active}/{system.total} active
                          </span>
                        </div>
                        <Progress value={(system.active / system.total) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Switchover Controls */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  AI Twin Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Power className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Manual Switchover</h3>
                      <p className="text-sm text-muted-foreground">Switch between Primary and Backup AI systems</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleAiSwitchover}
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10 bg-transparent"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {aiSwitchover ? "Switch to Primary" : "Switch to Backup"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Autonomous Decisions */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Recent Autonomous Decisions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {autonomousDecisions.map((decision) => (
                    <div
                      key={decision.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          <Cpu className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium">{decision.decision}</h3>
                          <p className="text-sm text-muted-foreground">
                            {decision.satellite} • {decision.reason}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-green-400 border-green-400/50">
                            {decision.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{decision.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="telemetry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Power & Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Line type="monotone" dataKey="power" stroke="#0891b2" strokeWidth={2} />
                        <Line type="monotone" dataKey="temperature" stroke="#d97706" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Signal className="h-5 w-5 text-primary" />
                    Signal & Fuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="signal"
                          stackId="1"
                          stroke="#22d3ee"
                          fill="#22d3ee"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="fuel"
                          stackId="2"
                          stroke="#a855f7"
                          fill="#a855f7"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Power</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mt-2">97.8%</div>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Temp</span>
                  </div>
                  <div className="text-2xl font-bold text-accent mt-2">24°C</div>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium">Signal</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400 mt-2">95.2%</div>
                </CardContent>
              </Card>
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">Fuel</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mt-2">82.1%</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satellites" className="space-y-6">
            {/* Map View Controls */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Satellite Tracking</h2>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant={mapView === "2d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("2d")}
                  className={`space-button ${mapView === "2d" ? "active" : ""}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  2D Map
                </Button>
                <Button
                  variant={mapView === "orbital" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMapView("orbital")}
                  className={`space-button ${mapView === "orbital" ? "active" : ""}`}
                >
                  <Orbit className="h-4 w-4 mr-2" />
                  Orbital View
                </Button>
              </div>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-0">
                <div className="relative h-96 holographic-card rounded-lg overflow-hidden">
                  {/* Enhanced space background with nebula effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/20">
                    <div className="absolute inset-0 opacity-20">
                      <div className="stars"></div>
                      <div className="twinkling"></div>
                    </div>
                  </div>

                  {/* World Map Background */}
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      {/* Simplified world map outline */}
                      <path
                        d="M150,200 Q200,180 250,200 Q300,220 350,200 Q400,180 450,200 Q500,220 550,200 Q600,180 650,200"
                        stroke="#0891b2"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M100,150 Q200,130 300,150 Q400,170 500,150 Q600,130 700,150"
                        stroke="#0891b2"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M120,250 Q220,270 320,250 Q420,230 520,250 Q620,270 720,250"
                        stroke="#0891b2"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.5"
                      />
                    </svg>
                  </div>

                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-primary"
                        style={{ left: `${(i + 1) * 10}%` }}
                      />
                    ))}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute left-0 right-0 h-px bg-primary"
                        style={{ top: `${(i + 1) * 16.66}%` }}
                      />
                    ))}
                  </div>

                  {/* Satellite Positions */}
                  {satelliteList.map((satellite, index) => {
                    const x = ((satellite.position.lng + 180) / 360) * 100
                    const y = ((90 - satellite.position.lat) / 180) * 100
                    const isSelected = selectedSatellite === satellite.id

                    return (
                      <div key={satellite.id}>
                        {/* Orbital Path */}
                        {mapView === "orbital" && orbitalPaths.find((p) => p.id === satellite.id) && (
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <path
                              d={`M ${orbitalPaths
                                .find((p) => p.id === satellite.id)
                                ?.path.map(
                                  (point) => `${((point.lng + 180) / 360) * 800},${((90 - point.lat) / 180) * 400}`,
                                )
                                .join(" L ")}`}
                              stroke={getSatelliteColor(satellite.status)}
                              strokeWidth="2"
                              fill="none"
                              opacity="0.6"
                              strokeDasharray="5,5"
                            />
                          </svg>
                        )}

                        {/* Satellite Marker */}
                        <button
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                            isSelected ? "scale-150 z-10" : "hover:scale-125"
                          }`}
                          style={{ left: `${x}%`, top: `${y}%` }}
                          onClick={() => setSelectedSatellite(isSelected ? null : satellite.id)}
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 border-white shadow-lg pulse-glow`}
                            style={{ backgroundColor: getSatelliteColor(satellite.status) }}
                          />
                          {isSelected && (
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 min-w-48 z-20">
                              <h4 className="font-medium text-sm">{satellite.name}</h4>
                              <p className="text-xs text-muted-foreground">{satellite.id}</p>
                              <div className="mt-2 space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>Lat:</span>
                                  <span>{satellite.position.lat.toFixed(2)}°</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Lng:</span>
                                  <span>{satellite.position.lng.toFixed(2)}°</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Alt:</span>
                                  <span>{satellite.position.altitude} km</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Velocity:</span>
                                  <span>{satellite.velocity} km/s</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    )
                  })}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-2">Status Legend</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Active</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Standby</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Maintenance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Satellite Fleet Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    Fleet Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {satelliteList.map((satellite) => (
                      <div
                        key={satellite.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                          selectedSatellite === satellite.id
                            ? "bg-primary/10 border-primary/50"
                            : "bg-secondary/30 border-border/50 hover:bg-secondary/50"
                        }`}
                        onClick={() => setSelectedSatellite(selectedSatellite === satellite.id ? null : satellite.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/20 rounded-lg">
                            <Satellite className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{satellite.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {satellite.id} • {satellite.mission}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Health: {satellite.health}%</p>
                            <p className="text-xs text-muted-foreground">Last: {satellite.lastContact}</p>
                          </div>
                          <Badge
                            variant={
                              satellite.status === "Active"
                                ? "default"
                                : satellite.status === "Standby"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              satellite.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50" : ""
                            }
                          >
                            {satellite.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Orbital Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-secondary/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">3</div>
                        <div className="text-xs text-muted-foreground">LEO Satellites</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/30 rounded-lg">
                        <div className="text-2xl font-bold text-accent">1</div>
                        <div className="text-xs text-muted-foreground">MEO Satellites</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/30 rounded-lg">
                        <div className="text-2xl font-bold text-cyan-400">1</div>
                        <div className="text-xs text-muted-foreground">GEO Satellites</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Velocity</span>
                        <span className="font-mono text-primary">6.36 km/s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Coverage Area</span>
                        <span className="font-mono text-accent">87.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Next Pass</span>
                        <span className="font-mono text-cyan-400">14:23 UTC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ground Stations</span>
                        <span className="font-mono text-green-400">8 Active</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            {/* Mission Control Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Mission Control Center</h2>
              <div className="flex items-center gap-2 mb-4">
                <Button size="sm" className="space-button" onClick={handleNewMission}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Mission
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="space-button bg-transparent"
                  onClick={handleScheduleView}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule View
                </Button>
              </div>
            </div>

            {showNewMissionDialog && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="w-full max-w-2xl mx-4 bg-card/95 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-primary" />
                      Create New Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Mission Templates */}
                    <div>
                      <h3 className="font-medium mb-3">Mission Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {missionTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${template.color}`}
                            onClick={() => handleUseTemplate(template)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm">{template.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {template.type}
                              </Badge>
                            </div>
                            <p className="text-xs opacity-80 mb-2">{template.description}</p>
                            <div className="text-xs opacity-60">Duration: {template.duration}h</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mission Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Mission Name</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-3 py-2 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-primary"
                          value={newMissionForm.name}
                          onChange={(e) => setNewMissionForm({ ...newMissionForm, name: e.target.value })}
                          placeholder="Enter mission name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Priority</label>
                          <select
                            className="w-full mt-1 px-3 py-2 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-primary"
                            value={newMissionForm.priority}
                            onChange={(e) => setNewMissionForm({ ...newMissionForm, priority: e.target.value })}
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Duration (hours)</label>
                          <input
                            type="number"
                            className="w-full mt-1 px-3 py-2 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-primary"
                            value={newMissionForm.duration}
                            onChange={(e) =>
                              setNewMissionForm({ ...newMissionForm, duration: Number.parseInt(e.target.value) })
                            }
                            min="1"
                            max="48"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Satellite</label>
                          <select
                            className="w-full mt-1 px-3 py-2 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-primary"
                            value={newMissionForm.satellite}
                            onChange={(e) => setNewMissionForm({ ...newMissionForm, satellite: e.target.value })}
                          >
                            <option value="SAT-001">SAT-001 (Earth Observer)</option>
                            <option value="SAT-002">SAT-002 (Weather Monitor)</option>
                            <option value="SAT-003">SAT-003 (Deep Space Comm)</option>
                            <option value="SAT-004">SAT-004 (Climate Tracker)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Team</label>
                          <select
                            className="w-full mt-1 px-3 py-2 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-primary"
                            value={newMissionForm.team}
                            onChange={(e) => setNewMissionForm({ ...newMissionForm, team: e.target.value })}
                          >
                            <option value="Ground Team Alpha">Ground Team Alpha</option>
                            <option value="Weather Team Beta">Weather Team Beta</option>
                            <option value="Comm Team Gamma">Comm Team Gamma</option>
                            <option value="Deep Space Team Delta">Deep Space Team Delta</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowNewMissionDialog(false)}
                        className="space-button bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateMission} className="space-button">
                        Create Mission
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Mission Timeline Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Active Mission Timeline ({missions.length} missions)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {missions.map((mission) => (
                      <div
                        key={mission.id}
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          selectedMission === mission.id
                            ? "bg-primary/10 border-primary/50"
                            : "bg-secondary/30 border-border/50 hover:bg-secondary/50"
                        }`}
                        onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg">
                              <Satellite className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{mission.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {mission.satellite} • {mission.team}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(mission.priority)} variant="outline">
                              {mission.priority}
                            </Badge>
                            <Badge className={getMissionStatusColor(mission.status)}>{mission.status}</Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{mission.progress}%</span>
                          </div>
                          <Progress value={mission.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                          <span>Start: {new Date(mission.startTime).toLocaleTimeString()}</span>
                          <span>End: {new Date(mission.endTime).toLocaleTimeString()}</span>
                        </div>

                        {selectedMission === mission.id && (
                          <div className="mt-4 pt-4 border-t border-border/50">
                            <h4 className="text-sm font-medium mb-3">Mission Tasks</h4>
                            <div className="space-y-2">
                              {mission.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-center justify-between p-2 bg-background/50 rounded"
                                >
                                  <div className="flex items-center gap-2">
                                    {getTaskStatusIcon(task.status)}
                                    <span className="text-sm">{task.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.duration}m</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.mission}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono text-primary">{task.scheduledTime}</p>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Resources & Mission Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Team Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamResources.map((team) => (
                      <div key={team.name} className="p-3 bg-secondary/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{team.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {team.members} members
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Availability</span>
                            <span
                              className={
                                team.availability > 80
                                  ? "text-green-400"
                                  : team.availability > 60
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }
                            >
                              {team.availability}%
                            </span>
                          </div>
                          <Progress value={team.availability} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Active Missions: {team.currentMissions}</span>
                            <span>
                              Status:{" "}
                              {team.availability > 80 ? "Available" : team.availability > 60 ? "Busy" : "Overloaded"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    Mission Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">4</div>
                      <div className="text-xs text-muted-foreground">Total Missions</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">1</div>
                      <div className="text-xs text-muted-foreground">Active Now</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">1</div>
                      <div className="text-xs text-muted-foreground">Scheduled</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-2xl font-bold text-accent">12</div>
                      <div className="text-xs text-muted-foreground">Tasks Today</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mission Success Rate</span>
                      <span className="font-mono text-green-400">98.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Duration</span>
                      <span className="font-mono text-primary">3.2 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resource Utilization</span>
                      <span className="font-mono text-accent">83.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Next Available Slot</span>
                      <span className="font-mono text-cyan-400">16:30 UTC</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mission Planning Tools */}
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Mission Planning & Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 holographic-card rounded-lg border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Smart Scheduler</h3>
                        <p className="text-sm text-muted-foreground">AI-powered optimization</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full space-button bg-transparent"
                      onClick={handleOptimizeSchedule}
                    >
                      Optimize Schedule
                    </Button>
                  </div>

                  <div className="p-4 holographic-card rounded-lg border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">Resource Manager</h3>
                        <p className="text-sm text-muted-foreground">Team allocation & workload</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full space-button bg-transparent"
                      onClick={handleBalanceWorkload}
                    >
                      Balance Workload
                    </Button>
                  </div>

                  <div className="p-4 holographic-card rounded-lg border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <CheckSquare className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mission Templates</h3>
                        <p className="text-sm text-muted-foreground">Pre-configured workflows</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full space-button bg-transparent"
                      onClick={handleBrowseTemplates}
                    >
                      Browse Templates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          <AlertTriangle
                            className={`h-4 w-4 ${alert.severity === "Medium" ? "text-yellow-500" : "text-blue-400"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <Badge variant={alert.severity === "Medium" ? "destructive" : "secondary"}>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
