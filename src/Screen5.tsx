"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./components/ui/dropdown-menu"
import { Briefcase, Target, ChevronDown } from "lucide-react"

interface SwapRequestFormData {
  offeredSkill: string
  wantedSkill: string
  message: string
}

interface Screen5Props {
  open: boolean
  onClose: () => void
  yourSkills: string[]
  theirSkills: string[]
  onSubmit: (data: SwapRequestFormData) => void
}

export default function Screen5({
  open,
  onClose,
  yourSkills,
  theirSkills,
  onSubmit
}: Screen5Props) {
  const [offeredSkill, setOfferedSkill] = useState<string>("")
  const [wantedSkill, setWantedSkill] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleSubmit = () => {
    if (!offeredSkill || !wantedSkill) return
    onSubmit({ offeredSkill, wantedSkill, message })
    setOfferedSkill("")
    setWantedSkill("")
    setMessage("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold text-black">
            Request Swap
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Offered Skill */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-black flex items-center gap-1">
              <Briefcase size={16} /> Your Offered Skill
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between rounded-md bg-white">
                  {offeredSkill || "Select your skill"}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-full max-w-[250px]">
                {yourSkills.length ? yourSkills.map((skill, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    onClick={() => setOfferedSkill(skill)}
                    className="cursor-pointer"
                  >
                    {skill}
                  </DropdownMenuItem>
                )) : (
                  <DropdownMenuItem disabled>No skills available</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Wanted Skill */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-black flex items-center gap-1">
              <Target size={16} /> Wanted Skill
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between rounded-md bg-white">
                  {wantedSkill || "Select their skill"}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-full max-w-[250px]">
                {theirSkills.length ? theirSkills.map((skill, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    onClick={() => setWantedSkill(skill)}
                    className="cursor-pointer"
                  >
                    {skill}
                  </DropdownMenuItem>
                )) : (
                  <DropdownMenuItem disabled>No skills available</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-black">Message (Optional)</Label>
            <Textarea
              className="bg-white border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} className="rounded-md">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-md">
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
