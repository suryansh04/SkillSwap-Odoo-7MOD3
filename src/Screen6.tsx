"use client"

import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select"
import { UserCircle2, Home } from "lucide-react"

interface SwapRequest {
  id: string
  userName: string
  userPhoto?: string
  rating: number
  skillOffered: string
  skillWanted: string
  status: "Pending" | "Accepted" | "Rejected"
}

const mockRequests: SwapRequest[] = [
  {
    id: "1",
    userName: "Marc Demo",
    userPhoto: "",
    rating: 4.5,
    skillOffered: "JavaScript",
    skillWanted: "Photoshop",
    status: "Pending",
  },
  {
    id: "2",
    userName: "Jane Smith",
    userPhoto: "",
    rating: 3.8,
    skillOffered: "Figma",
    skillWanted: "Excel",
    status: "Rejected",
  },
]

export default function Screen6() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filteredRequests = mockRequests.filter((req) => {
    return (
      (statusFilter === "All" || req.status === statusFilter) &&
      req.userName.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="min-h-screen bg-white text-black px-4 md:px-8 py-6 space-y-6">
      {/* Navbar */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-2">
          <UserCircle2 size={24} />
          <h1 className="text-2xl font-bold">Skill Swap Requests</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-base font-bold flex items-center gap-1">
            <Home size={18} /> Home
          </Button>
          <Avatar>
            <AvatarImage src="/user.jpg" alt="User" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Select onValueChange={setStatusFilter} defaultValue="All">
          <SelectTrigger className="w-full md:w-[200px] rounded-md bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[300px] rounded-md bg-white"
        />
      </div>

      {/* Requests List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredRequests.map((req) => (
          <Card key={req.id} className="rounded-lg border shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={req.userPhoto || "/user.jpg"} />
                  <AvatarFallback>{req.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{req.userName}</CardTitle>
                  <p className="text-xs text-gray-600">Rating: {req.rating}/5</p>
                </div>
              </div>
              <span
                className={`text-sm font-medium ${
                  req.status === "Pending"
                    ? "text-yellow-500"
                    : req.status === "Accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {req.status}
              </span>
            </CardHeader>
            <CardContent className="space-y-2">
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium">Skill Offered:</span>
    <span>{req.skillOffered}</span>
  </div>
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium">Skill Wanted:</span>
    <span>{req.skillWanted}</span>
  </div>
  {req.status === "Pending" && (
    <div className="flex gap-2 pt-2">
      <Button
        size="sm"
        className="rounded-md bg-white text-black border hover:bg-gray-100"
      >
        Accept
      </Button>
      <Button
        size="sm"
        className="rounded-md bg-black text-white hover:bg-gray-900"
      >
        Reject
      </Button>
    </div>
  )}
</CardContent>

          </Card>
        ))}
      </div>
    </div>
  )
}
