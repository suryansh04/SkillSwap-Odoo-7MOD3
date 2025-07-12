import React from "react"
import Screen4 from "./Screen4"
import Screen6 from './Screen6'

function App() {
  // Example user matching your Mongoose User Schema
  const userData = {
    id: "userB",
    name: "Your Name",
    email: "yourname@example.com",
    location: "Location",
    profilePhotoUrl: "/avatar.png",
    skillsOffered: ["React", "Springboot", "UI/UX Design"],
    skillsWanted: ["Figma", "PowerPoint", "PremierePro"],
    availability: "weekends",
    profileVisibility: "Public",
    averageRating: 4.8,
    totalRatings: 5
  }

  // Mock feedback matching Feedback Schema
  const feedbacks = [
    {
      fromUser: "Alice",
      rating: 5,
      feedback: "Fantastic collaboration!",
      createdAt: "2024-05-10T12:00:00Z"
    },
    {
      fromUser: "Bob",
      rating: 4,
      feedback: "Very helpful and skilled.",
      createdAt: "2024-05-08T09:30:00Z"
    },
    {
      fromUser: "Charlie",
      rating: 5,
      feedback: "Great experience swapping skills!",
      createdAt: "2024-05-05T15:45:00Z"
    }
  ]

  const mySkills = ["Photoshop", "Lightroom", "Premiere Pro"]

  return (
    <div>
      <Screen4 user={userData} feedbacks={feedbacks} yourSkills={mySkills} />
      {/* <Screen6 /> */}
    </div>
  )
}

export default App
