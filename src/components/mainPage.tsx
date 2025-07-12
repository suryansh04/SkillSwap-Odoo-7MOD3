"use client";

import { useState, useMemo, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { UserCard } from "@/components/user-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import axios from "../api/axiosConfig";

export default function MainPage() {
  const [selectedAvailability, setSelectedAvailability] =
    useState<string>("Availability");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/public-profiles"); // Adjust path if needed
        setAllUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let tempUsers = allUsers;

    // Filter by availability
    if (
      selectedAvailability !== "Availability" &&
      selectedAvailability !== "Reset Availability"
    ) {
      tempUsers = tempUsers.filter(
        (user) => user.availability === selectedAvailability
      );
    }

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempUsers = tempUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.skillsOffered.some((skill) =>
            skill.toLowerCase().includes(lowerCaseSearchTerm)
          ) ||
          user.skillsWanted.some((skill) =>
            skill.toLowerCase().includes(lowerCaseSearchTerm)
          )
      );
    }
    return tempUsers;
  }, [allUsers, selectedAvailability, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-2xl gap-2 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-between sm:justify-start gap-1 bg-transparent w-full sm:w-auto"
            >
              {selectedAvailability}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              onClick={() => {
                setSelectedAvailability("Available Now");
                setCurrentPage(1);
              }}
            >
              Available Now
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedAvailability("Within 24 Hours");
                setCurrentPage(1);
              }}
            >
              Within 24 Hours
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedAvailability("Within a Week");
                setCurrentPage(1);
              }}
            >
              Within a Week
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedAvailability("Reset Availability");
                setCurrentPage(1);
              }}
            >
              Reset Availability
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="text"
          placeholder="Search..."
          className="flex-1 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          variant="outline"
          onClick={handleSearch}
          className="w-full sm:w-auto bg-transparent"
        >
          search
        </Button>
      </div>

      <div className="grid w-full max-w-2xl gap-4">
        {paginatedUsers.length > 0 ? (
          paginatedUsers.map((user, index) => (
            <UserCard
              key={user._id}
              name={user.name}
              skillsOffered={user.skillsOffered}
              skillsWanted={user.skillsWanted}
              rating={`${user.averageRating || 0}/5`}
              avatarSrc={user.profilePhotoUrl || "/placeholder.svg"}
              availability={user.availability}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No users found matching your criteria.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                }}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                }}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
