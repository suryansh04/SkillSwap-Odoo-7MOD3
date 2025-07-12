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
  fromUserName: string
  fromUserPhoto?: string
  offeredSkill: string
  wantedSkill: string
  message: string
  status: "pending" | "accepted" | "rejected"
}

const mockRequests: SwapRequest[] = [
  {
    id: "1",
    fromUserName: "Marc Demo",
    fromUserPhoto: "",
    offeredSkill: "JavaScript",
    wantedSkill: "Photoshop",
    message: "Hey, I can teach you JavaScript if you help me with Photoshop!",
    status: "pending",
  },
  {
    id: "2",
    fromUserName: "Jane Smith",
    fromUserPhoto: "",
    offeredSkill: "Figma",
    wantedSkill: "Excel",
    message: "Would love to swap design tips for spreadsheet help.",
    status: "rejected",
  },
]

export default function Screen6() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRequests = mockRequests.filter((req) => {
    return (
      (statusFilter === "all" || req.status === statusFilter) &&
      req.fromUserName.toLowerCase().includes(search.toLowerCase())
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
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-full md:w-[200px] rounded-md bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search by user name"
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
                  <AvatarImage src={req.fromUserPhoto || "/user.jpg"} />
                  <AvatarFallback>{req.fromUserName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{req.fromUserName}</CardTitle>
                </div>
              </div>
              <span
                className={`text-sm font-medium capitalize ${
                  req.status === "pending"
                    ? "text-yellow-500"
                    : req.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {req.status}
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Offered Skill:</span>
                <span>{req.offeredSkill}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Wanted Skill:</span>
                <span>{req.wantedSkill}</span>
              </div>
              <div className="text-sm text-gray-700 border rounded p-2 bg-muted">
                {req.message}
              </div>
              {req.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-md bg-red-600 text-white hover:bg-red-700"
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
