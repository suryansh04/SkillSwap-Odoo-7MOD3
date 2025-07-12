"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Plus,
  Upload,
  User,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Briefcase,
  Target,
} from "lucide-react";

import axios from "../api/axiosConfig";
export default function ProfileForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const fileInputRef = useRef(null);
  const handleSave = async () => {
    try {
      const profileData = {
        name,
        location,
        availability,
        profileVisibility,
        skillsOffered,
        skillsWanted,
        profilePhotoUrl: profileImage,
      };

      const response = await axios.post("/user/save", profileData);
      console.log("✅ Profile saved:", response.data);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      alert("Failed to save profile");
    }
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      try {
        const response = await axios.post('/user/upload-photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProfileImage(response.data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addSkillOffered = () => {
    if (
      newSkillOffered.trim() &&
      !skillsOffered.includes(newSkillOffered.trim())
    ) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()]);
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (
      newSkillWanted.trim() &&
      !skillsWanted.includes(newSkillWanted.trim())
    ) {
      setSkillsWanted([...skillsWanted, newSkillWanted.trim()]);
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (skill) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };

  const removeSkillWanted = (skill) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  const handleDiscard = () => {
    setName("");
    setLocation("");
    setAvailability("");
    setProfileVisibility("public");
    setSkillsOffered([]);
    setSkillsWanted([]);
    setProfileImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Profile Photo and Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-base font-medium flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-0 border-b-2 border-gray-200 rounded-none px-0 focus:border-gray-900 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Location Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-base font-medium flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 border-b-2 border-gray-200 rounded-none px-0 focus:border-gray-900 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter your location"
                  />
                </div>

                {/* Availability Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="availability"
                    className="text-base font-medium flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Availability
                  </Label>
                  <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger className="w-full border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-900 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Weekdays
                        </div>
                      </SelectItem>
                      <SelectItem value="weekends">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Weekends
                        </div>
                      </SelectItem>
                      <SelectItem value="anytime">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Anytime
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar
                    className="h-32 w-32 border-2 border-gray-200 cursor-pointer transition-all hover:border-gray-400"
                    onClick={triggerFileInput}
                  >
                    <AvatarImage
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                    />
                    <AvatarFallback className="text-gray-400">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <Button
                  onClick={triggerFileInput}
                  size="sm"
                  variant="outline"
                  className="bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
            </div>

            {/* Skills Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Offered */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Skills Offered
                </Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md">
                  {skillsOffered.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeSkillOffered(skill)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
                    className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button onClick={addSkillOffered} size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Skills Wanted
                </Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md">
                  {skillsWanted.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeSkillWanted(skill)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === "Enter" && addSkillWanted()}
                    className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button onClick={addSkillWanted} size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Visibility */}
            <div className="space-y-2">
              <Label
                htmlFor="profile-visibility"
                className="text-base font-medium flex items-center gap-2"
              >
                {profileVisibility === "public" ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Profile Visibility
              </Label>
              <Select
                value={profileVisibility}
                onValueChange={setProfileVisibility}
              >
                <SelectTrigger className="w-full max-w-xs border-0 border-b-2 border-gray-200 rounded-none focus:border-gray-900 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-4 w-4" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button
                onClick={handleSave}
                className="flex-1 sm:flex-none sm:min-w-[120px]"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleDiscard}
                variant="outline"
                className="flex-1 sm:flex-none sm:min-w-[120px] bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Discard Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
