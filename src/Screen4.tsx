"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Badge } from "./components/ui/badge"
import { Separator } from "./components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import Screen5 from "./Screen5"
import {
  Briefcase,
  Target,
  Star,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Repeat,
  MapPin,
  Eye,
  Clock
} from "lucide-react"

interface Feedback {
  fromUser: string
  rating: number
  feedback?: string
  createdAt: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  location?: string
  profilePhotoUrl?: string
  skillsOffered: string[]
  skillsWanted: string[]
  availability?: string
  profileVisibility: 'Public' | 'Private'
  averageRating?: number
  totalRatings?: number
}

interface UserProfileProps {
  user: UserProfile
  feedbacks: Feedback[]
  yourSkills: string[]
}

export default function Screen4({ user, feedbacks, yourSkills }: UserProfileProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1))
  }

  const showNext = () => {
    setCurrentIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Top Navbar */}
      <div className="border-b px-4 md:px-8 py-4 flex items-center justify-between bg-white">
        <div className="text-xl md:text-2xl font-bold text-black">
          SkillSwap
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-md text-black font-bold flex items-center gap-1 text-base md:text-lg"
          >
            <Repeat size={18} /> Swap Requests
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-md text-black font-bold flex items-center gap-1 text-base md:text-lg"
          >
            <Home size={18} /> Home
          </Button>
          <Avatar className="w-9 h-9">
            <AvatarImage src="/avatar.png" alt="Profile" />
            <AvatarFallback>
              <UserCircle className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* ✅ Profile Card */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border rounded-lg shadow-sm bg-white">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.profilePhotoUrl || "/avatar.png"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-black">{user.name}</CardTitle>
              {user.location && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={14} /> {user.location}
                </p>
              )}
              <div className="flex gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye size={14} /> {user.profileVisibility}
                </div>
                {user.availability && (
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> {user.availability}
                  </div>
                )}
              </div>
              {user.averageRating && (
                <p className="text-sm text-black-600">
                  ★ {user.averageRating.toFixed(1)} ({user.totalRatings} ratings)
                </p>
              )}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="mt-6 space-y-8">
            {/* ✅ Skills Offered */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-black text-base font-bold">
                <Briefcase size={18} /> Skills Offered
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.length ? user.skillsOffered.map((s, i) => (
                  <Badge key={i} variant="secondary">{s}</Badge>
                )) : <p className="text-muted-foreground text-sm">No skills yet.</p>}
              </div>
            </div>

            {/* ✅ Skills Wanted */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-black text-base font-bold">
                <Target size={18} /> Skills Wanted
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.length ? user.skillsWanted.map((s, i) => (
                  <Badge key={i}>{s}</Badge>
                )) : <p className="text-muted-foreground text-sm">No skills yet.</p>}
              </div>
            </div>

            {/* ✅ Ratings and Feedback Carousel */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-black text-base font-bold">
                <Star size={18} /> Ratings and Feedback
              </div>
              {feedbacks.length ? (
                <div className="flex items-center justify-center gap-4 mt-2">
                  <Button variant="outline" size="icon" className="rounded-md" onClick={showPrev}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 min-w-[350px] md:min-w-[500px] border rounded-lg p-4 bg-muted shadow-sm text-center">
                    <p className="text-base text-foreground font-medium">
                      {feedbacks[currentIndex].fromUser} rated {feedbacks[currentIndex].rating}/5
                    </p>
                    <p className="text-sm italic text-muted-foreground">
                      "{feedbacks[currentIndex].feedback}"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(feedbacks[currentIndex].createdAt).toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-md" onClick={showNext}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No ratings yet.</p>
              )}
            </div>

            {/* ✅ Request Button */}
            <Button
              className="w-full md:w-auto px-5 py-2 rounded-md"
              size="default"
              onClick={() => setModalOpen(true)}
            >
              Request
            </Button>
          </CardContent>
        </Card>
      </div>

      <Screen5
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        yourSkills={yourSkills}
        theirSkills={user.skillsWanted}
        onSubmit={(data) => console.log("Request Submitted", data)}
      />
    </div>
  )
}
