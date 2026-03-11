"use client";

import { useState } from "react";
import Image from "next/image";
import GroupSidebar from "@/components/group/GroupSidebar";
import GroupHeader from "@/components/group/GroupHeader";
import GroupVideoGrid from "@/components/group/GroupVideoGrid";
import AddMemberModal from "@/components/group/AddMemberModal";

// Types for group functionality
export type MemberRole = "owner" | "admin" | "editor" | "viewer";

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  image: string;
  role: MemberRole;
  joinedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  memberCount: number;
}

export interface GroupVideo {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: Date;
  userImage: string;
  username: string;
  views: number;
  duration: number;
}

// Sample data for frontend demonstration
const sampleGroups: Group[] = [
  {
    id: "1",
    name: "Design Team",
    description: "Videos shared within the design team for review and collaboration",
    createdAt: new Date("2024-01-15"),
    memberCount: 8,
  },
  {
    id: "2",
    name: "Marketing",
    description: "Marketing campaign videos and assets",
    createdAt: new Date("2024-02-20"),
    memberCount: 5,
  },
  {
    id: "3",
    name: "Engineering",
    description: "Technical demos and code walkthroughs",
    createdAt: new Date("2024-03-10"),
    memberCount: 12,
  },
];

const sampleMembers: GroupMember[] = [
  {
    id: "1",
    name: "David",
    email: "david@example.com",
    image: "/assets/images/david.png",
    role: "owner",
    joinedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Emily",
    email: "emily@example.com",
    image: "/assets/images/emily.png",
    role: "admin",
    joinedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Michael",
    email: "michael@example.com",
    image: "/assets/images/michael.png",
    role: "editor",
    joinedAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "Sarah",
    email: "sarah@example.com",
    image: "/assets/images/sarah.png",
    role: "viewer",
    joinedAt: new Date("2024-02-15"),
  },
  {
    id: "5",
    name: "Alex",
    email: "alex@example.com",
    image: "/assets/images/alex.png",
    role: "viewer",
    joinedAt: new Date("2024-03-01"),
  },
];

const sampleVideos: GroupVideo[] = [
  {
    id: "v1",
    title: "Design System Overview",
    thumbnail: "/assets/images/video1.png",
    createdAt: new Date("2024-03-01"),
    userImage: "/assets/images/david.png",
    username: "David",
    views: 145,
    duration: 420,
  },
  {
    id: "v2",
    title: "Component Library Demo",
    thumbnail: "/assets/images/video1.png",
    createdAt: new Date("2024-03-05"),
    userImage: "/assets/images/emily.png",
    username: "Emily",
    views: 89,
    duration: 300,
  },
  {
    id: "v3",
    title: "Brand Guidelines Walkthrough",
    thumbnail: "/assets/images/video1.png",
    createdAt: new Date("2024-03-10"),
    userImage: "/assets/images/michael.png",
    username: "Michael",
    views: 234,
    duration: 540,
  },
  {
    id: "v4",
    title: "UI Animation Principles",
    thumbnail: "/assets/images/video1.png",
    createdAt: new Date("2024-03-15"),
    userImage: "/assets/images/sarah.png",
    username: "Sarah",
    views: 67,
    duration: 180,
  },
];

export default function GroupPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group>(sampleGroups[0]);
  const [members, setMembers] = useState<GroupMember[]>(sampleMembers);
  const [videos] = useState<GroupVideo[]>(sampleVideos);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const handleGroupChange = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleRoleChange = (memberId: string, newRole: MemberRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const handleAddMember = (email: string, role: MemberRole) => {
    const newMember: GroupMember = {
      id: `new-${Date.now()}`,
      name: email.split("@")[0],
      email,
      image: "/assets/images/dummy.jpg",
      role,
      joinedAt: new Date(),
    };
    setMembers((prev) => [...prev, newMember]);
    setIsAddMemberModalOpen(false);
  };

  return (
    <main className="wrapper page">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden flex items-center gap-2 py-2.5 px-4 border border-gray-20 rounded-18 text-sm font-semibold text-dark-100 mb-4"
      >
        <Image
          src="/assets/icons/hamburger.svg"
          alt="Menu"
          width={16}
          height={16}
        />
        {isSidebarOpen ? "Close Menu" : "Open Group Menu"}
      </button>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-80 xl:w-96 flex-shrink-0`}
        >
          <GroupSidebar
            groups={sampleGroups}
            selectedGroup={selectedGroup}
            members={members}
            onGroupChange={handleGroupChange}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
            onAddMember={() => setIsAddMemberModalOpen(true)}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-6">
          <GroupHeader group={selectedGroup} memberCount={members.length} />
          <GroupVideoGrid videos={videos} />
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <AddMemberModal
          onClose={() => setIsAddMemberModalOpen(false)}
          onAdd={handleAddMember}
        />
      )}
    </main>
  );
}
