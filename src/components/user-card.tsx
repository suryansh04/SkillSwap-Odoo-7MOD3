import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, StarHalf } from "lucide-react";

interface UserCardProps {
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: string;
  avatarSrc?: string;
  availability: string;
}

export function UserCard({
  name,
  skillsOffered,
  skillsWanted,
  rating,
  avatarSrc,
}: UserCardProps) {
  const maxStars = 5;
  const parsedRating = Number.parseFloat(rating.split("/")[0]);
  const fullStars = Math.floor(parsedRating);
  const hasHalfStar = parsedRating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Card className="w-full max-w-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4">
        <Avatar className="w-20 h-20 flex-shrink-0">
          <AvatarImage
            src={avatarSrc || "/placeholder.svg?height=80&width=80"}
            alt={`${name}'s profile photo`}
          />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 gap-1 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-center sm:text-left">
              {name}
            </h3>
            <Button className="bg-sky-200 text-sky-800 hover:bg-sky-300 w-full sm:w-auto">
              Request
            </Button>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gray-600 flex items-center gap-1">
                Skills Offered <ArrowRight className="w-3 h-3" />
              </span>
              <div className="flex flex-wrap gap-1">
                {skillsOffered.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="rounded-full px-2 py-0.5 text-xs font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gray-600 flex items-center gap-1">
                Skill wanted <ArrowRight className="w-3 h-3" />
              </span>
              <div className="flex flex-wrap gap-1">
                {skillsWanted.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="rounded-full px-2 py-0.5 text-xs font-normal"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1 text-sm text-gray-600 mt-2">
            rating
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star
                key={`full-${i}`}
                className="w-4 h-4 fill-gray-900 text-gray-900"
              />
            ))}
            {hasHalfStar && (
              <StarHalf className="w-4 h-4 fill-gray-900 text-gray-900" />
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            ))}
            <span className="font-semibold text-gray-800 ml-1">({rating})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
